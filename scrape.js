import FirecrawlApp from '@mendable/firecrawl-js';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration constants
const CONFIG = {
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY,
  DB_FILE: join(__dirname, 'db.json'),
  DOCS_DIR: join(__dirname, 'docs'),
  RATE_LIMIT_MS: 1000,
  MAX_FILENAME_LENGTH: 200,
};

// Zod schemas for validation
const UrlArraySchema = z.array(z.string().url());

const ScrapedContentSchema = z.object({
  title: z.string(),
  content: z.string(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const FirecrawlResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    markdown: z.string(),
    metadata: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
  }).optional(),
  error: z.string().optional(),
});

// Custom error classes
class ScrapingError extends Error {
  constructor(message, url, originalError) {
    super(message);
    this.name = 'ScrapingError';
    this.url = url;
    this.originalError = originalError;
  }
}

class ConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

// File operations utilities
class FileManager {
  static ensureDirectory(dirPath) {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dirPath}`);
    }
  }

  static loadJsonFile(filePath, defaultValue = []) {
    if (!existsSync(filePath)) {
      return defaultValue;
    }

    try {
      const content = readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`⚠️  Error reading ${filePath}, using default:`, error.message);
      return defaultValue;
    }
  }

  static saveJsonFile(filePath, data) {
    try {
      writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`❌ Error saving ${filePath}:`, error.message);
      throw error;
    }
  }

  static createSafeFilename(url) {
    return url
      .replace(/https?:\/\//, '')
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .substring(0, CONFIG.MAX_FILENAME_LENGTH)
      + '.md';
  }

  static saveMarkdownFile(filename, content) {
    const filepath = join(CONFIG.DOCS_DIR, filename);
    writeFileSync(filepath, content, 'utf8');
    return filepath;
  }

  static getExistingMarkdownFiles() {
    if (!existsSync(CONFIG.DOCS_DIR)) {
      return [];
    }
    return readdirSync(CONFIG.DOCS_DIR).filter(f => f.endsWith('.md'));
  }

  static extractUrlFromMarkdownFile(filename) {
    const filepath = join(CONFIG.DOCS_DIR, filename);
    if (!existsSync(filepath)) {
      return null;
    }

    try {
      const content = readFileSync(filepath, 'utf8');
      const frontmatterMatch = content.match(/^---\n(.*?)\n---/s);
      if (frontmatterMatch) {
        const urlMatch = frontmatterMatch[1].match(/^url:\s*(.+)$/m);
        return urlMatch ? urlMatch[1].trim() : null;
      }
    } catch (error) {
      console.warn(`⚠️  Error reading ${filename}:`, error.message);
    }
    return null;
  }

    static getScrapedUrlsFromDocs() {
    const files = FileManager.getExistingMarkdownFiles();
    const scrapedUrls = new Set();

    files.forEach(filename => {
      const url = FileManager.extractUrlFromMarkdownFile(filename);
      if (url) {
        scrapedUrls.add(url);
      }
    });

    return scrapedUrls;
  }

  static generateLlmsTxt() {
    const files = FileManager.getExistingMarkdownFiles();
    if (files.length === 0) {
      return;
    }

    const docs = files.map(filename => {
      const filepath = join(CONFIG.DOCS_DIR, filename);
      try {
        const content = readFileSync(filepath, 'utf8');
        const frontmatterMatch = content.match(/^---\n(.*?)\n---/s);

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const urlMatch = frontmatter.match(/^url:\s*(.+)$/m);
          const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
          const dateMatch = frontmatter.match(/^scraped_at:\s*(.+)$/m);

          return {
            filename,
            url: urlMatch ? urlMatch[1].trim() : '',
            title: titleMatch ? titleMatch[1].trim() : filename.replace('.md', ''),
            date: dateMatch ? dateMatch[1].trim() : '',
          };
        }
      } catch (error) {
        console.warn(`⚠️  Error reading ${filename} for llms.txt generation:`, error.message);
      }

      return {
        filename,
        url: '',
        title: filename.replace('.md', ''),
        date: '',
      };
    }).filter(doc => doc.url || doc.title);

    const llmsContent = FileManager.createLlmsContent(docs);

    try {
      writeFileSync('llms.txt', llmsContent, 'utf8');
      console.log('📝 Generated llms.txt index file');
    } catch (error) {
      console.error('❌ Error generating llms.txt:', error.message);
    }
  }

    static createLlmsContent(docs) {
    const totalDocs = docs.length;
    const lastUpdated = new Date().toISOString().split('T')[0];
    const githubBaseUrl = 'https://github.com/vltansky/e11y-mcp/blob/master/docs';

    let content = `# Web Accessibility Documentation

This repository contains ${totalDocs} accessibility documentation files scraped from W3C WAI-ARIA patterns and converted to markdown format.

## Available Documentation

`;

    docs.forEach(doc => {
      const displayTitle = doc.title.replace(/\s*\|\s*APG\s*\|\s*WAI\s*\|\s*W3C\s*$/, '');
      content += `### [${displayTitle}](${githubBaseUrl}/${doc.filename})
- **Source**: ${doc.url}
- **File**: \`${doc.filename}\`
${doc.date ? `- **Updated**: ${doc.date.split('T')[0]}` : ''}

`;
    });

    content += `## Documentation Features

- **Frontmatter Metadata**: Each file includes URL, title, and scrape timestamp
- **Clean Markdown**: Converted from original HTML for easy reading
- **Cross-references**: Links and navigation preserved where possible
- **Offline Access**: All content available without internet connection

## Usage

These files provide comprehensive accessibility implementation guidance including:
- ARIA roles, states, and properties
- Keyboard interaction patterns
- Focus management techniques
- Screen reader compatibility
- Implementation examples

## MCP Integration

This repository integrates with Model Context Protocol (MCP) for programmatic access:

### File Access via MCP
Use \`fetch_generic_url_content\` with URLs in this format:
\`\`\`
https://github.com/vltansky/e11y-mcp/raw/refs/heads/master/{file_path}
\`\`\`

### Available MCP Tools
When configured in MCP (user can choose any server name):
- \`fetch_e11y_mcp_documentation\`: Complete documentation overview
- \`search_e11y_mcp_documentation\`: Search documentation content
- \`search_e11y_mcp_code\`: Code pattern searches
- \`fetch_generic_url_content\`: Direct file access by URL

### MCP Setup
Add to mcp.json with any name you prefer:
\`\`\`json
{
  "mcpServers": {
    "accessibility-docs": {
      "url": "https://gitmcp.io/vltansky/e11y-mcp"
    }
  }
}
\`\`\`

### Example Usage
\`\`\`json
{
  "url": "https://github.com/vltansky/e11y-mcp/raw/refs/heads/master/docs/www.w3.org_WAI_ARIA_apg_patterns_accordion.md"
}
\`\`\`

## Updates

Documentation index generated on: ${lastUpdated}
Total files: ${totalDocs}

To update documentation:
1. Add URLs to \`db.json\`
2. Run \`yarn build\`
3. New \`llms.txt\` will be generated automatically
`;

    return content;
  }
}

// Scraping service
class ScrapingService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new ConfigurationError('FIRECRAWL_API_KEY environment variable is required');
    }

    this.app = new FirecrawlApp({ apiKey });
    this.scrapedUrls = FileManager.getScrapedUrlsFromDocs();
  }

  async scrapeUrl(url) {
    try {
      console.log(`🔄 Scraping: ${url}`);

      const scrapeResult = await this.app.scrapeUrl(url, {
        formats: ['markdown'],
      });

      if (!scrapeResult.success) {
        throw new Error(scrapeResult.error || 'Unknown scraping error');
      }

      const markdown = scrapeResult.markdown;
      if (!markdown) {
        throw new Error('No markdown content returned');
      }

      const metadata = scrapeResult.metadata || {};

      return {
        markdown,
        title: metadata.title || 'Untitled',
        description: metadata.description || '',
        url,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      throw new ScrapingError(
        `Failed to scrape URL: ${error.message}`,
        url,
        error
      );
    }
  }

  createMarkdownContent({ markdown, title, url, timestamp, description }) {
    const frontmatter = [
      '---',
      `url: ${url}`,
      `title: ${title}`,
      `scraped_at: ${timestamp}`,
      description && `description: ${description}`,
      '---',
      '',
    ].filter(Boolean).join('\n');

    return frontmatter + markdown;
  }

  async processUrl(url) {
    if (this.scrapedUrls.has(url)) {
      console.log(`⏭️  Skipping already scraped: ${url}`);
      return { success: true, skipped: true };
    }

    try {
      const scrapedData = await this.scrapeUrl(url);
      const filename = FileManager.createSafeFilename(url);
      const content = this.createMarkdownContent(scrapedData);

      FileManager.saveMarkdownFile(filename, content);
      this.scrapedUrls.add(url);

      console.log(`✅ Saved: ${filename}`);
      return { success: true, filename, skipped: false };

    } catch (error) {
      console.error(`❌ Error processing ${url}:`, error.message);
      return { success: false, error: error.message, skipped: false };
    }
  }



  async processUrls(urls) {
    const validUrls = UrlArraySchema.parse(urls);
    const results = {
      total: validUrls.length,
      processed: 0,
      skipped: 0,
      successful: 0,
      failed: 0,
      errors: [],
    };

    console.log(`📊 Total URLs: ${results.total}`);
    console.log(`📊 Already scraped: ${this.scrapedUrls.size}`);

    const urlsToProcess = validUrls.filter(url => !this.scrapedUrls.has(url));
    console.log(`📊 URLs to process: ${urlsToProcess.length}\n`);

    if (urlsToProcess.length === 0) {
      console.log('✨ All URLs have already been scraped!');
      return results;
    }

    for (let i = 0; i < urlsToProcess.length; i++) {
      const url = urlsToProcess[i];

      const result = await this.processUrl(url);
      results.processed++;

      if (result.skipped) {
        results.skipped++;
      } else if (result.success) {
        results.successful++;
      } else {
        results.failed++;
        results.errors.push({ url, error: result.error });
      }

      // Note: Progress is automatically tracked via docs/ folder

      // Rate limiting
      if (i < urlsToProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.RATE_LIMIT_MS));
      }
    }

    return results;
  }
}

// Statistics and reporting
class ReportService {
  static printSummary(results) {
    console.log('\n📊 Scraping Summary:');
    console.log(`📁 Total URLs: ${results.total}`);
    console.log(`✅ Successfully scraped: ${results.successful}`);
    console.log(`⏭️  Skipped (already scraped): ${results.skipped}`);
    console.log(`❌ Failed: ${results.failed}`);

    if (results.errors.length > 0) {
      console.log('\n🔍 Errors:');
      results.errors.forEach(({ url, error }) => {
        console.log(`  • ${url}: ${error}`);
      });
    }

    const markdownFiles = FileManager.getExistingMarkdownFiles();
    console.log(`\n📄 Total markdown files: ${markdownFiles.length}`);
    console.log(`📁 Files location: ${CONFIG.DOCS_DIR}`);
  }
}

// Main application
async function main() {
  try {
    console.log('🚀 Starting Firecrawl documentation scraper...\n');

    // Validate configuration
    if (!CONFIG.FIRECRAWL_API_KEY) {
      throw new ConfigurationError(
        'FIRECRAWL_API_KEY environment variable is required.\n' +
        'Get your API key from: https://www.firecrawl.dev/'
      );
    }

    // Setup
    FileManager.ensureDirectory(CONFIG.DOCS_DIR);

    // Load URLs to scrape
    const urls = FileManager.loadJsonFile(CONFIG.DB_FILE);
    if (!Array.isArray(urls) || urls.length === 0) {
      throw new Error(`No URLs found in ${CONFIG.DB_FILE}`);
    }

    // Initialize scraping service
    const scrapingService = new ScrapingService(CONFIG.FIRECRAWL_API_KEY);

    // Process all URLs
    const results = await scrapingService.processUrls(urls);

    // Generate report
    ReportService.printSummary(results);

    // Generate llms.txt index file
    FileManager.generateLlmsTxt();

    process.exit(results.failed > 0 ? 1 : 0);

  } catch (error) {
    if (error instanceof ConfigurationError) {
      console.error('⚙️  Configuration Error:', error.message);
    } else if (error instanceof z.ZodError) {
      console.error('📋 Validation Error:', error.message);
    } else {
      console.error('💥 Unexpected Error:', error.message);
    }

    process.exit(1);
  }
}

// Run the application
main().catch(error => {
  console.error('💥 Fatal Error:', error.message);
  process.exit(1);
});

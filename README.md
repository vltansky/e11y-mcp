# e11y-mcp

A modern Node.js scraper that uses [Firecrawl](https://www.firecrawl.dev/) to convert web accessibility documentation into high-quality markdown files with robust error handling and validation.

## 🚀 Features

### Core Functionality
- ✅ **Smart Deduplication**: Only scrapes URLs that haven't been processed before
- ✅ **Progress Persistence**: Saves progress after each URL to resume from interruptions
- ✅ **Rate Limiting**: Respectful 1-second delays between requests
- ✅ **Rich Metadata**: Adds frontmatter with URL, title, timestamp, and description
- ✅ **Safe Filenames**: Converts URLs to filesystem-compatible names
- ✅ **Comprehensive Error Handling**: Continues processing even if individual URLs fail

### Code Quality & Modern Patterns
- 🏗️ **Modular Architecture**: Clean separation of concerns with dedicated classes
- 🔍 **Zod Validation**: Runtime schema validation for URLs and responses
- 🎯 **Custom Error Classes**: Specific error types for better debugging
- 📊 **Detailed Reporting**: Comprehensive statistics and error tracking
- 💾 **Efficient File Management**: Utility class for all file operations
- 🔧 **Configuration Management**: Centralized config with environment variables

## 📋 Prerequisites

1. **Node.js** (v18+ recommended)
2. **Yarn** package manager
3. **Firecrawl API Key** from [firecrawl.dev](https://www.firecrawl.dev/)

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Configure environment:**
   ```bash
   # Create .env file with your API key
   echo "FIRECRAWL_API_KEY=fc-your-actual-api-key" > .env
   ```

3. **Validate setup:**
   ```bash
   yarn validate
   ```

## 🎯 Usage

### Main Commands

```bash
# Build documentation (recommended)
yarn build

# Simple scraping
yarn scrape

# Clean all generated files
yarn clean

# Check current status
yarn status

# Validate URLs in db.json
yarn validate

# Development mode with auto-reload
yarn dev
```

### Adding URLs

Add URLs to `db.json` as a JSON array:

```json
[
  "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
  "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
  "https://example.com/accessibility-guide"
]
```

## 📁 Output Structure

```
e11y-mcp/
├── db.json                     # URLs to scrape
├── scrape.js                   # Main scraping application
├── scraped-urls.json          # Progress tracking
├── jsconfig.json              # IDE configuration
└── docs/                      # Generated markdown files
    ├── www_w3_org_WAI_ARIA_apg_patterns_accordion.md
    ├── www_w3_org_WAI_ARIA_apg_patterns_breadcrumb.md
    └── example_com_accessibility_guide.md
```

### Generated File Format

Each markdown file includes rich frontmatter:

```markdown
---
url: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
title: Accordion Pattern | APG | WAI | W3C
scraped_at: 2024-01-20T15:30:45.123Z
description: ARIA accordion implementation guide
---

# Content starts here...
```

## 🏗️ Architecture

### Core Classes

- **`ScrapingService`**: Handles all Firecrawl API interactions
- **`FileManager`**: Manages file operations and safe filename generation
- **`ReportService`**: Provides detailed statistics and error reporting
- **`ScrapingError`**: Custom error class for scraping failures
- **`ConfigurationError`**: Custom error class for setup issues

### Validation & Safety

- **Zod Schemas**: Runtime validation for URLs and API responses
- **Error Boundaries**: Graceful handling of network and API failures
- **Rate Limiting**: Prevents overwhelming target servers
- **Safe Filenames**: Automatic conversion of URLs to valid file paths

## 🔧 Configuration

Environment variables (`.env` file):

```bash
FIRECRAWL_API_KEY=fc-your-api-key-here
```

Configuration constants in `scrape.js`:

```javascript
const CONFIG = {
  RATE_LIMIT_MS: 1000,           // Delay between requests
  MAX_FILENAME_LENGTH: 200,      // Maximum filename length
  // ... other settings
};
```

## 📊 Status & Monitoring

### Check Current Status
```bash
yarn status
```

Example output:
```
Scraped URLs:
[
  "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
  "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/"
]

Generated files:
-rw-r--r-- 1 user staff  5368 Jan 20 16:21 www.w3.org_WAI_ARIA_apg_patterns_accordion.md
-rw-r--r-- 1 user staff  1451 Jan 20 16:21 www.w3.org_WAI_ARIA_apg_patterns_breadcrumb.md
```

### Scraping Report
```
📊 Scraping Summary:
📁 Total URLs: 10
✅ Successfully scraped: 8
⏭️  Skipped (already scraped): 1
❌ Failed: 1

🔍 Errors:
  • https://broken-site.com: Connection timeout

📄 Total markdown files: 9
📁 Files location: /path/to/docs
```

## 🐛 Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check your `FIRECRAWL_API_KEY` in `.env`
   - Verify the key is valid at [firecrawl.dev](https://www.firecrawl.dev/)

2. **Invalid URLs**
   - Run `yarn validate` to check URL format
   - Ensure all URLs in `db.json` are valid

3. **File Permission Errors**
   - Check write permissions in the project directory
   - Ensure `docs/` directory is writable

### Debug Mode

For detailed debugging, run with Node.js debug flags:
```bash
NODE_DEBUG=fs yarn scrape
```

## 🤝 Contributing

1. Follow the established architecture patterns
2. Add Zod schemas for new data structures
3. Include comprehensive error handling
4. Update tests for new functionality
5. Document any new configuration options

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with modern Node.js patterns, Zod validation, and robust error handling for production-ready web scraping.**

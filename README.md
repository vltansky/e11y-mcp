# Web Accessibility Documentation

This repository contains 3 accessibility documentation files scraped from W3C WAI-ARIA patterns and converted to markdown format.

## Available Documentation

### [Accordion Pattern (Sections With Show/Hide Functionality)](https://github.com/vltansky/e11y-mcp/blob/master/docs/www.w3.org_WAI_ARIA_apg_patterns_accordion.md)
- **Source**: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- **File**: `www.w3.org_WAI_ARIA_apg_patterns_accordion.md`
- **Updated**: 2025-07-20

### [Breadcrumb Pattern](https://github.com/vltansky/e11y-mcp/blob/master/docs/www.w3.org_WAI_ARIA_apg_patterns_breadcrumb.md)
- **Source**: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
- **File**: `www.w3.org_WAI_ARIA_apg_patterns_breadcrumb.md`
- **Updated**: 2025-07-20

### [Date Picker Dialog Example](https://github.com/vltansky/e11y-mcp/blob/master/docs/www.w3.org_WAI_ARIA_apg_patterns_dialog-modal_examples_datepicker-dialog.md)
- **Source**: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
- **File**: `www.w3.org_WAI_ARIA_apg_patterns_dialog-modal_examples_datepicker-dialog.md`
- **Updated**: 2025-07-20

### Install MCP

Add to your `mcp.json`:
```json
{
  "mcpServers": {
    "e11y": {
      "url": "https://gitmcp.io/vltansky/e11y-mcp"
    }
  }
}
```
## How to Contribute

To add new accessibility documentation:

1. **Add URLs to `db.json`**
   ```json
   [
     "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/",
     "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
     "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
     "https://your-new-url-here/"
   ]
   ```

2. **Set up Firecrawl API key**
   ```bash
   # Create .env file with your API key
   echo "FIRECRAWL_API_KEY=fc-your-actual-api-key" > .env
   ```

3. **Build documentation**
   ```bash
   yarn build
   ```

This will scrape the new URLs, generate markdown files, and update the documentation index. The build process creates:
- Individual `.md` files in `docs/` directory
- `llms.txt` - Human and AI-readable documentation index
- `index.json` - Programmatic title-to-path mapping

## MCP Integration

This repository is designed to work with Model Context Protocol (MCP) tools for accessing documentation content programmatically.

### Accessing Files via MCP

Use the `fetch_generic_url_content` tool to fetch any file from this repository:

```json
{
  "url": "https://github.com/vltansky/e11y-mcp/blob/master/{file_path}"
}
```

**Examples:**
- Index: `https://github.com/vltansky/e11y-mcp/blob/master/index.json`
- LLM Guide: `https://github.com/vltansky/e11y-mcp/blob/master/llms.txt`
- Documentation: `https://github.com/vltansky/e11y-mcp/blob/master/docs/www.w3.org_WAI_ARIA_apg_patterns_accordion.md`
### MCP Tools Available

When you configure this repository in your MCP setup (via GitMCP or similar), you'll have access to:

- `fetch_e11y_mcp_documentation`: Get entire documentation overview
- `search_e11y_mcp_documentation`: Search within documentation content
- `search_e11y_mcp_code`: Find specific code patterns
- `fetch_generic_url_content`: Access any repository file by URL


## Generated Files

- **`llms.txt`**: Human and AI-readable documentation index
- **`index.json`**: Programmatic title-to-path mapping for easy discovery
- **`docs/*.md`**: Individual accessibility documentation files

## Updates

Documentation index generated on: 2025-07-20
Total files: 3

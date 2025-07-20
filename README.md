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

## Usage

These files provide comprehensive accessibility implementation guidance including:
- ARIA roles, states, and properties
- Keyboard interaction patterns
- Focus management techniques
- Screen reader compatibility
- Implementation examples

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

This will scrape the new URLs, generate markdown files, and update the documentation index.

## Updates

Documentation index generated on: 2025-07-20
Total files: 3

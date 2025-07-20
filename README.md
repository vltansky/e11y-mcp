# e11y-mcp

A Node.js scraper that uses [Firecrawl](https://www.firecrawl.dev/) to convert web accessibility documentation into markdown files.

## Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Get a Firecrawl API key:**
   - Visit [https://www.firecrawl.dev/](https://www.firecrawl.dev/)
   - Sign up and get your API key

3. **Set environment variable:**
   ```bash
   export FIRECRAWL_API_KEY=your_api_key_here
   ```

## Usage

Run the scraper to process URLs from `db.json`:

```bash
yarn scrape
```

## Features

- ✅ **Deduplication**: Only scrapes URLs that haven't been processed before
- ✅ **Progress tracking**: Saves progress after each URL in `scraped-urls.json`
- ✅ **Rate limiting**: 1-second delay between requests to be respectful
- ✅ **Metadata**: Adds frontmatter with URL, scrape time, and title
- ✅ **Safe filenames**: Converts URLs to filesystem-safe names
- ✅ **Error handling**: Continues processing even if individual URLs fail

## Output

- Markdown files are saved to `docs/` folder
- Each file includes metadata header with original URL and scrape timestamp
- Progress is tracked in `scraped-urls.json` to avoid re-scraping

## File Structure

```
e11y-mcp/
├── db.json              # URLs to scrape
├── scrape.js            # Main scraping script
├── scraped-urls.json    # Tracks processed URLs
└── docs/                # Generated markdown files
    ├── www_w3_org_WAI_ARIA_apg_patterns_dialog_modal_examples_datepicker_dialog_.md
    ├── www_w3_org_WAI_ARIA_apg_patterns_accordion_.md
    └── www_w3_org_WAI_ARIA_apg_patterns_breadcrumb_.md
```

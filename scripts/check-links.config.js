/**
 * Configuration for link checker
 * This file allows customization of link checking behavior
 */

export const linkCheckConfig = {
  // Domains to skip checking (known to be unreliable or block automated requests)
  skipDomains: [
    'example.com',
    'lorem.ipsum',
    'placeholder.com',
    // Add domains that are known to block bots or have unreliable responses
  ],

  // Patterns of URLs to skip
  skipPatterns: [
    /\/localhost:\d+/, // Local development URLs
    /\/127\.0\.0\.1:\d+/, // Local IP addresses
    /\/192\.168\.\d+\.\d+/, // Private network IPs
    /\/10\.\d+\.\d+\.\d+/, // Private network IPs
    /javascript:/, // JavaScript pseudo-protocol
    /mailto:/, // Email links
    /tel:/, // Phone links
    /^#/, // Anchor-only links
  ],

  // File patterns to ignore during link checking
  ignoreFiles: [
    '**/node_modules/**',
    '**/_site/**',
    '**/.jekyll-cache/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/coverage/**',
  ],

  // Custom headers for specific domains (to avoid bot blocking)
  domainHeaders: {
    'github.com': {
      'User-Agent': 'Mozilla/5.0 (compatible; PhysicsBook-LinkChecker)',
    },
    'wikipedia.org': {
      'User-Agent': 'Mozilla/5.0 (compatible; PhysicsBook-LinkChecker)',
    },
  },

  // Timeout settings
  timeouts: {
    default: 10000, // 10 seconds
    slow: 20000, // 20 seconds for known slow domains
    ci: 15000, // 15 seconds for CI environment
  },

  // Retry configuration
  retries: {
    count: 2,
    delay: 1000, // 1 second delay between retries
    backoff: 1.5, // Exponential backoff multiplier
  },

  // Rate limiting
  rateLimit: {
    concurrent: 10, // Max concurrent requests
    delay: 100, // Delay between requests (ms)
    perDomain: 3, // Max concurrent requests per domain
  },

  // Status codes to consider as success
  successCodes: [200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 307, 308],

  // Status codes that should trigger a warning but not fail
  warningCodes: [405, 429], // Method not allowed, Rate limited

  // Enable/disable features
  features: {
    checkImages: true,
    checkExternalLinks: true,
    checkInternalLinks: true,
    followRedirects: true,
    validateAnchors: false, // Disabled by default as it requires parsing HTML
    generateReport: true,
    verbose: false,
  },

  // Output configuration
  output: {
    format: 'console', // console, json, junit
    file: null, // Output file path (if not console)
    includeSuccessful: false, // Include successful links in output
    groupByFile: true, // Group results by file
  },
};

export default linkCheckConfig;

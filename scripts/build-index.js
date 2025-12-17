#!/usr/bin/env node

/**
 * Build Search Index Script
 *
 * This script creates a searchable index for the Physics Book PWA.
 * It uses MiniSearch to generate a JSON index from all HTML files.
 *
 * Requirements: minisearch, glob, cheerio
 * Output: search_index.json in the _site directory
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import MiniSearch from 'minisearch';

const SITE_DIR = '_site';
const BASE_URL = '/physics-book/';
const OUTPUT_FILE = join(SITE_DIR, 'search_index.json');

console.log('Building search index...');

// Find all HTML files in the _site directory
const htmlFiles = glob.sync(`${SITE_DIR}/**/*.html`, {
  ignore: [
    '**/assets/**',
    '**/offline.html',
    '**/404.html'
  ]
});

console.log(`Found ${htmlFiles.length} HTML files to index`);

// Extract content from each HTML file
const documents = [];
let docId = 1;

for (const filePath of htmlFiles) {
  try {
    const html = readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style, nav, footer').remove();

    // Extract title
    const title = $('h1.page-title').first().text().trim() ||
                  $('title').first().text().trim() ||
                  $('h1').first().text().trim() ||
                  'Untitled';

    // Extract main content
    const bodyText = $('body').text();
    const content = bodyText
      .replace(/\s+/g, ' ')  // Normalize whitespace
      .trim();

    // Skip if no content
    if (!content || content.length < 50) {
      console.log(`Skipping ${filePath} - insufficient content`);
      continue;
    }

    // Generate URL path relative to site
    let url = relative(SITE_DIR, filePath);
    // Ensure URL starts with /
    url = `${BASE_URL}${url}`;

    // Create document for index
    documents.push({
      id: docId++,
      title,
      content: content.substring(0, 5000), // Limit content size
      url,
      // Extract first 200 chars for preview
      preview: `${content.substring(0, 200).trim()}...`
    });

    console.log(`Indexed: ${title} (${url})`);

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

console.log(`\nIndexing ${documents.length} documents...`);

// Create MiniSearch index
const miniSearch = new MiniSearch({
  fields: ['title', 'content'], // Fields to index
  storeFields: ['title', 'url', 'preview'], // Fields to return with results
  searchOptions: {
    boost: { title: 2 }, // Boost title matches
    fuzzy: 0.2, // Fuzzy matching tolerance
    prefix: true // Enable prefix search
  }
});

// Add documents to index
miniSearch.addAll(documents);

// Serialize the index
const indexData = {
  index: miniSearch.toJSON(),
  documents: documents.map(doc => ({
    id: doc.id,
    title: doc.title,
    url: doc.url,
    preview: doc.preview
  }))
};

// Write to file
writeFileSync(OUTPUT_FILE, JSON.stringify(indexData), 'utf-8');

console.log(`\n✓ Search index created: ${OUTPUT_FILE}`);
console.log(`✓ Indexed ${documents.length} pages`);
console.log(`✓ Index size: ${(JSON.stringify(indexData).length / 1024).toFixed(2)} KB`);

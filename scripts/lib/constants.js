/**
 * Shared constants for physics book validation and fixing scripts.
 *
 * This module contains all shared constants used across validation scripts
 * to ensure consistency and eliminate duplication.
 */

/**
 * Physical units that should have a space before them.
 * Used for unit spacing validation and fixing.
 */
export const UNITS = [
  // Length
  'm',
  'km',
  'cm',
  'mm',
  'nm',
  'pm',
  // Time
  's',
  'ms',
  'ns',
  'min',
  'h',
  // Mass
  'kg',
  'g',
  'mg',
  'μg',
  // Force/Energy/Power
  'N',
  'J',
  'W',
  'Pa',
  'kPa',
  'MPa',
  // Velocity/Acceleration
  'm/s',
  'km/h',
  'mph',
  'm/s²',
  'km/s',
  // Angular
  'rad',
  'deg',
  'rad/s',
  '°',
  // Frequency
  'Hz',
  'kHz',
  'MHz',
  'GHz',
  // Electrical
  'V',
  'A',
  'Ω',
  'mA',
  'kV',
  'C',
  'F',
  'H',
  // Temperature
  'K',
  '°C',
  '°F',
  // Other
  'mol',
  'L',
  'mL',
  'eV',
  'keV',
  'MeV',
  'T',
  'Wb',
  'Gauss',
];

/**
 * Terminology replacements (British → American English).
 * Keys are British spellings, values are American spellings.
 */
export const TERMINOLOGY = {
  'centre of mass': 'center of mass',
  centre: 'center',
  centres: 'centers',
  metre: 'meter',
  metres: 'meters',
  analyser: 'analyzer',
  analysers: 'analyzers',
  labelled: 'labeled',
  modelling: 'modeling',
  travelled: 'traveled',
  travelling: 'traveling',
  colour: 'color',
  colours: 'colors',
  favour: 'favor',
  favours: 'favors',
  honour: 'honor',
  honours: 'honors',
};

/**
 * Terminology patterns for detection (regex patterns).
 * Used for checking terminology consistency.
 */
export const TERMINOLOGY_PATTERNS = {
  'center of mass': /centre of mass/gi,
  meter: /metre(?!d)/g,
  analyzer: /analyser/g,
  labeled: /labelled/g,
  modeling: /modelling/g,
  traveled: /travelled/g,
};

/**
 * Common typos in physics texts.
 * Keys are typos, values are correct spellings.
 */
export const COMMON_TYPOS = {
  acceleratoin: 'acceleration',
  velcoity: 'velocity',
  graivty: 'gravity',
  fricion: 'friction',
  enegy: 'energy',
  momentun: 'momentum',
  equaiton: 'equation',
  equlibrium: 'equilibrium',
  themodynamics: 'thermodynamics',
};

/**
 * Common words that are often intentionally repeated.
 * These should not be flagged as duplicate word errors.
 */
export const COMMON_REPEATS = [
  'that',
  'can',
  'had',
  'will',
  'very',
  'long',
  'well',
  'is',
  'was',
  'the',
  'no',
  'so',
  'go',
  'do',
  'to',
  'c',
  'r',
];

/**
 * Uninformative alt text patterns for accessibility checking.
 */
export const UNINFORMATIVE_ALT_TEXT = [
  'image',
  'img',
  'picture',
  'photo',
  'figure',
  'fig',
  'screenshot',
  'diagram',
  'graph',
  'chart',
  'icon',
  'untitled',
  'unnamed',
  'no description',
  'placeholder',
];

/**
 * Uninformative link text patterns for accessibility checking.
 */
export const UNINFORMATIVE_LINK_TEXT = [
  'click here',
  'here',
  'read more',
  'more',
  'link',
  'this link',
  'learn more',
  'click',
  'this',
  'page',
  'article',
];

/**
 * Default YAML front matter schema for physics book files.
 */
export const YAML_SCHEMA = {
  required: ['title', 'layout'],
  optional: [
    'chapterNumber',
    'sectionNumber',
    'description',
    'keywords',
    'author',
    'date',
    'order',
    'toc',
    'mathjax',
  ],
  types: {
    title: 'string',
    layout: 'string',
    chapterNumber: 'number',
    sectionNumber: 'number',
    description: 'string',
    keywords: ['string', 'array'],
    author: 'string',
    date: ['string', 'date'],
    order: 'number',
    toc: 'boolean',
    mathjax: 'boolean',
  },
  validValues: {
    layout: ['default', 'chapter', 'section', 'page', 'home', 'post'],
  },
};

/**
 * Default glob patterns for finding markdown files.
 */
export const DEFAULT_GLOB_PATTERNS = {
  markdown: '**/*.md',
  ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**', 'scripts/**'],
};

/**
 * Exit codes for consistent process termination.
 */
export const EXIT_CODES = {
  SUCCESS: 0,
  FAILURE: 1,
};

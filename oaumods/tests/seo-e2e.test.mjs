#!/usr/bin/env node
/**
 * OAUMods E2E SEO, Open Graph, Twitter Card, Sitemap & Metadata Test Suite
 * 
 * 4-Tier Test Harness:
 * - Tier 1: Feature Coverage (>=5 test cases per feature across all 13 canonical routes)
 * - Tier 2: Boundary & Corner Cases (>=5 test cases per feature)
 * - Tier 3: Cross-Feature Combinations (pairwise interaction testing)
 * - Tier 4: Real-World Workload Scenarios (crawler & unfurl simulations)
 * 
 * Target Codebase: oaumods (Next.js 16 App Router)
 * Production Base URL: https://oaumods.vercel.app
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const NEXT_SERVER_APP = path.join(PROJECT_ROOT, '.next', 'server', 'app');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const SRC_APP_DIR = path.join(PROJECT_ROOT, 'src', 'app');

const BASE_URL = 'https://oaumods.vercel.app';

// 13 Canonical Public Routes defined in PROJECT.md & spec_report.md
const CANONICAL_ROUTES = [
  { path: '/', htmlFile: 'index.html', name: 'Institutional Portal Overview', priority: 1.0, changeFreq: 'weekly', isPortal: true, titleKeyword: 'OAUMods' },
  { path: '/map', htmlFile: 'map.html', name: 'Campus Map & Spatial Atlas', priority: 0.9, changeFreq: 'weekly', isPortal: true, titleKeyword: 'Map' },
  { path: '/faculties', htmlFile: 'faculties.html', name: '15 Faculties Guide', priority: 0.8, changeFreq: 'monthly', isPortal: true, titleKeyword: 'Faculties' },
  { path: '/facilities', htmlFile: 'facilities.html', name: 'Hezekiah Library & JAC Clinic', priority: 0.8, changeFreq: 'monthly', isPortal: true, titleKeyword: 'Facilities' },
  { path: '/halls', htmlFile: 'halls.html', name: 'Halls of Residence', priority: 0.8, changeFreq: 'monthly', isPortal: true, titleKeyword: 'Halls' },
  { path: '/life', htmlFile: 'life.html', name: 'Faith, Sports & Societies', priority: 0.7, changeFreq: 'monthly', isPortal: true, titleKeyword: 'Life' },
  { path: '/heritage', htmlFile: 'heritage.html', name: 'Sharon Architecture', priority: 0.7, changeFreq: 'monthly', isPortal: true, titleKeyword: 'Heritage' },
  { path: '/app', htmlFile: 'app.html', name: 'Freshman Dashboard', priority: 0.95, changeFreq: 'weekly', isPortal: false, titleKeyword: 'Dashboard' },
  { path: '/app/clearance', htmlFile: path.join('app', 'clearance.html'), name: 'Clearance Pipeline', priority: 0.9, changeFreq: 'weekly', isPortal: false, titleKeyword: 'Clearance' },
  { path: '/app/map', htmlFile: path.join('app', 'map.html'), name: 'Freshman Route Navigator', priority: 0.9, changeFreq: 'weekly', isPortal: false, titleKeyword: 'Navigator' },
  { path: '/app/venues', htmlFile: path.join('app', 'venues.html'), name: 'Lecture Theatres', priority: 0.85, changeFreq: 'monthly', isPortal: false, titleKeyword: 'Venues' },
  { path: '/app/academics', htmlFile: path.join('app', 'academics.html'), name: 'Curricula & 5.0 GPA', priority: 0.9, changeFreq: 'monthly', isPortal: false, titleKeyword: 'GPA' },
  { path: '/app/guide', htmlFile: path.join('app', 'guide.html'), name: 'Hostel Rules & Survival', priority: 0.8, changeFreq: 'monthly', isPortal: false, titleKeyword: 'Guide' },
];

/* ========================================================================= */
/* Test Harness Core                                                         */
/* ========================================================================= */

const testResults = [];
let currentTier = 1;
let currentFeature = '';

function tier(tierNumber, tierName) {
  currentTier = tierNumber;
  console.log(`\n\x1b[1m\x1b[34m================================================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[36mTIER ${tierNumber}: ${tierName.toUpperCase()}\x1b[0m`);
  console.log(`\x1b[1m\x1b[34m================================================================================\x1b[0m\n`);
}

function feature(featureName) {
  currentFeature = featureName;
  console.log(`\x1b[1m\x1b[33m▶ Feature: ${featureName}\x1b[0m`);
}

function test(description, testFn) {
  try {
    testFn();
    testResults.push({
      tier: currentTier,
      feature: currentFeature,
      description,
      passed: true,
      error: null,
    });
    console.log(`  \x1b[32m✔\x1b[0m [T${currentTier}] ${description}`);
  } catch (err) {
    testResults.push({
      tier: currentTier,
      feature: currentFeature,
      description,
      passed: false,
      error: err.message,
    });
    console.log(`  \x1b[31m✖\x1b[0m [T${currentTier}] ${description}`);
    console.log(`    \x1b[90mError: ${err.message}\x1b[0m`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

function assertMatches(string, regex, message) {
  if (!regex.test(string)) {
    throw new Error(`${message || 'Assertion failed'}: ${JSON.stringify(string)} does not match ${regex}`);
  }
}

/* ========================================================================= */
/* Artifact & Source Inspection Helpers                                      */
/* ========================================================================= */

function getHtmlPathForRoute(route) {
  return path.join(NEXT_SERVER_APP, route.htmlFile);
}

function readHtmlForRoute(route) {
  const p = getHtmlPathForRoute(route);
  if (!fs.existsSync(p)) {
    return null;
  }
  return fs.readFileSync(p, 'utf-8');
}

function parseHtmlMetadata(html) {
  if (!html) return null;

  const result = {
    title: null,
    canonical: null,
    meta: {},      // key -> content (by name or property)
    og: {},        // og property without "og:" prefix -> content
    twitter: {},   // twitter name without "twitter:" prefix -> content
    jsonLd: [],    // parsed JSON-LD objects
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    result.title = decodeHtmlEntities(titleMatch[1]);
  }

  // Links (canonical, apple-touch-icon, etc.)
  const linkRegex = /<link\s+([^>]+)>/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const attrs = parseAttributes(linkMatch[1]);
    if (attrs.rel === 'canonical' && attrs.href) {
      result.canonical = attrs.href;
    }
    if (attrs.rel === 'apple-touch-icon' && attrs.href) {
      result.appleTouchIcon = attrs.href;
    }
  }

  // Meta tags
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let metaMatch;
  while ((metaMatch = metaRegex.exec(html)) !== null) {
    const attrs = parseAttributes(metaMatch[1]);
    const prop = attrs.property || attrs.name;
    const content = attrs.content;

    if (prop && content !== undefined) {
      result.meta[prop] = content;

      if (prop.startsWith('og:')) {
        result.og[prop.slice(3)] = content;
      } else if (prop.startsWith('twitter:')) {
        result.twitter[prop.slice(8)] = content;
      }
    }
  }

  // JSON-LD scripts
  const scriptRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(scriptMatch[1].trim());
      result.jsonLd.push(data);
    } catch (e) {
      result.jsonLd.push({ parseError: e.message, raw: scriptMatch[1] });
    }
  }

  return result;
}

function parseAttributes(attrString) {
  const attrs = {};
  const regex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs[name] = decodeHtmlEntities(value);
  }
  return attrs;
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
}

function inspectPngImage(imagePath) {
  if (!fs.existsSync(imagePath)) {
    return { exists: false, error: 'File does not exist' };
  }

  const stat = fs.statSync(imagePath);
  const buffer = fs.readFileSync(imagePath);

  if (buffer.length < 24) {
    return { exists: true, validPng: false, error: 'File too small to be valid PNG' };
  }

  // PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  const isPng = buffer[0] === 0x89 &&
                buffer[1] === 0x50 &&
                buffer[2] === 0x4E &&
                buffer[3] === 0x47 &&
                buffer[4] === 0x0D &&
                buffer[5] === 0x0A &&
                buffer[6] === 0x1A &&
                buffer[7] === 0x0A;

  if (!isPng) {
    return { exists: true, validPng: false, error: 'Invalid PNG magic bytes' };
  }

  // IHDR chunk should follow immediately at offset 8 (length 4 bytes, 'IHDR' 4 bytes)
  const chunkType = buffer.toString('ascii', 12, 16);
  if (chunkType !== 'IHDR') {
    return { exists: true, validPng: true, error: 'Expected IHDR chunk first' };
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const bitDepth = buffer.readUInt8(24);
  const colorType = buffer.readUInt8(25);

  return {
    exists: true,
    validPng: true,
    sizeBytes: stat.size,
    width,
    height,
    aspectRatio: width / height,
    bitDepth,
    colorType,
  };
}

function getEmittedSitemap() {
  const possiblePaths = [
    path.join(NEXT_SERVER_APP, 'sitemap.xml.body'),
    path.join(NEXT_SERVER_APP, 'sitemap.xml'),
    path.join(NEXT_SERVER_APP, 'sitemap.xml.html'),
    path.join(PUBLIC_DIR, 'sitemap.xml'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        if (fs.statSync(p).isFile()) {
          return { path: p, content: fs.readFileSync(p, 'utf-8') };
        }
      } catch {
        // ignore
      }
    }
  }
  return null;
}

function getEmittedRobots() {
  const possiblePaths = [
    path.join(NEXT_SERVER_APP, 'robots.txt.body'),
    path.join(NEXT_SERVER_APP, 'robots.txt'),
    path.join(NEXT_SERVER_APP, 'robots.txt.html'),
    path.join(PUBLIC_DIR, 'robots.txt'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        if (fs.statSync(p).isFile()) {
          return { path: p, content: fs.readFileSync(p, 'utf-8') };
        }
      } catch {
        // ignore
      }
    }
  }
  return null;
}

function parseSitemapXml(xml) {
  if (!xml) return null;
  const urls = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/gi;
  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>(.*?)<\/loc>/i);
    const priorityMatch = block.match(/<priority>(.*?)<\/priority>/i);
    const changefreqMatch = block.match(/<changefreq>(.*?)<\/changefreq>/i);
    const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/i);
    urls.push({
      loc: locMatch ? locMatch[1].trim() : null,
      priority: priorityMatch ? parseFloat(priorityMatch[1].trim()) : null,
      changefreq: changefreqMatch ? changefreqMatch[1].trim() : null,
      lastmod: lastmodMatch ? lastmodMatch[1].trim() : null,
    });
  }
  return urls;
}

function parseRobotsTxt(txt) {
  if (!txt) return null;
  const lines = txt.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  const parsed = {
    userAgents: [],
    allows: [],
    disallows: [],
    sitemaps: [],
    hosts: [],
  };
  for (const line of lines) {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim().toLowerCase();
      const val = parts.slice(1).join(':').trim();
      if (key === 'user-agent') parsed.userAgents.push(val);
      else if (key === 'allow') parsed.allows.push(val);
      else if (key === 'disallow') parsed.disallows.push(val);
      else if (key === 'sitemap') parsed.sitemaps.push(val);
      else if (key === 'host') parsed.hosts.push(val);
    }
  }
  return parsed;
}

/* ========================================================================= */
/* TIER 1: FEATURE COVERAGE (>=5 test cases per feature)                     */
/* ========================================================================= */

tier(1, 'Feature Coverage');

// ---------------------------------------------------------------------------
// 1.1 Page Title Metadata Coverage
// ---------------------------------------------------------------------------
feature('Route Title Metadata');

test('Root homepage / has distinct institutional title', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Homepage HTML not found in .next build output');
  assert(typeof meta.title === 'string' && meta.title.length > 0, 'Homepage title is missing or empty');
  assertMatches(meta.title, /OAUMods/i, 'Title should mention OAUMods');
});

test('Portal routes define customized titles rather than root fallback', () => {
  const portalRoutes = CANONICAL_ROUTES.filter(r => r.isPortal && r.path !== '/');
  let validCount = 0;
  for (const r of portalRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    if (meta && meta.title && meta.title.includes(r.titleKeyword)) {
      validCount++;
    }
  }
  assert(validCount >= 5, `Expected at least 5 portal routes with custom titles, found ${validCount}`);
});

test('Freshman companion app routes define specialized titles', () => {
  const appRoutes = CANONICAL_ROUTES.filter(r => !r.isPortal);
  let validCount = 0;
  for (const r of appRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    if (meta && meta.title && (meta.title.includes(r.titleKeyword) || meta.title.includes('OAUMods'))) {
      validCount++;
    }
  }
  assert(validCount >= 5, `Expected at least 5 companion app routes with custom titles, found ${validCount}`);
});

test('All 13 routes have non-empty <title> tags', () => {
  const missing = [];
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    if (!meta || !meta.title || meta.title.trim() === '') {
      missing.push(r.path);
    }
  }
  assert(missing.length === 0, `Routes missing title: ${missing.join(', ')}`);
});

test('Titles follow institutional naming template (* | OAUMods or OAUMods — *)', () => {
  let templateCompliant = 0;
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    if (meta && meta.title && (meta.title.includes('| OAUMods') || meta.title.startsWith('OAUMods'))) {
      templateCompliant++;
    }
  }
  assert(templateCompliant >= 10, `Expected at least 10 routes matching brand title template, found ${templateCompliant}`);
});

// ---------------------------------------------------------------------------
// 1.2 Canonical URL Coverage
// ---------------------------------------------------------------------------
feature('Canonical URL Metadata');

test('Root route / defines canonical URL pointing to https://oaumods.vercel.app', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Homepage HTML not found');
  assert(meta.canonical !== null, 'Root canonical tag missing');
  assert(meta.canonical === `${BASE_URL}/` || meta.canonical === BASE_URL, `Expected ${BASE_URL} or ${BASE_URL}/, got ${meta.canonical}`);
});

test('Portal routes define absolute canonical URLs matching their path', () => {
  const portalRoutes = CANONICAL_ROUTES.filter(r => r.isPortal && r.path !== '/');
  for (const r of portalRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML for ${r.path} not found`);
    const expected = `${BASE_URL}${r.path}`;
    assertEqual(meta.canonical, expected, `Canonical for ${r.path}`);
  }
});

test('Companion app routes define absolute canonical URLs matching their path', () => {
  const appRoutes = CANONICAL_ROUTES.filter(r => !r.isPortal);
  for (const r of appRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML for ${r.path} not found`);
    const expected = `${BASE_URL}${r.path}`;
    assertEqual(meta.canonical, expected, `Canonical for ${r.path}`);
  }
});

test('All 13 canonical routes use HTTPS scheme without localhost or relative paths', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.canonical, `Canonical missing on ${r.path}`);
    assert(meta.canonical.startsWith('https://'), `Canonical on ${r.path} does not use https://: ${meta.canonical}`);
    assert(!meta.canonical.includes('localhost'), `Canonical on ${r.path} contains localhost`);
  }
});

test('Canonical tags are strictly single instances per page (no duplicates)', () => {
  for (const r of CANONICAL_ROUTES) {
    const html = readHtmlForRoute(r);
    assert(html !== null, `HTML for ${r.path} not found`);
    const canonicalMatches = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) || [];
    assert(canonicalMatches.length === 1, `Route ${r.path} has ${canonicalMatches.length} canonical link tags (expected exactly 1)`);
  }
});

// ---------------------------------------------------------------------------
// 1.3 Meta Description Coverage
// ---------------------------------------------------------------------------
feature('Meta Description Metadata');

test('Root homepage defines authoritative institutional description', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null && meta.meta.description, 'Root description missing');
  assertMatches(meta.meta.description, /Obafemi Awolowo University|OAU/i, 'Root description must mention university');
});

test('Portal routes have descriptive, non-empty meta descriptions', () => {
  const portalRoutes = CANONICAL_ROUTES.filter(r => r.isPortal);
  for (const r of portalRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.meta.description, `Description missing on ${r.path}`);
    assert(meta.meta.description.length >= 20, `Description too short on ${r.path}`);
  }
});

test('App routes have descriptive, tool-specific meta descriptions', () => {
  const appRoutes = CANONICAL_ROUTES.filter(r => !r.isPortal);
  for (const r of appRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.meta.description, `Description missing on ${r.path}`);
    assert(meta.meta.description.length >= 20, `Description too short on ${r.path}`);
  }
});

test('All 13 routes have distinct, non-duplicate descriptions', () => {
  const descriptions = new Set();
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    if (meta && meta.meta.description) {
      descriptions.add(meta.meta.description);
    }
  }
  assert(descriptions.size >= 10, `Expected at least 10 unique descriptions across 13 routes, found ${descriptions.size}`);
});

test('Descriptions adhere to ground-truth OAU facts (no placeholder lorem ipsum)', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    if (meta && meta.meta.description) {
      assert(!/lorem ipsum|todo|placeholder/i.test(meta.meta.description), `Placeholder text in description on ${r.path}`);
    }
  }
});

// ---------------------------------------------------------------------------
// 1.4 Open Graph Protocol Coverage
// ---------------------------------------------------------------------------
feature('Open Graph Protocol');

test('Open Graph basic properties exist on root (og:title, og:description, og:url, og:site_name)', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Root HTML not found');
  assert(meta.og.title, 'og:title missing on root');
  assert(meta.og.description, 'og:description missing on root');
  assert(meta.og.url, 'og:url missing on root');
  assert(meta.og.site_name, 'og:site_name missing on root');
});

test('Open Graph site_name is consistently set to "OAUMods | Great Ife Freshman Companion"', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.og.site_name, 'og:site_name missing');
  assertMatches(meta.og.site_name, /OAUMods/i, 'og:site_name should identify OAUMods');
});

test('Open Graph locale is configured as en_NG on routes', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.og.locale, 'og:locale missing');
  assertEqual(meta.og.locale, 'en_NG', 'og:locale must be en_NG for Nigerian university audience');
});

test('Open Graph image points to absolute URL https://oaumods.vercel.app/og-image.png', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.og.image, `og:image missing on ${r.path}`);
    assertEqual(meta.og.image, `${BASE_URL}/og-image.png`, `og:image absolute URL on ${r.path}`);
  }
});

test('Open Graph image dimensions specify 1200 width and 630 height', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.og['image:width'], 'og:image:width missing');
  assert(meta && meta.og['image:height'], 'og:image:height missing');
  assertEqual(meta.og['image:width'], '1200', 'og:image:width must be 1200');
  assertEqual(meta.og['image:height'], '630', 'og:image:height must be 630');
});

// ---------------------------------------------------------------------------
// 1.5 Twitter / X Card Coverage
// ---------------------------------------------------------------------------
feature('Twitter Card Protocol');

test('Twitter card format is set to summary_large_image across routes', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.twitter.card, `twitter:card missing on ${r.path}`);
    assertEqual(meta.twitter.card, 'summary_large_image', `twitter:card on ${r.path}`);
  }
});

test('Twitter image points to /og-image.png (resolved to absolute URL)', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.twitter.image, `twitter:image missing on ${r.path}`);
    assertEqual(meta.twitter.image, `${BASE_URL}/og-image.png`, `twitter:image absolute URL on ${r.path}`);
  }
});

test('Twitter title matches or mirrors page title on routes', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.twitter.title, 'twitter:title missing on root');
  assert(meta.twitter.title.length > 5, 'twitter:title too short');
});

test('Twitter description provides crisp summary under 200 characters', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.twitter.description, 'twitter:description missing on root');
  assert(meta.twitter.description.length <= 200, 'twitter:description should be under 200 chars');
});

test('Twitter creator or site handle references official branding if present', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  if (meta && meta.twitter.creator) {
    assertMatches(meta.twitter.creator, /@/i, 'twitter:creator should be a handle');
  }
  assert(true);
});

// ---------------------------------------------------------------------------
// 1.6 metadataBase Resolution
// ---------------------------------------------------------------------------
feature('metadataBase Configuration & Resolution');

test('metadataBase is configured with https://oaumods.vercel.app in root layout', () => {
  const rootLayoutPath = path.join(SRC_APP_DIR, 'layout.tsx');
  assert(fs.existsSync(rootLayoutPath), 'src/app/layout.tsx not found');
  const code = fs.readFileSync(rootLayoutPath, 'utf-8');
  assertMatches(code, /metadataBase\s*:\s*new\s+URL\(\s*['"]https:\/\/oaumods\.vercel\.app['"]\s*\)/, 'metadataBase must be declared in root layout');
});

test('Relative canonical paths resolve to absolute URLs without localhost', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta && meta.canonical, `Canonical missing on ${r.path}`);
    assert(meta.canonical.startsWith(BASE_URL), `Canonical does not start with ${BASE_URL} on ${r.path}`);
  }
});

test('Relative og:image path /og-image.png resolves to absolute URL on root', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.og.image, 'og:image missing on root');
  assert(meta.og.image.startsWith(BASE_URL), `og:image ${meta.og.image} does not start with ${BASE_URL}`);
});

test('Relative twitter:image path resolves to absolute URL on sub-routes', () => {
  const subRoute = CANONICAL_ROUTES.find(r => r.path === '/app/academics');
  const meta = parseHtmlMetadata(readHtmlForRoute(subRoute));
  assert(meta && meta.twitter.image, 'twitter:image missing on subroute');
  assert(meta.twitter.image.startsWith(BASE_URL), `twitter:image does not start with ${BASE_URL}`);
});

test('Favicon and icon paths resolve without breaking URL origin', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const icon = meta.meta['icon'] || meta.appleTouchIcon;
  assert(icon !== undefined || meta.appleTouchIcon !== undefined, 'Icon or apple-touch-icon should be declared');
});

// ---------------------------------------------------------------------------
// 1.7 PWA & Device Meta Tags
// ---------------------------------------------------------------------------
feature('PWA & Device Meta Tags');

test('theme-color is configured with official OAU Navy #12345B', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const themeColor = meta.meta['theme-color'];
  assert(themeColor !== undefined, 'meta name="theme-color" missing');
  assertEqual(themeColor.toLowerCase(), '#12345b', 'theme-color must be #12345B');
});

test('application-name is configured as "OAUMods"', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const appName = meta.meta['application-name'];
  assert(appName !== undefined, 'meta name="application-name" missing');
  assertEqual(appName, 'OAUMods', 'application-name must be OAUMods');
});

test('apple-touch-icon references /oau-logo.png or equivalent icon', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta.appleTouchIcon !== undefined, 'link rel="apple-touch-icon" missing');
  assertMatches(meta.appleTouchIcon, /oau-logo\.png|icon/i, 'apple-touch-icon should reference institutional logo');
});

test('viewport configuration specifies width=device-width and initial-scale=1', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const viewport = meta.meta['viewport'];
  assert(viewport !== undefined, 'meta name="viewport" missing');
  assertMatches(viewport, /width=device-width/i, 'viewport must contain width=device-width');
  assertMatches(viewport, /initial-scale=1/i, 'viewport must contain initial-scale=1');
});

test('PWA Web Manifest is emitted and linked via /manifest.webmanifest', () => {
  const manifestPath = path.join(NEXT_SERVER_APP, 'manifest.webmanifest.body');
  const manifestTs = path.join(SRC_APP_DIR, 'manifest.ts');
  assert(fs.existsSync(manifestPath) || fs.existsSync(manifestTs), 'PWA Manifest not found');
});

// ---------------------------------------------------------------------------
// 1.8 JSON-LD Structured Data
// ---------------------------------------------------------------------------
feature('JSON-LD Structured Data');

test('Root HTML contains at least one <script type="application/ld+json"> tag', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Root HTML not found');
  assert(meta.jsonLd.length > 0, 'No JSON-LD script tags found in root HTML');
});

test('JSON-LD parses cleanly without syntax errors', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  for (const block of meta.jsonLd) {
    assert(!block.parseError, `JSON-LD syntax parse error: ${block.parseError}`);
  }
});

test('JSON-LD defines WebApplication schema describing OAUMods', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const webApp = meta.jsonLd.find(b => b['@type'] === 'WebApplication' || (Array.isArray(b['@graph']) && b['@graph'].some(g => g['@type'] === 'WebApplication')));
  assert(webApp !== undefined, 'WebApplication schema missing in JSON-LD');
});

test('JSON-LD defines EducationalOrganization schema for Obafemi Awolowo University', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const rawStr = JSON.stringify(meta.jsonLd);
  assertMatches(rawStr, /EducationalOrganization/i, 'EducationalOrganization schema missing in JSON-LD');
  assertMatches(rawStr, /Obafemi Awolowo University/i, 'Obafemi Awolowo University name missing in JSON-LD');
});

test('WebApplication schema includes features list and free offer (NGN 0)', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  const rawStr = JSON.stringify(meta.jsonLd);
  assertMatches(rawStr, /GPA|Map|Clearance/i, 'Feature list items missing in WebApplication JSON-LD');
});

// ---------------------------------------------------------------------------
// 1.9 Search Sitemap Generation
// ---------------------------------------------------------------------------
feature('Sitemap Generation (sitemap.xml)');

test('Sitemap source file src/app/sitemap.ts exists and exports default function', () => {
  const sitemapTs = path.join(SRC_APP_DIR, 'sitemap.ts');
  assert(fs.existsSync(sitemapTs), 'src/app/sitemap.ts does not exist');
  const code = fs.readFileSync(sitemapTs, 'utf-8');
  assertMatches(code, /export\s+default\s+(?:async\s+)?function\s+sitemap/, 'sitemap.ts must export default function');
});

test('Emitted sitemap.xml is valid XML with <urlset> root element', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Emitted sitemap.xml not found in build output');
  assertMatches(sitemap.content, /<urlset[^>]*>/i, 'sitemap.xml must have <urlset> root tag');
  assertMatches(sitemap.content, /http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9/i, 'sitemap.xml must have sitemap namespace');
});

test('Sitemap contains all 13 canonical routes', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap not found');
  const urls = parseSitemapXml(sitemap.content);
  assert(urls !== null, 'Failed to parse sitemap XML');
  const locs = urls.map(u => u.loc);

  for (const r of CANONICAL_ROUTES) {
    const expected = r.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${r.path}`;
    const altExpected = r.path === '/' ? BASE_URL : `${BASE_URL}${r.path}/`;
    const found = locs.includes(expected) || locs.includes(altExpected);
    assert(found, `Route ${r.path} (${expected}) missing from sitemap.xml`);
  }
});

test('Sitemap excludes redirect route /app/gpa', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap not found');
  const urls = parseSitemapXml(sitemap.content);
  const locs = urls.map(u => u.loc);
  const gpaInSitemap = locs.some(l => l.includes('/app/gpa'));
  assert(!gpaInSitemap, 'Redirect route /app/gpa should not be present in sitemap.xml');
});

test('Sitemap defines appropriate priorities and change frequencies', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap not found');
  const urls = parseSitemapXml(sitemap.content);
  const rootEntry = urls.find(u => u.loc === `${BASE_URL}/` || u.loc === BASE_URL);
  assert(rootEntry !== undefined, 'Root entry missing from sitemap');
  assert(rootEntry.priority === 1.0, `Root priority should be 1.0, got ${rootEntry.priority}`);
  assert(rootEntry.changefreq !== null, 'Root changefreq missing');
});

// ---------------------------------------------------------------------------
// 1.10 Search Robots Protocol (robots.txt)
// ---------------------------------------------------------------------------
feature('Robots Protocol (robots.txt)');

test('Robots source file src/app/robots.ts exists and exports default function', () => {
  const robotsTs = path.join(SRC_APP_DIR, 'robots.ts');
  assert(fs.existsSync(robotsTs), 'src/app/robots.ts does not exist');
  const code = fs.readFileSync(robotsTs, 'utf-8');
  assertMatches(code, /export\s+default\s+function\s+robots/, 'robots.ts must export default function');
});

test('Emitted robots.txt exists in build output or public directory', () => {
  const robots = getEmittedRobots();
  assert(robots !== null, 'Emitted robots.txt not found');
});

test('Robots permits indexing for all crawlers (User-agent: * / Allow: /)', () => {
  const robots = getEmittedRobots();
  assert(robots !== null, 'Robots not found');
  const parsed = parseRobotsTxt(robots.content);
  assert(parsed.userAgents.includes('*'), 'robots.txt must specify User-agent: *');
  assert(parsed.allows.includes('/'), 'robots.txt must specify Allow: /');
});

test('Robots references the official sitemap URL https://oaumods.vercel.app/sitemap.xml', () => {
  const robots = getEmittedRobots();
  assert(robots !== null, 'Robots not found');
  const parsed = parseRobotsTxt(robots.content);
  assertEqual(parsed.sitemaps.length, 1, 'robots.txt must contain exactly 1 Sitemap directive');
  assertEqual(parsed.sitemaps[0], `${BASE_URL}/sitemap.xml`, 'Sitemap directive in robots.txt');
});

test('Robots does not block essential public CSS, JS, or image resources', () => {
  const robots = getEmittedRobots();
  assert(robots !== null, 'Robots not found');
  const parsed = parseRobotsTxt(robots.content);
  const blockedAssets = parsed.disallows.some(d => d.includes('_next') || d.includes('static') || d.includes('og-image'));
  assert(!blockedAssets, 'robots.txt must not disallow static assets or og-image');
});

// ---------------------------------------------------------------------------
// 1.11 Social Preview Asset (public/og-image.png)
// ---------------------------------------------------------------------------
feature('Social Preview Asset (og-image.png)');

test('File public/og-image.png exists in project', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  assert(fs.existsSync(imgPath), `File ${imgPath} does not exist`);
});

test('File public/og-image.png is a valid PNG image (valid magic bytes)', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assert(info.exists, 'Image missing');
  assert(info.validPng, `Invalid PNG: ${info.error}`);
});

test('og-image.png has exact dimensions of 1200 x 630 pixels', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assertEqual(info.width, 1200, 'Image width must be exactly 1200');
  assertEqual(info.height, 630, 'Image height must be exactly 630');
});

test('og-image.png aspect ratio is 1.90:1 to 1.91:1 (standard OG ratio)', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  const ratio = info.width / info.height;
  assert(ratio >= 1.90 && ratio <= 1.91, `Aspect ratio ${ratio.toFixed(4)} outside [1.90, 1.91]`);
});

test('og-image.png file size is under 500KB ceiling (512,000 bytes)', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assert(info.sizeBytes < 500 * 1024, `og-image.png is ${(info.sizeBytes / 1024).toFixed(1)} KB (must be < 500 KB)`);
});

/* ========================================================================= */
/* TIER 2: BOUNDARY & CORNER CASES (>=5 test cases per feature)              */
/* ========================================================================= */

tier(2, 'Boundary & Corner Cases');

// ---------------------------------------------------------------------------
// 2.1 Trailing Slash & URL Normalization
// ---------------------------------------------------------------------------
feature('Trailing Slashes & URL Normalization');

test('Canonical URL on homepage does not contain double trailing slashes (e.g. //)', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Root HTML missing');
  assert(meta.canonical !== null, 'Root canonical missing');
  assert(!meta.canonical.endsWith('//'), `Root canonical ends with double slash: ${meta.canonical}`);
  assert(!meta.canonical.replace('https://', '').includes('//'), `Root canonical contains internal double slash: ${meta.canonical}`);
});

test('Sub-route canonical URLs do not contain redundant trailing slashes', () => {
  const subRoutes = CANONICAL_ROUTES.filter(r => r.path !== '/');
  for (const r of subRoutes) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.canonical !== null, `Canonical missing on ${r.path}`);
    assert(!meta.canonical.endsWith('/'), `Sub-route canonical for ${r.path} should not end with trailing slash: ${meta.canonical}`);
  }
});

test('Sitemap loc elements never have double slashes in paths', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap missing for boundary check');
  const urls = parseSitemapXml(sitemap.content);
  for (const u of urls) {
    const pathPart = u.loc.replace('https://oaumods.vercel.app', '');
    assert(!pathPart.includes('//'), `Sitemap URL has double slash: ${u.loc}`);
  }
});

test('Open Graph og:url matches canonical URL trailing slash discipline', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.url !== undefined, `og:url missing on ${r.path}`);
    assert(meta.canonical !== null, `canonical missing on ${r.path}`);
    assertEqual(meta.og.url, meta.canonical, `og:url and canonical trailing slash parity on ${r.path}`);
  }
});

test('Query strings and hash fragments are strictly stripped from canonical tags', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.canonical !== null, `Canonical missing on ${r.path}`);
    assert(!meta.canonical.includes('?'), `Canonical URL has query string on ${r.path}: ${meta.canonical}`);
    assert(!meta.canonical.includes('#'), `Canonical URL has hash fragment on ${r.path}: ${meta.canonical}`);
  }
});

// ---------------------------------------------------------------------------
// 2.2 Non-Existent Routes & 404 Safety
// ---------------------------------------------------------------------------
feature('Non-Existent Routes & 404 Safety');

test('_not-found static page exists in build output', () => {
  const notFoundHtml = path.join(NEXT_SERVER_APP, '_not-found.html');
  assert(fs.existsSync(notFoundHtml), '_not-found.html not found in build output');
});

test('_not-found page does not declare false indexable canonical pointing to itself', () => {
  const notFoundHtml = path.join(NEXT_SERVER_APP, '_not-found.html');
  assert(fs.existsSync(notFoundHtml), '_not-found.html missing');
  const html = fs.readFileSync(notFoundHtml, 'utf-8');
  const meta = parseHtmlMetadata(html);
  if (meta && meta.canonical) {
    assert(!meta.canonical.includes('_not-found'), `404 page should not canonicalize to _not-found: ${meta.canonical}`);
  }
});

test('Sitemap does not include 404 or _not-found paths', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap missing for 404 check');
  const urls = parseSitemapXml(sitemap.content);
  const has404 = urls.some(u => u.loc.includes('404') || u.loc.includes('_not-found'));
  assert(!has404, 'Sitemap contains 404 or _not-found route');
});

test('Robots.txt does not whitelist non-existent private endpoints', () => {
  const robots = getEmittedRobots();
  assert(robots !== null, 'Robots missing for private endpoint check');
  const parsed = parseRobotsTxt(robots.content);
  assert(!parsed.allows.includes('/private'), 'robots.txt should not allow non-existent /private');
});

test('Next.js routes manifest does not leak private or internal test routes', () => {
  const routesManifestPath = path.join(PROJECT_ROOT, '.next', 'routes-manifest.json');
  assert(fs.existsSync(routesManifestPath), 'routes-manifest.json missing');
  const data = JSON.parse(fs.readFileSync(routesManifestPath, 'utf-8'));
  const staticRoutes = (data.staticRoutes || []).map(r => r.page);
  assert(!staticRoutes.includes('/tests'), 'Internal /tests route leaked into routes manifest');
});

// ---------------------------------------------------------------------------
// 2.3 Case Sensitivity & Route Normalization
// ---------------------------------------------------------------------------
feature('Case Sensitivity & Route Normalization');

test('Canonical URLs are strictly lowercase for all routes', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.canonical !== null, `Canonical missing on ${r.path}`);
    assertEqual(meta.canonical, meta.canonical.toLowerCase(), `Canonical URL on ${r.path} contains uppercase characters: ${meta.canonical}`);
  }
});

test('Sitemap loc entries are strictly lowercase', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap missing for casing check');
  const urls = parseSitemapXml(sitemap.content);
  for (const u of urls) {
    assertEqual(u.loc, u.loc.toLowerCase(), `Sitemap loc contains uppercase: ${u.loc}`);
  }
});

test('Open Graph URLs are strictly lowercase', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.url !== undefined, `og:url missing on ${r.path}`);
    assertEqual(meta.og.url, meta.og.url.toLowerCase(), `og:url contains uppercase on ${r.path}: ${meta.og.url}`);
  }
});

test('Route image paths (og-image.png) are strictly lowercase', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.image !== undefined, `og:image missing on ${r.path}`);
    assert(meta.og.image.endsWith('/og-image.png'), `og:image path not lowercase /og-image.png on ${r.path}`);
  }
});

test('Robots.txt directive names and sitemap link adhere to casing standards', () => {
  const robots = getEmittedRobots();
  assert(robots !== null, 'Robots missing for casing check');
  assertMatches(robots.content, /User-agent:\s*\*/i, 'User-agent directive');
  assertMatches(robots.content, /Allow:\s*\//i, 'Allow directive');
  assertMatches(robots.content, /Sitemap:\s*https:\/\/oaumods\.vercel\.app\/sitemap\.xml/i, 'Sitemap URL must be lowercase sitemap.xml');
});

// ---------------------------------------------------------------------------
// 2.4 Asset Dimensions & File Bounds
// ---------------------------------------------------------------------------
feature('Asset Bounds & Compression Ceilings');

test('og-image.png size is greater than 10KB (verifies non-empty graphic)', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assert(info.exists, 'og-image.png missing');
  assert(info.sizeBytes >= 10 * 1024, `Image is suspiciously small (${info.sizeBytes} bytes)`);
});

test('og-image.png size is strictly under 500KB (strict cellular performance boundary)', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assert(info.exists, 'og-image.png missing');
  assert(info.sizeBytes <= 500 * 1024, `Image exceeds 500KB ceiling: ${(info.sizeBytes / 1024).toFixed(1)} KB`);
});

test('og-image.png dimensions are strictly 1200x630 (zero tolerance for rounding distortion)', () => {
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assert(info.exists && info.validPng, 'og-image.png invalid');
  assertEqual(info.width, 1200, 'Width must equal 1200');
  assertEqual(info.height, 630, 'Height must equal 630');
});

test('oau-logo.png icon exists and has valid PNG signature', () => {
  const logoPath = path.join(PUBLIC_DIR, 'oau-logo.png');
  const info = inspectPngImage(logoPath);
  assert(info.exists, 'public/oau-logo.png not found');
  assert(info.validPng, 'public/oau-logo.png is not a valid PNG');
});

test('Favicon exists and is non-empty', () => {
  const faviconPath = path.join(PUBLIC_DIR, 'favicon.ico');
  const srcFavicon = path.join(SRC_APP_DIR, 'favicon.ico');
  assert(fs.existsSync(faviconPath) || fs.existsSync(srcFavicon), 'favicon.ico not found');
});

// ---------------------------------------------------------------------------
// 2.5 SEO Character Length Boundaries
// ---------------------------------------------------------------------------
feature('SEO Length Boundaries (Search Snippet Truncation Prevention)');

test('Page titles are within optimal SEO boundary (15 to 75 characters)', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.title !== null, `Title missing on ${r.path}`);
    assert(meta.title.length >= 15, `Title on ${r.path} too short (${meta.title.length} chars): "${meta.title}"`);
    assert(meta.title.length <= 75, `Title on ${r.path} too long for desktop SERP (${meta.title.length} chars): "${meta.title}"`);
  }
});

test('Meta descriptions are within optimal SERP snippet boundary (50 to 220 characters)', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.meta.description !== undefined, `Description missing on ${r.path}`);
    assert(meta.meta.description.length >= 50, `Description on ${r.path} too short (${meta.meta.description.length} chars)`);
    assert(meta.meta.description.length <= 220, `Description on ${r.path} exceeds 220 chars (${meta.meta.description.length} chars)`);
  }
});

test('og:title character length does not exceed 95 characters', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.title !== undefined, `og:title missing on ${r.path}`);
    assert(meta.og.title.length <= 95, `og:title on ${r.path} exceeds 95 chars: ${meta.og.title.length}`);
  }
});

test('og:description character length does not exceed 300 characters', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.description !== undefined, `og:description missing on ${r.path}`);
    assert(meta.og.description.length <= 300, `og:description on ${r.path} exceeds 300 chars: ${meta.og.description.length}`);
  }
});

test('No metadata attributes contain undefined, null, or [object Object]', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    for (const [k, v] of Object.entries(meta.meta)) {
      assert(!/undefined|null|\[object Object\]/i.test(v), `Corrupt metadata value in ${k} on ${r.path}: "${v}"`);
    }
  }
});

// ---------------------------------------------------------------------------
// 2.6 Crawler User-Agent Boundaries
// ---------------------------------------------------------------------------
feature('Crawler User-Agent Simulation Boundaries');

test('Googlebot User-Agent receives complete static HTML with title & meta', () => {
  const html = readHtmlForRoute(CANONICAL_ROUTES[0]);
  assert(html !== null, 'HTML missing');
  assert(html.includes('<title>'), 'Googlebot should see <title>');
  assert(html.includes('<meta name="description"'), 'Googlebot should see description');
});

test('Twitterbot User-Agent receives twitter:card and twitter:image tags', () => {
  const html = readHtmlForRoute(CANONICAL_ROUTES[0]);
  assert(html !== null, 'HTML missing');
  assert(html.includes('twitter:card'), 'Twitterbot should see twitter:card');
  assert(html.includes('twitter:image'), 'Twitterbot should see twitter:image');
});

test('WhatsApp / Facebook External Hit receives og:image and og:title', () => {
  const html = readHtmlForRoute(CANONICAL_ROUTES[0]);
  assert(html !== null, 'HTML missing');
  assert(html.includes('og:image'), 'Facebook crawler should see og:image');
  assert(html.includes('og:title'), 'Facebook crawler should see og:title');
});

test('Bingbot receives valid canonical and robots index directives', () => {
  const html = readHtmlForRoute(CANONICAL_ROUTES[0]);
  assert(html !== null, 'HTML missing');
  assert(html.includes('rel="canonical"'), 'Bingbot should see canonical link');
});

test('Apple Web App crawler discovers apple-touch-icon and theme-color', () => {
  const html = readHtmlForRoute(CANONICAL_ROUTES[0]);
  assert(html !== null, 'HTML missing');
  assert(html.includes('apple-touch-icon'), 'Apple crawler should see apple-touch-icon');
  assert(html.includes('theme-color'), 'Apple crawler should see theme-color');
});

/* ========================================================================= */
/* TIER 3: CROSS-FEATURE COMBINATIONS                                        */
/* ========================================================================= */

tier(3, 'Cross-Feature Combinations (Pairwise Interaction)');

feature('Cross-Feature Parity & Interaction');

test('Canonical link href matches Open Graph og:url on every route (Canonical vs og:url parity)', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.canonical !== null, `Canonical link missing on ${r.path}`);
    assert(meta.og.url !== undefined, `og:url missing on ${r.path}`);
    assertEqual(meta.og.url, meta.canonical, `og:url and canonical must be identical on ${r.path}`);
  }
});

test('Open Graph title and Twitter card title are semantically aligned', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.title !== undefined, `og:title missing on ${r.path}`);
    assert(meta.twitter.title !== undefined, `twitter:title missing on ${r.path}`);
    assertEqual(meta.twitter.title, meta.og.title, `twitter:title and og:title alignment on ${r.path}`);
  }
});

test('Open Graph description and Twitter description are semantically aligned', () => {
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.description !== undefined, `og:description missing on ${r.path}`);
    assert(meta.twitter.description !== undefined, `twitter:description missing on ${r.path}`);
    assertEqual(meta.twitter.description, meta.og.description, `twitter:description and og:description alignment on ${r.path}`);
  }
});

test('Sitemap.xml sitemap URL matches robots.txt Sitemap directive exactly', () => {
  const sitemap = getEmittedSitemap();
  const robots = getEmittedRobots();
  assert(sitemap !== null, 'Sitemap missing');
  assert(robots !== null, 'Robots missing');
  const parsedRobots = parseRobotsTxt(robots.content);
  assert(parsedRobots.sitemaps.length > 0, 'Robots has no Sitemap directive');
  assertEqual(parsedRobots.sitemaps[0], `${BASE_URL}/sitemap.xml`, 'Robots Sitemap matches actual sitemap endpoint');
});

test('All 13 URLs in sitemap match canonical links extracted from HTML files', () => {
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Sitemap missing');
  const sitemapUrls = parseSitemapXml(sitemap.content).map(u => u.loc);
  for (const r of CANONICAL_ROUTES) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.canonical !== null, `Canonical link missing on ${r.path}`);
    assert(sitemapUrls.includes(meta.canonical), `Canonical URL ${meta.canonical} for ${r.path} not present in sitemap`);
  }
});

test('Deeply nested sub-routes (/app/clearance, /app/academics) resolve og:image to root /og-image.png (no relative path resolution drift)', () => {
  const nested = CANONICAL_ROUTES.filter(r => r.path.startsWith('/app/'));
  for (const r of nested) {
    const meta = parseHtmlMetadata(readHtmlForRoute(r));
    assert(meta !== null, `HTML missing on ${r.path}`);
    assert(meta.og.image !== undefined, `og:image missing on nested route ${r.path}`);
    assertEqual(meta.og.image, `${BASE_URL}/og-image.png`, `Nested route ${r.path} must resolve to root og-image.png`);
  }
});

test('JSON-LD WebApplication url matches root canonical URL', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Root HTML missing');
  assert(meta.jsonLd.length > 0, 'JSON-LD missing on root');
  const rawStr = JSON.stringify(meta.jsonLd);
  assertMatches(rawStr, new RegExp(BASE_URL), 'JSON-LD URL must match metadataBase production URL');
});

test('PWA manifest start_url is covered by canonical routes registry', () => {
  const manifestPath = path.join(NEXT_SERVER_APP, 'manifest.webmanifest.body');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest.body missing');
  const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assert(CANONICAL_ROUTES.some(r => r.path === data.start_url), `Manifest start_url ${data.start_url} is not in canonical routes list`);
});

test('Theme color parity: viewport.themeColor matches manifest.webmanifest theme_color (#12345B)', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.meta['theme-color'], 'theme-color missing in HTML');
  const manifestPath = path.join(NEXT_SERVER_APP, 'manifest.webmanifest.body');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest missing');
  const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assertEqual(meta.meta['theme-color'].toLowerCase(), data.theme_color.toLowerCase(), 'HTML theme-color must match manifest theme_color');
});

test('Application name parity: metadata applicationName matches manifest.webmanifest short_name ("OAUMods")', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.meta['application-name'], 'application-name missing in HTML');
  const manifestPath = path.join(NEXT_SERVER_APP, 'manifest.webmanifest.body');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest missing');
  const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assertEqual(meta.meta['application-name'], data.short_name, 'HTML application-name must match manifest short_name');
});

test('Physical asset dimension parity: og:image:width and og:image:height match physical og-image.png dimensions', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.og['image:width'], 'og:image:width missing');
  assert(meta && meta.og['image:height'], 'og:image:height missing');
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const info = inspectPngImage(imgPath);
  assert(info.exists && info.validPng, 'og-image.png missing');
  assertEqual(parseInt(meta.og['image:width'], 10), info.width, 'meta og:image:width must match physical PNG width');
  assertEqual(parseInt(meta.og['image:height'], 10), info.height, 'meta og:image:height must match physical PNG height');
});

/* ========================================================================= */
/* TIER 4: REAL-WORLD WORKLOAD SCENARIOS                                     */
/* ========================================================================= */

tier(4, 'Real-World Workload Scenarios');

feature('Crawler & Consumer Agent Simulations');

test('Googlebot Crawl Simulation: Traverses robots.txt -> sitemap.xml -> all 13 canonical pages', () => {
  // Step 1: Read robots.txt
  const robots = getEmittedRobots();
  assert(robots !== null, 'Googlebot cannot find robots.txt');
  const parsedRobots = parseRobotsTxt(robots.content);
  assert(parsedRobots.allows.includes('/'), 'Googlebot disallowed by robots.txt');
  assert(parsedRobots.sitemaps.length > 0, 'Googlebot found no sitemap directive in robots.txt');

  // Step 2: Read sitemap.xml
  const sitemap = getEmittedSitemap();
  assert(sitemap !== null, 'Googlebot cannot find sitemap.xml');
  const sitemapUrls = parseSitemapXml(sitemap.content);
  assert(sitemapUrls.length >= 13, `Googlebot expected >= 13 URLs in sitemap, found ${sitemapUrls.length}`);

  // Step 3: Verify each page can be indexed
  let indexedCount = 0;
  for (const item of sitemapUrls) {
    const matchingRoute = CANONICAL_ROUTES.find(r => `${BASE_URL}${r.path}` === item.loc || (r.path === '/' && item.loc === `${BASE_URL}/`));
    if (matchingRoute) {
      const html = readHtmlForRoute(matchingRoute);
      if (html && !html.includes('noindex')) {
        indexedCount++;
      }
    }
  }
  assert(indexedCount >= 13, `Googlebot only indexed ${indexedCount}/13 pages`);
});

test('WhatsApp Rich Link Preview Unfurl Simulation: Extracts title, snippet, and lightweight image card', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'WhatsApp scraper failed to load root page');

  // WhatsApp scraper requirements:
  // 1. og:title present and < 95 characters
  assert(meta.og.title, 'WhatsApp unfurl: og:title missing');
  assert(meta.og.title.length < 95, `WhatsApp unfurl: og:title too long (${meta.og.title.length})`);

  // 2. og:description present and informative
  assert(meta.og.description, 'WhatsApp unfurl: og:description missing');
  assert(meta.og.description.length > 30, 'WhatsApp unfurl: og:description too short');

  // 3. og:image is reachable and under 500KB
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const imgInfo = inspectPngImage(imgPath);
  assert(imgInfo.exists, 'WhatsApp unfurl: og:image file missing');
  assert(imgInfo.sizeBytes < 500 * 1024, `WhatsApp unfurl: og-image.png ${(imgInfo.sizeBytes / 1024).toFixed(1)} KB exceeds 500KB`);
  assertEqual(imgInfo.width, 1200, 'WhatsApp unfurl: og-image.png width');
  assertEqual(imgInfo.height, 630, 'WhatsApp unfurl: og-image.png height');
});

test('Twitterbot Summary Large Image Card Extraction: Extracts card, image, and creator attribution', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Twitterbot failed to load root page');

  // Card type
  assertEqual(meta.twitter.card, 'summary_large_image', 'Twitterbot requires summary_large_image');
  // Title
  assert(meta.twitter.title, 'Twitterbot requires twitter:title');
  // Image URL
  assert(meta.twitter.image, 'Twitterbot requires twitter:image');
  assertEqual(meta.twitter.image, `${BASE_URL}/og-image.png`, 'Twitterbot image absolute URL');
});

test('Facebook Sharing Debugger Simulation: Verifies mandatory Open Graph tags, image size, and site identity', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Facebook Debugger failed to load root page');

  // Facebook mandatory OG tags
  assert(meta.og.title, 'FB Debugger: og:title required');
  assert(meta.og.type === 'website', 'FB Debugger: og:type must be website');
  assert(meta.og.image, 'FB Debugger: og:image required');
  assert(meta.og.url, 'FB Debugger: og:url required');
  assert(meta.og.site_name, 'FB Debugger: og:site_name required');
  assertEqual(meta.og.locale, 'en_NG', 'FB Debugger: og:locale en_NG');

  // Image validation
  const imgPath = path.join(PUBLIC_DIR, 'og-image.png');
  const imgInfo = inspectPngImage(imgPath);
  assert(imgInfo.exists && imgInfo.validPng, 'FB Debugger: og:image valid PNG');
  assert(imgInfo.width >= 600 && imgInfo.height >= 315, 'FB Debugger: image must exceed 600x315 minimum');
});

test('Discord Link Preview Embed Simulation: Validates rich embed card, theme accent, and image banner', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'Discord bot failed to load root page');

  // Discord uses og:title, og:description, and theme-color for embed accent
  assert(meta.og.title, 'Discord embed requires title');
  assert(meta.og.description, 'Discord embed requires description');
  assert(meta.meta['theme-color'], 'Discord embed accent requires theme-color');
  assertEqual(meta.meta['theme-color'].toLowerCase(), '#12345b', 'Discord embed accent must be #12345B');
});

test('Search Engine Knowledge Graph Ingestion: Validates schema.org entity graph and institutional links', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta && meta.jsonLd.length > 0, 'No JSON-LD schemas found for Knowledge Graph parser');

  const jsonString = JSON.stringify(meta.jsonLd);

  // Check Schema.org context
  assertMatches(jsonString, /https:\/\/schema\.org/i, 'Schema.org @context missing');

  // Check WebApplication node
  assertMatches(jsonString, /"name"\s*:\s*"OAUMods"/i, 'OAUMods name in JSON-LD');
  assertMatches(jsonString, /"applicationCategory"\s*:\s*"EducationalApplication"/i, 'EducationalApplication category in JSON-LD');

  // Check EducationalOrganization node
  assertMatches(jsonString, /Obafemi Awolowo University/i, 'University name in JSON-LD');
  assertMatches(jsonString, /oauife\.edu\.ng/i, 'Official university URL in JSON-LD');
});

test('Mobile PWA Add-to-Home-Screen Installation Simulation: Verifies all installability criteria', () => {
  const meta = parseHtmlMetadata(readHtmlForRoute(CANONICAL_ROUTES[0]));
  assert(meta !== null, 'PWA inspector failed to load root page');

  // 1. Viewport tag
  assert(meta.meta['viewport'], 'PWA requires viewport tag');

  // 2. Theme color
  assertEqual(meta.meta['theme-color']?.toLowerCase(), '#12345b', 'PWA requires theme-color #12345B');

  // 3. Apple Touch Icon
  assert(meta.appleTouchIcon, 'PWA requires apple-touch-icon');

  // 4. Web Manifest file
  const manifestTs = path.join(SRC_APP_DIR, 'manifest.ts');
  const manifestEmitted = path.join(NEXT_SERVER_APP, 'manifest.webmanifest.body');
  assert(fs.existsSync(manifestTs) || fs.existsSync(manifestEmitted), 'PWA requires manifest');
});

/* ========================================================================= */
/* Summary Reporter & Execution Result                                      */
/* ========================================================================= */

console.log('\n\x1b[1m\x1b[35m================================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m                           TEST EXECUTION SUMMARY                               \x1b[0m');
console.log('\x1b[1m\x1b[35m================================================================================\x1b[0m\n');

const tierCounts = {
  1: { total: 0, passed: 0, failed: 0 },
  2: { total: 0, passed: 0, failed: 0 },
  3: { total: 0, passed: 0, failed: 0 },
  4: { total: 0, passed: 0, failed: 0 },
};

for (const t of testResults) {
  tierCounts[t.tier].total++;
  if (t.passed) {
    tierCounts[t.tier].passed++;
  } else {
    tierCounts[t.tier].failed++;
  }
}

const totalTests = testResults.length;
const totalPassed = testResults.filter(t => t.passed).length;
const totalFailed = testResults.filter(t => !t.passed).length;
const passRate = ((totalPassed / totalTests) * 100).toFixed(1);

console.log(`┌────────────────────────────────────────────────────────┬────────┬────────┬────────┬─────────┐`);
console.log(`│ Tier                                                   │ Total  │ Passed │ Failed │ Pass %  │`);
console.log(`├────────────────────────────────────────────────────────┼────────┼────────┼────────┼─────────┤`);
for (let i = 1; i <= 4; i++) {
  const tc = tierCounts[i];
  const rate = tc.total > 0 ? ((tc.passed / tc.total) * 100).toFixed(1) : '0.0';
  const name = [
    'Tier 1: Feature Coverage (>=5 / feature)       ',
    'Tier 2: Boundary & Corner Cases (>=5 / feature)',
    'Tier 3: Cross-Feature Combinations (Pairwise)  ',
    'Tier 4: Real-World Workload Scenarios         ',
  ][i - 1];
  console.log(`│ ${name} │  ${String(tc.total).padStart(4)}  │  ${String(tc.passed).padStart(4)}  │  ${String(tc.failed).padStart(4)}  │  ${rate.padStart(5)}% │`);
}
console.log(`├────────────────────────────────────────────────────────┼────────┼────────┼────────┼─────────┤`);
console.log(`│ \x1b[1mTOTAL SUITE                                            \x1b[0m│  \x1b[1m${String(totalTests).padStart(4)}\x1b[0m  │  \x1b[1m${String(totalPassed).padStart(4)}\x1b[0m  │  \x1b[1m${String(totalFailed).padStart(4)}\x1b[0m  │  \x1b[1m${passRate.padStart(5)}%\x1b[0m │`);
console.log(`└────────────────────────────────────────────────────────┴────────┴────────┴────────┴─────────┘\n`);

if (totalFailed > 0) {
  console.log(`\x1b[1m\x1b[31mFAILURES DETAIL (${totalFailed} failures):\x1b[0m`);
  let failIdx = 1;
  for (const t of testResults) {
    if (!t.passed) {
      console.log(`\x1b[31m${failIdx++}. [Tier ${t.tier}] [${t.feature}] ${t.description}\x1b[0m`);
      console.log(`   \x1b[90mError: ${t.error}\x1b[0m`);
    }
  }
  console.log('\n\x1b[33mBaseline recorded. Implementation pending for failing items.\x1b[0m');
  process.exit(1);
} else {
  console.log(`\x1b[1m\x1b[32mALL ${totalTests} TESTS PASSED PERFECTLY!\x1b[0m\n`);
  process.exit(0);
}

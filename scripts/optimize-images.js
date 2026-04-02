#!/usr/bin/env node

/**
 * PNG optimizer for mobile assets.
 * Uses `sharp` to resize and compress PNG files under src/assets/images/.
 *
 * Usage:
 *   node scripts/optimize-images.js [options]
 *
 * Options:
 *   --dry-run        Print what would change without writing files
 *   --max-width N    Max width in px (default: 1080)
 *   --quality N      PNG compression level 1-9 (default: 9, max compression)
 *   --path <glob>    Target a specific file or directory instead of all assets
 */

const path = require('path');
const fs = require('fs');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error(
    'sharp is not installed. Run: yarn add --dev sharp\n' +
      '(or: npm install --save-dev sharp)'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ASSETS_DIR = path.resolve(__dirname, '../src/assets/images');

const DEFAULTS = {
  maxWidth: 1080, // most mobile screens are ≤ 1080 px wide; retina already handled by @2x/@3x
  quality: 9, // zlib compression level (1 = fast/large, 9 = slow/small)
  dryRun: false,
};

// Files that should never be resized (icons rely on specific px dimensions)
const NO_RESIZE_PATTERNS = [/adaptive-icon/, /favicon/, /splash/, /icon\.png$/];

// ---------------------------------------------------------------------------
// Arg parsing (no external deps)
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { ...DEFAULTS, targetPath: null };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--max-width') opts.maxWidth = Number(args[++i]);
    else if (a === '--quality') opts.quality = Number(args[++i]);
    else if (a === '--path') opts.targetPath = path.resolve(args[++i]);
  }

  return opts;
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function collectPngs(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectPngs(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
      results.push(full);
  }
  return results;
}

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

function shouldResize(filePath) {
  return !NO_RESIZE_PATTERNS.some(re => re.test(filePath));
}

function formatBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 ** 2) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 ** 2).toFixed(2)} MB`;
}

async function optimizeFile(filePath, opts) {
  const originalSize = fs.statSync(filePath).size;
  const resize = shouldResize(filePath);

  let pipeline = sharp(filePath);

  if (resize) {
    const meta = await pipeline.metadata();
    if (meta.width > opts.maxWidth) {
      pipeline = pipeline.resize({
        width: opts.maxWidth,
        withoutEnlargement: true,
      });
    }
  }

  pipeline = pipeline.png({
    compressionLevel: opts.quality,
    adaptiveFiltering: true,
  });

  if (opts.dryRun) {
    const { data } = await pipeline.toBuffer({ resolveWithObject: true });
    const saving = originalSize - data.length;
    const pct = ((saving / originalSize) * 100).toFixed(1);
    const label = resize ? '' : ' [no-resize]';
    console.log(
      `[dry-run]${label} ${path.relative(process.cwd(), filePath)}\n` +
        `         ${formatBytes(originalSize)} → ${formatBytes(data.length)} (${pct}% saved)`
    );
    return { saved: saving };
  }

  const tmpPath = filePath + '.tmp';
  await pipeline.toFile(tmpPath);

  const newSize = fs.statSync(tmpPath).size;

  if (newSize >= originalSize) {
    fs.unlinkSync(tmpPath);
    const label = resize ? '' : ' [no-resize]';
    console.log(
      `[skip]${label} ${path.relative(process.cwd(), filePath)} — already optimal`
    );
    return { saved: 0 };
  }

  fs.renameSync(tmpPath, filePath);
  const saving = originalSize - newSize;
  const pct = ((saving / originalSize) * 100).toFixed(1);
  const label = resize ? '' : ' [no-resize]';
  console.log(
    `[ok]${label} ${path.relative(process.cwd(), filePath)}\n` +
      `     ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${pct}% saved)`
  );
  return { saved: saving };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs();

  let files;
  if (opts.targetPath) {
    const stat = fs.statSync(opts.targetPath);
    files = stat.isDirectory()
      ? collectPngs(opts.targetPath)
      : [opts.targetPath];
  } else {
    files = collectPngs(ASSETS_DIR);
  }

  if (files.length === 0) {
    console.log('No PNG files found.');
    return;
  }

  console.log(
    `Optimizing ${files.length} PNG(s) — maxWidth=${opts.maxWidth}px, quality=${opts.quality}${opts.dryRun ? ' [DRY RUN]' : ''}\n`
  );

  let totalSaved = 0;
  for (const file of files) {
    const { saved } = await optimizeFile(file, opts);
    totalSaved += saved;
  }

  console.log(`\nDone. Total saved: ${formatBytes(totalSaved)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

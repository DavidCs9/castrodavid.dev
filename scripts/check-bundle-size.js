#!/usr/bin/env node
/**
 * Bundle Size Checker Script
 *
 * This script checks the bundle size of built files and ensures they stay
 * within defined limits. It generates a report and can fail CI builds if
 * size limits are exceeded.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSync } from 'zlib';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KB = 1024;
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

/**
 * Parse size string (e.g., "150kb", "1.5mb") to bytes
 */
function parseSizeToBytes(sizeStr) {
  const match = sizeStr.toLowerCase().match(/^(\d+(?:\.\d+)?)(kb|mb|gb)?$/);
  if (!match) {
    throw new Error(`Invalid size format: ${sizeStr}`);
  }

  const value = parseFloat(match[1]);
  const unit = match[2] || 'b';

  const multipliers = {
    b: 1,
    kb: KB,
    mb: KB * KB,
    gb: KB * KB * KB,
  };

  return value * multipliers[unit];
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(KB));
  const value = bytes / Math.pow(KB, i);

  return `${value.toFixed(2)} ${units[i]}`;
}

/**
 * Get file size with optional compression
 */
function getFileSize(filePath, compression = 'none') {
  const content = fs.readFileSync(filePath);

  if (compression === 'gzip') {
    return gzipSync(content).length;
  }

  return content.length;
}

/**
 * Calculate percentage difference
 */
function getPercentage(current, max) {
  return ((current / max) * 100).toFixed(1);
}

/**
 * Get color based on percentage
 */
function getColor(percentage) {
  if (percentage >= 100) return RED;
  if (percentage >= 80) return YELLOW;
  return GREEN;
}

/**
 * Main function to check bundle sizes
 */
function checkBundleSizes() {
  const configPath = path.join(__dirname, '..', '.bundlesize.json');

  if (!fs.existsSync(configPath)) {
    console.error(`${RED}Error: .bundlesize.json not found${RESET}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const distPath = path.join(__dirname, '..', 'dist');

  if (!fs.existsSync(distPath)) {
    console.error(
      `${RED}Error: dist folder not found. Run 'pnpm build' first.${RESET}`
    );
    process.exit(1);
  }

  console.log(
    `${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`
  );
  console.log(`${BLUE}  📦 Bundle Size Report${RESET}`);
  console.log(
    `${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`
  );

  let allPassed = true;
  const results = [];

  for (const fileConfig of config.files) {
    const pattern = path.join(__dirname, '..', fileConfig.path);
    const files = globSync(pattern);

    if (files.length === 0) {
      console.log(
        `${YELLOW}⚠ No files found matching: ${fileConfig.path}${RESET}\n`
      );
      continue;
    }

    const maxSize = parseSizeToBytes(fileConfig.maxSize);
    const compression = fileConfig.compression || 'none';

    for (const file of files) {
      const relativePath = path.relative(path.join(__dirname, '..'), file);
      const size = getFileSize(file, compression);
      const percentage = parseFloat(getPercentage(size, maxSize));
      const passed = size <= maxSize;

      if (!passed) allPassed = false;

      const color = getColor(percentage);
      const status = passed ? `${GREEN}✓ PASS${RESET}` : `${RED}✗ FAIL${RESET}`;

      const compressionLabel = compression === 'gzip' ? ' (gzipped)' : '';

      console.log(`${status}  ${relativePath}`);
      console.log(
        `     Size: ${color}${formatBytes(size)}${compressionLabel}${RESET} / ${formatBytes(maxSize)} (${color}${percentage}%${RESET})`
      );
      console.log();

      results.push({
        path: relativePath,
        size,
        maxSize,
        percentage,
        passed,
        compression,
      });
    }
  }

  // Summary
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  console.log(
    `${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`
  );
  console.log(`${BLUE}  Summary${RESET}`);
  console.log(
    `${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`
  );
  console.log(`  Total files checked: ${total}`);
  console.log(`  ${GREEN}Passed: ${passed}${RESET}`);
  console.log(`  ${failed > 0 ? RED : GREEN}Failed: ${failed}${RESET}\n`);

  if (!allPassed) {
    console.log(`${RED}❌ Bundle size check failed!${RESET}`);
    console.log(
      `${YELLOW}💡 Tip: Run 'pnpm build' and check dist/stats.html for a visual breakdown.${RESET}\n`
    );
    process.exit(1);
  }

  console.log(`${GREEN}✅ All bundle size checks passed!${RESET}\n`);

  // Save results for tracking
  const reportPath = path.join(
    __dirname,
    '..',
    'dist',
    'bundle-size-report.json'
  );
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        results,
        passed: allPassed,
      },
      null,
      2
    )
  );

  console.log(`📊 Detailed report saved to: dist/bundle-size-report.json`);
  console.log(`📈 Visual stats available at: dist/stats.html\n`);
}

// Run the check
try {
  checkBundleSizes();
} catch (error) {
  console.error(`${RED}Error: ${error.message}${RESET}`);
  process.exit(1);
}

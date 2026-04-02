#!/usr/bin/env node
/* global __dirname */

/**
 * Generates eas.json from environment variables.
 * Required env vars:
 *   EAS_OWNER, EAS_PROJECT_ID,
 *   APP_BASE_NAME, APP_BASE_SLUG, APP_BASE_BUNDLE_ID, APP_BASE_PACKAGE
 *
 * Optional:
 *   DEV_BUNDLE_ID_SUFFIX   (default: .dev)
 *   STAGE_BUNDLE_ID_SUFFIX (default: .staging)
 */

const required = [
  'EAS_OWNER',
  'EAS_PROJECT_ID',
  'APP_BASE_NAME',
  'APP_BASE_SLUG',
  'APP_BASE_BUNDLE_ID',
  'APP_BASE_PACKAGE',
];

const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const devSuffix = process.env.DEV_BUNDLE_ID_SUFFIX || '.dev';
const stageSuffix = process.env.STAGE_BUNDLE_ID_SUFFIX || '.staging';

const sharedAppEnv = {
  APP_BASE_NAME: process.env.APP_BASE_NAME,
  APP_BASE_SLUG: process.env.APP_BASE_SLUG,
  APP_BASE_BUNDLE_ID: process.env.APP_BASE_BUNDLE_ID,
  APP_BASE_PACKAGE: process.env.APP_BASE_PACKAGE,
  EAS_OWNER: process.env.EAS_OWNER,
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
};

const config = {
  cli: {
    version: '>= 16.28.0',
    appVersionSource: 'remote',
  },
  build: {
    development: {
      developmentClient: true,
      distribution: 'internal',
      channel: 'development',
      env: {
        ...sharedAppEnv,
        APP_BASE_BUNDLE_ID: `${process.env.APP_BASE_BUNDLE_ID}${devSuffix}`,
        APP_BASE_PACKAGE: `${process.env.APP_BASE_PACKAGE}${devSuffix}`,
        EXPO_PUBLIC_ENVIRONMENT: 'development',
      },
    },
    preview: {
      distribution: 'internal',
      channel: 'preview',
      env: {
        ...sharedAppEnv,
        APP_BASE_BUNDLE_ID: `${process.env.APP_BASE_BUNDLE_ID}${stageSuffix}`,
        APP_BASE_PACKAGE: `${process.env.APP_BASE_PACKAGE}${stageSuffix}`,
        EXPO_PUBLIC_ENVIRONMENT: 'staging',
      },
    },
    production: {
      autoIncrement: true,
      channel: 'production',
      env: {
        ...sharedAppEnv,
        EXPO_PUBLIC_ENVIRONMENT: 'production',
      },
    },
  },
  submit: {
    production: {},
  },
};

const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'eas.json');
fs.writeFileSync(outputPath, JSON.stringify(config, null, 2) + '\n');
console.log(
  `✓ eas.json generated for owner: ${process.env.EAS_OWNER}, project: ${process.env.EAS_PROJECT_ID}`
);

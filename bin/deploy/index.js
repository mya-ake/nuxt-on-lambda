const path = require('path');
require('dotenv').config();

const { deploy } = require('./../../scripts/deploy');
const nuxtConfig = require('./../../nuxt.config');

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, nuxtConfig.srcDir);
const NUXT_DIR = path.join(ROOT_DIR, '.nuxt');
const NUXT_CLIENT_DIR = path.join(NUXT_DIR, 'dist', 'client');
const NUXT_STATIC_DIR = path.join(SRC_DIR, 'static');
const NUXT_GENERATED_ERROR_PAGES_DIR = path.join(ROOT_DIR, 'dist');

const assetsDirs = [
  { pathname: NUXT_CLIENT_DIR, options: { prefix: '_nuxt' } },
  { pathname: NUXT_STATIC_DIR },
  {
    pathname: NUXT_GENERATED_ERROR_PAGES_DIR,
    options: {
      prefix: '_static_pages',
      includes: ['404.html', '**/403/index.html', '**/500/index.html'],
    },
  },
];
const s3Bucket = {
  name: process.env.S3_BUCKET_NAME,
  prefix: process.env.S3_BUCKET_PREFIX,
};
const cloudFrontId = process.env.CLOUDFRONT_ID;
const buildCommands = ['yarn build', 'yarn generate:error'];

deploy({ assetsDirs, s3Bucket, cloudFrontId, buildCommands });

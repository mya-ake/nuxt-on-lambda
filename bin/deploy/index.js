const path = require('path');
require('dotenv').config();

const { deploy } = require('./../../scripts/deploy');
const nuxtConfig = require('./../../nuxt.config');

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, nuxtConfig.srcDir);
const NUXT_DIR = path.join(ROOT_DIR, '.nuxt');
const NUXT_CLIENT_DIR = path.join(NUXT_DIR, 'dist', 'client');
const NUXT_STATIC_DIR = path.join(SRC_DIR, 'static');

const assetsDirs = [
  { pathname: NUXT_CLIENT_DIR, options: { prefix: '_nuxt' } },
  { pathname: NUXT_STATIC_DIR },
];
const s3Bucket = {
  name: process.env.S3_BUCKET_NAME,
  prefix: process.env.S3_BUCKET_PREFIX,
};
const cloudFrontId = process.env.CLOUDFRONT_ID;

deploy({ assetsDirs, s3Bucket, cloudFrontId });

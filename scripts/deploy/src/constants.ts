import { S3BucketMeta } from 'src/types'

export const S3_BUCKET_META: S3BucketMeta = Object.freeze({
  name: 'nuxt-on-lambda.mya-ake.org',
  prefix: '',
})

export const CONTENT_TYPES: { [key: string]: string } = Object.freeze({
  js: 'application/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  map: 'application/octet-stream; charset=utf-8',
  json: 'application/json; charset=utf-8',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  xml: 'application/xml; charset=utf-8',
  woff: 'application/font-woff',
  ttf: 'application/x-font-ttf',
  eot: 'application/vnd.ms-fontobject',
  plane: 'text/plain; charset=utf-8',
  webmanifest: 'application/json; charset=utf-8',
})

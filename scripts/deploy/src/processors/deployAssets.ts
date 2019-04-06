import { S3 } from 'aws-sdk'
import consola from 'consola'
import path from 'path'

import { putObject } from '../lib/s3'
import { readFile } from '../lib/file'
import { FileContext, S3BucketMeta } from 'src/types'

const buildKey = ({
  prefix = '',
  relativePathname,
}: {
  prefix?: string
  relativePathname: string
}) => {
  const key = path.join(prefix, relativePathname)
  return key.replace(/^\//, '')
}

const buildParams = async ({
  fileContext,
  s3BucketMeta,
}: {
  fileContext: FileContext
  s3BucketMeta: S3BucketMeta
}): Promise<S3.PutObjectRequest> => {
  const body = await readFile(fileContext.absolutePathname)
  return {
    Bucket: s3BucketMeta.name,
    Key: buildKey({
      prefix: s3BucketMeta.prefix,
      relativePathname: fileContext.relativePathname,
    }),
    Body: body,
    ContentType: fileContext.contentType,
  }
}

type deployAssets = (params: {
  fileContexts: FileContext[]
  s3BucketMeta: S3BucketMeta
}) => Promise<void>

export const deployAssets: deployAssets = async ({
  fileContexts,
  s3BucketMeta,
}) => {
  for (const fileContext of fileContexts) {
    const params = await buildParams({ fileContext, s3BucketMeta })
    await putObject(params)
    consola.info(`Deployed: ${fileContext.relativePathname}`)
  }
  return
}

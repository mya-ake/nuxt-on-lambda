import { S3 } from 'aws-sdk'
import consola from 'consola'
import path from 'path'

import { putObject } from '../lib/s3'
import { readFile } from '../lib/file'
import { FileContext, S3Bucket } from 'src/types'

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
  s3Bucket,
}: {
  fileContext: FileContext
  s3Bucket: S3Bucket
}): Promise<S3.PutObjectRequest> => {
  const body = await readFile(fileContext.absolutePathname)
  return {
    Bucket: s3Bucket.name,
    Key: buildKey({
      prefix: s3Bucket.prefix,
      relativePathname: fileContext.relativePathname,
    }),
    Body: body,
    ContentType: fileContext.contentType,
  }
}

type deployAssets = (params: {
  fileContexts: FileContext[]
  s3Bucket: S3Bucket
}) => Promise<void>

export const deployAssets: deployAssets = async ({
  fileContexts,
  s3Bucket,
}) => {
  for (const fileContext of fileContexts) {
    const params = await buildParams({ fileContext, s3Bucket })
    await putObject(params)
    consola.success(`Deployed: ${fileContext.relativePathname}`)
  }
  return
}

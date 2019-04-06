import { listObjects } from '../lib/s3'
import { S3BucketMeta, S3ObjectContext } from 'src/types'

const buildLastModified = (lastModified: Date | undefined): Date => {
  if (typeof lastModified === 'undefined') {
    return new Date(0)
  }
  return lastModified
}

type listS3Objects = (params: {
  s3BucketMeta: S3BucketMeta
}) => Promise<S3ObjectContext[]>

export const listS3Objects: listS3Objects = async ({ s3BucketMeta }) => {
  const objects = await listObjects({ Bucket: s3BucketMeta.name })
  return objects.map(({ Key, LastModified }) => ({
    key: Key || '',
    lastModified: buildLastModified(LastModified),
  }))
}

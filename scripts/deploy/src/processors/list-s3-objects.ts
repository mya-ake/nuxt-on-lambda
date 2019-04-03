import { S3_META } from '../constants'
import { listObjects } from '../lib/s3'

const buildLastModified = (lastModified: Date | undefined): Date => {
  if (typeof lastModified === 'undefined') {
    return new Date(0)
  }
  return lastModified
}

export const listS3Objects = async () => {
  const objects = await listObjects({ Bucket: S3_META.BUCKET.name })
  return objects.map(({ Key, LastModified }) => ({
    key: Key || '',
    lastModified: buildLastModified(LastModified),
  }))
}

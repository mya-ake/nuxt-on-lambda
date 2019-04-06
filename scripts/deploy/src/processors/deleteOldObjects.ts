import consola from 'consola'
import dayjs from 'dayjs'
import { listObjects, deleteObjects } from '../lib/s3'
import { S3BucketMeta, S3ObjectContext } from 'src/types'

const buildLastModified = (lastModified: Date | undefined): Date => {
  if (typeof lastModified === 'undefined') {
    return new Date(0)
  }
  return lastModified
}

const listS3Objects = async ({
  s3BucketMeta,
}: {
  s3BucketMeta: S3BucketMeta
}) => {
  const objects = await listObjects({ Bucket: s3BucketMeta.name })
  return objects.map(({ Key, LastModified }) => ({
    key: Key || '',
    lastModified: buildLastModified(LastModified),
  }))
}

const isObjectToDelete = (s3ObjectContext: S3ObjectContext) => {
  const { lastModified } = s3ObjectContext
  const currentDate = dayjs(new Date())
  const modifiedDate = dayjs(lastModified)
  return currentDate.diff(modifiedDate, 'day') > 7
}

const deleteS3Objects = async ({
  s3BucketMeta,
  objectsToDelete,
}: {
  s3BucketMeta: S3BucketMeta
  objectsToDelete: S3ObjectContext[]
}): Promise<void> => {
  const objects = objectsToDelete.map(({ key }) => ({ Key: key }))
  await deleteObjects({
    Bucket: s3BucketMeta.name,
    Delete: {
      Objects: objects,
    },
  })
  objectsToDelete.forEach(({ key }) => consola.success(`Deleted: ${key}`))
}

type deleteOldObjects = (params: {
  s3BucketMeta: S3BucketMeta
}) => Promise<void>

export const deleteOldObjects: deleteOldObjects = async ({ s3BucketMeta }) => {
  const objects = await listS3Objects({ s3BucketMeta })
  const objectsToDelete = objects.filter(isObjectToDelete)
  if (objectsToDelete.length === 0) {
    consola.info('There is no old object.')
    return
  }
  await deleteS3Objects({ s3BucketMeta, objectsToDelete })
}

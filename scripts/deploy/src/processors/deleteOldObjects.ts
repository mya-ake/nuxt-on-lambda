import consola from 'consola';
import dayjs from 'dayjs';
import { listObjects, deleteObjects } from '../lib/s3';
import { S3Bucket, S3ObjectContext } from 'src/types';

const buildLastModified = (lastModified: Date | undefined): Date => {
  if (typeof lastModified === 'undefined') {
    return new Date(0);
  }
  return lastModified;
};

const listS3Objects = async ({ s3Bucket }: { s3Bucket: S3Bucket }) => {
  const objects = await listObjects({ Bucket: s3Bucket.name });
  return objects.map(({ Key, LastModified }) => ({
    key: Key || '',
    lastModified: buildLastModified(LastModified),
  }));
};

const isObjectToDelete = (s3ObjectContext: S3ObjectContext) => {
  const { lastModified } = s3ObjectContext;
  const currentDate = dayjs(new Date());
  const modifiedDate = dayjs(lastModified);
  return currentDate.diff(modifiedDate, 'day') > 7;
};

const deleteS3Objects = async ({
  s3Bucket,
  objectsToDelete,
}: {
  s3Bucket: S3Bucket;
  objectsToDelete: S3ObjectContext[];
}): Promise<void> => {
  const objects = objectsToDelete.map(({ key }) => ({ Key: key }));
  await deleteObjects({
    Bucket: s3Bucket.name,
    Delete: {
      Objects: objects,
    },
  });
  objectsToDelete.forEach(({ key }) => consola.success(`Deleted: ${key}`));
};

type deleteOldObjects = (params: { s3Bucket: S3Bucket }) => Promise<void>;

export const deleteOldObjects: deleteOldObjects = async ({ s3Bucket }) => {
  const objects = await listS3Objects({ s3Bucket });
  const objectsToDelete = objects.filter(isObjectToDelete);
  if (objectsToDelete.length === 0) {
    consola.info('There is no old object.');
    return;
  }
  await deleteS3Objects({ s3Bucket, objectsToDelete });
};

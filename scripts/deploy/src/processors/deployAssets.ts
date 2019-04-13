import { S3 } from 'aws-sdk';
import consola from 'consola';
import path from 'path';

import { putObject } from '../lib/s3';
import { readFile } from '../lib/file';
import { FileContext, S3Bucket, DeployConfig } from 'src/types';

const buildKey = ({
  prefix = '',
  relativePathname,
}: {
  prefix?: string;
  relativePathname: string;
}) => {
  const key = path.join(prefix, relativePathname);
  return key.replace(/^\//, '');
};

const createCacheControlBuilder = (
  deployConfig: DeployConfig,
): ((fileContext: FileContext) => string) => {
  const { cacheControl } = deployConfig;
  if (typeof cacheControl === 'function') {
    return cacheControl;
  }
  return () => cacheControl;
};

const buildParams = async ({
  fileContext,
  s3Bucket,
  cacheControlBuilder,
}: {
  fileContext: FileContext;
  s3Bucket: S3Bucket;
  cacheControlBuilder: (fileContext: FileContext) => string;
}): Promise<S3.PutObjectRequest> => {
  const body = await readFile(fileContext.absolutePathname);
  return {
    Bucket: s3Bucket.name,
    Key: buildKey({
      prefix: s3Bucket.prefix,
      relativePathname: fileContext.s3Key,
    }),
    Body: body,
    ContentType: fileContext.contentType,
    CacheControl: cacheControlBuilder(fileContext),
  };
};

type deployAssets = (params: {
  fileContexts: FileContext[];
  s3Bucket: S3Bucket;
  deployConifg: DeployConfig;
}) => Promise<void>;

export const deployAssets: deployAssets = async ({
  fileContexts,
  s3Bucket,
  deployConifg,
}) => {
  const cacheControlBuilder = createCacheControlBuilder(deployConifg);

  for (const fileContext of fileContexts) {
    const params = await buildParams({
      fileContext,
      s3Bucket,
      cacheControlBuilder,
    });
    await putObject(params);
    consola.success(`Deployed: ${fileContext.s3Key}`);
  }
  return;
};

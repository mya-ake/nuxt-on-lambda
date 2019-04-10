import { AssetsDirContext } from './contexts.type';

export interface S3Bucket {
  name: string;
  prefix?: string;
}

export interface DeployOptions {
  assetsDirs: AssetsDirContext[];
  s3Bucket: S3Bucket;
  cloudFrontId: string;
}

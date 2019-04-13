import { FileContext, S3Bucket, DeployConfig } from 'src/types';
declare type deployAssets = (params: {
    fileContexts: FileContext[];
    s3Bucket: S3Bucket;
    deployConifg: DeployConfig;
}) => Promise<void>;
export declare const deployAssets: deployAssets;
export {};

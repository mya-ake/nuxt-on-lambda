import { FileContext, S3Bucket } from 'src/types';
declare type deployAssets = (params: {
    fileContexts: FileContext[];
    s3Bucket: S3Bucket;
}) => Promise<void>;
export declare const deployAssets: deployAssets;
export {};

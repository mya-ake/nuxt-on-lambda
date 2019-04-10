import { S3Bucket } from 'src/types';
declare type deleteOldObjects = (params: {
    s3Bucket: S3Bucket;
}) => Promise<void>;
export declare const deleteOldObjects: deleteOldObjects;
export {};

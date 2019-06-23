import S3 = require('aws-sdk/clients/s3');
export declare const listObjects: (params: S3.ListObjectsV2Request) => Promise<S3.Object[]>;
export declare const putObject: (params: S3.PutObjectRequest) => Promise<unknown>;
export declare const deleteObjects: (params: S3.DeleteObjectsRequest) => Promise<unknown>;

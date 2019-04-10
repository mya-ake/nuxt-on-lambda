"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();
exports.listObjects = (params) => {
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            if (typeof data.Contents === 'undefined') {
                resolve([]);
                return;
            }
            resolve(data.Contents);
        });
    });
};
exports.putObject = (params) => {
    return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.deleteObjects = (params) => {
    return new Promise((resolve, reject) => {
        s3.deleteObjects(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

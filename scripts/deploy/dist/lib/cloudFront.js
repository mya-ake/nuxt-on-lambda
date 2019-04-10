"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const cloudFront = new aws_sdk_1.CloudFront();
exports.createInvalidation = (params) => {
    return new Promise((resolve, reject) => {
        cloudFront.createInvalidation(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const path_1 = __importDefault(require("path"));
const s3_1 = require("../lib/s3");
const file_1 = require("../lib/file");
const buildKey = ({ prefix = '', relativePathname, }) => {
    const key = path_1.default.join(prefix, relativePathname);
    return key.replace(/^\//, '');
};
const createCacheControlBuilder = (deployConfig) => {
    const { cacheControl } = deployConfig;
    if (typeof cacheControl === 'function') {
        return cacheControl;
    }
    return () => cacheControl;
};
const buildParams = async ({ fileContext, s3Bucket, cacheControlBuilder, }) => {
    const body = await file_1.readFile(fileContext.absolutePathname);
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
exports.deployAssets = async ({ fileContexts, s3Bucket, deployConifg, }) => {
    const cacheControlBuilder = createCacheControlBuilder(deployConifg);
    for (const fileContext of fileContexts) {
        const params = await buildParams({
            fileContext,
            s3Bucket,
            cacheControlBuilder,
        });
        await s3_1.putObject(params);
        consola_1.default.success(`Deployed: ${fileContext.s3Key}`);
    }
    return;
};

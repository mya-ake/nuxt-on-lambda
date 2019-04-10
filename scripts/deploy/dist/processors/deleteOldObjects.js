"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const dayjs_1 = __importDefault(require("dayjs"));
const s3_1 = require("../lib/s3");
const buildLastModified = (lastModified) => {
    if (typeof lastModified === 'undefined') {
        return new Date(0);
    }
    return lastModified;
};
const listS3Objects = async ({ s3Bucket }) => {
    const objects = await s3_1.listObjects({ Bucket: s3Bucket.name });
    return objects.map(({ Key, LastModified }) => ({
        key: Key || '',
        lastModified: buildLastModified(LastModified),
    }));
};
const isObjectToDelete = (s3ObjectContext) => {
    const { lastModified } = s3ObjectContext;
    const currentDate = dayjs_1.default(new Date());
    const modifiedDate = dayjs_1.default(lastModified);
    return currentDate.diff(modifiedDate, 'minute') > 3;
};
const deleteS3Objects = async ({ s3Bucket, objectsToDelete, }) => {
    const objects = objectsToDelete.map(({ key }) => ({ Key: key }));
    await s3_1.deleteObjects({
        Bucket: s3Bucket.name,
        Delete: {
            Objects: objects,
        },
    });
    objectsToDelete.forEach(({ key }) => consola_1.default.success(`Deleted: ${key}`));
};
exports.deleteOldObjects = async ({ s3Bucket }) => {
    const objects = await listS3Objects({ s3Bucket });
    const objectsToDelete = objects.filter(isObjectToDelete);
    if (objectsToDelete.length === 0) {
        consola_1.default.info('There is no old object.');
        return;
    }
    await deleteS3Objects({ s3Bucket, objectsToDelete });
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const processors_1 = require("./processors");
exports.deploy = async (config) => {
    const { assetsDirs, s3Bucket, cloudFrontId, buildCommands } = config;
    try {
        await processors_1.buildApp(buildCommands);
        const fileContexts = await processors_1.buildFileContextsTogether(assetsDirs);
        await processors_1.deployAssets({ fileContexts, s3Bucket });
        await processors_1.deployApp();
        await processors_1.deleteOldObjects({
            s3Bucket,
        });
        await processors_1.purgeCDN({ cloudFrontId });
        consola_1.default.success('Deploy completed');
    }
    catch (err) {
        consola_1.default.error(err);
        process.exit(1);
    }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const cloudFront_1 = require("./../lib/cloudFront");
exports.purgeCDN = async ({ cloudFrontId, items = ['/*'], }) => {
    consola_1.default.info('Start purging CDN');
    await cloudFront_1.createInvalidation({
        DistributionId: cloudFrontId,
        InvalidationBatch: {
            CallerReference: String(new Date().getTime()),
            Paths: {
                Quantity: 1,
                Items: items,
            },
        },
    });
    consola_1.default.success('Succeeded in purging CDN');
};

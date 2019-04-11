"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const file_1 = require("../lib/file");
const constants_1 = require("../constants");
const selectContentType = (extension) => {
    return extension in constants_1.CONTENT_TYPES
        ? constants_1.CONTENT_TYPES[extension]
        : constants_1.CONTENT_TYPES['plane'];
};
const buildFileContext = ({ absolutePathname, assetsDirContext, }) => {
    const { pathname: dirPathname } = assetsDirContext;
    const { options = { prefix: '' } } = assetsDirContext;
    const fileName = file_1.extractFileName(absolutePathname);
    const extension = file_1.extractExtension(fileName);
    const { prefix = '' } = options;
    const relativePathname = absolutePathname.replace(dirPathname, '');
    const s3Key = path_1.default.join(prefix, relativePathname).replace(/^\//, '');
    const contentType = selectContentType(extension);
    return {
        fileName,
        absolutePathname,
        s3Key,
        contentType,
    };
};
const buildFileContexts = async (assetsDirContext) => {
    const pathnames = await file_1.getFilePathnames(assetsDirContext.pathname);
    const contexts = pathnames.map(pathname => {
        return buildFileContext({ absolutePathname: pathname, assetsDirContext });
    });
    return contexts;
};
exports.buildFileContextsTogether = async (assetsDirContexts) => {
    let contexts = [];
    for (const assetsDirContext of assetsDirContexts) {
        contexts = contexts.concat(await buildFileContexts(assetsDirContext));
    }
    return contexts;
};

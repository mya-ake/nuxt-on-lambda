"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const fsPromises = {
    stat: util_1.promisify(fs_1.default.stat),
    readdir: util_1.promisify(fs_1.default.readdir),
    readFile: util_1.promisify(fs_1.default.readFile),
    mkdir: util_1.promisify(fs_1.default.mkdir),
    writeFile: util_1.promisify(fs_1.default.writeFile),
};
exports.extractFileName = (pathname) => {
    return pathname.split('/').pop() || '';
};
exports.extractExtension = (pathname) => {
    return pathname.split('.').pop() || '';
};
exports.isDirectory = async (pathname) => {
    const pathState = await fsPromises.stat(pathname);
    return pathState.isDirectory();
};
exports.getFilePathnames = async (dirPathname) => {
    const pathnames = await fsPromises.readdir(dirPathname);
    let allPathnames = [];
    for (const pathname of pathnames) {
        const absoluteFilePathname = path_1.default.join(dirPathname, pathname);
        if (await exports.isDirectory(absoluteFilePathname)) {
            const nestedFilePathnames = await exports.getFilePathnames(absoluteFilePathname);
            allPathnames = allPathnames.concat(nestedFilePathnames);
        }
        else {
            allPathnames = allPathnames.concat(absoluteFilePathname);
        }
    }
    return allPathnames;
};
exports.readFile = (pathname) => {
    return fsPromises.readFile(pathname);
};
const existPathname = async (pathname) => {
    try {
        await fsPromises.stat(pathname);
        return true;
    }
    catch (err) {
        return false;
    }
};
const createDir = (pathname) => {
    return fsPromises.mkdir(pathname);
};
const ensureWriteProcess = async (pathname) => {
    const fileDirname = path_1.default.dirname(pathname);
    if (await existPathname(fileDirname)) {
        return;
    }
    await ensureWriteProcess(fileDirname);
    await createDir(fileDirname);
};

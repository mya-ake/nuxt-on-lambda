import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const fsPromises = {
  stat: promisify(fs.stat),
  readdir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  mkdir: promisify(fs.mkdir),
  writeFile: promisify(fs.writeFile),
};

export const extractFileName = (pathname: string): string => {
  return pathname.split('/').pop() || '';
};

export const extractExtension = (pathname: string): string => {
  return pathname.split('.').pop() || '';
};

export const getFilePathnames = async (dirPathname: string) => {
  const pathnames = await fsPromises.readdir(dirPathname);
  let allPathnames: string[] = [];
  for (const pathname of pathnames) {
    const absoluteFilePathname = path.join(dirPathname, pathname);
    const pathState = await fsPromises.stat(absoluteFilePathname);
    if (pathState.isDirectory()) {
      const nestedFilePathnames = await getFilePathnames(absoluteFilePathname);
      allPathnames = allPathnames.concat(nestedFilePathnames);
    } else {
      allPathnames = allPathnames.concat(absoluteFilePathname);
    }
  }
  return allPathnames;
};

export const readFile = (pathname: string) => {
  return fsPromises.readFile(pathname);
};

const existPathname = async (pathname: string) => {
  try {
    await fsPromises.stat(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const createDir = (pathname: string) => {
  return fsPromises.mkdir(pathname);
};

const ensureWriteProcess = async (pathname: string) => {
  const fileDirname = path.dirname(pathname);
  if (await existPathname(fileDirname)) {
    return;
  }
  await ensureWriteProcess(fileDirname);
  await createDir(fileDirname);
};

import path from 'path';
import {
  getFilePathnames,
  extractFileName,
  extractExtension,
} from '../lib/file';
import { CONTENT_TYPES } from '../constants';
import { FileContext, AssetsDirContext } from 'src/types';

const selectContentType = (extension: string): string => {
  return extension in CONTENT_TYPES
    ? CONTENT_TYPES[extension]
    : CONTENT_TYPES['plane'];
};

const buildFileContext = ({
  absolutePathname,
  assetsDirContext,
}: {
  absolutePathname: string;
  assetsDirContext: AssetsDirContext;
}): FileContext => {
  const { pathname: dirPathname } = assetsDirContext;
  const { options = { prefix: '' } } = assetsDirContext;
  const fileName = extractFileName(absolutePathname);
  const extension = extractExtension(fileName);
  const { prefix = '' } = options;
  const relativePathname = absolutePathname.replace(dirPathname, '');
  const s3Key = path.join(prefix, relativePathname).replace(/^\//, '');
  const contentType = selectContentType(extension);
  return {
    fileName,
    absolutePathname,
    s3Key,
    contentType,
  };
};

const buildFileContexts = async (
  assetsDirContext: AssetsDirContext,
): Promise<FileContext[]> => {
  const pathnames = await getFilePathnames(assetsDirContext.pathname);
  const contexts: FileContext[] = pathnames.map(pathname => {
    return buildFileContext({ absolutePathname: pathname, assetsDirContext });
  });
  return contexts;
};

export const buildFileContextsTogether = async (
  assetsDirContexts: AssetsDirContext[],
): Promise<FileContext[]> => {
  let contexts: FileContext[] = [];
  for (const assetsDirContext of assetsDirContexts) {
    contexts = contexts.concat(await buildFileContexts(assetsDirContext));
  }
  return contexts;
};

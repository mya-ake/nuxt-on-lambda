import {
  getFilePathnames,
  extractFileName,
  extractExtension,
} from './../lib/file'
import { CONTENT_TYPES } from './../constants'
import { FileContext } from 'src/types'

const selectContentType = (extension: string): string => {
  return extension in CONTENT_TYPES
    ? CONTENT_TYPES[extension]
    : CONTENT_TYPES['plane']
}

const buildFileContexts = async (
  dirPathname: string,
): Promise<FileContext[]> => {
  const pathnames = await getFilePathnames(dirPathname)
  const contexts: FileContext[] = pathnames.map(pathname => {
    const fileName = extractFileName(pathname)
    const extension = extractExtension(fileName)
    const context: FileContext = {
      fileName,
      absolutePathname: pathname,
      relativePathname: pathname.replace(dirPathname, ''),
      contentType: selectContentType(extension),
    }
    return context
  })
  return contexts
}

export const buildFileContextsTogether = async (
  assetsDirs: string[],
): Promise<FileContext[]> => {
  let contexts: FileContext[] = []
  for (const dirPathname of assetsDirs) {
    contexts = contexts.concat(await buildFileContexts(dirPathname))
  }
  return contexts
}

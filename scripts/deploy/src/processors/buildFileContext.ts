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

const buildFileContext = ({
  absolutePathname,
  dirPathname,
}: {
  absolutePathname: string
  dirPathname: string
}): FileContext => {
  const fileName = extractFileName(absolutePathname)
  const extension = extractExtension(fileName)
  const relativePathname = absolutePathname.replace(dirPathname, '')
  const contentType = selectContentType(extension)
  return {
    fileName,
    absolutePathname,
    relativePathname,
    contentType,
  }
}

const buildFileContexts = async (
  dirPathname: string,
): Promise<FileContext[]> => {
  const pathnames = await getFilePathnames(dirPathname)
  const contexts: FileContext[] = pathnames.map(pathname => {
    return buildFileContext({ absolutePathname: pathname, dirPathname })
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

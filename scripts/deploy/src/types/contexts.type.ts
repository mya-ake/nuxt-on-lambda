export interface FileContext {
  fileName: string
  absolutePathname: string
  relativePathname: string
  contentType: string
}

export interface S3ObjectContext {
  key: string
  lastModified: Date
}

export interface S3Bucket {
  name: string
  prefix?: string
}

export interface DeployOptions {
  assetsDirs: string[]
  s3Bucket: S3Bucket
  cloudFrontId: string
}

import S3 = require('aws-sdk/clients/s3')

const s3 = new S3()

export const listObjects = (
  params: S3.ListObjectsV2Request,
): Promise<S3.Object[]> => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(new Error(err.message))
        return
      }
      if (typeof data.Contents === 'undefined') {
        resolve([])
        return
      }
      resolve(data.Contents)
    })
  })
}

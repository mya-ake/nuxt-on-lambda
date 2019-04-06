import S3 = require('aws-sdk/clients/s3')

const s3 = new S3()

export const listObjects = (
  params: S3.ListObjectsV2Request,
): Promise<S3.Object[]> => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(err)
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

export const putObject = (params: S3.PutObjectRequest) => {
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const deleteObjects = (params: S3.DeleteObjectsRequest) => {
  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

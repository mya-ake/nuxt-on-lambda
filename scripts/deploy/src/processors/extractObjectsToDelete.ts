import dayjs from 'dayjs'
import { S3ObjectContext } from 'src/types'

const isObjectToDelete = (s3ObjectContext: S3ObjectContext) => {
  const { lastModified } = s3ObjectContext
  const currentDate = dayjs(new Date())
  const modifiedDate = dayjs(lastModified)
  return currentDate.diff(modifiedDate, 'second') > 0
}

type extractObjectsToDelete = (
  s3ObjectContexts: S3ObjectContext[],
) => S3ObjectContext[]

export const extractObjectsToDelete: extractObjectsToDelete = s3ObjectContexts => {
  return s3ObjectContexts.filter(isObjectToDelete)
}

import consola from 'consola'
import {
  listS3Objects,
  buildFileContexts,
  deployAssets,
  extractObjectsToDelete,
} from './processors'
import { DeployOptions, FileContext } from 'src/types'
import { spawn } from './lib/commands'
import { S3_BUCKET_META } from './constants'

const reduceFileContexts = async (
  assetsDirs: string[],
): Promise<FileContext[]> => {
  let contexts: FileContext[] = []
  for (const dirPathname of assetsDirs) {
    contexts = contexts.concat(await buildFileContexts({ dirPathname }))
  }
  return contexts
}

export const deploy = async (option: DeployOptions) => {
  const { assetsDirs } = option

  const s3Objects = await listS3Objects({ s3BucketMeta: S3_BUCKET_META })
  const objectsToDelete = extractObjectsToDelete(s3Objects)
  console.log(objectsToDelete)
  const fileContexts = await reduceFileContexts(assetsDirs)
  // await deployAssets({ fileContexts, s3BucketMeta: S3_BUCKET_META })

  // console.log(objects)
}

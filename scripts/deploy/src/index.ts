import consola from 'consola'
import {
  buildFileContextsTogether,
  deployAssets,
  deleteOldObjects,
  buildApp,
  deployApp,
} from './processors'
import { DeployOptions, FileContext } from 'src/types'
import { S3_BUCKET_META } from './constants'

export const deploy = async (option: DeployOptions) => {
  const { assetsDirs } = option

  try {
    await buildApp()

    const fileContexts = await buildFileContextsTogether(assetsDirs)

    await deployAssets({ fileContexts, s3BucketMeta: S3_BUCKET_META })
    await deployApp()

    await deleteOldObjects({
      s3BucketMeta: S3_BUCKET_META,
    })
    consola.success('Deploy completed')
  } catch (err) {
    consola.error(err)
  }
}

import consola from 'consola'
import {
  buildFileContextsTogether,
  deployAssets,
  deleteOldObjects,
  buildApp,
  deployApp,
  purgeCDN,
} from './processors'
import { DeployOptions, FileContext } from 'src/types'

export const deploy = async (option: DeployOptions) => {
  const { assetsDirs, s3Bucket, cloudFrontId } = option

  try {
    await buildApp()

    const fileContexts = await buildFileContextsTogether(assetsDirs)

    await deployAssets({ fileContexts, s3Bucket })
    await deployApp()

    await deleteOldObjects({
      s3Bucket,
    })
    await purgeCDN({ cloudFrontId })
    consola.success('Deploy completed')
  } catch (err) {
    consola.error(err)
  }
}

import consola from 'consola'
import { createInvalidation } from './../lib/cloudFront'

export const purgeCDN = async ({
  cloudFrontId,
  items = ['/*'],
}: {
  cloudFrontId: string
  items?: string[]
}): Promise<void> => {
  consola.info('Start purging CDN')
  await createInvalidation({
    DistributionId: cloudFrontId,
    InvalidationBatch: {
      CallerReference: String(new Date().getTime()),
      Paths: {
        Quantity: 1,
        Items: items,
      },
    },
  })
  consola.success('Succeeded in purging CDN')
}

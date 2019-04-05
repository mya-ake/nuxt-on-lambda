import consola from 'consola'
import { listS3Objects } from './processors'
import { DeployOptions } from './types/options'
import { spawn } from './lib/commands'

export const deploy = async (option: DeployOptions = {}) => {
  const { rootDir = process.cwd() } = option
  consola.info(rootDir)

  // const objects = await listS3Objects()
  // console.log(objects)
  await spawn('ts-node', ['error.ts'])
}

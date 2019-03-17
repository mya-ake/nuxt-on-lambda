import consola from 'consola'
import { DeployOption } from './types/options'

const test = (str: string) => {
  consola.info(str)
}

export const deploy = (option: DeployOption = {}) => {
  const { rootDir = process.cwd() } = option
  consola.info(rootDir)
}

import path from 'path'
import { deploy } from './src/index'

const ROOT_DIR = process.cwd()
const assetsDirs = [path.join(ROOT_DIR, 'src')]

deploy({ assetsDirs }).catch(err => {
  console.log(err)
})

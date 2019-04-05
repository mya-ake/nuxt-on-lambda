import { deploy } from './src/index'

deploy().catch(err => {
  console.log(err)
})

const path = require('path')

const { deploy } = require('./../../scripts/deploy')
const nuxtConfig = require('./../../nuxt.config')

const ROOT_DIR = process.cwd()
const SRC_DIR = path.join(ROOT_DIR, nuxtConfig.srcDir)
const NUXT_DIR = path.join(ROOT_DIR, '.nuxt')
const NUXT_CLIENT_DIR = path.join(NUXT_DIR, 'dist', 'client')
const NUXT_STATIC_DIR = path.join(SRC_DIR, 'static')

const assetsDirs = [NUXT_CLIENT_DIR, NUXT_STATIC_DIR]

deploy({ assetsDirs })

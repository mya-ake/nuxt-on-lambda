const { Nuxt, Builder } = require('nuxt')
const config = require('./../../nuxt.config.js')

config.dev = !(process.env.NODE_ENV === 'production')

const BASE_URL = process.env.BASE_URL || '/'
const REGEXP_BASE_URL = new RegExp(`^${BASE_URL}`)
const BASE_URL_TO_BE_ADDED = BASE_URL.replace(/\/$/, '')
const buildPath = originalPath => {
  if (REGEXP_BASE_URL.test(originalPath) === true) {
    return originalPath
  }
  return `${BASE_URL_TO_BE_ADDED}${originalPath}`
}

const nuxt = new Nuxt(config)

const nuxtMiddleware = async (req, res, next) => {
  // req.url = buildPath(req.url)
  // console.log('Request URL: ', req.url)

  nuxt.render(req, res, next)
}

module.exports = {
  nuxt,
  config,
  nuxtMiddleware
}

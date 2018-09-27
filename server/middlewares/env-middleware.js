/**
 * API Gateway を使うときの URL に Base URL を付加するためのミドルウェア
 */

const BASE_URL = process.env.BASE_URL || '/'
const REGEXP_BASE_URL = new RegExp(`^${BASE_URL}`)
const BASE_URL_TO_BE_ADDED = BASE_URL.replace(/\/$/, '')
const buildPath = originalPath => {
  if (REGEXP_BASE_URL.test(originalPath) === true) {
    return originalPath
  }
  return `${BASE_URL_TO_BE_ADDED}${originalPath}`
}

const envMiddleware = (req, res, next) => {
  const originalUrl = req.url
  const envUrl = buildPath(originalUrl)
  req.url = envUrl
  console.log(
    '[info]',
    'Overwrite URL',
    `'${originalUrl}'`,
    'to',
    `'${envUrl}'`
  )
  next()
}

module.exports = {
  envMiddleware
}

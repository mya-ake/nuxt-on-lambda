'use strict'

const { Nuxt } = require('nuxt')
const express = require('express')
const config = require('./../nuxt.config.js')

const app = express()

const setHeaders = (req, res, next) => {
  res.removeHeader('x-powered-by')
  res.header('no-cache', 'Set-Cookie')
  res.header('x-xss-protection', '1; mode=block')
  res.header('x-frame-options', 'DENY')
  res.header('x-content-type-options', 'nosniff')
  res.header('Cache-Control', 'max-age=120')
  next()
}

app.use(setHeaders)

const BASE_PATH = process.env.BASE_URL
const REGEXP_BASE_PATH = new RegExp(`^${BASE_PATH}`)

const buildPath = (originalPath) => {
  if (REGEXP_BASE_PATH.test(originalPath) === true) {
    return originalPath
  }
  const basePath = BASE_PATH.replace(/\/$/, '')
  return `${basePath}${originalPath}`
}

config.dev = false
const nuxt = new Nuxt(config)

app.use((req, res, next) => {
  req.url = buildPath(req.url)
  console.log('Request URL: ', req.url)

  nuxt.render(req, res, next)
})

module.exports.app = app

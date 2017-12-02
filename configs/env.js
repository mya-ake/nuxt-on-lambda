'use strict'

const ENV = {
  STAGE: 'dev',
  BASE_URL: '/dev/'
}

const exporter = () => {
  return ENV
}

module.exports = {
  ENV,
  exporter
}

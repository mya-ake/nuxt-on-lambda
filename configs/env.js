'use strict'

const endpointEnv = process.env.ENDPOINT_ENV || 'cf'

const ENV = {
  STAGE: 'dev',
  BASE_PATH: '/',
  ENDPOINT_ENV: endpointEnv
}

if (endpointEnv === 'api_gw') {
  ENV.BASE_PATH = `/${ENV.STAGE}/`
}

// for serverless.yml
const exporter = () => {
  return ENV
}

module.exports = {
  ENV,
  exporter
}

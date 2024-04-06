import type { NormalizedApiConfig, ApiConfig } from '~/types'

import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import devConfig from './env-dev'
import testConfig from './env-test'
import prodConfig from './env-prod'

let apiConfig: ApiConfig | null = null
if (import.meta.env.VITE_APP_ENV === 'dev') {
  apiConfig = devConfig
} else if (import.meta.env.VITE_APP_ENV === 'test') {
  apiConfig = testConfig
} else if (import.meta.env.VITE_APP_ENV === 'prod') {
  apiConfig = prodConfig
}
if (!apiConfig) {
  throw Error(`${import.meta.env.VITE_APP_ENV} api 配置项不存在，请在 /src/api/config 内配置。`)
}

function _normalizeApiConfig(config: ApiConfig) {
  const finalConfig: Record<string, NormalizedApiConfig> = {}

  Object.entries(config).forEach(([platform, config]) => {
    let normalizedConfig: NormalizedApiConfig = {}
    if (isString(config)) {
      normalizedConfig = { baseURL: config }
    } else if (isPlainObject(config)) {
      normalizedConfig = config as NormalizedApiConfig
    }

    finalConfig[platform] = normalizedConfig
  })

  return finalConfig
}

const normalizedApiConfig = _normalizeApiConfig(apiConfig)

export default normalizedApiConfig
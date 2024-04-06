import type { NormalizedApiConfig } from '~/types'

import { setup } from 'axios-cache-adapter'

import { Message } from 'element-ui'

import NProgress from 'nprogress'
import resFormat from './resFormat'

import appConfig from '@/app.config'
import isPlainObject from 'lodash/isPlainObject'

import { AxiosResponse } from 'axios'
import router from '@/router'

interface myRes {
  is_success: boolean
  result: any
  msg: string
}

let requestCount = 0

const REQUEST_TIMEOUT: number = appConfig.requestTimeout
const REQUEST_LOADING: boolean = appConfig.requestLoading

function NProgressStart() {
  if (requestCount === 0) {
    NProgress.start()
  }
  requestCount++
}

function NProgressDone() {
  requestCount--
  if (requestCount > 0) {
    NProgress.inc()
  } else {
    NProgress.done()
  }
}

const request = (_requestConfig: NormalizedApiConfig = {}) => {
  const {
    formate = true,
    silent = false,
    transformResponse,
    cache,
    defaultMsg,
    ...axiosRequestConfig
  } = _requestConfig

  let _formate = formate
  if (transformResponse instanceof Function) {
    _formate = false
  }

  let _cache = { maxAge: 0 }
  if (isPlainObject(cache)) {
    _cache = { ..._cache, ...cache }
  }

  const service = setup({
    cache: _cache,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    responseType: 'json',
    ...axiosRequestConfig,
  })

  // 请求拦截器
  // 若有网关接口统一拦截等数据操作，可在这里配置。
  service.interceptors.request.use(
    (config) => {
      if (REQUEST_LOADING) {
        NProgressStart()
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // 添加响应拦截器
  service.interceptors.response.use(
    (response) => {
      if (REQUEST_LOADING) {
        NProgressDone()
      }

      let resolveData: AxiosResponse<any, any> | myRes
      if (_formate) {
        resolveData = resFormat(response, silent, defaultMsg)
      } else {
        resolveData =
          response.config.responseType === 'blob' ? response : response.data
      }

      return Promise.resolve(resolveData)
    },
    (error) => {
      if (REQUEST_LOADING) {
        NProgressDone()
      }

      const is401 = error.response.status === 401

      if (is401) {
        router.push({ name: '401' })
      }

      let message = error.message || ''
      if (message.match(/timeout of (\d*)ms exceeded/)) {
        message = '接口调用超时。'
      }
      console.log(error)

      !silent && Message({ message, type: 'error', duration: 5000 })
      return Promise.reject(error)
    }
  )

  return service
}

interface TemplateConfig extends NormalizedApiConfig {
  apiPrefix: NormalizedApiConfig
}

export default function templateRequest(
  config: TemplateConfig
): Promise<myRes> {
  const { apiPrefix, ...options } = config
  const _service = request({ ...apiPrefix, ...options })
  // @ts-ignore
  return _service(config)
}

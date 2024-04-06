import templateRequest from './request'
import apiConfig from '@/api.config'

const apiPrefix = apiConfig.main

export function getUserId() {
  return templateRequest({
    apiPrefix,
    url: '/getUser',
    method: 'post',
    silent: true,
  })
}
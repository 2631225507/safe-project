import { request } from '@/utils/request'

export function page (params) {
  return request({
    url: '/api/student/attend',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/student/attend',
    method: 'post',
    data
  })
}
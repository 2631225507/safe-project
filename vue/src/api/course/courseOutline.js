import { request } from '@/utils/request'

export function page (params) {
  return request({
    url: '/api/course/outline',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/course/outline',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/course/outline',
    method: 'put',
    data
  })
}

export function destroy (data) {
  return request({
    url: '/api/course/outline',
    method: 'delete',
    data
  })
}
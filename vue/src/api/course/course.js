import { request } from '@/utils/request'

export function page (params) {
  return request({
    url: '/api/course',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/course',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/course',
    method: 'put',
    data
  })
}

export function destroy (data) {
  return request({
    url: '/api/course',
    method: 'delete',
    data
  })
}
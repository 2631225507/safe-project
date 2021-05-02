import { request } from '@/utils/request'

export function findAll (params) {
  return request({
    url: '/api/class/all',
    params
  })
}

export function page (params) {
  return request({
    url: '/api/class',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/class',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/class',
    method: 'put',
    data
  })
}

export function destroy (data) {
  return request({
    url: '/api/class',
    method: 'delete',
    data
  })
}

export function setClassStudent (data) {
  return request({
    url: '/api/class/set/student',
    method: 'put',
    data
  })
}
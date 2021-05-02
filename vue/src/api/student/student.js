import { request } from '@/utils/request'

export function findAll (params) {
  return request({
    url: '/api/student/all',
    params
  })
}

export function page (params) {
  return request({
    url: '/api/student',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/student',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/student',
    method: 'put',
    data
  })
}

export function destroy (data) {
  return request({
    url: '/api/student',
    method: 'delete',
    data
  })
}

export function setClass (data) {
  return request({
    url: '/api/student/set/class',
    method: 'put',
    data
  })
}

export function noClassStudent (params) {
  return request({
    url: '/api/student/no/class',
    params
  })
}
import { request } from '@/utils/request'


export function createSupplier(data) {
  return request({
    url: '/api/supplier/create',
    method: 'post',
    data
  })
}

export function updateSupplier(data) {
  return request({
    url: '/api/supplier/update',
    method: 'post',
    data
  })
}

export function deleteSupplier(data) {
  return request({
    url: '/api/supplier/delete',
    method: 'post',
    data
  })
}

import { request } from '@/utils/request'

export function queryDevice(data) {
    return request({
        url: '/api/device',
        method: 'get',
        params: data
    })
}

export function querySupplier(data) {
    return request({
        url: '/api/supplier',
        method: 'get',
        params: data
    })
}

export function updateStatus(data) {
    return request({
        url: '/api/device/updateStatus',
        method: 'post',
        data
    })
}
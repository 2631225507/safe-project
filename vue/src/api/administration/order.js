import { request } from '@/utils/request'

export function queryOrder(data) {
    return request({
        url: '/api/order',
        method: 'post',
        data
    })
}
export function queryOrderDetail(data) {
    return request({
        url: '/api/detail',
        method: 'post',
        data
    })
}
export function createOrder(data) {
    return request({
        url: '/api/create/order',
        method: 'post',
        data
    })
}
export function updateOrder(data) {
    return request({
        url: '/api/update/order',
        method: 'post',
        data
    })
}
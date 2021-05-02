import { request } from '@/utils/request'

export function setClassTimetable (data) {
  return request({
    url: '/api/timetable/set/class',
    method: 'put',
    data
  })
}

export function sumTimetable (params) {
  return request({
    url: '/api/timetable/sum',
    params
  })
}

export function removeClassTimetable (data) {
  return request({
    url: '/api/timetable/remove',
    method: 'put',
    data
  })
}
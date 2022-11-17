import request from '@/utils/request'

export function getSourceType() {
  return request({
    url: '/source/querySourceType',
    method: 'get'
  })
}

export function saveSource(data) {
  return request({
    url: '/source/save',
    method: 'post',
    data
  })
}

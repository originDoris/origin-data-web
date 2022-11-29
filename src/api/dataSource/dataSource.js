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
export function queryList(data) {
  return request({
    url: '/source/queryList',
    method: 'get',
    params: {
      sourceType: data.sourceType,
      sourceName: data.sourceName
    }
  })
}
export function removeById(data) {
  return request({
    url: '/source/remove',
    method: 'get',
    params: {
      id: data
    }
  })
}

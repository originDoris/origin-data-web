import request from '@/utils/request'

export function getSourceType() {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get'
  })
}

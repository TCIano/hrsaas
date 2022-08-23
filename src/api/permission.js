import request from '@/utils/request'

// 获取权限
export function getPermissionListApi() {
  return request({
    url: '/sys/permission',
  })
}

// 给角色分配权限
/**
 *
 * @param {*} data
 * @returns
 */
export function addPermApi(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data,
  })
}

import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {Object}  params
 * @returns
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params,
  })
}

/**
 * 新增角色
 * @param {*} data
 * @returns
 */
export const addRolesApi = (data) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data,
  })
}

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export const delRolesApi = (id) => {
  return request({
    method: 'DELETE',
    url: '/sys/role/' + id,
  })
}

/**
 * 获取员工详细信息
 * @param {String} id 角色ID
 * @returns
 */
export const getRolesInfoApi = (id) => {
  return request({
    url: '/sys/role/' + id,
  })
}

/**
 * 给角色分配权限
 * @param {*} data {id,permIds}
 * @returns
 */
export function assignPermApi(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data,
  })
}

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

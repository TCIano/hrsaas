import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns promise
 */
export const getEmployeesApi = () => {
  return request({
    url: '/sys/user/simple',
  })
}

/**
 *获取员工详细信息
 * @param {Object} params
 * @returns
 */
export const getEmployeesInfoApi = (params) => {
  return request({
    url: '/sys/user',
    params,
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployeeApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete',
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployeeApi(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data,
  })
}

/**
 *
 * @param {*} data 员工数组
 * @returns
 */
export function importEmployees(data) {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data,
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetailApi(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data,
  })
}

/** *
 * 给用户分配角色
 * ***/
export function assignRolesApi(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put',
  })
}

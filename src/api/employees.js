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

import request from '@/utils/request'

/**
 * 获取部门信息
 * @returns promise
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department',
  })
}

/**
 *  删除指定部门
 * @param {String} id 要删除部门的id
 * @returns
 */
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}

/**
 * 
 * @param {Object} data 
 * code	string	非必须		部门编码，同级部门不可重复	
  introduce	string	非必须		介绍	
  manager	string	非必须		负责人名称	
  name	string	非必须		部门名称	
  pid	string	非必须		父级部门ID
 * 
 * 
 * @returns 
 */
export const addDeptApi = (data) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data,
  })
}

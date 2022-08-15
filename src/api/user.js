import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data mobile 手机号 password 密码
 * @returns Promise
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/sys/login',
    data,
  })
}

/**
 *  获取用户基本信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    method: 'POST',
    url: '/sys/profile',
  })
}

/**
 * 根据用户id获取用户基本信息
 * @param {String} id 用户id
 * @returns promise
 */
export const getUserDetail = (id) => {
  return request({
    url: '/sys/user/' + id,
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data,
  })
}

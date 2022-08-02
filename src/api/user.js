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
 *  获取用户信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    method: 'POST',
    url: '/sys/profile',
  })
}

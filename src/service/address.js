import { request } from '@/utils/request'

export class AddressService {
  /**
   * 获取用户地址列表
   * @param userId
   */
  static async findByUserId(userId) {
    return request({
      url: '/address/findByUserId',
      method: 'GET',
      data: { userId }
    })
  }

  /**
   * 新增用户收货地址
   * @param userId
   * @returns {Promise<*|undefined>}
   */
  static async addAddress(userId, address) {
    return request({
      url: '/address/addAddress',
      method: 'POST',
      data: {
        userId,
        ...address
      }
    })
  }

  /**
   * 修改地址
   * @param userId
   * @returns {Promise<*|undefined>}
   */
  static upAddress(userId, address) {
    return request({
      url: '/address/upAddress',
      method: 'PUT',
      data: {
        userId,
        ...address
      }
    })
  }

  /**
   * 删除地址
   * @param {number} id - 地址id，多个用逗号隔开
   */
  static delAdderss(id) {
    return request({
      url: '/address/delAdderss/' + { id },
      method: 'POST'
    })
  }
}

import { request } from '@/utils/request'

export class schoolCardService {
  /**
   * 添加校园卡
   * @param userId
   * @returns {Promise<*|undefined>}
   */
  static async addSchoolCardInfo(userId, CardInfo) {
    return request({
      url: '/WxBindinfo/addSchoolCardInfo',
      method: 'POST',
      data: {
        userId,
        ...CardInfo
      }
    })
  }

  /**
   * 添加车辆信息及其他物品信息
   * @param userId
   * @returns {Promise<*|undefined>}
   */
  static async insertBindInfo(userId, bindInfo) {
    return request({
      url: '/WxBindinfo/insertBindinfo',
      method: 'POST',
      data: {
        userId,
        ...bindInfo
      }
    })
  }
}

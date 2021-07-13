import { request } from '@/utils/request'

export class UserService {
  /**
   * 微信登录
   * @param {string} code
   * @param {string} encryptedData
   * @param {string} iv
   */
  static async login(code, encryptedData, iv) {
    return request({
      url: '/wxUser/wxSignIn',
      data: { code, encryptedData, iv }
    })
  }

  /**
   * 修改资料
   @returns {Promise<void>}
   */
  static async wxUpUser(user) {
    return request({
      method: 'PUT',
      url: '/wxUser/wxUpUser',
      data: {
        ...user
      }
    })
  }

  // 获取手机验证码
  static async wxRoleReviewCode(phoneNumbers) {
    return request({
      method: 'GET',
      url: '/WxRoleReview/getCode',
      data: {
        phoneNumbers
      }
    })
  }

  // 增加审核
  static async insertWxRoleReview(data) {
    return request({
      method: 'POST',
      url: '/WxRoleReview/insertRoleReview',
      data
    })
  }

  // 添加签到
  static async addSignIn(userId) {
    return request({
      method: 'POST',
      url: '/WxSignIn/addSignIn',
      data: { userId }
    })
  }

  // 查询当日是否已签到 -0是签到，1未签到
  static async getToDay(userId) {
    return request({
      method: 'GET',
      url: '/WxSignIn/getToDay',
      data: { userId }
    })
  }

  // 查询签到信息和次数
  static async findSignInList(userId) {
    return request({
      method: 'GET',
      url: '/WxSignIn/findSignInList',
      data: { userId }
    })
  }

  /**
   * 关注的人列表(attentionUserId)
   * 粉丝列表(userId）
   * @param attentionUserId
   * @param userId
   * @param page
   * @param limit
   */
  static async getAttention({ attentionUserId, userId, page, limit }) {
    return request({
      url: '/WxAttention/getAttention',
      method: 'get',
      data: { attentionUserId, userId, page, limit }
    })
  }

  /**
   * 添加关注
   * @param userId
   * @param attentionUserId
   */
  static async addAttention(userId, attentionUserId) {
    return request({
      url: '/WxAttention/addAttention',
      method: 'post',
      data: { userId, attentionUserId }
    })
  }

  /**
   * 取消关注
   * @param id
   */
  static async delAttention(id) {
    return request({
      url: '/WxAttention/delAttention/' + id,
      method: 'delete'
    })
  }

  // 我的物品列表
  static async findPostWp(data) {
    return request({
      method: 'GET',
      url: '/WxBindinfo/findBindinfoList',
      data
    })
  }

  // 修改校园卡
  static async updateSchoolCardInfo(data) {
    return request({
      method: 'PUT',
      url: '/WxBindinfo/updateSchoolCardInfo',
      data
    })
  }

  // 修改车辆和其他
  static async updateCarGoodsInfo(data) {
    return request({
      method: 'PUT',
      url: '/WxBindinfo/updateCarGoodsInfo',
      data
    })
  }

  static async addSchoolCardInfo(data) {
    return request({
      url: '/WxBindinfo/addSchoolCardInfo',
      data
    })
  }

  static async insertBindinfo(data) {
    return request({
      url: '/WxBindinfo/insertBindinfo',
      data
    })
  }

  static async findUsers(userIds) {
    return request({
      method: 'GET',
      url: '/wxUser/findNicknameAndheadimgUrlByUserId',
      data: {
        userId: userIds.join(',')
      }
    })
  }

  // 提交 意见
  static async addOpinionSuggest(data) {
    return request({
      method: 'POST',
      url: '/opinionSuggest/addOpinionSuggest',
      data
    })
  }
}

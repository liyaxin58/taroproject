import { request } from '@/utils/request'
import { pickValidValues } from '@puckjs/utils/lib/object'

export class PostService {


  /**
   * 获取极光参数
   *
   */
  static async getJiGuangParam() {
    return request({
      method: 'GET',
      url: '/jiGuang/getJiGuangParam'
    })
  }

  /**
   * 检查该用户是否已经注册
   *
   */
  static async findSignupJiGuangIM(header) {
    return request({
      method: 'GET',
      header,
      url: '/jiGuang/findSignupJiGuangIM'
    })
  }

  /**
   * 注册的时候调用
   *
   */
  static async updateSignupJiGuangIMByUserId() {
    return request({
      method: 'PUT',
      url: '/jiGuang/updateSignupJiGuangIMByUserId'
    })
  }

  /**
   * 帖子分类
   *
   */
  static async findBigPostType() {
    return request({
      method: 'GET',
      url: '/WxPosType/findBigPostType'
    })
  }

  /**
   * 帖子列表
   * @param typeId - 帖子类型id
   * @param signInUserId - 当前登陆人Id
   *
   */
  static async findPostList({ typeId, signInUserId }) {
    return request({
      method: 'GET',
      url: '/WxPost/findPostList',
      data: pickValidValues(
        {
          typeId,
          signInUserId
        },
        ['id', 'typeId', 'signInUserId']
      )
    })
  }

  /**
   * 我的帖子
   *
   */
  static async myPostList(userId) {
    return request({
      method: 'GET',
      url: '/WxPost/findPostList',
      data: userId
    })
  }

  /**
   * 帖子详情
   *
   */
  static async postInfo(id) {
    return request({
      method: 'GET',
      url: '/WxPost/findPostList',
      data: {
        id
      }
    })
  }

  /**
   * 发帖
   *
   * @returns {Promise<*|undefined>}
   * @param data
   */
  static async addPost(data) {
    return request({
      url: '/WxPost/addPost',
      data
    })
  }

  /**
   * 删除帖子
   *
   * @param id - 帖Id
   */
  static async delPost(id) {
    return request({
      method: 'DELETE',
      url: '/WxPost/delPost/' + id
    })
  }

  /**
   * 上传图片
   * @param file - 图片
   */
  static async uploadPhoto(file) {
    return request({
      url: '/uploadPhotos/uploadPhoto',
      data: {
        file
      },
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  /**
   * 上传视频
   * @param {string} file - 图片
   */
  static async uploadRadio(file) {
    return request({
      url: '/uploadPhotos/uploadRadio',
      data: {
        file
      }
    })
  }

  /**
   * 点赞  点赞是1 没点赞是0
   * @param {string} commendUserId - 用户id
   * @param {string} postId - 贴的Id，必填
   * @param {string} userId - 被收藏人的ID，必填
   *

   // * @param reviewId - 回复人id(userid)
   */
  static async addCommend(commendUserId, postId, userId) {
    return request({
      url: '/collect/addCommend',
      data: {
        commendUserId,
        postId,
        userId
      }
    })
  }

  /**
   * 取消点赞
   * @param postId
   * @param reviewId - 回复人id(userid)
   */
  static async delCommend(postId, reviewId) {
    return request({
      url: '/collect/delCommendByUserIdAndPostId/',
      method: 'delete',
      data: {
        postId,
        reviewId
      }
    })
  }

  /**
   * 点赞列表-我的点赞
   * @param attentionUserId
   * @param userId
   * @param page
   * @param limit
   */
  static async findCommendList({ userId, page, limit }) {
    return request({
      url: '/collect/findCommendList',
      method: 'get',
      data: { userId, page, limit }
    })
  }

  /**
   * 评论列表
   * userId (integer, optional)- 评论人ID
   */
  static async getReviewByPostLists(userId) {
    return request({
      url: '/WxReview/getReviewByPostId',
      method: 'get',
      data: { userId }
    })
  }

  /**
   * 添加评论
   * postId (integer, optional)- 发帖Id
   * content (string, optional)- 评论文本
   * userId (integer, optional)- 评论人ID
   */
  static async addReview(data) {
    return request({
      url: '/WxReview/addReview',
      data
    })
  }

  /**
   * 添加回复
   * reviewId  - 回帖id 136
   * postId - 发帖id
   * content - 评论文本
   * userId - 被回复人id
   * reviewUserId - 回复人id 7
   */
  static async addAnswer({ reviewId, postId, content, userId, reviewUserId }) {
    return request({
      url: '/WxReview/addReview',
      data: {
        reviewId,
        postId,
        content,
        userId,
        reviewUserId
      }
    })
  }
}

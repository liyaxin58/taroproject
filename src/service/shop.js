import { request } from '@/utils/request'
import { pickValidValues } from '@puckjs/utils/lib/object'

export class ShopService {
  /**查询商品分类
   *
   */
  static async findCommodityType() {
    return request({
      method: 'GET',
      url: '/commodityType/findCommodityType'
    })
  }

  /**商品列表
   *
   * @param commodityTypeId - 商品类型的Id
   */
  static async commodityList(commodityTypeId) {
    return request({
      method: 'GET',
      url: '/commodity/findCommodityList',
      data: {
        commodityTypeId
      }
    })
  }

  /**查询商品详情
   *
   */
  static async findCommodityById(id) {
    return request({
      method: 'GET',
      url: '/commodity/findCommodityById/' + id
    })
  }

  /**获取购物车列表
   *
   * @param userId
   */
  static async findShoppingCartList(userId) {
    return request({
      method: 'GET',
      url: '/shoppingCart/findShoppingCartList',
      data: {
        userId
      }
    })
  }

  /**添加到购物车
   *
   * @param commodityId - 商品id
   * @param num - 商品数量
   * @param userId - 用户id
   */
  static async addShoppingCart(commodityId, num, userId) {
    return request({
      method: 'POST',
      url: '/shoppingCart/addShoppingCart',
      data: {
        commodityId,
        num,
        userId
      }
    })
  }

  /**删除购物车商品
   *
   * @param id - 商品id
   */
  static async delShoppingCart(id) {
    return request({
      method: 'delete',
      url: '/shoppingCart/delShoppingCart/' + id
    })
  }

  /**
   * 查询积分信息
   * @param limit - 每页条数
   * @param page - 页码
   */
  static async findIntegralConfigList(limit, page) {
    return request({
      method: 'GET',
      url: '/WxIntegralConfig/findIntegralConfigList',
      data: {
        limit,
        page
      }
    })
  }

  /**
   * 查询探店
   * @param limit - 每页条数
   * @param page - 页码
   */
  static async findTandianList(typeId, limit, page) {
    return request({
      method: 'GET',
      url: '/tandian/findTandianList',
      data: {
        typeId,
        limit,
        page
      }
    })
  }

  /**
   * 查询探店详情
   * @param tandianId
   */
  static async findDetailsByTandianId(tandianId) {
    return request({
      method: 'GET',
      url: '/tandian/findDetailsByTandianId',
      data: {
        tandianId
      }
    })
  }

  /**
   * 查询探店的店铺类型
   * @param limit - 每页条数
   * @param page - 页码
   */
  static async findTandianTypeList(limit, page) {
    return request({
      method: 'GET',
      url: '/tandianType/findTandianTypeList',
      data: {
        limit,
        page
      }
    })
  }

  /**
   * 查询探店菜单
   * @param limit - 每页条数
   * @param page - 页码
   */
  static async findTandianMenu(limit, page) {
    return request({
      method: 'GET',
      url: '/tandianMenu/findTandianMenu',
      data: {
        limit,
        page
      }
    })
  }

  /**
   * 添加收藏探店
   * @param userId
   * @param tandianId - 探店id
   */
  static async addTandianCollect(userId, tandianId) {
    return request({
      method: 'POST',
      url: '/tandianCollect/addTandianCollect',
      data: {
        userId,
        tandianId
      }
    })
  }

  /**
   * 取消收藏探店
   * @param id - 探店id
   */
  static async delTandianCollect(id) {
    return request({
      method: 'DELETE',
      url: '/tandianCollect/delTandianCollect/' + id
    })
  }

  /**
   * 获取收藏的探店列表
   */
  static async findTandianCollect(userId, page, limit) {
    return request({
      method: 'GET',
      url: '/tandianCollect/findTandianCollect',
      data: {
        userId,
        page,
        limit
      }
    })
  }
}

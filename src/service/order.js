import { request } from '@/utils/request'
import { pickValidValues } from '@puckjs/utils/lib/object'

export class OrderService {
  /**创建订单
   *
   * @param orderdetail
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async addOrder(orderdetail) {
    return request({
      method: 'POST',
      url: '/order/addOrder',
      data: {
        creatTime: '2020-10-02 12:00:34',
        orderdetail: JSON.stringify(orderdetail)
      }
    })
  }

  /**根据支付单号校验是否支付
   *
   * @param payNo
   */
  static async isPayByPayNo(payNo) {
    return request({
      method: 'GET',
      url: '/order/isPayByPayNo',
      data: {
        payNo
      }
    })
  }

  /**查询订单列表
   *
   * @param buyUserId -买家用户id
   */
  static async findOrders(buyUserId) {
    return request({
      method: 'GET',
      url: '/order/findByUserIdAndCommodityId',
      data: {
        buyUserId
      }
    })
  }

  /**查询订单详情
   *
   * @param orderNo -订单号
   */
  static async findOrderDetail(orderNo) {
    return request({
      method: 'GET',
      url: '/order/findByUserIdAndCommodityId',
      data: {
        orderNo
      }
    })
  }

  /**修改订单
   *
   * @param id -订单id
   * @param status - 状态：0待付款｜1待发货｜2已发货｜3已收货｜4已完成｜5已退款 ,
   */
  static async upOrder(id, status) {
    return request({
      method: 'PUT',
      url: '/order/upOrder',
      data: {
        id,
        status
      }
    })
  }

  /**删除订单
   *
   * @param id -订单id,
   */
  static async delOrder(id) {
    return request({
      method: 'DELETE',
      url: '/order/delOrder/' + id
    })
  }
}

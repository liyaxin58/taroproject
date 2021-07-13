import { ShopService } from '@/service'
import { uniqueArray } from '@puckjs/utils/lib/helper'

const state = {
  // 添加到 `购物车` 的商品列表
  // 同步到服务器，长期有效
  goodsList: [],

  // 选中的商品
  selectedGoods: []
}

// mutations
const mutations = {
  // 初始化购物车
  INIT_SHOPPING_CART(state, goodsList) {
    state.goodsList = goodsList
  },

  // 添加到购物车
  ADD_TO_SHOPPING_CART(state, goods) {
    state.goodsList.unshift(goods)
  },

  // 更新购物车内某一件商品的信息
  UPDATE_SHOPPING_CART(state, { id, updates }) {
    const index = state.goodsList.findIndex(row => row.id === id)

    if (index > -1) {
      state.goodsList[index] = {
        ...state.goodsList[index],
        ...updates
      }
    }
  },

  // 移除购物车内商品
  REMOVE_SHOPPING_CART(state, id) {
    const index = state.goodsList.findIndex(row => row.id === id)

    if (index > -1) {
      state.goodsList.splice(index, 1)
    }
  },

  // 选中一些商品
  SELECT_GOODS(state, ids) {
    state.selectedGoods = uniqueArray([...state.selectedGoods, ...ids])
  },

  // 取消选中一些商品
  UNSELECT_GOODS(state, ids) {
    state.selectedGoods = state.selectedGoods.filter(row => !ids.includes(row))
  },

  // 清空购物车
  CLEAR_SHOPPING_CART(state) {
    state.goodsList = []
  }
}

// actions
const actions = {
  /**
   * 从服务器同步订单列表
   */
  async getShoppingCart({ commit }, userId) {
    const data = await ShopService.findShoppingCartList(userId)
    commit('INIT_SHOPPING_CART', data)
  },

  /**
   * 立即购买的商品信息
   */
  addPurchaseGoods({ commit }, data) {
    commit('INIT_SHOPPING_CART', data)
  },

  // /**
  //  * 添加商品到购物车
  //  */
  // addToShoppingCart({ commit }, goods) {
  //   commit('ADD_TO_SHOPPING_CART', goods)
  // },
  //
  // /**
  //  * 更新购物车内某一件商品的信息
  //  */
  // updateShoppingCart({ commit }, data) {
  //   commit('UPDATE_SHOPPING_CART', data)
  // },
  //
  // /**
  //  * 从购物车移除商品
  //  */
  // removeShoppingCart({ commit }, id) {
  //   commit('REMOVE_SHOPPING_CART', id)
  // },

  // 选中一些商品
  selectGoods({ commit }, ids) {
    commit('SELECT_GOODS', ids)
  },

  // 取消选中一些商品
  unselectGoods({ commit }, ids) {
    commit('UNSELECT_GOODS', ids)
  }

  // /**
  //  * 清空购物车
  //  */
  // clearInstantCart({ commit }) {
  //   commit('CLEAR_SHOPPING_CART')
  // }
}

export default {
  state,
  actions,
  mutations
}

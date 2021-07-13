import Vue from 'vue'
import Vuex from 'vuex'
import Taro from '@tarojs/taro'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import chatUser from './modules/chatUser'
import address from './modules/address'
import shoppingCart from './modules/shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    chatUser,
    shoppingCart,
    address
  },
  plugins: [
    createPersistedState({
      paths: ['user', 'chatUser', 'shoppingCart', 'address'],
      storage: {
        getItem: key => Taro.getStorageSync(key),
        setItem: (key, value) => Taro.setStorageSync(key, value),
        removeItem: key => Taro.removeStorageSync(key)
      }
    })
  ]
})

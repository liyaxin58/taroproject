import Vue from 'vue'
import Taro from '@tarojs/taro'
import { mapState } from 'vuex'
import store from './store'
import './app.scss'
import { JMessage } from './utils/jmessage'
// Vue.user(Taro)

const jim = new JMessage({
  debug: true
})
const App = new Vue({
  store,
  jim,
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    Taro.jim = jim
    Taro.hideTabBar()
  },

  render(h) {
    return h('block', this.$slots.default)
  }
})

export default App

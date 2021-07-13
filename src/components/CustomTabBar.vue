<template>
  <view class="CustomTabBar">
    <view class="CustomTabBar_container">
      <view
        v-for="(row, index) in list"
        :key="index"
        class="CustomTabBar_item"
        @tap="switchTab(index)"
      >
        <image
          :src="selected === row.id ? row.selectedIconPath : row.iconPath"
        />
      </view>
    </view>
  </view>
</template>

<script>
import taro from '@tarojs/taro'

export default {
  props: {
    selected: String
  },

  data() {
    return {
      list: [
        {
          id: 'home',
          pagePath: '/pages/index/index',
          iconPath: '/assets/tabBar/home.png',
          selectedIconPath: '/assets/tabBar/home-selected.png'
        },
        {
          id: 'mall',
          pagePath: '/pages/mall/index',
          iconPath: '/assets/tabBar/mall.png',
          selectedIconPath: '/assets/tabBar/mall-selected.png'
        },
        {
          id: 'shop',
          pagePath: '/pages/shop/index',
          iconPath: '/assets/tabBar/shop.png',
          selectedIconPath: '/assets/tabBar/shop-selected.png'
        },
        {
          id: 'user',
          pagePath: '/pages/user/index',
          iconPath: '/assets/tabBar/user.png',
          selectedIconPath: '/assets/tabBar/user-selected.png'
        }
      ]
    }
  },

  methods: {
    switchTab(index) {
      taro.switchTab({
        url: this.list[index].pagePath
      })
    }
  }
}
</script>

<style lang="scss">
.CustomTabBar {
  background: #fff;
  border-top-left-radius: 23px;
  border-top-right-radius: 23px;
  box-shadow: 0px -4px 7px 0px rgba(174, 174, 174, 0.5);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  user-select: none;
  z-index: 9;

  position:fixed;
  left:0;
  bottom:0;
  height:49px;
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;

  .CustomTabBar_container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .CustomTabBar_item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 46px;

    image {
      width: 27px;
      height: 27px;
    }
  }
}
</style>

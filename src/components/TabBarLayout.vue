<template>
  <view class="TabBarLayout">
    <view class="TabBarLayout_container">
      <slot></slot>
    </view>
    <CustomTabBar :selected="selectTab" />
  </view>
</template>

<script>
import CustomTabBar from './CustomTabBar'

export default {
  components: { CustomTabBar },

  props: {
    selectTab: String
  }
}
</script>

<style lang="scss">
.TabBarLayout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.TabBarLayout_container {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>

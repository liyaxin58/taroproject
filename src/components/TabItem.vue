<template>
  <view
    class="TabItem"
    :class="{
      TabItem_active: index === active
    }"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: null
    }
  },

  computed: {
    active() {
      return this.$parent.internalActive
    }
  }
}
</script>

<style lang="scss">
.TabItem {
  display: none;

  &.TabItem_active {
    display: initial;
  }
}
</style>

<template>
  <view
    class="TabNav"
    :class="{
      TabNav_active: index === active
    }"
    @tap="handleClick"
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
  },

  methods: {
    handleClick() {
      this.$parent.internalActive = this.index
      this.$parent.$emit('onChange', this.index)
    }
  }
}
</script>

<style lang="scss"></style>

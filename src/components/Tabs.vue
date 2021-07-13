<template>
  <view class="Tabs">
    <view class="Tabs_navs">
      <slot name="nav"></slot>
    </view>
    <view class="Tabs_content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { isValid } from '@puckjs/utils/lib/helper'

function isComponent(row, name) {
  return row.componentOptions && row.componentOptions.tag === name
}

export default {
  props: {
    active: Number
  },

  data() {
    return {
      internalActive: 0,
      tabs: []
    }
  },

  updated() {
    this.updateSlots()
  },

  mounted() {
    this.updateSlots()
  },

  methods: {
    updateSlots() {
      if (isValid(this.$slots.nav)) {
        const navs = this.$slots.nav.filter(row => isComponent(row, 'TabNav'))

        navs.forEach((row, index) => {
          row.componentInstance.index = index
        })
      }

      if (isValid(this.$slots.default)) {
        const contents = this.$slots.default.filter(row =>
          isComponent(row, 'TabItem')
        )

        contents.forEach((row, index) => {
          row.componentInstance.index = index
        })
      }

      this.internalActive = this.active || this.internalActive || 0
    }
  }
}
</script>

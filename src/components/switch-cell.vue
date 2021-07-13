<template>
  <view>
    <van-cell :title="title" :size="size">
      <slot>
        <van-switch
          :checked="value"
          :active-color="switchActiveColor"
          :size="switchSize"
          @change="onChange"
        />
      </slot>
    </van-cell>
  </view>
</template>

<script>
export default {
  props: {
    name: String,
    title: String,
    value: Object,
    size: String,
    switchActiveColor: String,
    switchSize: String
  },

  methods: {
    onChange(event) {
      this.$emit('change', this.name, event.detail, event)
    }
  }
}
</script>

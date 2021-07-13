<template>
  <view class="PostInput" @tap="stopPropagation">
    <view class="PostInput_icon">
      <image src="https://s3.ax1x.com/2021/02/04/ylo0x0.png" />
    </view>
    <input
      :value="value"
      class="PostInput_input"
      placeholder="请输入您的评论"
      confirm-type="send"
      @confirm="handleConfirm"
    />
  </view>
</template>

<script>
export default {
  name: 'PostInput',

  props: {
    postId: [String, Number]
  },

  data() {
    return {
      value: null
    }
  },

  methods: {
    handleConfirm(event) {
      this.$emit('confirm', event.detail.value, this.postId)
      this.value = ''
    },

    stopPropagation(event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang='scss'>
.PostInput {
  position: relative;
  background-color: rgba(10, 111, 251, 0.14);
  border-radius: 18px;
  font-size: 14px;
  padding: 5px 15px;

  input {
    padding: 0 20px 0 40px;
  }

  .PostInput_icon {
    position: absolute;
    left: 20px;
    top: 50%;
    margin-top: -8px;

    &,
    image {
      width: 16px;
      height: 16px;
    }
  }
}
</style>

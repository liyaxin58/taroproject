<template>
  <view class="UserCell" @tap="onTap">
    <view class="cell-left">
      <image class="cell-cover" :src="iconUrl" />
      <view class="cell-name">{{ cellName }}</view>
    </view>
    <image class="cell-right" src="~@/assets/user/arrowhead.png" />
  </view>
</template>

<script>
export default {
  props: {
    cellName: String,
    iconUrl: String
  },

  methods: {
    onTap(event) {
      this.$emit('onTap')
    }
  }
}
</script>

<style lang="scss">
.UserCell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f7f7f7;
  margin: 0 20px;

  .cell-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .cell-cover {
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }

    .cell-name {
      font-size: 13px;
      font-weight: 400;
      color: #383838;
    }
  }

  .cell-right {
    width: 11px;
    height: 19px;
  }
}
</style>

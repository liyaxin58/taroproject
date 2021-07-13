<template>
  <!--发帖内容-->
  <view class="card-body">
    <view class="title">
      {{ content }}
    </view>
    <view v-if="imgUrl && imgUrl.length > 0" class="picture">
      <image
        v-for="(row, index) in imgUrl"
        :key="index"
        class="card-like"
        :src="row"
        :mode="aspectFill"
      />
    </view>
  </view>
</template>


<script>
export default {
  props: {
    //  文章内容
    content: String,
    // 照片地址
    imgUrl: Array
  },

  methods: {}
}
</script>

<style lang="scss">
// 发帖内容
.card-body {
  margin: 15px 0 0;

  .title {
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    color: #000;
    max-height: 200px;
    overflow: scroll;
  }

  .picture {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0px;
    margin-top: 10px;

    image {
      width: 100px;
      height: 100px;
      background: #d8d8d8;
      margin: 2px;
    }
  }
}
</style>

<template>
  <view class="CategoryNav">
    <view class="top">
      <swiper
       :autoplay="autoplay"
      :circular="circular"
      :vertical="vertical"
      :interval="interval"
      :duration="duration"
      previous-margin="0px"
      next-margin="0px"
      :current="current"
        @change="swiperChange"
        :style="`height: calc((100vw - 18px)/${capacity})`"
      >
        <swiper-item
          v-for="(categories, groupIndex) in groups"
          :key="groupIndex"
        >
          <view class="CategoryNav_group">
            <view
              v-for="root in categories"
              :key="root.id"
              class="CategoryNav_group_item"
              :style="`width: ${100 / capacity}%`"
              @tap="handleRootClick(root.id)"
            >
              <view class="CategoryNav_icon">
                <image :src=" activeRootId === root.id ? root.clickImgUrl : root.imgUrl " />
              </view>
              <view class="CategoryNav_name" :style="`color: ${root.background}`" >
                {{ root.name }}
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <view v-if="children.length < 1" class="dots">
        <block v-for="(categories, index) in groups" :key="index">
          <view class="dot" :class="index == current ? 'active' : ''"></view>
        </block>
      </view>
      <view v-if="children.length > 0" class="CategoryNav_children">
        <view
          class="CategoryNav_children_container"
          :style="{
            background: activeRootCategory.background
          }"
        >
          <view
            v-for="child in children"
            :key="child.id"
            class="CategoryNav_child_item"
            :class="{
              CategoryNav_child_item_active: child.id === activeChildId
            }"
            @tap="handleChildClick(child.id)"
          >
            {{ child.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { isValidArray } from '@puckjs/utils/lib/helper'

export default {
  props: {
    // 数据结构
    // interface {
    //   id number
    //   name string
    //   iconUrl string
    //   activeIconUrl string
    //   background string
    //   children [
    //     {
    //       id number
    //       name string
    //     }
    //   ]
    // }
    categories: {
      type: Array,
      default: () => []
    },
    // 每页可容纳分类数量
    capacity: {
      type: Number,
      default: 5
    }
  },

  computed: {
    groups() {
      const len = this.categories.length
      const maxSize = Math.ceil(len / this.capacity)
      const groups = []

      for (let index = 0; index < maxSize; index++) {
        const start = index * this.capacity
        const end = Math.min(len, (index + 1) * this.capacity)

        groups.push(this.categories.slice(start, end))
      }

      return groups
    },

    activeRootCategory() {
      return this.categories.find(root => root.id === this.activeRootId)
    },

    children() {
      const activeRootCategory = this.activeRootCategory

      if (!activeRootCategory) {
        return []
      }

      const children = activeRootCategory.children
      return isValidArray(children) ? children : []
    }
  },

  data() {
    return {
      // 选中的父分类
      activeRootId: null,
      // 选中的子分类
      activeChildId: null,
      // 是否自动切换
      autoplay: false,

      // 是否显示面板指示点
      // indicatorDots: true,

      // 是否采用衔接滑动
      circular: false,

      // 滑动方向是否为纵向
      vertical: false,

      // 自动切换时间间隔
      interval: 5000,

      // 滑动动画时长
      duration: 500,

      current: 0,
      currentIdex:0
    }
  },

  mounted() {
    if (isValidArray(this.categories)) {
      this.activeRootId = this.categories[0].id
      this.handleRootClick(this.activeRootId)
    }
  },

  methods: {
    swiperChange(e) {
      console.log(e);
      this.current =  e.detail.current
      // this.currentIdex = e.detail.current
    },

    handleRootClick(rootId) {
      this.activeRootId = rootId

      if (this.children.length > 0) {
        this.handleChildClick(this.children[0].id)
      } else {
        this.$emit('change', rootId)
      }
    },

    handleChildClick(childId) {
      this.activeChildId = childId
      this.$emit('change', childId)
    }
  }
}
</script>

<style lang="scss">
.CategoryNav {
  .top {
    position: relative;
  }

  .dots {
    height: 17px;
    display: flex;
    justify-content: center;
    z-index: 1;
  }

  .dot {
    margin: 0 25px;
    width: 10px;
    height: 10px;
    background: #d8d8d8;
    border-radius: 50%;
    transition: all 0.6s;
  }

  .active {
    background: #0a6ffb;
  }

  .CategoryNav_icon {
    position: relative;
    overflow: hidden;
    width: 40px;
    //width: 100%;
    min-height: 40px;
    margin: 0 auto;

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    image {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: none;
      margin: auto;
    }
  }

  //.CategoryNav_group,
  //.CategoryNav_group_item {
  //  height: 100%;
  //}

  .CategoryNav_group {
    display: flex;
  }

  .CategoryNav_name {
    text-align: center;
    font-size: 12px;
    padding-top: 3px;
  }

  .CategoryNav_children {
    padding-bottom: 20px;
  }

  .CategoryNav_children_container {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 20px;
    z-index: 2;
    transition: all 0.6s;
  }

  .CategoryNav_child_item {
    padding: 5px 15px;
    font-size: 12px;
    background: #fff;
    border-radius: 6px;
  }

  .CategoryNav_child_item_active {
    background: #000;
    color: #fff;

    .post-box {
      height: 202px;
    }
  }
}
</style>

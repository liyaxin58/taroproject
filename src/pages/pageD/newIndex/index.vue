<template>
  <view class="newIndex">
    <!-- 导航栏 -->
    <PageTitle pageTitle="我的物品" />
    <view class="tabs">
      <!-- tab栏 -->
      <view class="box">
        <view
          class="box_item"
          v-for="(item, index) in btnList"
          :key="index"
          :class="navIndex == index ? 'item' : ''"
          @tap="itemClick(index)"
          >{{ item.title }}
        </view>
      </view>
      <!-- 无数据 添加按钮 -->
      <view
        class="content"
        @tap="addClick(0)"
        v-if="navIndex == 0 && list.length < 1 && hide"
      >
        <view class="title">添加校园卡</view>
      </view>
      <view
        class="content"
        @tap="addClick(1)"
        v-if="navIndex == 1 && list.length < 1 && hide1"
      >
        <view class="title">添加车辆信息</view>
      </view>
      <view
        class="content"
        @tap="addClick(2)"
        v-if="navIndex == 2 && list.length < 1 && hide2"
      >
        <view class="title">添加其他信息</view>
      </view>
      <view class="add" v-if="!hide && navIndex == 0">
        <van-uploader
          :file-list="fileList"
          preview-size="100px"
          :multiple="true"
          max-count="6"
          accept="image"
          @after-read="handleSelect"
          @delete="handleRemove"
        />
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>姓名：</view>
          <input type="text" placeholder="请输入" v-model="card.name" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>学院：</view>
          <input type="text" placeholder="请输入" v-model="card.college" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>学号：</view>
          <input type="text" placeholder="请输入" v-model="card.studentNo" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>ID号：</view>
          <input type="text" placeholder="请输入" v-model="card.idNo" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>序列号：</view>
          <input type="text" placeholder="请输入" v-model="card.serialNo" />
        </view>
        <view class="submit" v-if="!hide && change" @tap="submitForm(0)"
          >确定
        </view>
        <view class="submit" v-if="!hide && !change" @tap="submit(0)"
          >确定修改
        </view>
      </view>
      <!-- 添加车辆信息 -->
      <view class="add" v-if="!hide1 && navIndex == 1">
        <van-uploader
          :file-list="fileList"
          preview-size="100px"
          :multiple="true"
          max-count="6"
          accept="image"
          @after-read="handleSelect"
          @delete="handleRemove"
        />
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>车牌：</view>
          <input type="text" placeholder="请输入" v-model="car.sort" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>颜色：</view>
          <input type="text" placeholder="请输入" v-model="car.colour" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>描述信息：</view>
          <textarea
            v-model="car.description"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="请输入"
          ></textarea>
        </view>
        <view class="submit" v-if="!hide1 && change" @tap="submitForm(1)"
          >确定
        </view>
        <view class="submit" v-if="!hide1 && !change" @tap="submit(1)"
          >确定修改
        </view>
      </view>
      <!-- 添加其他信息 -->
      <view class="add" v-if="!hide2 && navIndex == 2">
        <van-uploader
          :file-list="fileList"
          preview-size="100px"
          :multiple="true"
          max-count="6"
          accept="image"
          @after-read="handleSelect"
          @delete="handleRemove"
        />
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>种类：</view>
          <input type="text" placeholder="请输入" v-model="car.sort" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>颜色：</view>
          <input type="text" placeholder="请输入" v-model="car.colour" />
        </view>
        <view class="add_ipt" style="margin-top: 25rpx">
          <view>描述信息：</view>
          <textarea
            v-model="car.description"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="请输入"
          ></textarea>
        </view>
        <view class="submit" v-if="!hide2 && change" @tap="submitForm(2)"
          >确定
        </view>
        <view class="submit" v-if="!hide2 && !change" @tap="submit(2)"
          >确定修改
        </view>
      </view>
      <!-- 搜索框 -->
      <view class="ser" v-if="ser">
        <input
          type="text"
          placeholder="校园卡/车牌号"
          placeholder-style="color:#a2a2a2"
          v-model="numberOrname"
        />
        <van-icon name="search" color="#0A6FFB" size="20" @tap="serachSub" />
      </view>
      <!-- 校园卡列表 -->
      <view
        class="box_list"
        v-if="navIndex == 0 && change"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="list_img">
          <image :src="item.imgUrl"></image>
        </view>
        <view class="list_text">
          <text>姓名：</text>
          <text>{{ item.name }}</text>
        </view>
        <view class="list_text">
          <text>学院：</text>
          <text>{{ item.college }}</text>
        </view>
        <view class="list_text">
          <text>学号：</text>
          <text>{{ item.studentNo }}</text>
        </view>
        <view class="list_text">
          <text>ID号：</text>
          <text>{{ item.idNo }}</text>
        </view>
        <view class="list_text">
          <text>序列号：</text>
          <text>{{ item.serialNo }}</text>
        </view>
        <view class="list_change" @tap="changeClick(0, item)">修改</view>
      </view>
      <!-- 车 列表 -->
      <view
        class="box_list"
        v-if="navIndex == 1 && change"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="list_img">
          <image :src="item.imgUrl"></image>
        </view>
        <view class="list_text">
          <text>车牌：</text>
          <text>{{ item.sort }}</text>
        </view>
        <view class="list_text">
          <text>颜色：</text>
          <text>{{ item.colour }}</text>
        </view>
        <view class="list_description">
          <view>物品信息描述：</view>
          <view>{{ item.description }}</view>
        </view>
        <view class="list_change" @tap="changeClick(1, item)">修改</view>
      </view>
      <!-- 其他物品列表 -->
      <view
        class="box_list"
        v-if="navIndex == 2 && change"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="list_img">
          <image :src="item.imgUrl"></image>
        </view>
        <view class="list_text">
          <text>种类：</text>
          <text>{{ item.sort }}</text>
        </view>
        <view class="list_text">
          <text>颜色：</text>
          <text>{{ item.colour }}</text>
        </view>
        <view class="list_description">
          <view>物品信息描述：</view>
          <view>{{ item.description }}</view>
        </view>
        <view class="list_change" @tap="changeClick(2, item)">修改</view>
      </view>
      <!-- 悬浮按钮 -->
      <view class="search" v-if="but" @tap="searchClick">
        <image src="~@/assets/search.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { clone } from '@puckjs/utils/lib/clone'
import { mapState } from 'vuex'
import { UserService } from '@/service'
import { uploadFile } from '@/utils/request'

export default {
  components: { PageTitle },
  data() {
    return {
      but: true,
      ser: false, //控制搜索框
      change: true, //控制数据列表
      hide: true, //控制校园卡
      hide1: true, //控制车
      hide2: true, //控制其他信息
      // 上传的文件列表
      fileList: [], //图片列表
      list: [], //数据列表
      btnList: [
        { id: 0, title: '校园卡' },
        { id: 1, title: '车辆信息' },
        { id: 2, title: '其他物品' }
      ],
      //校园卡数据对象
      card: {
        college: '',
        idNo: '',
        name: '',
        studentNo: '',
        serialNo: ''
      },
      //车辆数据对性
      car: {
        sort: '', //车牌
        colour: '', //颜色
        description: '' //描述信息
      },
      navIndex: 0, //控制tab栏切换
      istype: 0,
      numberOrname: '',
      xyId: '' //数据id
    }
  },

  computed: {
    // 获取用户信息
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  onShow() {
    // 获取数据
    this.getList()
  },

  methods: {
    //控制搜索框显示与隐藏
    searchClick() {
      this.ser = !this.ser
    },

    //获取数据列表
    async getList() {
      const params = {
        userId: this.userInfo.id,
        numberOrname: this.numberOrname,
        type: this.istype,
        limit: 10,
        page: 1
      }
      const res = await UserService.findPostWp(params)
      console.log(res)
      this.list = res
    },

    //切换tab栏
    itemClick(index) {
      if (index == 0) {
        this.but = true
        this.hide = true
        this.change = true //切换tab栏 数据列表显示
      } else if (index == 1) {
        this.but = true
        this.hide1 = true
        this.change = true //切换tab栏 数据列表显示
      } else {
        this.but = true
        this.hide2 = true
        this.change = true //切换tab栏 数据列表显示
      }
      this.navIndex = index
      this.istype = index
      this.getList()
    },

    //点击添加 隐藏添加界面
    addClick(index) {
      if (index == 0) {
        this.hide = false
      } else if (index == 1) {
        this.hide1 = false
      } else {
        this.hide2 = false
      }
    },

    //修改确定事件
    async submit(index) {
      if (index == 0) {
        const uploadPromises = this.fileList.map(file => {
          return uploadFile({
            filePath: file.url,
            name: 'file'
          })
        })
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')
        let params = {
          imgUrl,
          userId: this.userInfo.id,
          college: this.card.college,
          idNo: this.card.idNo,
          name: this.card.name,
          serialNo: this.card.serialNo,
          studentNo: this.card.studentNo,
          id: this.xyId
        }
        const res = await UserService.updateSchoolCardInfo(params)
        console.log(res)
        Taro.showToast({
          title: '修改成功',
          icon: 'none'
        })
        Taro.switchTab({
          url: '/pages/index/index'
        })
      } else if (index == 1) {
        const uploadPromises = this.fileList.map(file => {
          return uploadFile({
            filePath: file.url,
            name: 'file'
          })
        })
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')
        let params = {
          imgUrl,
          userId: this.userInfo.id,
          colour: this.car.colour,
          sort: this.car.sort,
          description: this.car.description,
          id: this.xyId,
          type: this.istype
        }
        const res = await UserService.updateCarGoodsInfo(params)
        console.log(res)
        Taro.showToast({
          title: '修改成功',
          icon: 'none'
        })
        Taro.switchTab({
          url: '/pages/index/index'
        })
      } else if (index == 2) {
        const uploadPromises = this.fileList.map(file => {
          return uploadFile({
            filePath: file.url,
            name: 'file'
          })
        })
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')
        let params = {
          imgUrl,
          userId: this.userInfo.id,
          colour: this.car.colour,
          sort: this.car.sort,
          description: this.car.description,
          id: this.xyId,
          type: this.istype
        }
        const res = await UserService.updateCarGoodsInfo(params)
        console.log(res)
        Taro.showToast({
          title: '修改成功',
          icon: 'none'
        })
        Taro.switchTab({
          url: '/pages/index/index'
        })
      }
    },

    //添加数据事件
    async submitForm(index) {
      if (index == 0) {
        const uploadPromises = this.fileList.map(file => {
          return uploadFile({
            filePath: file.url,
            name: 'file'
          })
        })
        if (this.card.name == '') {
          return Taro.showToast({
            title: '姓名不能为空',
            icon: 'none'
          })
        }
        if (this.card.college == '') {
          return Taro.showToast({
            title: '学院不能为空',
            icon: 'none'
          })
        }
        if (this.card.studentNo == '') {
          return Taro.showToast({
            title: '学号不能为空',
            icon: 'none'
          })
        }
        if (this.card.idNo == '') {
          return Taro.showToast({
            title: 'ID不能为空',
            icon: 'none'
          })
        }
        if (this.card.serialNo == '') {
          return Taro.showToast({
            title: '序列号不能为空',
            icon: 'none'
          })
        }
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')
        const res = await UserService.addSchoolCardInfo({
          imgUrl,
          userId: this.userInfo.id,
          college: this.card.college,
          idNo: this.card.idNo,
          name: this.card.name,
          serialNo: this.card.serialNo,
          studentNo: this.card.studentNo
        })
        console.log('UserService', res)
        Taro.switchTab({
          url: '/pages/index/index'
        })
      } else if (index == 1) {
        const uploadPromises = this.fileList.map(file => {
          return uploadFile({
            filePath: file.url,
            name: 'file'
          })
        })
        if (this.car.sort == '') {
          return Taro.showToast({
            title: '车牌不能为空',
            icon: 'none'
          })
        }
        if (this.car.colour == '') {
          return Taro.showToast({
            title: '颜色不能为空',
            icon: 'none'
          })
        }
        if (this.car.description == '') {
          return Taro.showToast({
            title: '信息不能为空',
            icon: 'none'
          })
        }
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')
        const res = await UserService.insertBindinfo({
          imgUrl,
          userId: this.userInfo.id,
          sort: this.car.sort, //车牌
          colour: this.car.colour, //颜色
          description: this.car.description, //描述信息
          type: 1
        })
        console.log('UserService', res)
        Taro.switchTab({
          url: '/pages/index/index'
        })
      } else if (index == 2) {
        const uploadPromises = this.fileList.map(file => {
          return uploadFile({
            filePath: file.url,
            name: 'file'
          })
        })
        if (this.car.sort == '') {
          return Taro.showToast({
            title: '种类不能为空',
            icon: 'none'
          })
        }
        if (this.car.colour == '') {
          return Taro.showToast({
            title: '颜色不能为空',
            icon: 'none'
          })
        }
        if (this.car.description == '') {
          return Taro.showToast({
            title: '信息不能为空',
            icon: 'none'
          })
        }
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')
        const res = await UserService.insertBindinfo({
          imgUrl,
          userId: this.userInfo.id,
          sort: this.car.sort, //车牌
          colour: this.car.colour, //颜色
          description: this.car.description, //描述信息
          type: 2
        })
        console.log('UserService', res)
        Taro.switchTab({
          url: '/pages/index/index'
        })
      }
    },

    //点击修改后 数据回显事件
    changeClick(index, item) {
      this.but = false
      if (index == 0) {
        this.hide = false // 点击修改 1添加隐藏 2添加 数据回显界面展示
        this.change = false //点击修改 数据列表隐藏
        this.card.name = item.name
        this.card.college = item.college
        this.card.studentNo = item.studentNo
        this.card.idNo = item.idNo
        this.card.serialNo = item.serialNo
        this.xyId = item.id
      } else if (index == 1) {
        this.hide1 = false // 点击修改 1添加隐藏 2添加 数据回显界面展示
        this.change = false //点击修改 数据列表隐藏
        this.car.sort = item.sort
        this.car.colour = item.colour
        this.car.description = item.description
        this.xyId = item.id
      } else if (index == 2) {
        this.hide2 = false // 点击修改 1添加隐藏 2添加 数据回显界面展示
        this.change = false //点击修改 数据列表隐藏
        this.car.sort = item.sort
        this.car.colour = item.colour
        this.car.description = item.description
        this.xyId = item.id
      }
    },

    //搜索事件
    serachSub() {
      this.getList()
    },

    // 上传
    handleSelect(event) {
      console.log(event)
      this.fileList = [
        ...this.fileList,
        ...event.detail.file.map(r => ({
          url: r.url,
          deletable: true
        }))
      ]
      console.log(this.fileList)
    },

    // 上传
    handleRemove(event) {
      // 必须要 clone 才可以删除图片
      const fileList = clone(this.fileList)
      fileList.splice(event.detail.index, 1)
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
  box-sizing: border-box;
}
.newIndex {
  .tabs {
    margin: 15px;
    .box {
      width: 100%;
      height: 54rpx;
      margin-top: 25rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .box_item {
      width: 136rpx;
      height: 54rpx;
      border-radius: 11rpx;
      background: #f3f3f3;
      box-shadow: 2rpx 2rpx 4rpx 0rpx rgba(160, 160, 160, 1),
        -2rpx -2rpx 2rpx 0rpx rgba(255, 255, 255, 1);
      color: #000;
      font-size: 22rpx;
      text-align: center;
      line-height: 54rpx;
    }
    .item {
      background-color: #0a6ffb;
      color: #ffffff;
    }
    .content {
      width: 100%;
      margin-top: 36rpx;
      height: 565rpx;
      background-color: #fff;
      box-shadow: 0rpx 4rpx 7rpx 0rpx rgba(168, 168, 168, 0.5);
      border-radius: 16rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      font-size: 49rpx;
      color: #0a6ffb;
    }
    .add {
      width: 100%;
      // height: 812rpx;
      margin-top: 36rpx;
      background-color: #fff;
      box-shadow: 0rpx 4rpx 7rpx 0rpx rgba(168, 168, 168, 0.5);
      border-radius: 16rpx;
      padding: 60rpx 38rpx 24rpx;
      box-sizing: border-box;
    }
    .add_ipt {
      display: flex;
      align-items: center;
      view {
        width: 110rpx;
        color: #5b5b5b;
        font-size: 25rpx;
      }
      textarea {
        width: 368rpx;
        height: 161rpx;
        background-color: #f3f3f3;
        margin-left: 10rpx;
        font-size: 25rpx;
        padding: 10rpx;
        box-sizing: border-box;
      }
      input {
        width: 312rpx;
        height: 42rpx;
        background-color: #f3f3f3;
        margin-left: 10rpx;
        font-size: 25rpx;
        padding-left: 10rpx;
        box-sizing: border-box;
      }
    }
    .submit {
      width: 145rpx;
      height: 47rpx;
      border-radius: 5rpx;
      border: 1rpx solid #0a6ffb;
      font-size: 22rpx;
      color: #0a6ffb;
      margin-top: 35rpx;
      text-align: center;
      line-height: 47rpx;
      box-shadow: 1rpx 1rpx 2rpx 0rpx rgba(160, 160, 160, 1),
        -1rpx -1rpx 1rpx 0px rgba(255, 255, 255, 1);
    }
    .box_list {
      height: 621rpx;
      width: 100%;
      background-color: #fff;
      margin-top: 35rpx;
      box-shadow: 0rpx 4rpx 7rpx 0rpx rgba(168, 168, 168, 0.5);
      border-radius: 16rpx;
      padding: 20px 35rpx 0;
      box-sizing: border-box;
      position: relative;
      .list_img {
        width: 100%;
        height: 350rpx;
        background-color: #f2f2f2;
        border-radius: 20rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
      .list_text {
        display: flex;
        align-items: center;
        margin-top: 20rpx;
        text:nth-child(1) {
          font-size: 18rpx;
          color: #5b5b5b;
          width: 120rpx;
        }
        text:nth-child(2) {
          font-size: 18rpx;
          color: #000000;
          margin-left: 10rpx;
        }
      }
      .list_description {
        margin-top: 20rpx;
        display: flex;
        flex-direction: column;
        view:nth-child(1) {
          font-size: 18rpx;
          color: #5b5b5b;
          width: 120rpx;
        }
        view:nth-child(2) {
          width: 350rpx;
          padding: 15rpx 10rpx;
          box-sizing: border-box;
          background-color: #0a6ffb;
          font-size: 18rpx;
          color: #ffffff;
          margin-top: 10rpx;
          border-radius: 7rpx;
          word-wrap: break-word;
          word-break: normal;
        }
      }
      .list_change {
        font-size: 18rpx;
        color: #0a6ffb;
        position: absolute;
        left: 620rpx;
        bottom: 40rpx;
      }
    }
    .search {
      width: 85rpx;
      height: 85rpx;
      border-radius: 50%;
      position: fixed;
      right: 38rpx;
      bottom: 230rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .ser {
      width: 100%;
      margin-top: 20rpx;
      border-radius: 20rpx;
      height: 67rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 7rpx 0rpx rgba(111, 111, 111, 0.5),
        0rpx 4rpx 7rpx 0rpx rgba(223, 223, 223, 0.5);
      display: flex;
      justify-content: space-around;
      align-items: center;
      input {
        width: 500rpx;
        height: 100%;
        padding: 0 15rpx;
        box-sizing: border-box;
        font-size: 18rpx;
      }
    }
  }
}
</style>

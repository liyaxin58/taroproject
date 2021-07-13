<template>
  <view class="identity-page">
    <PageTitle pageTitle="身份认证" />
    <view class="identity-header">选择角色</view>
    <view class="identity-body">
      <Tabs @onChange="dqChage">
        <slot slot="nav">
          <TabNav>在校生</TabNav>
          <TabNav>校友</TabNav>
          <TabNav>艺考生</TabNav>
          <TabNav>游客</TabNav>
        </slot>

        <!--在校生-->
        <TabItem class="xs_suist">
          <view class="xs_sjetwt"></view>

          <view class="form">
            <view class="fo_list">
              <view class="fo_nameleft">姓名：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="name"
                /></view>
              </view>
            </view>
            <!-- <picker mode="selector" :range="xBList" :value="xBNumber" @change="xBChange($event)"> -->
              <view class="fo_list">
                <view class="fo_nameleft">性别：</view>
                <view class="fo_siet">
                  <!-- <view class="fo_input" >
                    <input disabled type="text" v-model="sex"/>
                  </view> -->
                  <view class="fo_viesxb">
                    <view
                      :class="['fo_vieitem', sex == 1 ? 'fovieselect' : '']"
                      @tap="sex = 1"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvn.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 2 ? 'fovieselect' : '']"
                      @tap="sex = 2"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_wcv.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 3 ? 'fovieselect' : '']"
                      @tap="sex = 3"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvw.png"
                    /></view>
                  </view>
                </view>
              </view>
            <!-- </picker> -->
            <picker mode="date" @change="onDateChange($event)">
              <view class="fo_list">
                <view class="fo_nameleft">生日：</view>
                <view class="fo_siet">
                  <view class="fo_input"
                    ><input disabled type="text" v-model="birthday"
                  /></view>
                </view>
              </view>
            </picker>
            <!-- <view class="fo_list">
              <view class="fo_nameleft">学院：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="school"
                /></view>
              </view>
            </view> -->
            <picker mode="selector" :range="xxList" :value="xxNumber" @change="xyChange($event)">
              <view class="fo_list">
                <view class="fo_nameleft">学院：</view>
                <view class="fo_siet">
                  <view class="fo_input"><input disabled type="text" v-model="school"></view>
                </view>
              </view>
            </picker>

            <view class="fo_list">
              <view class="fo_nameleft">专业：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="profession"
                /></view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">手机：</view>
              <view class="fo_siet fo_flex">
                <view class="fo_input" >
                  <input type="text" v-model="phone" />
                  
                </view>
                <view class="fo_yzm" @tap="getCodeClick" v-if="getNumber == 60">获取验证码</view>
                  <view class="fo_yzm" v-else>{{ getNumber }}后获取</view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">验证码：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="code"
                /></view>
              </view>
            </view>
            <view class="upload">
              <view class="upload-title">上传学生证明</view>
              <view class="tip"
                >（请上传带有个人信息的校园卡、学生证或学习证明）
              </view>
              <view class="IDCardUploader">
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-if="!zmImage1">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-else><image :src="zmImage1" /></view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-if="!zmImage2">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-else><image :src="zmImage2" /></view>

              </view>
              <!-- <IDCardUploader @change="handleUploadChange" /> -->
              <view class="tip"
                >注意：身份验证需要后台审核，约在一个工作日内完成，请耐心等待。
              </view>
            </view>
          </view>

          <view class="submit" @tap="handleSubmit"> 确认</view>
          <!-- <Student student-or-alumni="0" /> -->
        </TabItem>

        <!--校友-->
        <TabItem class="xs_suist">
          <view class="xs_sjetwt2"></view>

          <view class="form">
            <view class="fo_list">
              <view class="fo_nameleft">姓名：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="name"
                /></view>
              </view>
            </view>
            <!-- <picker mode="selector" :range="xBList" :value="xBNumber" @change="xBChange($event)"> -->
              <view class="fo_list">
                <view class="fo_nameleft">性别：</view>
                <view class="fo_siet">
                  <!-- <view class="fo_input" >
                    <input disabled type="text" v-model="sex"/>
                  </view> -->
                  <view class="fo_viesxb">
                    <view
                      :class="['fo_vieitem', sex == 1 ? 'fovieselect' : '']"
                      @tap="sex = 1"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvn.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 2 ? 'fovieselect' : '']"
                      @tap="sex = 2"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_wcv.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 3 ? 'fovieselect' : '']"
                      @tap="sex = 3"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvw.png"
                    /></view>
                  </view>
                </view>
              </view>
            <!-- </picker> -->
            <picker mode="date" @change="onDateChange($event)">
              <view class="fo_list">
                <view class="fo_nameleft">生日：</view>
                <view class="fo_siet">
                  <view class="fo_input"
                    ><input disabled type="text" v-model="birthday"
                  /></view>
                </view>
              </view>
            </picker>
            <!-- <view class="fo_list">
              <view class="fo_nameleft">学院：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="school"
                /></view>
              </view>
            </view> -->
            <picker mode="selector" :range="xxList" :value="xxNumber" @change="xyChange($event)">
              <view class="fo_list">
                <view class="fo_nameleft">学院：</view>
                <view class="fo_siet">
                  <view class="fo_input"><input disabled type="text" v-model="school"></view>
                </view>
              </view>
            </picker>

            <view class="fo_list">
              <view class="fo_nameleft">专业：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="profession"
                /></view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">手机：</view>
              <view class="fo_siet fo_flex">
                <view class="fo_input" >
                  <input type="text" v-model="phone" />
                  
                </view>
                <view class="fo_yzm" @tap="getCodeClick" v-if="getNumber == 60">获取验证码</view>
                  <view class="fo_yzm" v-else>{{ getNumber }}后获取</view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">验证码：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="code"
                /></view>
              </view>
            </view>
            <view class="upload">
              <view class="upload-title">上传校友证明</view>
              <view class="tip"
                >（请上传带有个人信息的校园卡、学生证或学习证明）
              </view>
              <view class="IDCardUploader">
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-if="!zmImage1">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-else><image :src="zmImage1" /></view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-if="!zmImage2">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-else><image :src="zmImage2" /></view>

              </view>
              <!-- <IDCardUploader @change="handleUploadChange" /> -->
              <view class="tip"
                >注意：身份验证需要后台审核，约在一个工作日内完成，请耐心等待。
              </view>
            </view>
          </view>

          <view class="submit" @tap="handleSubmit"> 确认</view>
          <!-- <Student student-or-alumni="1" /> -->
        </TabItem>

        <!--艺考生-->
        <TabItem class="xs_suist">
          <view class="xs_sjetwt3"></view>

          <view class="form">
            <view class="fo_list">
              <view class="fo_nameleft">姓名：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="name"
                /></view>
              </view>
            </view>
            <!-- <picker mode="selector" :range="xBList" :value="xBNumber" @change="xBChange($event)"> -->
              <view class="fo_list">
                <view class="fo_nameleft">性别：</view>
                <view class="fo_siet">
                  <!-- <view class="fo_input" >
                    <input disabled type="text" v-model="sex"/>
                  </view> -->
                  <view class="fo_viesxb">
                    <view
                      :class="['fo_vieitem', sex == 1 ? 'fovieselect' : '']"
                      @tap="sex = 1"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvn.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 2 ? 'fovieselect' : '']"
                      @tap="sex = 2"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_wcv.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 3 ? 'fovieselect' : '']"
                      @tap="sex = 3"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvw.png"
                    /></view>
                  </view>
                </view>
              </view>
            <!-- </picker> -->
            <picker mode="date" @change="onDateChange($event)">
              <view class="fo_list">
                <view class="fo_nameleft">生日：</view>
                <view class="fo_siet">
                  <view class="fo_input"
                    ><input disabled type="text" v-model="birthday"
                  /></view>
                </view>
              </view>
            </picker>
            <view class="fo_list">
              <view class="fo_nameleft">画室：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="profession"
                /></view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">手机：</view>
              <view class="fo_siet fo_flex">
                <view class="fo_input" >
                  <input type="text" v-model="phone" />
                  
                </view>
                <view class="fo_yzm" @tap="getCodeClick" v-if="getNumber == 60">获取验证码</view>
                  <view class="fo_yzm" v-else>{{ getNumber }}后获取</view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">验证码：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="code"
                /></view>
              </view>
            </view>
            <view class="upload">
              <view class="upload-title">上传艺考生证明</view>
              <view class="tip">（请上传在读高中或者在读画室的证明信息）</view>
              <view class="IDCardUploader">
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-if="!zmImage1">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-else><image :src="zmImage1" /></view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-if="!zmImage2">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-else><image :src="zmImage2" /></view>
              </view>
              <!-- <IDCardUploader @change="handleUploadChange" /> -->
              <view class="tip"
                >注意：身份验证需要后台审核，约在一个工作日内完成，请耐心等待。
              </view>
            </view>
          </view>

          <view class="submit" @tap="handleSubmit"> 确认</view>
          <!-- <Examinee /> -->
        </TabItem>

        <!--游客-->
        <TabItem class="xs_suist">
          <view class="xs_sjetwt4"></view>

          <view class="form">
            <view class="fo_list">
              <view class="fo_nameleft">姓名：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="name"
                /></view>
              </view>
            </view>
            <!-- <picker mode="selector" :range="xBList" :value="xBNumber" @change="xBChange($event)"> -->
              <view class="fo_list">
                <view class="fo_nameleft">性别：</view>
                <view class="fo_siet">
                  <!-- <view class="fo_input" >
                    <input disabled type="text" v-model="sex"/>
                  </view> -->
                  <view class="fo_viesxb">
                    <view
                      :class="['fo_vieitem', sex == 1 ? 'fovieselect' : '']"
                      @tap="sex = 1"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvn.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 2 ? 'fovieselect' : '']"
                      @tap="sex = 2"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_wcv.png"
                    /></view>
                    <view
                      :class="['fo_vieitem', sex == 3 ? 'fovieselect' : '']"
                      @tap="sex = 3"
                      ><image class="fo_siubst" src="https://www.caamyj.com/image/my_xvw.png"
                    /></view>
                  </view>
                </view>
              </view>
            <!-- </picker> -->
            <picker mode="date" @change="onDateChange($event)">
              <view class="fo_list">
                <view class="fo_nameleft">生日：</view>
                <view class="fo_siet">
                  <view class="fo_input"
                    ><input disabled type="text" v-model="birthday"
                  /></view>
                </view>
              </view>
            </picker>
            <view class="fo_list">
              <view class="fo_nameleft">手机：</view>
              <view class="fo_siet fo_flex">
                <view class="fo_input" >
                  <input type="text" v-model="phone" />
                  
                </view>
                <view class="fo_yzm" @tap="getCodeClick" v-if="getNumber == 60">获取验证码</view>
                  <view class="fo_yzm" v-else>{{ getNumber }}后获取</view>
              </view>
            </view>
            <view class="fo_list">
              <view class="fo_nameleft">验证码：</view>
              <view class="fo_siet">
                <view class="fo_input"
                  ><input type="text" v-model="code"
                /></view>
              </view>
            </view>
            <view class="upload">
              <!-- <view class="upload-title">上传艺考生证明</view>
              <view class="tip">（请上传在读高中或者在读画室的证明信息）</view>
              <view class="IDCardUploader">
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-if="!zmImage1">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="1" v-else><image :src="zmImage1" /></view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-if="!zmImage2">+</view>
                  <view class="IDCardUploader_icon" @tap="uploadimg" :data-type="2" v-else><image :src="zmImage2" /></view>
              </view> -->
              <!-- <IDCardUploader @change="handleUploadChange" /> -->
              <view class="tip">注意：身份验证需要后台审核，约在一个工作日内完成，请耐心等待。
              </view>
            </view>
          </view>

          <view class="submit" @tap="handleSubmit"> 确认</view>
          <!-- <Visitor /> -->
        </TabItem>
      </Tabs>
    </view>
  </view>
</template>

<script>
import { clone } from '@puckjs/utils/lib/clone'
import PageTitle from '@/components/PageTitle'
import Tabs from '@/components/tabs'
import TabNav from '@/components/TabNav'
import TabItem from '@/components/TabItem'
import Visitor from './views/Visitor'
import Taro from '@tarojs/taro'
import Examinee from './views/Examinee'
import Student from './views/Student'
// import IDCardUploader from './views/IDCardUploader'
import { mapState } from 'vuex'
// import { uploadFile } from '@/utils/request'
export default {
  components: {
    Student,
    Examinee,
    PageTitle,
    Tabs,
    TabNav,
    TabItem,
    Visitor
  },

  data() {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [],
      name: '',
      sex: "",
      birthday: '',
      school: '',
      profession: '',
      phone: '',
      code: '',
      xxList: [
        '北京大学',
        '上海大学',
        '武汉大学',
        '南京大学',
        '清华大学',
        '郑州大学'
      ],
      xxNumber: 0,
      xBList:[
        "男",
        "女",
        "保密"
      ],
      xBNumber:0,

      getTime: '',
      getNumber: 60,
      zmImage1:'',
      zmImage2:'',
      studentOrAlumni:0

    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  methods: {
    handleSelect(name, event) {
      this[name] = [
        ...this[name],
        ...event.detail.file.map(r => ({
          url: r.url,
          deletable: true
        }))
      ]
    },

    handleRemove(name, event) {
      // 必须要 clone 才可以删除图片
      const fileList = clone(this[name])
      fileList.splice(event.detail.index, 1)

      this[name] = fileList
    },
    onChange(e) {
      console.log(e)
    },
    handleFieldChange(e) {},
    onDateChange(e) {
      // console.log("生日",e.detail.value);
      this.birthday = e.detail.value || 0
    },
    xyChange(e) {
      //  console.log("学校",e.detail.value);
      let xxNumber = Number(e.detail.value) || 0
      this.xxNumber = xxNumber
      this.school = this.xxList[xxNumber || 0]
    },
    xBChange(e){
      let xBNumber = Number(e.detail.value) || 0
      this.xBNumber = xBNumber
      this.sex = this.xBList[xBNumber || 0]
    },
    handleSubmit() {
      let name = this.name
      let sex = this.sex
      let birthday = this.birthday
      let school = this.school
      let profession = this.profession
      let phone = this.phone
      let code = this.code
      let zmImage1 = this.zmImage1
      let zmImage2 = this.zmImage2
      console.log(name,sex,birthday,school,profession,phone,code,zmImage1,zmImage2);
      if(sex == ''){
        Taro.showToast({
          title:'请选择性别',
          icon:'none'
        })
        return false
      }
      if(birthday == ''){
        Taro.showToast({
          title:'请选择生日日期',
          icon:'none'
        })
        return false
      }
      if(this.studentOrAlumni == 2 || this.studentOrAlumni == 3){
        
      }else{
        if(school == ''){
          Taro.showToast({
            title:'请选择学校',
            icon:'none'
          })
          return false
        }
      }
      
      console.log(this.userInfo);
      let token = this.userInfo.token;
      if(sex == '男'){
        sex = 0
      }else if(sex == '女'){
        sex = 1
      }else{

      }
      let role = {
        birthday:birthday,
        code:code,
        name:name,
        phone:phone,
        profession:profession,
        school:school,
        sex:sex,
        studentBackImg:zmImage2,
        studentImg:zmImage1,
        userId:this.userInfo.id,
        studentOrAlumni:this.studentOrAlumni
      }
      console.log(role)
      // return false;
      Taro.showLoading({
        title:'正在加载'
      })
      Taro.request({
        url:'https://www.caamyj.com/myj/WxRoleReview/insertRoleReview',
        method:"POST",
        data:{
          role
        },
        header:{
          "token":token
        },
        success(res){
          Taro.hideLoading();
          let resdata = res.data;
          if(resdata.code == 200){
            Taro.showToast({
              title:"提交成功",
              icon:'none'
            })
            setTimeout(() => {
              Taro.navigateBack({
                delta:1
              })
            }, 1000);
          }else{
            Taro.showToast({
              title:resdata.mssage,
              icon:'none'
            })
          }
        }
      })
    },
    xbestClick(index) {
      console.log(index)
      this.sex = index
      console.log(this.sex, index)
    },
    getCodeClick() {
      let that = this;
      if (!this.phone) {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return false
      }
      if (this.phone.length != 11) {
        Taro.showToast({
          title: '请输入正确的手机号',
          icon:'none'
        })
        return false
      }
      let token = this.userInfo.token;
      Taro.request({
        url: 'https://www.caamyj.com/myj/WxRoleReview/getCode',
        header:{
          "token":token
        },
        data:{
          phoneNumbers:that.phone
        },
        success(res){
          console.log(res);
          let resdata = res.data;
          Taro.showToast({
              title:resdata.data,
              icon:'none'
            })
          if(resdata.code == 200){
            clearInterval(that.getTime)
              that.getTime = setInterval(() => {
                that.getNumber -= 1
                if (that.getNumber <= 0) {
                  clearInterval(that.getTime)
                  that.getNumber = 60
                }
            }, 1000)
          }
          
        }
      })
      
    },
    handleUploadChange(e) {
      console.log(e)
    },
    uploadimg(e){
      let that = this;
      let type = e.currentTarget.dataset.type;
      let token = this.userInfo.token;
      console.log(token);
      Taro.chooseMessageFile({
        count:1,
        success(res){
          console.log(res.tempFiles[0])
          Taro.uploadFile({
            url:'https://www.caamyj.com/myj/uploadPhotos/uploadPhoto',
            filePath:res.tempFiles[0].path,
            header:{
              "token":token
            },
            name:'file',
            success(res){
              let src = JSON.parse(res.data).data.url;
                console.log(res.data)
              if(type== 1){
                that.zmImage1 = src;
              }else if(type == 2){
                that.zmImage2 = src;

              }
            }
          })
        }
      })

    },
    dqChage(e){
      console.log(e);
      this.studentOrAlumni = e
    }
  }
}
</script>

<style lang="scss">
.xs_suist {
  background: #f4f4f4;
  position: relative;
}
.xs_suist{
  .form{
    margin-top: 20px;
  }
}
.xs_sjetwt{
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 12px solid #f4f4f4;
  position: absolute;
  top: -12px;
  left: 25px;
}
.xs_sjetwt2{
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 12px solid #f4f4f4;
  position: absolute;
  top: -12px;
  left: 119px;
}
.xs_sjetwt3{
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 12px solid #f4f4f4;
  position: absolute;
  top: -12px;
  left: 213px;
}
.xs_sjetwt4{
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 12px solid #f4f4f4;
  position: absolute;
  top: -12px;
  left: 307px;
}
.identity-page {
  width: 100%;
  min-height: 100vh;
  background: url('../../assets/identity/identity-bg.png');
  background-size: 100% 100%;
  padding-bottom: 30px;

  .PageTitlePage {
    .arrow {
      background: #0563e4;
      color: #fff;
      box-shadow: 1px 1px 2px 0 rgba(0, 55, 129, 1),
        -1px -1px 1px 0px rgba(75, 142, 235, 1);
    }

    .title {
      color: #fff;
    }
  }

  .identity-header {
    font-size: 21px;
    font-weight: 400;
    color: #fff;
    margin: 8px 15px;
  }

  .identity-body {
    margin: 5px 15px 0px;

    .Tabs_navs {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .TabNav {
        width: 66px;
        height: 36px;
        background: #0563e4;
        box-shadow: 2px 2px 3px -1px rgba(2, 10, 67, 1),
          -1px -1px 3px 0px rgba(131, 183, 255, 1);
        border-radius: 8px;
        color: #ffffff;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .TabNav_active {
        width: 66px;
        height: 36px;
        background: #f94163;
        box-shadow: -1px -1px 3px 0px rgba(255, 178, 178, 1) inset,
          2px 2px 3px 0px rgba(131, 10, 32, 1) inset;
        border-radius: 8px;
        color: #fcb9b9;
      }
      .TabNav_active .zhaoisiet {
        box-sizing: -1px -1px 3px 0px #ffb2b2 inst;
      }
    }

    .Tabs_content {
      .form {
        // min-height: 200px;
        background: #f4f4f4;
        box-shadow: 0px 2px 4px 0px rgba(114, 114, 114, 0.5);
        border-radius: 10px;
        margin-top: 15px;
        padding: 20px 30px;
      }

      .fo_list {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .fo_nameleft {
        width: 50px;
        font-size: 12px;
        color: #000000;
      }
      .fo_siet {
        flex: 1;
        margin-left: 10px;
      }
      .fo_flex {
        display: flex;
        align-items: center;
      }
      .fo_viesxb {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fo_vieitem {
          width: 70px;
          // height: 40px;
          text-align: center;
          padding: 8px 0;
          box-shadow: 1px 1px 2px 0px #cacaca, -1px -1px 3px 0px #ffffff;
          border-radius: 9px;
          font-size: 0;

          .fo_siubst {
            width: 22px;
            height: 22px;
          }
        }
        .fovieselect {
          box-shadow: 1px 1px 2px 0px #cacaca, -1px -1px 3px 0px #ffffff;
          background: #ffffff;
        }
      }
      .fo_input {
        border-radius: 22rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        input {
          line-height: 35px;
          height: 35px;
          padding: 0 10px;
          flex: 1;
          font-size: 16px;
        }
      }
      .fo_yzm {
        width: 90px;
        text-align: center;
        margin-left: 10px;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        box-shadow: 1px 1px 2px 0px #cacaca, -1px -1px 3px 0px #ffffff;
        border-radius: 9px;
      }

      .van-cell {
        background: #f4f4f4;
        padding: 0;
        align-items: center;
        margin: 15px 0;

        // &::after {
        //   border: none;
        // }
      }

      .van-field__body {
        background: #fff;
        border-radius: 10px;
        padding: 5px 10px;
      }

      .upload {
        display: flex;
        flex-direction: column;

        .upload-title {
          font-size: 15px;
          font-weight: 400;
          text-align: center;
        }

        .tip {
          font-size: 9px;
          font-weight: 400;
          color: #a8a5a5;
          margin: 5px 0 10px;
          text-align: center;
        }
      }

      .submit {
        width: 128px;
        height: 36px;
        background: #f94163;
        box-shadow: -1px -1px 3px 0px rgba(255, 178, 178, 1),
          2px 2px 3px 0px rgba(131, 10, 32, 1) inset;
        border-radius: 8px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px auto 0px;
      }
    }
  }
}
.IDCardUploader {
  display: flex;

  van-uploader {
    width: 50%;
    height: 100px;
    text-align: center;

    .van-uploader {
      display: block;
      background: #fff;
      border-radius: 10px;
    }

    .van-uploader__preview {
      margin: 0;
    }

    .van-uploader__preview,
    .van-uploader__preview-image {
      width: 100% !important;
    }

    .van-uploader__slot {
      width: 100%;
    }

    &:nth-of-type(1) {
      .van-uploader {
        margin-right: 5%;
      }
    }

    &:nth-last-of-type(1) {
      .van-uploader {
        margin-left: 5%;
      }
    }
  }

  .IDCardUploader_icon {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    height: 100px;
    font-size: 30px;
    color: #adadad;
    background: #ffffff;
    margin: 0 5px;
    border-radius: 11px;
    image{
      width: 100%;
      height: 100%;
      border-radius: 11px;
    }
  }
}
</style>

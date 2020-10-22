//index.js
import { User } from '../../api/url.js';
import { baseURL } from '../../api/base'
let user = new User();
const app = getApp();
Page({
  data: {
    code: "",
    avatarUrl: "",
    show1:false
  },
  cancel(){
    this.setData({
      show1:false
    })
  },
  bindGetUserInfo(){
    let that = this;
    wx.getUserInfo({
            success: function(res) {
              wx.showToast({
                title: '授权成功',
                icon: 'none',
                duration: 2000,
                success:(res)=>{
                  that.setData({
                    show1:false
                  })
                }
              })
            }
          })
  },

  // // 发起网络请求登录
  wxLogin(code, encryptedData, iv) {
    user.wxLogin({
      "code": code,
      'encryptedData': encryptedData,
      'iv': iv
      // "phone": '15527583960'
    }).then(res => {
      console.log(res)
      if( res.code == 200){
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('id', res.data.id);
        getApp().globalData.teacherId = res.data.id;
        //登录成功
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout( () => {
              this.pathNavigateTo();
            },2000)
          }
        })
      }else if(res.code== 50001){
        wx.showModal({
          title: '提示',
          content: '当前号码没有注册,请到注册后再登录',
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.message,
        })
      }
    })
  },


  getPhoneNumber(e) {
    // console.log(e)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
    let that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res);
         wx.openSetting({
            success (res) {
              console.log(res.authSetting)
            }
          })
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success(res) {
              console.log(res)
              if (res.code) {
                
                that.wxLogin(res.code, e.detail.encryptedData, e.detail.iv);
              } else {
                console.log('失败！' + res.errMsg)
              }
            }
          })
        }else {
          // wx.navigateTo({
          //   url: '../home/home'
          // })
          wx.showModal({
            title: '提示',
            content: '是否授权?',
            success:(res)=>{
              console.log(res);
              if(res.confirm ==true){
                that.setData({
                  show1:true
                })
              }else{
                wx.navigateTo({
                  url: '../home/home'
                })
              }
            }
          })
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  pathNavigateTo() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onLoad: function () {
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态");
        // wx.navigateTo({
        //   url: '../home/home'
        // })
      },
      fail: function (res) {
        console.log("需要重新登录");
        // wx.login({})
      }
    })
  },
  onShow: function () {

  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

// pages/assessment/assessment.js
import {
  User
} from '../../api/url.js';
let user = new User();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [
    //   {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "2"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "2"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "3"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "2"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "2"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "3"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "2"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "2"
    // }, {
    //   name: "XXX",
    //   type: "1"
    // }, {
    //   name: "XXX",
    //   type: "3"
    // }, 
  ]
  },
  // 深拷贝
  deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  attendanceSubmit() {
    let data = this.deepCopy(this.data.studentList);
    data.forEach(element => {
      delete element.studentName
      delete element.operation;
    })
    user.attendanceSubmit(data).then( res =>{
      if(res.code == 200){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            setTimeout( ()=>{
              wx.navigateTo({
                url: '../home/home'
              })
            },2000)
            
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.message,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = this.deepCopy(app.globalData.attendanceList);
    data.forEach(element => {
      if (element.operation == true) {
        element.status = 3
      }
    })
    this.setData({
      studentList: data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let pages = getCurrentPages();
    console.log(pages)
    // let prevPage = pages[pages.length - 2]; //上一个页面
    
    // prevPage.setData({
    
    // activeCategoryId: 0,
    
    // })
    // console.log(pages)
   
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  pathNavigateTo() {
    wx.navigateBack({
      delta: 1
    })
    // wx.navigateTo({
    //   url: '../student/student'
    // })
  },
})
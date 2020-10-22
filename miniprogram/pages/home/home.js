import { User } from '../../api/url.js';
let user = new User();
var app = getApp();
import Time from '../../utils/date.js';
import { baseURL } from '../../api/base.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentYear:'2020',
    currentMonth:"1",
    currentDay:"",
    days:"",
    dateShoew:false,
    curriculum:[],
    dataList:null,
    // 消息
    background: [
      {
        time:"2020-07-07 08:30:00",
        text:"2020年高考开始"
      }
    ],
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 500
  },
  // 查询教师课程表
  timetable(date){
    user.timetable(`?date=${date}&teacherId=${wx.getStorageSync('id')}`).then( res =>{
      // console.log(res.data)
      if( res.code == 200){
        this.setData({
          curriculum:res.data,
          dataList:res.data
        })
      }else{
        wx.showToast({
          title: '暂无课程',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // wx.request({
    //   url: 'https://jyxk.bxyun.cn/agency/callMiniProgram/teacher/timetable/course?'+`date=${date}&teacherId=${app.globalData.teacherId}`,
    //   // enableCache: false,
    //   // enableHttp2: true,
    //   // enableQuic: true,
    //   method: 'GET',
    //   timeout: 0,
    //   header:{
    //     token:wx.getStorageSync('token')
    //   },
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: (res) => {
    //     console.log(res);
    //   }
    // })
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
  },
  // 去学生名单页
  pathNavigateTo(event) {
    // console.log(event)
    getApp().globalData.courseNo = event.target.dataset.courseno;
    getApp().globalData.courseId = event.target.dataset.courseid;
    // console.log(app.globalData)
    wx.navigateTo({
      url: '../student/student'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timetable(Time())
        this.setData({
          currentYear: Time().substring(0,4),
          currentMonth: Number(Time().substring(5, 7)) ,
          currentDay: Number(Time().substring(8)),
          days: Time()
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getCalendarData(e) { // 监听日历数据
    // console.log(e.detail)
  },
  inputFocus(){
    // console.log('获取焦点');
    this.setData({
      dateShoew: this.data.dateShoew ===true?false:true
    })
  },
  twoLevelCommentBtnClick(e){
    // console.log(e.detail);
    this.setData({
      days: e.detail
    },()=>{
      this.timetable(this.data.days)
    })
  },
  inputChange(e){
    let dates = e.detail.value;
    if (e.detail.value.length==10){
      this.setData({
        currentYear: dates.substring(0, 4),
        currentMonth: Number(dates.substring(5, 7)),
        currentDay: Number(dates.substring(8)),
      })
    }
  }
})
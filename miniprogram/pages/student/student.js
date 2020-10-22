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
    curriculum: {},
    studentList: [
      // {
      //   id: null,
      //   studentId: 1,
      //   studentName: "老王",
      //   status: 1,
      //   operation:false
      // },
      // {
      //   id: null,
      //   studentId: 2,
      //   studentName: "老李",
      //   status: 2,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 3,
      //   studentName: "老周",
      //   status: 3,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 4,
      //   studentName: "老白",
      //   status: 2,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 5,
      //   studentName: "老龚",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 6,
      //   studentName: "老曾",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 7,
      //   studentName: "老黄",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 8,
      //   studentName: "老毕",
      //   status: 2,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 9,
      //   studentName: "老费",
      //   status: 3,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 10,
      //   studentName: "老齐",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 11,
      //   studentName: "老张",
      //   status: 2,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 12,
      //   studentName: "test",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 13,
      //   studentName: "哈哈哈",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 14,
      //   studentName: "老铁",
      //   status: 1,
      //   operation: false
      // },
      // {
      //   id: null,
      //   studentId: 15,
      //   studentName: "杨幂",
      //   status: 1,
      //   operation: false
      // }
    ],
    current: 1,
    size: 20
  },
  studentList(current, size) {
    let courseId = app.globalData.courseId;
    let courseNo = app.globalData.courseNo;
    user.studentList(
      `?courseId=${courseId}&courseNo=${courseNo}`
    ).then(res => {
      if (res.code == 200) {
        let pages = getCurrentPages();
        let prevpage = pages[pages.length - 2];
        let data = res.data.studentList;
        data.forEach( element => {
          element.operation = false;
        })
        if (prevpage.route && prevpage.route == 'pages/assessment/assessment') {
          this.setData({
            curriculum: res.data,
            studentList: app.globalData.attendanceList
          })
        } else {
          this.setData({
            curriculum: res.data,
            studentList: data
          })
        }
      }
    })
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
  statusChange(event) {
    let that = this;
    let studentid = event.currentTarget.dataset.studentid;
    let list = that.deepCopy(that.data.studentList);
    // console.log(studentid, list);
    list.forEach( element =>{
      if (element.studentId == studentid ){
        element.operation = !element.operation
      }
    })
    this.setData({
      studentList:list
    },()=>{
      // console.log(that.data.studentList)
    })
  },
  attendanceDeep(){
    let that = this;
    let list = that.deepCopy(that.data.studentList);
    list.forEach(element =>{
      element.courseId = app.globalData.courseId;
      element.courseNo = app.globalData.courseNo;
      element.teacherId = app.globalData.teacherId;
    })
    // console.log(list)
    getApp().globalData.attendanceList = list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.studentList()
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
    this.attendanceDeep();
    wx.navigateTo({
      url: '../assessment/assessment'
    })
  },
})
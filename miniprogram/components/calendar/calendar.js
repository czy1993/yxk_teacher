// components/calendar/calendar.js
import { User } from '../../api/url.js';
let user = new User();
var app = getApp();
import Time from '../../utils/date.js'
Component({
  lifetimes: {
    attached: function () {
      this.setData({
        currentDay: "19"
      })
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    currentYear: { // 当前显示的年
      type: Number,
      value: new Date().getFullYear()
    },
    currentMonth: { // // 当前显示的月
      type: Number,
      value: new Date().getMonth() + 1
    },
    currentDay: {  // // 当前显示的日
      type: Number,
      value: new Date().getDate()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr: [], // 当月所有数据
    currentDay: '',
    currentDayActive:[],
    today:new Date().getDate(),
    month:Time().substring(6,7)
  },
  ready() {
    console.log(Time(),Time().substring(6,7))
    this.getAllArr();
    this.timetableDate(Time())
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取课程日期
    timetableDate(date){

      user.timetableDate(`?date=${date}&teacherId=${wx.getStorageSync('id')}`).then( res =>{
        // console.log(res.data)
        if( res.code == 200 ){
          let arr = res.data;
          let arrDays = [];
          arr.forEach( element => {
            arrDays.push( Number(element.courseDay.substring(8)))
          })
          this.setData({
            currentDayActive:arrDays
          },()=>{
            // console.log(this.data.currentDayActive);
            this.getAllArr();
          })
        }
      })
      
    },
    // 获取某年某月总共多少天
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },
    // 获取某月1号是周几
    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay()
    },
    // 上月 年、月
    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        }
      } else {
        return {
          year: year,
          month: --month
        }
      }
    },
    // 下月 年、月
    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        }
      } else {
        return {
          year: year,
          month: ++month
        }
      }
    },
    // 获取当月数据，返回数组
    getCurrentArr() {
      // console.log(this.data.currentDayActive);
      let currentDay = this.data.currentDayActive;
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
      let currentMonthDateArr = [] // 定义空数组
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          let  current = false;
          currentDay.forEach( element => {
            if(element == i){
              current = true;
            }
          })
          currentMonthDateArr.push({
            month: 'current', // 只是为了增加标识，区分上下月
            date: i,
            current:current
          })
        }
      }
      this.setData({
        currentMonthDateLen
      })
      return currentMonthDateArr
    },
    // 获取当月中，上月多余数据，返回数组
    getPreArr() {
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
      let preMonthDateArr = [] // 定义空数组
      if (preMonthDateLen > 0) {
        let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
        let date = this.getDateLen(year, month) // 获取上月天数
        for (let i = 0; i < preMonthDateLen; i++) {
          preMonthDateArr.unshift({ // 尾部追加
            month: 'pre', // 只是为了增加标识，区分当、下月
            date: date,
            
          })
          date--
        }
      }
      this.setData({
        preMonthDateLen
      })
      return preMonthDateArr
    },
    // 获取当月中，下月多余数据，返回数组
    getNextArr() {
      let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
      let nextMonthDateArr = [] // 定义空数组
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next',// 只是为了增加标识，区分当、上月
            date: i
          })
        }
      }
      return nextMonthDateArr
    },
    // 整合当月所有数据
    getAllArr() {
      let preArr = this.getPreArr()
      let currentArr = this.getCurrentArr()
      let nextArr = this.getNextArr()
      // console.log(preArr,currentArr,nextArr)
      let allArr = [...preArr, ...currentArr, ...nextArr]
      // console.log(allArr)
      this.setData({
        allArr
      })
      let sendObj = {
        currentYear: this.data.currentYear,
        currentMonth: this.data.currentMonth,
        allArr: allArr
      }
      // console.log(sendObj)
      this.triggerEvent('sendObj', sendObj)
    },
    // 点击 上月
    gotoPreMonth() {
      let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth)
      this.setData({
        currentYear: year,
        currentMonth: month
      },()=>{
        this.timetableDate(year+'-'+'0'+month+'-01')
      })
      this.getAllArr()
    },
    // 点击 下月
    gotoNextMonth() {
      let { year, month } = this.nextMonth(this.data.currentYear, this.data.currentMonth)
      this.setData({
        currentYear: year,
        currentMonth: month
      },()=>{
        this.timetableDate(year+'-'+'0'+month+'-01')
      })
      this.getAllArr();
     
    },
    dateChoice(event) {
      let days;
      // console.log(event.currentTarget.dataset);
      if (event.currentTarget.dataset.month === "current") {
        days = this.data.currentYear + "-" +
          (this.data.currentMonth < 10 ? '0' + this.data.currentMonth : this.data.currentMonth) + '-' +
          (event.currentTarget.dataset.date < 10 ? '0' + event.currentTarget.dataset.date : event.currentTarget.dataset.date);
        // console.log(days);
        this.setData({
          currentDay: event.currentTarget.dataset.date
        })
        this.triggerEvent("twoLevelCommentBtn", days);
      }
    },
    // 遍历课程日期

  }
})
// components/calendar/calendar.js
Component({
  lifetimes: {
    attached: function () {
      
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
    curriculum:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  ready() {
    console.log(this.properties)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pathNavigateTo() {
      wx.navigateTo({
        url: '../student/student'
      })
    },
  }
})

import { HTTP } from './base.js'

class User extends HTTP {

  // 登录
  wxLogin(data) {
    return this.request({
      url: '/agency/callMiniProgram/wx/login',
      method: 'POST',
      data: data
    })
  }
  //  教师课程表
  timetable(data) {
    return this.request({
      url: "/agency/callMiniProgram/teacher/timetable/course" + data,
      method: 'GET'
    })
  }
  // 
  timetableDate(data){
    return this.request({
      url: "/agency/callMiniProgram/teacher/timetable/date" + data,
      method: 'GET'
    })
  }
  //学生名单
  studentList(data) {
    return this.request({
      url: "/agency/callMiniProgram/course/student/list" + data,
      method: 'GET'
    })
  }
  // 提交考勤记录  /agency/callMiniProgram / course / attendance / submit
  attendanceSubmit(data) {
    return this.request({
      url: "/agency/callMiniProgram/course/attendance/submit",
      method: 'POST',
      data
    })
  }
}
// 





export { User }
// const baseURL = 'http://192.168.0.235:8765';  //本地测试-老王
// const baseURL = 'http://119.97.150.23:8765';  // 测试服务器
// const baseURL = 'https://yxk.bxyun.cn'        // 测试域名
const baseURL = 'https://jyxk.bxyun.cn'          // 正式域名
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data, method) {
    let urlApi = url.split('/');
    let token;
    if (urlApi[urlApi.length - 1] != 'login') {
      token = wx.getStorageSync('token')
    }
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: {
        // 'content-type': 'application/json',
        token
      },
      
      success: (res) => {
        let code = res.data.code;
        if (code == '10007') {
          this._showToast('请先登录')
        }else if(code == '10002'){
          this._showToast('系统维护中~请稍后再试~"')
        } else{
          resolve(res.data);
        } 
      },
      fail: (err) => {
        reject()
        this._showToast('请求出错，请稍后重试')
      }
    })
  }

  _showToast(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP, baseURL }
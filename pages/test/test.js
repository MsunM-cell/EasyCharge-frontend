const app = getApp()

Page({
  data: {},

  onLoad() {
    this.getTime()
  },

  // 获取后端启动时间戳
  getTime() {
    let that = this
    // 网络请求
    wx.request({
      url: app.globalData.server + '/getTime',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode === 200) {
          // 开始测试脚本
          that.start_test(res.data.time)
        }
      }
    })
  },

  start_test(start_time) {
    let time = this.getHMS(start_time)
    while (time.h < 14) {
      time = this.getHMS(start_time)
    }
  },

  getHMS(start_time) {
    // 计算当前时间戳
    let now_time = (parseInt(new Date().getTime() / 1000) - start_time) * 10 + 1655329800

    let date = new Date(now_time * 1000)
    // 获取小时、分钟、秒数
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    return {
      h,
      m,
      s
    }
  }
})
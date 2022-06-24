const app = getApp()

Page({
  data: {
    tokens: [],
    flags: []
  },

  onLoad() {
    this.getTokens(1)
  },

  // 获取30个用户的token
  getTokens(i) {
    let that = this
    let username = 'V' + i
    let password = '123456'
    // 网络请求
    wx.request({
      url: app.globalData.server + '/users/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            let tokens = that.data.tokens
            tokens[i] = res.data.token
            that.setData({
              tokens: tokens
            })
            i = i + 1
            if (i <= 30)
              that.getTokens(i)
            else
              that.getAdminToken()
          }
        }
      }
    })
  },

  // 获取管理员的token
  getAdminToken() {
    let that = this
    let adminname = 'A1'
    let password = '123456'
    // 网络请求
    wx.request({
      url: app.globalData.server + '/admin/login',
      method: 'POST',
      data: {
        adminname: adminname,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            that.setData({
              admin_token: res.data.token
            })
            console.log('token获取成功！')
            that.getTime()
          }
        }
      }
    })
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
    let flags = []
    for (let i = 1; i <= 42; i++)
      flags[i] = false

    while (time.h < 14) {
      // 6:00～6:59
      if (time.h === 6) {
        // 6:00:00
        if (time.m === 0) {
          if (flags[1] === false) {
            flags[1] = true
            // (A,V1,T,40)
            this.apply(1, 1, 40)
          }
        }
      }
      time = this.getHMS(start_time)
    }
  },

  // 充电请求
  apply(i, mode, capacity) {
    let that = this
    // 网络请求
    wx.request({
      url: app.globalData.server + '/order/requestCharge',
      method: 'POST',
      data: {
        token: that.tokens[i],
        mode: mode,
        capacity: capacity,
        totalCapacity: 100
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code === 200) {
            console.log('(A,V1,T,40)')
          }
        }
      }
    })
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
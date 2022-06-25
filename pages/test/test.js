const app = getApp()

Page({
  data: {
    tokens: [],
    flags: [],
    start_time: null,
    last_time: {
      'h': 5,
      'm': 55,
      's': 0
    }
  },

  onLoad() {
    // 初始化flags
    let flags = []
    for (let i = 1; i <= 42; i++)
      flags[i] = false
    this.setData({
      flags: flags
    })
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
          that.setData({
            start_time: res.data.time
          })
          // 开始测试脚本
          that.start_test()
        }
      }
    })
  },

  start_test() {
    let start_time = this.data.start_time
    let last_time = this.data.last_time
    let time = this.getHMS(start_time)
    while (time.h < 6) {
      time = this.getHMS(start_time)
    }
    while (time.m % 5 != 0 || time.m == last_time.m) {
      time = this.getHMS(start_time)
    }

    this.setData({
      last_time: time
    })

    let flags = this.data.flags
    if (time.h === 6) {
      // 6:00:00
      if (time.m === 0) {
        if (flags[1] === false) {
          console.log(time)
          flags[1] = true
          this.setData({
            flags: flags
          })
          // (A,V1,T,40)
          this.apply(1, 1, 40)
        }
      } else if (time.m === 5) {
        if (flags[2] === false) {
          console.log(time)
          flags[2] = true
          this.setData({
            flags: flags
          })
          // (A,V2,T,30)
          this.apply(2, 1, 30)
          // this.apply_cancel(1)
        }
      } else if (time.m === 10) {
        if (flags[3] === false) {
          console.log(time)
          flags[3] = true
          this.setData({
            flags: flags
          })
          // (A,V3,F,100)
          this.apply(3, 0, 100)
        }
      } else if (time.m === 15) {
        if (flags[4] === false) {
          console.log(time)
          flags[4] = true
          this.setData({
            flags: flags
          })
          // (A,V4,F,120)
          this.apply(4, 0, 120)
        }
      } else if (time.m === 20) {
        if (flags[5] === false) {
          console.log(time)
          flags[5] = true
          this.setData({
            flags: flags
          })
          // (A,V2,O,0)
          this.apply_cancel(2)
        }
      } else if (time.m === 25) {
        if (flags[6] === false) {
          console.log(time)
          flags[6] = true
          this.setData({
            flags: flags
          })
          // (A,V5,T,20)
          this.apply(5, 1, 20)
        }
      } else if (time.m === 30) {
        if (flags[7] === false) {
          console.log(time)
          flags[7] = true
          this.setData({
            flags: flags
          })
          // (A,V6,T,20)
          this.apply(6, 1, 20)
        }
      } else if (time.m === 35) {
        if (flags[8] === false) {
          console.log(time)
          flags[8] = true
          this.setData({
            flags: flags
          })
          // (A,V7,F,110)
          this.apply(7, 0, 110)
        }
      } else if (time.m === 40) {
        if (flags[9] === false) {
          console.log(time)
          flags[9] = true
          this.setData({
            flags: flags
          })
          // (A,V8,T,20)
          this.apply(8, 1, 20)
        }
      } else if (time.m === 45) {
        if (flags[10] === false) {
          console.log(time)
          flags[10] = true
          this.setData({
            flags: flags
          })
          // (A,V9,F,105)
          this.apply(9, 0, 105)
        }
      } else if (time.m === 50) {
        if (flags[11] === false) {
          console.log(time)
          flags[11] = true
          this.setData({
            flags: flags
          })
          // (A,V10,T,10)
          this.apply(10, 1, 10)
        }
      } else if (time.m === 55) {
        if (flags[12] === false) {
          console.log(time)
          flags[12] = true
          this.setData({
            flags: flags
          })
          // (A,V11,F,110)
          this.apply(11, 0, 110)
        }
      }
    } else if (time.h === 7) {
      // 7:00:00
      if (time.m === 0) {
        if (flags[13] === false) {
          console.log(time)
          flags[13] = true
          this.setData({
            flags: flags
          })
          // (A,V12,F,90)
          this.apply(12, 0, 90)
        }
      } else if (time.m === 5) {
        if (flags[14] === false) {
          console.log(time)
          flags[14] = true
          this.setData({
            flags: flags
          })
          // (A,V13,F,110)
          this.apply(13, 0, 110)
        }
      } else if (time.m === 10) {
        if (flags[15] === false) {
          console.log(time)
          flags[15] = true
          this.setData({
            flags: flags
          })
          // (A,V14,F,95)
          this.apply(14, 0, 95)
        }
      } else if (time.m === 15) {
        if (flags[16] === false) {
          console.log(time)
          flags[16] = true
          this.setData({
            flags: flags
          })
          // (A,V15,T,10)
          this.apply(15, 1, 10)
        }
      } else if (time.m === 20) {
        if (flags[17] === false) {
          console.log(time)
          flags[17] = true
          this.setData({
            flags: flags
          })
          // (A,V16,F,60)
          this.apply(16, 0, 60)
        }
      } else if (time.m === 25) {
        if (flags[18] === false) {
          console.log(time)
          flags[18] = true
          this.setData({
            flags: flags
          })
          // (A,V17,T,10)
          this.apply(17, 1, 10)
        }
      } else if (time.m === 30) {
        if (flags[19] === false) {
          console.log(time)
          flags[19] = true
          this.setData({
            flags: flags
          })
          // (A,V18,T,7.5)
          this.apply(18, 1, 7.5)
        }
      } else if (time.m === 35) {
        if (flags[20] === false) {
          console.log(time)
          flags[20] = true
          this.setData({
            flags: flags
          })
          // (A,V19,F,75)
          this.apply(19, 0, 75)
        }
      } else if (time.m === 40) {
        if (flags[21] === false) {
          console.log(time)
          flags[21] = true
          this.setData({
            flags: flags
          })
          // (A,V20,F,95)
          this.apply(20, 0, 95)
        }
      } else if (time.m === 45) {
        if (flags[22] === false) {
          console.log(time)
          flags[22] = true
          this.setData({
            flags: flags
          })
          // (A,V21,F,95)
          this.apply(21, 0, 95)
        }
      } else if (time.m === 50) {
        if (flags[23] === false) {
          console.log(time)
          flags[23] = true
          this.setData({
            flags: flags
          })
          // (A,V22,F,70)
          this.apply(22, 0, 70)
        }
      } else if (time.m === 55) {
        if (flags[24] === false) {
          console.log(time)
          flags[24] = true
          this.setData({
            flags: flags
          })
          // (A,V23,F,80)
          this.apply(23, 0, 80)
        }
      }
    } else if (time.h === 8) {
      // 8:00:00
      if (time.m === 0) {
        if (flags[25] === false) {
          console.log(time)
          flags[25] = true
          this.setData({
            flags: flags
          })
          // (A,V24,T,5)
          this.apply(24, 1, 5)
        }
      } else if (time.m === 20) {
        if (flags[26] === false) {
          console.log(time)
          flags[26] = true
          this.setData({
            flags: flags
          })
          // (A,V25,T,15)
          this.apply(25, 1, 15)
        }
      } else if (time.m === 25) {
        if (flags[27] === false) {
          console.log(time)
          flags[27] = true
          this.setData({
            flags: flags
          })
          // (B,T1,O,0)
          this.breakdown_g(1, 3)
        }
      } else if (time.m === 30) {
        if (flags[28] === false) {
          console.log(time)
          flags[28] = true
          this.setData({
            flags: flags
          })
          // (A,V26,T,20)
          this.apply(26, 1, 20)
        }
      } else if (time.m === 35) {
        if (flags[29] === false) {
          console.log(time)
          flags[29] = true
          this.setData({
            flags: flags
          })
          // (A,V27,T,25)
          this.apply(27, 1, 25)
        }
      } else if (time.m === 50) {
        if (flags[30] === false) {
          console.log(time)
          flags[30] = true
          this.setData({
            flags: flags
          })
          // (B,F1,O,0)
          this.breakdown_g(0, 1)
        }
      } else {
        this.start_test()
      }
    } else if (time.h === 9) {
      // 9:00:00
      if (time.m === 0) {
        if (flags[31] === false) {
          console.log(time)
          flags[31] = true
          this.setData({
            flags: flags
          })
          // (A,V28,F,30)
          this.apply(28, 0, 30)
        }
      } else if (time.m === 10) {
        if (flags[32] === false) {
          console.log(time)
          flags[32] = true
          this.setData({
            flags: flags
          })
          // (A,V1,O,0)
          this.apply_cancel(1)
        }
      } else if (time.m === 15) {
        if (flags[33] === false) {
          console.log(time)
          flags[33] = true
          this.setData({
            flags: flags
          })
          // (B,T1,O,1)
          this.breakdown_ok(1, 3)
        }
      } else if (time.m === 20) {
        if (flags[34] === false) {
          console.log(time)
          flags[34] = true
          this.setData({
            flags: flags
          })
          // (A,V27,O,0)
          this.apply_cancel(27)
        }
      } else if (time.m === 25) {
        if (flags[35] === false) {
          console.log(time)
          flags[35] = true
          this.setData({
            flags: flags
          })
          // (C,V21,F,35)
          this.change_capacity(21, 0, 35)
        }
      } else if (time.m === 30) {
        if (flags[36] === false) {
          console.log(time)
          flags[36] = true
          this.setData({
            flags: flags
          })
          // (A,V19,O,0)
          this.apply_cancel(19)
        }
      } else if (time.m === 35) {
        if (flags[37] === false) {
          console.log(time)
          flags[37] = true
          this.setData({
            flags: flags
          })
          // (A,V28,O,0)
          this.apply_cancel(28)
        }
      } else if (time.m === 40) {
        if (flags[38] === false) {
          console.log(time)
          flags[38] = true
          this.setData({
            flags: flags
          })
          // (C,V23,F,40)
          this.change_capacity(23, 0, 40)
        }
      } else if (time.m === 50) {
        if (flags[39] === false) {
          console.log(time)
          flags[39] = true
          this.setData({
            flags: flags
          })
          // (A,V29,T,30)
          this.apply(29, 1, 30)
        }
      } else if (time.m === 55) {
        if (flags[40] === false) {
          console.log(time)
          flags[40] = true
          this.setData({
            flags: flags
          })
          // (C,V14,F,30)
          this.change_capacity(14, 0, 30)
        }
      } else {
        this.start_test()
      }
    } else if (time.h === 10) {
      // 10:00:00
      if (time.m === 0) {
        if (flags[41] === false) {
          console.log(time)
          flags[41] = true
          this.setData({
            flags: flags
          })
          // (A,V30,T,10)
          this.apply(30, 1, 10)
        }
      } else if (time.m === 50) {
        if (flags[42] === false) {
          console.log(time)
          flags[42] = true
          this.setData({
            flags: flags
          })
          // (B,F1,O,1)
          this.breakdown_ok(0, 1)
        }
      } else {
        this.start_test()
      }
    } else {
      this.start_test()
    }
  },

  // 充电请求
  apply(i, mode, capacity) {
    console.log('apply')
    let that = this
    let token = this.data.tokens[i]
    // 网络请求
    wx.request({
      url: app.globalData.server + '/order/requestCharge',
      method: 'POST',
      data: {
        token: token,
        mode: mode,
        capacity: capacity,
        totalCapacity: 200
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code === 200) {
            if (mode === 1) {
              let msg = '(A, V' + i + ', T, ' + capacity + ')'
              console.log(msg)
            } else {
              let msg = '(A, V' + i + ', F, ' + capacity + ')'
              console.log(msg)
            }
          }
          that.start_test()
        }
      }
    })
  },

  // 取消充电请求
  apply_cancel(i) {
    console.log('apply_cancel')
    let that = this
    let token = this.data.tokens[i]
    // 获取正在进行中的订单id
    wx.request({
      url: app.globalData.server + '/orders/cancelbyToken',
      method: 'PUT',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code === 200) {
            let msg = '(A, ' + 'V' + i + ', O, 0)'
            console.log(msg)
          }
          that.start_test()
        }
      }
    })
  },

  // 充电桩故障
  breakdown_g(mode, point_id) {
    console.log('breakdown_g')
    let that = this
    let token = this.data.admin_token
    wx.request({
      url: app.globalData.server + '/admin/setPointError',
      method: 'POST',
      data: {
        token: token,
        pointId: point_id
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            if (mode === 0) {
              let msg = '(B, F' + point_id + ', O, 0)'
              console.log(msg)
            } else {
              let tmp = point_id - 2
              let msg = '(B, T' + tmp + ', O, 0)'
              console.log(msg)
            }
            that.start_test()
          }
        }
      }
    })
  },

  // 充电桩恢复
  breakdown_ok(mode, point_id) {
    console.log('breakdown_ok')
    let that = this
    let token = this.data.admin_token
    wx.request({
      url: app.globalData.server + '/admin/setPointOK',
      method: 'POST',
      data: {
        token: token,
        pointId: point_id
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            if (mode === 0) {
              let msg = '(B, F' + point_id + ', O, 1)'
              console.log(msg)
            } else {
              let msg = '(B, T' + point_id + ', O, 1)'
              console.log(msg)
            }
            that.start_test()
          }
        }
      }
    })
  },

  change_capacity(i, mode, capacity) {
    console.log('change_capacity')
    let that = this
    let token = this.data.tokens[i]
    // 获取正在进行中的订单id
    wx.request({
      url: app.globalData.server + '/user/getOrder',
      method: 'GET',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code === 200) {
            let order_id = res.data.orderid
            // 修改充电量
            wx.request({
              url: app.globalData.server + '/orders/capacity/' + order_id,
              method: 'PUT',
              data: {
                token: token,
                capacity: capacity
              },
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                if (res.statusCode == 200) {
                  if (res.data.code == 200) {
                    let msg = '(C, ' + 'V' + i + ', F, ' + capacity + ')'
                    console.log(msg)
                  }
                  that.start_test()
                }
              }
            })
          }
        }
      }
    })
  },

  getHMS(start_time) {
    // 计算当前时间戳
    let now_time = (parseInt(new Date().getTime() / 1000) - start_time) * 60 + 1655329800

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
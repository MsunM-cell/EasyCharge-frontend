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
      if (time.h === 6) {
        // 6:00:00
        if (time.m === 0) {
          if (flags[1] === false) {
            flags[1] = true
            // (A,V1,T,40)
            this.apply(1, 1, 40)
          }
        } else if (time.m === 5) {
          if (flags[2] === false) {
            flags[2] = true
            // (A,V2,T,30)
            this.apply(2, 1, 30)
          }
        } else if (time.m === 10) {
          if (flags[3] === false) {
            flags[3] = true
            // (A,V3,F,100)
            this.apply(3, 0, 100)
          }
        } else if (time.m === 15) {
          if (flags[4] === false) {
            flags[4] = true
            // (A,V4,F,120)
            this.apply(4, 0, 120)
          }
        } else if (time.m === 20) {
          if (flags[5] === false) {
            flags[5] = true
            // (A,V2,O,0)
            //todo
          }
        } else if (time.m === 25) {
          if (flags[6] === false) {
            flags[6] = true
            // (A,V5,T,20)
            this.apply(5, 1, 20)
          }
        } else if (time.m === 30) {
          if (flags[7] === false) {
            flags[7] = true
            // (A,V6,T,20)
            this.apply(6, 1, 20)
          }
        } else if (time.m === 35) {
          if (flags[8] === false) {
            flags[8] = true
            // (A,V7,F,110)
            this.apply(7, 0, 110)
          }
        } else if (time.m === 40) {
          if (flags[9] === false) {
            flags[9] = true
            // (A,V8,T,20)
            this.apply(8, 1, 20)
          }
        } else if (time.m === 45) {
          if (flags[10] === false) {
            flags[10] = true
            // (A,V9,F,105)
            this.apply(9, 0, 105)
          }
        } else if (time.m === 50) {
          if (flags[11] === false) {
            flags[11] = true
            // (A,V10,T,10)
            this.apply(10, 1, 10)
          }
        } else if (time.m === 55) {
          if (flags[12] === false) {
            flags[12] = true
            // (A,V11,F,110)
            this.apply(11, 0, 110)
          }
        }

      }
      if (time.h === 7) {
        // 7:00:00
        if (time.m === 0) {
          if (flags[13] === false) {
            flags[13] = true
            // (A,V12,F,90)
            this.apply(12, 0, 90)
          }
        } else if (time.m === 5) {
          if (flags[14] === false) {
            flags[14] = true
            // (A,V13,F,110)
            this.apply(13, 0, 110)
          }
        } else if (time.m === 10) {
          if (flags[15] === false) {
            flags[15] = true
            // (A,V14,F,95)
            this.apply(14, 0, 95)
          }
        } else if (time.m === 15) {
          if (flags[16] === false) {
            flags[16] = true
            // (A,V15,T,10)
            this.apply(15, 1, 10)
          }
        } else if (time.m === 20) {
          if (flags[17] === false) {
            flags[17] = true
            // (A,V16,F,60)
            this.apply(16, 0, 60)
          }
        } else if (time.m === 25) {
          if (flags[18] === false) {
            flags[18] = true
            // (A,V17,T,10)
            this.apply(17, 1, 10)
          }
        } else if (time.m === 30) {
          if (flags[19] === false) {
            flags[19] = true
            // (A,V18,T,7.5)
            this.apply(18, 1, 7.5)
          }
        } else if (time.m === 35) {
          if (flags[20] === false) {
            flags[20] = true
            // (A,V19,F,75)
            this.apply(19, 0, 75)
          }
        } else if (time.m === 40) {
          if (flags[21] === false) {
            flags[21] = true
            // (A,V20,F,95)
            this.apply(20, 0, 95)
          }
        } else if (time.m === 45) {
          if (flags[22] === false) {
            flags[22] = true
            // (A,V21,F,95)
            this.apply(21, 0, 95)
          }
        } else if (time.m === 50) {
          if (flags[23] === false) {
            flags[23] = true
            // (A,V22,F,70)
            this.apply(22, 0, 70)
          }
        } else if (time.m === 55) {
          if (flags[24] === false) {
            flags[24] = true
            // (A,V23,F,80)
            this.apply(23, 0, 80)
          }
        }

      }
      if (time.h === 8) {
        // 8:00:00
        if (time.m === 0) {
          if (flags[25] === false) {
            flags[25] = true
            // (A,V24,T,5)
            this.apply(24, 1, 5)
          }
        } else if (time.m === 20) {
          if (flags[26] === false) {
            flags[26] = true
            // (A,V25,T,15)
            this.apply(25, 1, 15)
          }
        } else if (time.m === 25) {
          if (flags[27] === false) {
            flags[27] = true
            // (B,T1,O,0)
            // todo
          }
        } else if (time.m === 30) {
          if (flags[28] === false) {
            flags[28] = true
            // (A,V26,T,20)
            this.apply(26, 1, 20)
          }
        } else if (time.m === 35) {
          if (flags[29] === false) {
            flags[29] = true
            // (A,V27,T,25)
            this.apply(27, 1, 25)
          }
        } else if (time.m === 50) {
          if (flags[30] === false) {
            flags[30] = true
            // (B,F1,O,0)
            // todo
          }
        }

      }
      if (time.h === 9) {
        // 9:00:00
        if (time.m === 0) {
          if (flags[31] === false) {
            flags[31] = true
            // (A,V28,F,30)
            this.apply(28, 0, 30)
          }
        } else if (time.m === 10) {
          if (flags[32] === false) {
            flags[32] = true
            // (A,V1,O,0)
            // todo
          }
        } else if (time.m === 15) {
          if (flags[33] === false) {
            flags[33] = true
            // (B,T1,O,1)
            // todo
          }
        } else if (time.m === 20) {
          if (flags[34] === false) {
            flags[34] = true
            // (A,V27,O,0)
            // todo
          }
        } else if (time.m === 25) {
          if (flags[35] === false) {
            flags[35] = true
            // (C,V21,F,35)
            // todo
          }
        } else if (time.m === 30) {
          if (flags[36] === false) {
            flags[36] = true
            // (A,V19,O,0)
            // todo
          }
        } else if (time.m === 35) {
          if (flags[37] === false) {
            flags[37] = true
            // (A,V28,O,0)
            // todo
          }
        } else if (time.m === 40) {
          if (flags[38] === false) {
            flags[38] = true
            // (C,V23,F,40)
            // todo
          }
        } else if (time.m === 50) {
          if (flags[39] === false) {
            flags[39] = true
            // (A,V29,T,30)
            this.apply(29, 1, 30)
          }
        } else if (time.m === 55) {
          if (flags[40] === false) {
            flags[40] = true
            // (C,V14,F,30)
            // todo
          }
        }

      }
      if (time.h === 10) {
        // 10:00:00
        if (time.m === 0) {
          if (flags[41] === false) {
            flags[41] = true
            // (A,V30,T,10)
            this.apply(30, 1, 10)
          }
        } else if (time.m === 50) {
          if (flags[42] === false) {
            flags[42] = true
            // (B,F1,O,1)
            // todo
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
        token: that.data.tokens[i],
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

  // 取消充电请求
  apply_cancel(i) {
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
            // 取消充电
            wx.request({
              url: app.globalData.server + '/orders/cancel/' + order_id,
              method: 'PUT',
              data: {
                token: token
              },
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                if (res.statusCode == 200) {
                  if (res.data.code == 200) {
                    let msg = '(A, ' + 'V' + i + ', O, 0)'
                    console.log(msg)
                  }
                }
              }
            })
          }
        }
      }
    })
  },

  // 充电桩故障
  breakdown_g(mode, point_id) {
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
              let msg = '(B, F' + point_id + ', O, 0'
              console.log(msg)
            } else {
              let msg = '(B, T' + point_id + ', O, 0'
              console.log(msg)
            }
          }
        }
      }
    })
  },

  // 充电桩恢复
  breakdown_ok(mode, point_id) {
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
              let msg = '(B, F' + point_id + ', O, 1'
              console.log(msg)
            } else {
              let msg = '(B, T' + point_id + ', O, 1'
              console.log(msg)
            }
          }
        }
      }
    })
  },

  change_capacity(i, mode, capacity) {
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
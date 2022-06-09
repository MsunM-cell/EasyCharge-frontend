const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },

  data: {
    triggered: false,
    customer: {},
    order: {},
    frontCarNum: null,
    queuePos: null,
    chargeInfo: {},
    orderDetails: {}
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      // 检查当前用户充电状态
      this.checkStatus()
    },

    // 在组件实例被从页面节点树移除时执行
    detached: function () {

    }
  },

  methods: {
    // 下拉刷新
    onRefresh() {
      if (this._freshing) return
      this._freshing = true
      wx.showLoading()
      this.checkStatus()
      setTimeout(() => {
        wx.hideLoading()
        this.setData({
          triggered: false
        })
        this._freshing = false
      }, 500)
    },

    // 开始充电
    startCharge() {
      wx.navigateTo({
        url: '/pages/customer/charge/order/order'
      })
    },

    checkStatus() {
      this.setData({
        customer: app.globalData.customer
      })
      if (this.data.customer.order_id) {
        // 获取订单信息
        this.getOrderInfo()
      }
    },

    getOrderInfo() {
      let id = this.data.customer.order_id
      console.log('id', id)
      let token = this.data.customer.token
      let that = this
      // 获取订单信息的网络请求
      wx.request({
        url: app.globalData.server + '/orders/' + id,
        method: 'GET',
        data: {
          token: token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.statusCode === 200) {
            console.log(res)
            if (res.data.code === 200) {
              that.setData({
                order: res.data.order
              })
              // 检查当前用户的订单状态
              that.checkOrderStatus()
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })

      // // 测试
      // let order = {
      //   "id": 37,
      //   "status": 3,
      //   "create_time": "2021-12-31 23:04:32",
      //   "mode": 1,
      //   "capacity": 92
      // }
      // this.setData({
      //   order: order
      // })

      // this.checkOrderStatus()
    },

    checkOrderStatus() {
      let order_status = this.data.order.status
      switch (order_status) {
        case 0: // 等候区
          // 获取前车等待数量
          this.getFrontCarNum()
          // 获取排队号码
          this.getQueuePos()
          break
        case 1: // 排队中
          // 获取前车等待数量
          this.getFrontCarNum()
          // 获取排队号码
          // this.getQueuePos()
          // 获取充电信息
          this.getChargeInfo()
          break
        case 2: // 充电中
          // 获取排队号码
          this.getQueuePos()
          // 获取充电信息
          this.getChargeInfo()
          break
        case 3: // 待支付
          // 获取充电详单
          this.getOrderDetails()
      }
    },

    getFrontCarNum() {
      let orderId = this.data.order.id
      let that = this
      // 获取前车等待数量的网络请求
      wx.request({
        url: app.globalData.server + '/order/getFrontCarNum',
        method: 'GET',
        data: {
          token: app.globalData.customer.token,
          orderId: orderId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res)
          if (res.statusCode === 200) {
            if (res.data.code === 200) {
              that.setData({
                frontCarNum: res.data.num
              })
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })

      // 测试
      // this.setData({
      //   frontCarNum: 11
      // })
    },

    getQueuePos() {
      let orderId = this.data.order.id
      let that = this
      // 获取排队号码的网络请求
      wx.request({
        url: app.globalData.server + '/order/getQueuePos',
        method: 'GET',
        data: {
          token: app.globalData.customer.token,
          orderId: orderId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.statusCode === 200) {
            console.log(res)
            if (res.data.code === 200) {
              that.setData({
                queuePos: res.data.queuepos
              })
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })

      // 测试
      // this.setData({
      //   queuePos: 10
      // })
    },

    getChargeInfo() {
      let id = this.data.order.id
      let token = this.data.customer.token
      let that = this
      // 获取订单信息的网络请求
      wx.request({
        url: app.globalData.server + '/orders/charge/' + id,
        method: 'GET',
        data: {
          token: token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.statusCode === 200) {
            console.log(res)
            if (res.data.code === 200) {
              that.setData({
                chargeInfo: res.data.charge
              })
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })

      // 测试
      // this.setData({
      //   chargeInfo: {
      //     "station": 60,
      //     "capacity_cost": 17,
      //     "cost": 64,
      //     "start_time": "1994-12-23 08:51:21",
      //     "service_cost": 39,
      //     "capacity": 67,
      //     "time": "01:13:45"
      //   }
      // })
    },

    getOrderDetails() {
      let id = this.data.order.id
      let token = this.data.customer.token
      let that = this
      // 获取充电详单的网络请求
      wx.request({
        url: app.globalData.server + '/orders/details/' + id,
        method: 'GET',
        data: {
          token: token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.statusCode === 200) {
            console.log(res)
            if (res.data.code === 200) {
              that.setData({
                orderDetails: res.data.order_detail
              })
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })

      // 测试
      // this.setData({
      //   orderDetails: {
      //     "id": 62,
      //     "creatTime": "2000-09-13 19:54:55",
      //     "chargeCapacity": 1992,
      //     "totaltime": "20:37:27",
      //     "startTime": "1997-04-25 01:37:46",
      //     "endTime": "1992-12-22 06:26:43",
      //     "chargeId": 11,
      //     "capCost": 3,
      //     "serveCost": 44,
      //     "cost": 35
      //   }
      // })
    },

    // 修改充电请求 充电模式or充电量
    changeChargeRequest() {
      let capacity = this.data.order.capacity
      let mode = this.data.order.mode
      wx.navigateTo({
        url: '/pages/customer/charge/change/change?capacity=' + capacity + '&mode=' + mode
      })
    },

    // 取消充电
    cancelCharge() {
      let id = this.data.order.id
      wx.request({
        url: app.globalData.server + '/orders/cancel/' + id,
        method: 'PUT',
        data: {
          token: app.globalData.customer.token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '取消成功',
                icon: 'success'
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/customer/index/index'
                })
              }, 500)
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })
    },

    // 支付订单
    payCharge() {
      let id = this.data.order.id
      wx.request({
        url: app.globalData.server + '/orders/pay/' + id,
        method: 'PUT',
        data: {
          token: app.globalData.customer.token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })
              // 清除当前订单
              app.globalData.customer.order_id = null
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/customer/index/index'
                })
              }, 500)
            }
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
      })
    }
  }
})
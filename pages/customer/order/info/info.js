const app = getApp()

Page({
  data: {
    order: {
      "id": 78,
      "status": 5,
      "createTime": "1976-12-14 17:48:29",
      "mode": 1,
      "capacity": 9
    },
    have_order_details: true,
    order_details: {
      "id": 92,
      "creatTime": "1989-07-01 18:19:20",
      "chargeCapacity": 6,
      "totaltime": "2017-01-10 04:11:15",
      "startTime": "1987-11-23 07:11:07",
      "endTime": "2000-11-23 23:18:41",
      "chargeId": 48,
      "capCost": 4,
      "serveCost": 48,
      "cost": 45
    }
  },

  onLoad(options) {
    // 获取订单id
    let id = options.id
    // 获取订单信息
    this.getOrder(id)
  },

  getOrder(id) {
    let that = this
    // 获取订单信息的网络请求
    wx.request({
      url: app.globalData.server + '/orders/' + id,
      method: 'GET',
      data: {
        token: app.globalData.customer.token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            that.setData({
              order: res.data.order
            })
            // 检查订单状态
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
  },

  checkOrderStatus() {
    let status = this.data.order.status
    // 待支付或已支付
    if (status === 3 || status == 4) {
      // 获取充电详单
      this.getOrderDetails()
    }
  },

  getOrderDetails() {
    let id = this.data.order.id
    let token = app.globalData.customer.token
    let that = this
    // 获取充电详单的网络请求
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
          if (res.data.code === 200) {
            that.setData({
              have_order_details: true,
              order_details: res.data.order_detail
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
  }
})
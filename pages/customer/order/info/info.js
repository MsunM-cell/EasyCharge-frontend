const app = getApp()

Page({
  data: {
    order: {},
    have_order_details: false,
    order_details: {}
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
        console.log(res)
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
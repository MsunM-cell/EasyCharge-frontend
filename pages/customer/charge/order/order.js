const app = getApp()

Page({
  data: {
    index: 0,
    mode: ['快充', '慢充']
  },

  selectMode(e) {
    this.setData({
      index: e.detail.value
    })
  },

  submitCharge(e) {
    let mode = parseInt(this.data.index)
    let capacity = parseInt(e.detail.value.capacity)
    let total_capacity = parseInt(e.detail.value.total_capacity)
    // 提交订单的网络请求
    wx.request({
      url: app.globalData.server + '/order/requestCharge',
      method: 'POST',
      data: {
        token: app.globalData.customer.token,
        mode: mode,
        capacity: capacity,
        totalCapacity: total_capacity
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          // console.log(res)
          if (res.data.code === 200) {
            wx.showToast({
              title: '下单成功',
              icon: 'success'
            })
            app.globalData.customer.order_id = res.data.order.id
            // 返回首页
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

    // 测试
    // wx.showToast({
    //   title: '下单成功',
    //   icon: 'success'
    // })
    // // 返回首页
    // setTimeout(function () {
    //   wx.navigateTo({
    //     url: '/pages/customer/index/index'
    //   })
    // }, 500)
  }
})
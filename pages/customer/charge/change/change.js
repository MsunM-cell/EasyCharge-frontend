const app = getApp()

Page({
  data: {
    index: 0,
    mode: ['快充', '慢充'],
    origin_mode: null,
    origin_capacity: null,
  },

  onLoad(options) {
    this.setData({
      index: options.mode,
      origin_mode: options.mode,
      origin_capacity: options.capacity
    })
  },

  // 选择充电模式
  selectMode(e) {
    this.setData({
      index: e.detail.value
    })
  },

  submitCharge(e) {
    let capacity = e.detail.value.capacity
    if (this.data.index == this.data.origin_mode && capacity == this.data.origin_capacity) {
      wx.showToast({
        title: '请选择修改',
        icon: 'error'
      })
    } else if (this.data.index == this.data.origin_mode) {
      // 修改充电量
      this.changeCapacity(capacity)
    } else if (capacity == this.data.origin_capacity) {
      // 修改充电模式
      this.changeMode()
    } else {
      // 修改充电量
      this.changeCapacity()
      // 修改充电模式
      this.changeMode()
    }
  },

  changeCapacity(capacity) {
    let id = app.globalData.customer.order_id
    // 修改充电量的网络请求
    wx.request({
      url: app.globalData.server + '/orders/capacity/' + id,
      method: 'PUT',
      data: {
        token: app.globalData.customer.token,
        capacity: capacity
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
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
  },

  changeMode() {
    let mode = this.data.index
    // 修改充电模式的网络请求
    wx.request({
      url: app.globalData.server + '/orders/mode/' + id,
      method: 'PUT',
      data: {
        token: app.globalData.customer.token,
        mode: mode
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
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
  }
})
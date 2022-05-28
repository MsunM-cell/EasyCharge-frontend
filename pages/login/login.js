Page({
  data: {
    identity: 0
  },

  // 登录
  login(e) {
    let username = e.detail.value.username
    let password = e.detail.value.password
    if (!username || !password) {
      wx.showToast({
        title: '信息不完整',
        icon: 'error'
      })
      return
    }

    // 登录的网络请求

    // 测试
    if (this.data.identity === 0) {
      wx.navigateTo({
        url: '/pages/customer/index/index'
      })
    } else {
      wx.navigateTo({
        url: '/pages/admin/index/index'
      })
    }
  },

  // 用户注册
  register() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  // 改变身份
  changeIdentity() {
    let identity = (this.data.identity + 1) % 2
    this.setData({
      identity: identity
    })
  }
})
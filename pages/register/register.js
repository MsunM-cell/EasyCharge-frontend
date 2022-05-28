Page({
  data: {
    index: 0,
    identity: ['普通用户', '管理员'],
    is_pwd_invisible: true,
    is_2_pwd_invisible: true
  },

  // 选择身份
  selectIdentity(e) {
    this.setData({
      index: e.detail.value
    })
  },

  setPwdVisibility() {
    let is_pwd_invisible = !this.data.is_pwd_invisible
    this.setData({
      is_pwd_invisible: is_pwd_invisible
    })
  },

  set2PwdVisibility() {
    let is_2_pwd_invisible = !this.data.is_2_pwd_invisible
    this.setData({
      is_2_pwd_invisible: is_2_pwd_invisible
    })
  },

  // 注册
  register(e) {
    let username = e.detail.value.username
    let password = e.detail.value.password
    let password_confirmed = e.detail.value.password_confirmed

    if (!username || !password || !password_confirmed) {
      wx.showToast({
        title: '信息不完整',
        icon: 'error',
      })
      return
    }

    if (password.length < 6 || password.length > 11) {
      wx.showToast({
        title: '密码长度6~11位',
        icon: 'error',
      })
      return
    }

    if (password != password_confirmed) {
      wx.showToast({
        title: '两次密码不相同',
        icon: 'error',
      })
      return
    }

    // 注册的网络请求
  }
})
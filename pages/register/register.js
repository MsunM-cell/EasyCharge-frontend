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
  }
})
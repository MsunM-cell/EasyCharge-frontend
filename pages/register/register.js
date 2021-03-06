const app = getApp()

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

    if (this.data.index === 0) // 注册普通用户
      this.registerCustomer(username, password)
    else // 注册管理员
      this.registerAdmin(username, password)
  },

  registerCustomer(username, password) {
    // 网络请求
    wx.request({
      url: app.globalData.server + '/users/register',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          // 用户名已存在
          if (res.data.code === -2) {
            wx.showToast({
              title: '用户名已存在',
              icon: 'error'
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
            // 返回登录页面
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
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

  registerAdmin(adminname, password) {
    console.log("注册管理员")
    // 网络请求
    wx.request({
      url: app.globalData.server + '/admin/register',
      method: 'POST',
      data: {
        adminname: adminname,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          // 用户名已存在
          if (res.data.code === -2) {
            wx.showToast({
              title: '用户名已存在',
              icon: 'error'
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
            // 返回登录页面
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
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
const app = getApp()

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

    if (this.data.identity === 0) // 用户登录
      this.loginCustomer(username, password)
    else if (this.data.identity === 1) // 管理员登录
      this.loginAdmin(username, password)
  },

  loginCustomer(username, password) {
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
        if (res.statusCode == 200) {
          // 用户名不存在或密码错误
          if (res.data.code === -3) {
            wx.showModal({
              content: '用户名不存在或密码错误',
              showCancel: false,
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            app.globalData.customer.id = res.data.id
            app.globalData.customer.order_id = res.data.orderId
            app.globalData.customer.token = res.data.token
            // 进入用户页面
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

   loginAdmin(adminname, password) {
    console.log("管理员登陆")
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
        if (res.statusCode == 200) {
          // 用户名不存在或密码错误
          if (res.data.code === -3) {
            wx.showModal({
              content: '用户名不存在或密码错误',
              showCancel: false,
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              
              title: '登录成功',
              icon: 'success'
            })
            console.log(res)
            app.globalData.admin.id = res.data.id
            app.globalData.admin.token = res.data.token
            // 进入管理员页面
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/admin/index/index'
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
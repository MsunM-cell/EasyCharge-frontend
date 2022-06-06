const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },

  data: {
    triggered: false,
    orders: []
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      console.log('order')
      // 获取当前用户的全部订单
      this.getAllOrders()
    },

    // 在组件实例被从页面节点树移除时执行
    detached: function () {}
  },

  methods: {
    // 下拉刷新
    onRefresh() {
      if (this._freshing) return
      this._freshing = true
      wx.showLoading()
      this.getAllOrders()
      setTimeout(() => {
        wx.hideLoading()
        this.setData({
          triggered: false
        })
        this._freshing = false
      }, 500)
    },

    getAllOrders() {
      let that = this
      // 获取订单的网络请求
      wx.request({
        url: app.globalData.server + '/orders',
        method: 'GET',
        data: {
          token: app.globalData.customer.token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res)
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              that.setData({
                orders: res.data.orders
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
    },

    // 获取具体某一个订单
    getOrder(e) {
      let index = e.currentTarget.dataset.index
      let id = this.data.orders[index].id
      wx.navigateTo({
        url: '/pages/customer/order/info/info?id=' + id
      })
    }
  }
})
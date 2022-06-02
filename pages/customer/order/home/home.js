const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },

  data: {
    triggered: false,
    orders: [{
      "id": 91,
      "status": 0,
      "create_time": "2022-01-10 13:41:44",
      "mode": 0,
      "capacity": 45
    }, {
      "id": 91,
      "status": 1,
      "create_time": "2022-01-10 13:41:44",
      "mode": 0,
      "capacity": 45
    }, {
      "id": 91,
      "status": 2,
      "create_time": "2022-01-10 13:41:44",
      "mode": 8,
      "capacity": 45
    }, {
      "id": 91,
      "status": 3,
      "create_time": "2022-01-10 13:41:44",
      "mode": 1,
      "capacity": 45
    }, {
      "id": 91,
      "status": 4,
      "create_time": "2022-01-10 13:41:44",
      "mode": 1,
      "capacity": 45
    }, {
      "id": 91,
      "status": 5,
      "create_time": "2022-01-10 13:41:44",
      "mode": 1,
      "capacity": 45
    }]
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
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
      setTimeout(() => {
        wx.hideLoading()
        this.setData({
          triggered: false
        })
        this._freshing = false
      }, 500)
    },

    getAllOrders() {
      let id = app.globalData.customer.id
      let that = this
      // 获取订单的网络请求
      wx.request({
        url: app.globalData.server + '/orders?user=' + id,
        method: 'GET',
        data: {
          token: app.globalData.customer.token
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
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
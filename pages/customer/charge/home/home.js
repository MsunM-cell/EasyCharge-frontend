const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },

  data: {
    triggered: false,
    order_id: null,
    order: {}
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      // 检查当前用户充电状态
      this.checkStatus()
    },

    // 在组件实例被从页面节点树移除时执行
    detached: function () {

    }
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

    checkStatus() {
      if (app.globalData.customer.order_id) {
        this.setData({
          order_id: app.globalData.customer.order_id
        })
        // 获取订单信息
        this.getOrderInfo()
      }
    },

    getOrderInfo() {
      // 获取订单信息的网络请求

      // 测试
      let order = {
        "id": 37,
        "status": 1,
        "create_time": "2021-12-31 23:04:32",
        "mode": 1,
        "capacity": 92
      }
      this.setData({
        order: order
      })
      // 检查当前用户的订单状态
      this.checkOrderStatus()
    },

    checkOrderStatus() {
      let order_status = this.data.order.status
      switch (order_status) {
        // 等候区
        case 0:
          // 获取前车等待数量
          this.getFrontCarNum()
          break
      }
    },

    // 开始充电
    startCharge() {
      wx.navigateTo({
        url: '/pages/customer/charge/order/order'
      })
    },

    getFrontCarNum() {
      // 获取前车等待数量的网络请求

    },

    // 修改充电请求 充电模式or充电量
    changeChargeRequest() {
      let capacity = this.data.order.capacity
      let mode = this.data.order.mode
      wx.navigateTo({
        url: '/pages/customer/charge/change/change?capacity=' + capacity + '&mode=' + mode
      })
    }
  }
})
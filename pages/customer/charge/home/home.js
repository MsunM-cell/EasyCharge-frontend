const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    order_id: null,
    order: {}
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      if (app.globalData.customer.order_id) {
        this.setData({
          order_id: app.globalData.customer.order_id
        })

        // 获取订单信息
        this.getOrderInfo()
      }
    },

    detached: function () {
      // 在组件实例被从页面节点树移除时执行

    }
  },

  methods: {
    startCharge() {
      wx.navigateTo({
        url: '/pages/customer/charge/order/order'
      })
    },

    getOrderInfo() {
      // 获取订单信息的网络请求

      // 测试
      let order = {
        "id": 37,
        "status": 28,
        "create_time": "1990-04-04 AM 01:41:51",
        "mode": 42,
        "capacity": 92
      }
      this.setData({
        order: order
      })
      
      
    }
  }
})
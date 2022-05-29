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
      "mode": 8,
      "capacity": 45
    }, {
      "id": 91,
      "status": 1,
      "create_time": "2022-01-10 13:41:44",
      "mode": 8,
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
      "mode": 8,
      "capacity": 45
    }, {
      "id": 91,
      "status": 4,
      "create_time": "2022-01-10 13:41:44",
      "mode": 8,
      "capacity": 45
    }, {
      "id": 91,
      "status": 5,
      "create_time": "2022-01-10 13:41:44",
      "mode": 8,
      "capacity": 45
    }]
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {},

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
    }
  }
})
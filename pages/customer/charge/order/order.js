Page({
  data: {
    index: 0,
    mode: ['快充', '慢充']
  },

  selectMode(e) {
    this.setData({
      index: e.detail.value
    })
  },

  submitCharge(e) {
    // 提交订单的网络请求
  }
})
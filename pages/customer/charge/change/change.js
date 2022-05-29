Page({
  data: {
    index: 0,
    mode: ['快充', '慢充'],
    origin_mode: null,
    origin_capacity: null,
  },

  onLoad(options) {
    this.setData({
      index: options.mode,
      origin_mode: options.mode,
      origin_capacity: options.capacity
    })
  }
})
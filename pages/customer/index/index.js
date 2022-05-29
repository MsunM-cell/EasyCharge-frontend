Page({
  data: {
    pageCur: 'order',
    pageStatus: 0
  },

  navChange(e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    })
  },
})
Page({
  data: {
    pageCur: 'charge',
    pageStatus: 0
  },

  navChange(e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    })
  },
})
// pages/admin/stationDetail/stationDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: "/images/station/station_disable.png",
    stationInfo: '',
    carNum: 0,
    carList: [{
      id: 50,
      username: 'asdf',
      carElecTotal: 25,
      carElecRequest: 50,
      carWaitTime: 100,

    },
    {
      id: 60,
      username: 'hjkl',
      carElecTotal: 100,
      carElecRequest: 0,
      carWaitTime: 120,

    },
    {
      id: 70,
      username: 'qwer',
      carElecTotal: 20,
      carElecRequest: 100,
      carWaitTime: 300,

    },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var data = wx.getStorageSync('stationDetail');
    var imagesrc;
    if (data.status == 0) //充电
    {
      imagesrc = "/images/station/staion_working.png"
    } else if (data.status == 1) //空闲
    {
      imagesrc = "/images/station/staion_free.png"
    } else //关闭
    {
      imagesrc = "/images/station/station_disable.png"
    }
    this.setData({
      stationInfo: data,
      imageSrc: imagesrc
    })

    //TODO: 网络请求车辆信息
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  switchStationStatus: function () {
    
  }
})
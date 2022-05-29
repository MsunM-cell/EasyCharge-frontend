// pages/admin/chargeStationList/chargeStationList.js

var managerId = getApp().globalData.managerId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      pointNum:10,
      chargeStations:[
        {
          pointID:2,
          status:0,
          type:0,
          order_id:123,
          chargeCnt:123,
          charteTime:45,
          chargeElec:123

        },
        {
          pointID:10,
          status:1,
          type:1,
          order_id:123,
          chargeCnt:123,
          charteTime:45,
          chargeElec:123
        },        
        {
          pointID:11,
          status:2,
          type:0,
          order_id:123,
          chargeCnt:123,
          charteTime:45,
          chargeElec:123
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickChageStation: function(e){
    // console.log(e.currentTarget.id);
    // console.log(this.data.chargeStations[e.currentTarget.id]);
    wx.setStorageSync('stationDetail', this.data.chargeStations[e.currentTarget.id]);
    wx.navigateTo({
      url: '/pages/admin/stationDetail/stationDetail',
    })
  }




  
})
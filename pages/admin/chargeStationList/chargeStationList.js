// pages/admin/chargeStationList/chargeStationList.js
const app = getApp()
var managerId = getApp().globalData.managerId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      chargeStations:[
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
    this.getStationList();
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
    wx.showLoading({
      title: '刷新中',
    })
    this.getStationList();
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
  },
  getStationList :function(){
    let that = this;
    console.log(app.globalData.admin.token)
    wx.request({
      url:  app.globalData.server + '/admin/getChargePoint',
      method: 'GET',
      data: {
        token: app.globalData.admin.token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        console.log(res)
          if(res.data.code == 200){
            that.setData({
              chargeStations: res.data.points
            })
          }else{
            wx.showModal({
              content: res.data.msg,
              showCancel: false,
            })
          }
      },
      fail(res){
          wx.showToast({
            title: '网络错误',
          })
      },
      complete(){
        wx.hideLoading();
      }
    })
  }




  
})
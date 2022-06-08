// pages/admin/stationDetail/stationDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: "/images/station/station_disable.png",
    stationInfo: '',
    carNum: 0,
    carListEmpty: false,
    carList: {},
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var data = wx.getStorageSync('stationDetail');
    this.setData({
      stationInfo: data,
    })
    this.setImageSrc();
    this.getChargePointCar();
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
    let that = this;
    if (this.data.stationInfo.status == 0) //关闭充电桩
    {
      wx.request({
        url: app.globalData.server + '/admin/closeChargePoint',
        method: 'POST',
        data: {
          token: app.globalData.admin.token,
          pointId: that.data.stationInfo.pointId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res);
          if (res.data.code == 200) {
            that.setData({
              'stationInfo.status': 1
            })
            that.setImageSrc();
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        },
        fail(res) {
          console.log(res);
          wx.showToast({
            title: '未知错误',
          })
          console.log(res);
        }
      })

    } else {
      wx.request({
        url: app.globalData.server + '/admin/onChargePoint',
        method: 'POST',
        data: {
          token: app.globalData.admin.token,
          pointId: that.data.stationInfo.pointId
        },
        header: {
          'content-type': 'application/json'
        },
        //TODO:刷新
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              'stationInfo.status': 0
            })
            that.setImageSrc();

          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '未知错误',
            icon: "error"
          })
          console.log(res);
        }
      })
    }

  },

  getChargePointCar: function () {
    let that = this
    console.log(app.globalData.admin.token)
    wx.request({
      url: app.globalData.server + '/admin/getChargePointCar',
      method: 'GET',
      data: {
        token: app.globalData.admin.token,
        pointId: that.data.stationInfo.pointId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res)
          that.setData({
            carList: res.data.data
          })
          if (that.isCarListEmpty(res.data.data)) {
            that.setData({
              carListEmpty: true
            })
          } else {
            that.setData({
              carListEmpty: false
            })
          }
        } else {
          wx.showModal({
            content: res.data.msg,
            showCancel: false,
          })
        }
      }
    })
  },
  isCarListEmpty: function (data) {
    for (var key in data) {
      return false;
    }
    return true;
  },
  setImageSrc:function(){
    var imagesrc;
    if (this.data.stationInfo.status == 0) //充电
    {
      imagesrc = "/images/station/staion_working.png"
    } else if (this.data.stationInfo.status == 1) //异常
    {
      imagesrc = "/images/station/station_disable.png"
    } else //关闭
    {
      imagesrc = "/images/station/station_disable.png"
    }
    this.setData({
      imageSrc:imagesrc
    })
  }

})
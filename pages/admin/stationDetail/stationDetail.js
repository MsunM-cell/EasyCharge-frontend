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
        method: 'GET',
        data: {
          token: app.globalData.admin.token,
          pointID: that.data.stationInfo.pointId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              'stationInfo.status' : 1
            })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '未知错误',
          })
          console.log(res);
        }
      })

    } else {
      wx.request({
        url: app.globalData.server + '/admin/onChargePoint',
        method: 'GET',
        data: {
          token: app.globalData.admin.token,
          pointID: that.stationInfo.pointId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              'stationInfo.status' : 0
            })
            
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '未知错误',
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
        token: app.globalData.admin.token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res)
//TODO:
        } else {
          wx.showModal({
            content: res.data.msg,
            showCancel: false,
          })
        }
      }
    })
  }

})
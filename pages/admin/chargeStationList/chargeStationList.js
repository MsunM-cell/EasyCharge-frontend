// pages/admin/chargeStationList/chargeStationList.js
const app = getApp()
var managerId = getApp().globalData.managerId;
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chargeStations: [],
    bootTime: 1655329800, //系统的开机时间
    startTime: 1655329800, //6-16-5：30的时间
    currentTime: 1655329800, //当前的虚拟时间
    refreshTimeHandler: -1,
    refreshHandler : -1,
    lastRefresh: 0,
    hour: 0,
    minute: 0,
    second: 0,
    waitListEmpty: false,
    waitList: [{
        "orderid": 246,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 247,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 248,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 249,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 250,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 251,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 252,
        "mode": 0,
        "capacity": 19
      },
      {
        "orderid": 253,
        "mode": 0,
        "capacity": 19
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    var handler = setInterval(() => {
      this.refresh();
    }, 10000);
    this.setData({
      refreshHandler : handler
    })
    this.getTimeStamp();
    this.getWait();
    //getStationList写在了onShow里，不知道当初为什么要写在哪，但尽量不要触碰屎山= =
    wx.showLoading({
      title: '数据加载中',
    })
  },


  getWait: function () {
    wx.request({
      url: app.globalData.server + '/getWait',
      method: 'GET',
      data: {
        token: app.globalData.admin.token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("等待区队列：")
        console.log(res)
        if (res.data.code == 200) {
          if (_this.isListEmpty(res.data.data)) {
            _this.setData({
              waitListEmpty: true,
              waitList: []
            })
          } else {
            _this.setData({
              waitListEmpty: false,
              waitList: res.data.data
            })
          }

        } else {
          wx.showModal({
            content: res.data.msg || "等候区获取失败",
            showCancel: false,
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络错误',
          icon: "error"
        })
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  refresh: function () {
    this.getStationList();
    this.getWait();
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
    this.getStationList();
    
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
    clearInterval(this.data.refreshTimeHandler);
    clearInterval(this.data.refreshHandler);
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

  isListEmpty: function (data) {
    for (var key in data) {
      return false;
    }
    return true;
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickChageStation: function (e) {
    // console.log(e.currentTarget.id);
    // console.log(this.data.chargeStations[e.currentTarget.id]);
    wx.setStorageSync('stationDetail', this.data.chargeStations[e.currentTarget.id]);
    wx.navigateTo({
      url: '/pages/admin/stationDetail/stationDetail',
    })
  },
  getStationList: function () {
    let that = this;
    console.log(app.globalData.admin.token)
    wx.request({
      url: app.globalData.server + '/admin/getChargePoint',
      method: 'GET',
      data: {
        token: app.globalData.admin.token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res)
        if (res.data.code == 200) {
          that.setData({
            chargeStations: res.data.points,
          })
        } else {
          wx.showModal({
            content: res.data.msg || "信息获取失败",
            showCancel: false,
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络错误',
          icon: "error"
        })
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  getTimeStamp: function () {
    if (this.data.refreshTimeHandler != -1) {
      clearInterval(this.data.refreshTimeHandler);
    }
    wx.request({
      url: app.globalData.server + '/getTime',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var t = new Date();
        // console.log(res);
        // console.log(t.getTime());
        // console.log(_this.data.startTime);
        var temp = (t.getTime()/1000 - res.data.time) * 10 + _this.data.startTime;
        // console.log(temp);
        var handler;
        _this.setData({
            bootTime: res.data.time,
            currentTime: temp,
            lastRefresh : 0
          }),

        handler = setInterval(() => {
            var nTime = _this.data.currentTime + 10;
            // console.log(nTime);
            var d =  new Date(nTime*1000);
            var nH = d.getHours();
            var nM = d.getMinutes();
            var nS = d.getSeconds();
            _this.setData({
              currentTime: nTime,
              lastRefresh : _this.data.lastRefresh + 1,
              hour : nH,
              minute : nM,
              second: nS
            })
            if(_this.data.lastRefresh > 10) //每再次计算一次时间，防止interval不精确
            {
              var t =  new Date();
              var nTime = (t.getTime()/1000 - _this.data.bootTime) * 10 + _this.data.startTime;
              _this.setData({
                currentTime: nTime,
                lastRefresh : 0
              })
            }
          }, 1000);
          _this.setData({
            refreshTimeHandler : handler
          })
      },
      fail(res) {
        wx.showToast({
          title: '时间同步失败！',
        })
      }
    })
  }
})
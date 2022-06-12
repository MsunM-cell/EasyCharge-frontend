// pages/admin/stationDetail/stationDetail.js
import * as echarts from '../../../components/ec-canvas/echarts'
const app = getApp()
let chart = null;
let _this;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    dataZoom: [{
      type: 'inside', // 内置于坐标系中
      startValue: 0,
      endValue: 15,
      xAxisIndex: [0]
    }],
    title: {
      text: '每日收入表'
    },
    tooltip: {},
    legend: {
      data: ['收入']
    },
    xAxis: {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    },
    yAxis: {},
    series: [{
      name: '日收入',
      type: 'bar',
      data: [9, 8, 5, 4, 7, 6, 3, 2, 1, 5, 4, 7, 8, 9, 6, 4, 7, 8, 5, 3, 6, 2, 4, 7, 5, 7, 9, 6, 5, 1, 2]
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowCalendar: false,
    year: 2021,
    month: 9,
    day: 14,
    imageSrc: "/images/station/station_disable.png",
    stationInfo: '',
    carNum: 0,
    carListEmpty: false,
    carList: {},
    monthdata: [
      "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
    ],
    ec: {
      onInit: initChart
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var data = wx.getStorageSync('stationDetail');
    _this = this;
    this.initTime();
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
    this.getData();
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
    if (this.data.stationInfo.status == 0) //设置为异常
    {
      wx.request({
        url: app.globalData.server + '/admin/setPointError',
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
              title: res.data.msg || "设置充电桩异常失败",
            })
          }
        },
        fail(res) {
          console.log(res);
          wx.showToast({
            title: '未知错误',
            icon: "error"
          })
          console.log(res);
        }
      })

    } else {
      wx.showLoading({
        title: '恢复调度中',
      })
      wx.request({
        url: app.globalData.server + '/admin/setPointOK',
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
              title: res.data.msg || "无法恢复充电桩",
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '未知错误',
            icon: "error"
          })
          console.log(res);
        },
        complete(){
          wx.hideLoading();
        }
      })
    }

  },

  trunOnOrOff :function(){
    let that = this;
    if (this.data.stationInfo.isOpen) //现在为开，设置程关闭
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
              'stationInfo.isOpen': 0
            })
            that.setImageSrc();
          } else {
            wx.showToast({
              title: res.data.msg || "无法关闭充电桩",
            })
          }
        },
        fail(res) {
          console.log(res);
          wx.showToast({
            title: '未知错误',
            icon: "error"
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
              'stationInfo.isOpen': 1
            })
            that.setImageSrc();

          } else {
            wx.showToast({
              title: res.data.msg || "无法开启充电桩",
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
          wx.showToast({
            title: res.data.msg ||"无法获取排队队列",
            icon:"error"
          })
          that.setData({
            carListEmpty: true
          })
        }
      },
      fail(res){
        wx.showToast({
          title: res.data.msg ||"无法获取排队信息",
          icon:"error"
        })
        that.setData({
          carListEmpty: true
        })
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
    if(this.data.stationInfo.isOpen){
      if(this.data.stationInfo.status == 0){
        imagesrc = "/images/station/staion_working.png"
      }else{
        imagesrc = "/images/station/station_error.png"
      }
    }else{
      imagesrc = "/images/station/station_disable.png"
    }
    this.setData({
      imageSrc:imagesrc
    })
  },
  showCalendar: function () {
    this.setData({
      isShowCalendar: !this.data.isShowCalendar
    })
  },
  addYear: function () {
    this.setData({
      year: this.data.year + 1
    })
  },

  subYear: function () {
    this.setData({
      year: this.data.year - 1
    })
  },
  selectDate: function (e) {
    this.setData({
      month: e.currentTarget.id,
      isShowCalendar: false
    })
    this.getData();
  },
  initTime: function () {
    var myDate = new Date();
    var currentYear = myDate.getFullYear();
    var currentmonth = myDate.getMonth();
    var currentDay = myDate.getDate();
    console.log(currentYear);
    console.log(currentmonth);
    console.log(currentDay);
    this.setData({
      year: currentYear,
      //因为0表示1月，所以要加一
      month: currentmonth + 1,
      day: currentDay
    })
  },

  getData: function () {
    var start = this.data.year + "-" + 0 + this.data.month + "-" + "01";
    var end = this.data.year + "-" + 0 + this.data.month + "-" + this.getMonthLength(this.data.year,this.data.month);
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.server + '/admin/getPointChargeReport',
      method: 'GET',
      data: {
        token: app.globalData.admin.token,
        pointId: this.data.stationInfo.pointId,
        start: start,
        end: end
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          _this.processData(res.data.data)
          _this.setData({
            reportData: res.data.data
          })

        } else {
          wx.showToast({
            title: res.data.msg || "报表获取失败",
          })
        }
      },
      fail(res) {

        wx.showToast({
          title: '未知错误',
          icon: "error"
          
        })
        console.log(res);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  getMonthLength: function (year, month) {
    var date = year + "-" + month + "-" + "01";
    let d = new Date(date);
    // 将日期设置为下月一号
    d.setMonth(d.getMonth() + 1);
    d.setDate('1');
    // 获取本月最后一天
    d.setDate(d.getDate() - 1);
    var day = d.getDate();
    console.log(year + "年" + month + "月有" + day + "天")
    return day;
  },

  processData: function (data) {
    var monthLength = this.getMonthLength(_this.data.year, _this.data.month);
    var x = [];
    var y = [];
    console.log("总共有" + monthLength + "天")
    for (var i = 0; i < monthLength; i++) {
      x[i] = i + 1;
      y[i] = 0;
    }
    console.log(data)
    data.forEach(item => {
      console.log(item)
      var day = new Date(item.date).getDate();
      y[day - 1] = item.chargeTotalcost;
    });
    console.log(x)
    console.log(y)
    chart.setOption({
      xAxis: {
        data: x
      },
      series: [{
        name: '日收入',
        type: 'bar',
        data: y
      }]
    })

  },

})
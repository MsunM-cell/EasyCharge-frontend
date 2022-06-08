// pages/admin/report/report.js
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


  chart.on('click', function (params) {
    _this.chartTap(params.dataIndex + 1)
  });



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
    totalcost: 0,
    totalChargeCnt: 0,
    totalChargeElec: 0,
    monthdata: [
      "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
    ],
    reportData: {},
    ec: {
      onInit: initChart
    },
    currentDayChargeCnt: 0,
    currentDayChargeTime: 0,
    currentDayChargeElec: 0,
    currentDayChargeScost: 0,
    currentDayChargeCost: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var calendarHeight = document.getElementById("calendar").offsetHeight;
    // document.getElementById("card").style.height = 300;
    this.initTime();
    _this = this
    setTimeout(() => {
      _this.getData();
    }, 1000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
    this.getData();
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
  chartTap: function (day) {
    this.setData({
      day: day
    })
    this.setCurrentDayInfo(day);
  },

  getData: function () {
    var start = this.data.year + "-" + 0 + this.data.month + "-" + "01";
    var end = this.data.year + "-" + 0 + this.data.month + "-" + 30;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.server + '/admin/getPointChargeReport',
      method: 'GET',
      data: {
        token: app.globalData.admin.token,
        pointId: 1,
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
            title: res.data.msg || "信息获取失败",
          })
        }
      },
      fail(res) {

        wx.showToast({
          title: '未知错误',
        })
        console.log(res);
      },
      complete() {
        wx.hideLoading();
        _this.setCurrentDayInfo();
      }
    })
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
    var totalcost = 0;
    var totalChargeCnt = 0;
    var totalChargeElec = 0;
    console.log(data)
    data.forEach(item => {
      console.log(item)
      var day = new Date(item.date).getDate();
      console.log("正在计算第" + day + "天数据")
      y[day - 1] = item.chargeTotalcost;
      totalcost += item.chargeTotalcost;
      totalChargeCnt += item.chargeTotalCnt;
      totalChargeElec += item.chargeTotalElec;
    });
    console.log(x)
    console.log(y)
    this.setData({
      totalcost: totalcost,
      totalChargeCnt: totalChargeCnt,
      totalChargeElec: totalChargeElec
    })
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
  isListEmpty: function (data) {
    for (var key in data) {
      return false
    }
    return true;
  },
  setCurrentDayInfo() {
    console.log("查看第" + this.data.month + "月第" + this.data.day + "天数据");
    var find = 0;
    if (!this.isListEmpty(this.data.reportData)) {
      this.data.reportData.forEach(item => {
        var thisDate = new Date(item.date);
        if (thisDate.getDate() == this.data.day && thisDate.getMonth() + 1 == this.data.month && thisDate.getFullYear() == this.data.year) {
          this.setData({
            currentDayChargeCnt: item.chargeTotalCnt,
            currentDayChargeTime: item.chargeTotalTime,
            currentDayChargeElec: item.chargeTotalElec,
            currentDayChargeScost: item.chargeTotalScost,
            currentDayChargeCost: item.chargeTotalcost
          })
          find = 1;
        }
      });
    }

    if (find == 0) {
      this.setData({
        currentDayChargeCnt: 0,
        currentDayChargeTime: 0,
        currentDayChargeElec: 0,
        currentDayChargeScost: 0,
        currentDayChargeCost: 0
      })
    }

  }
})
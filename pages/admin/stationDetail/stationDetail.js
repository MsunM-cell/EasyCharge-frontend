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
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '1%', //默认60
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
  },

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
    bootTime: 1655329800, //系统的开机时间
    startTime: 1655329800, //6-16-5：30的时间
    currentTime: 1655329800, //当前的虚拟时间
    refreshTimeHandler: -1,
    refreshHandler : -1,
    lastRefresh : 0,
    hour: 0,
    minute:0,
    second:0,

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

    currentDayChargeCnt: 0,
    currentDayChargeTime: 0,
    currentDayChargeElec: 0,
    currentDayChargeScost: 0,
    currentDayChargeCost: 0,

    noChargeCar : true,

    chargeCar : {
      orderid: 1,
      capacity: 2,
      cost: 1.3,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var data = wx.getStorageSync('stationDetail');
    _this = this;
    this.initTime();
    this.getTimeStamp();
    this.setData({
      stationInfo: data,
    })
    this.setImageSrc();
    this.getChargePointCar();
    var handler = setInterval(() => {
      _this.refresh();
    }, 10000); //5分钟是30s ， 10s刷新一次
    this.setData({
      refreshHandler : handler
    })
  },

  refresh : function(){
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
  //    console.log("handler")
  // console.log(this.data.refreshTimeHandler);
  clearInterval(this.data.refreshTimeHandler);
  clearInterval(this.data.refreshHandler);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getChargePointCar();
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
    if (this.data.stationInfo.status == 0) //需要设置为异常
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

    //获得排队区车辆
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
          console.log("排队队列：")
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


    //获得当前正在充电的车辆
    // pointId: that.data.stationInfo.pointId
    wx.request({
      url: app.globalData.server + '/getPointInfo',
      method: 'GET',
      data: {
        token: app.globalData.admin.token,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code == 200) {
          console.log("所有充电桩信息为：");
          console.log(res)
          var temp = res.data.data[that.data.stationInfo.pointId];
          console.log("获取到的充电桩信息为：");
          console.log(temp);
          if(_this.isListEmpty(temp)){
            _this.setData({
              noChargeCar : true,
              chargeCar : {}
            })
          }else{
            _this.setData({
              noChargeCar : false,
              "chargeCar.orderid" : temp.orderid,
              "chargeCar.capacity":temp.capacity,
              "chargeCar.cost":temp.cost,
              "chargeCar.name":temp.name
            })
          }
          // for( var temp in res.data.data){
          //     console.log(temp);
          // }
        } else {
          wx.showToast({
            title: res.data.msg ||"无法获取服务中订单",
            icon:"error"
          })
          that.setData({
            noChargeCar: true
          })
        }
      },
      fail(res){
        wx.showToast({
          title: res.data.msg ||"无法获取服务中订单",
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
          _this.setCurrentDayInfo();
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
  isListEmpty: function (data) {
    for (var key in data) {
      return false
    }
    return true;
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

  chartTap: function (day) {
    this.setData({
      day: day
    })
    this.setCurrentDayInfo(day);
  },

  setCurrentDayInfo() {
    console.log("查看第" + this.data.month + "月第" + this.data.day + "天数据");
    var cut = 0;
    var time = 0;
    var elec = 0;
    var scost = 0;
    var cost = 0;
    if (!this.isListEmpty(this.data.reportData)) {
      this.data.reportData.forEach(item => {
        var thisDate = new Date(item.date);
        if (thisDate.getDate() == this.data.day && thisDate.getMonth() + 1 == this.data.month && thisDate.getFullYear() == this.data.year) {
          cut = item.chargeTotalCnt;
          time = item.chargeTotalTime;
          elec = item.chargeTotalElec;
          scost =  item.chargeTotalScost;
          cost =item.chargeTotalcost;
        }
      });
    }

      this.setData({
        currentDayChargeCnt: cut,
        currentDayChargeTime: time.toFixed(2),
        currentDayChargeElec: elec.toFixed(2),
        currentDayChargeScost: scost.toFixed(2),
        currentDayChargeCost: cost.toFixed(2)
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
        var temp = (t.getTime()/1000 - res.data.time) * 60 + _this.data.startTime;
        // console.log(temp);
        var handler;
        _this.setData({
            bootTime: res.data.time,
            currentTime: temp,
            lastRefresh : 0
          }),

        handler = setInterval(() => {
            var nTime = _this.data.currentTime + 60;
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
            if(_this.data.lastRefresh > 10) //每100s需要同步一次时间，防止差异过大(?好像没啥卵用)
            {
              var t =  new Date();
              var nTime = (t.getTime()/1000 - _this.data.bootTime) * 60 + _this.data.startTime;
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
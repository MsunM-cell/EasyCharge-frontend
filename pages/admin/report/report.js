// pages/admin/report/report.js
import * as echarts from '../../../components/ec-canvas/echarts'

let chart = null;
let _this;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowCalendar  : false,
    year: 2222,
    mouth : 6,
    day : 8,
    mouthdata:[
      "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",
    ],
    ec:{
      onInit : this.initChart()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var calendarHeight = document.getElementById("calendar").offsetHeight;
    // document.getElementById("card").style.height = 300;

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
    this.initTime();
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
  showCalendar: function(){
      this.setData({
        isShowCalendar : !this.data.isShowCalendar
      })
  },
  addYear : function(){
    this.setData({
      year : this.data.year+1
    })
  },

  subYear:function(){
    this.setData({
      year : this.data.year - 1
    })
  },
  selectDate:function(e){
    this.setData({
      mouth : e.currentTarget.id,
      isShowCalendar:false
    })
  },
  initTime:function(){
    var myDate = new Date();
    var currentYear = myDate.getFullYear();
    var currentMouth = myDate.getMonth();
    var currentDay = myDate.getDate();
    console.log(currentYear);
    console.log(currentMouth);
    console.log(currentDay);
    this.setData({
      year : currentYear,
      mouth : currentMouth +1,
      day:currentDay
    })
  },
  chartTap:function(){
    console.log("fuck")
  },

  getData : function(){

  },
 initChart:function(canvas , width , height,dpr){
    chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);
  
    var option = {
      dataZoom:[{
        type: 'inside',// 内置于坐标系中
        startValue:0,
        endValue: 15,
        xAxisIndex: [0]
      }],
      title:{
        text : '每日收入表'
      },
      tooltip:{},
      legend :{
        data:['收入']
      },
      xAxis:{
        data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
      },
      yAxis:{},
      series:[{
        name:'日收入',
        type:'bar',
        data:[9,8,5,4,7,6,3,2,1,5,4,7,8,9,6,4,7,8,5,3,6,2,4,7,5,7,9,6,5,1,2]
      }]
    };
    chart.setOption(option);
  
  
      chart.on('click',function(params){
      console.log(params)
    });
  
  
  
    return chart;
  }
})
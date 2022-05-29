/*
 * @Date: 2022-05-29 14:08:42
 * @LastEditors: ShimaoZ
 * @LastEditTime: 2022-05-29 21:53:35
 * @FilePath: \EasyCharge-frontend\app.js
 * @copyright: Copyright (C) 2022 shimaoZeng. All rights reserved.
 */
// app.js
App({
  onLaunch() {
    // 获取系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    managerId:'',
    customer: {
      order_id: 1
    }
  }
})

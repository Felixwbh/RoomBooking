// pages/reservedRoom/historyReservation/historyReservation.js
const util = require('../../../utils/util.js');
var qcloud = require('../../../vendor/wafer2-client-sdk/index.js')
var config = require('../../../config.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyReservation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date())
    var currentDate = time.split(' ')[0]
    var currentTime = time.split(' ')[1]
    let openid = app.globalData.openid
    wx.showLoading({
      title: '正在搜索',
    })
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/historyReservation`,
      data: {
        openid: app.globalData.openid,
        currentDate: currentDate,
        currentTime: currentTime
      },
      login: false,
      success(result) {
        wx.hideLoading()
        that.setData({
          historyReservation: result.data.data.historyRoom
        })
        console.log('搜索成功！')
      },
      fail(error) {
        console.log('搜索失败！', error)
      }
    })
  }

})
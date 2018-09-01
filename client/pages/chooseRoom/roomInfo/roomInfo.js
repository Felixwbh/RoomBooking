  // pages/roomInfo/roomInfo.js
const util = require('../../../utils/util.js');
var qcloud = require('../../../vendor/wafer2-client-sdk/index.js')
var config = require('../../../config.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosedRoom: {},
    isReserved: false,
    operation: '预定会议室'
  },

  /**
   * 生命周期函数，监听加载
   */
  onLoad: function(option){
    let choosedRoom = JSON.parse(option.choosedRoom)
    this.setData({
      choosedRoom: choosedRoom
    })
  },

  /**
   * 预定会议室
   */
  reserveRoom: function(){
    //添加数据库预定信息
    let openid = app.globalData.openid
    let reserveInfo = app.globalData.reserveInfo
    wx.showLoading({
      title: '正在预定',
    })
    qcloud.request({
      url: `${config.service.host}/weapp/reserveRoom`,
      data: {
        r_id: this.data.choosedRoom.r_id,
        o_date: reserveInfo.date,
        o_begin_time: reserveInfo.startTime,
        o_keep_time: reserveInfo.keepTime,
        u_openid: openid
      },
      login: false,
      success(result) {
        wx.hideLoading()
        wx.showToast({
          title: '预定成功',
        })
        wx.switchTab({
          url: '/pages/chooseRoom/index',
        })
        console.log('预定成功！')
      },
      fail(error) {
        console.log('预定失败！', error)
      }
    })
  }

})
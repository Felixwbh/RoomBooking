const util = require('../../utils/util.js');
var qcloud = require('../../vendor/wafer2-client-sdk/index.js')
var config = require('../../config.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservedRoomList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var time = util.formatTime(new Date())
    var currentDate = time.split(' ')[0]
    var currentTime = time.split(' ')[1]
    // 向数据库请求当前用户已预定会议室
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/reservedRoom`,
      data: {
        openid: app.globalData.openid,
        currentDate: currentDate,
        currentTime: currentTime
      },
      login: false,
      success(result) {
        console.log(result)
        that.setData({
          reservedRoomList: result.data.data.reservedRoom
        })
        if (result.data.data.reservedRoom.length == 0){
          wx.showToast({
            title: '当前没有已预定会议室',
          })
        }
        console.log('已预定会议室返回成功！')
      },
      fail(error) {
        console.log('已预定会议室返回失败！', error)
      }
    })
  },

  /**
   * 会议室详细信息
   */
  roomDetail: function(e){
    let choosedRoom = JSON.stringify(e.currentTarget.dataset.room)
    wx.navigateTo({
      url: './roomInfo/roomInfo?choosedRoom=' + choosedRoom,
    })
  },

  /**
   * 查看历史预定
   */
  showHistory: function(){
    wx.navigateTo({
      url: './historyReservation/historyReservation',
    })
  }

})
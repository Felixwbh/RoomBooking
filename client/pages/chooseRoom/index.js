// pages/chooseRoom/chooseRoom.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    date: '',
    startTime: '',
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentTime = util.formatTime(new Date());
    let tempList = 
    this.setData({
      
    })
  },

  bindDate: function(e){
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindStartTime: function(e){
    this.setData({
      startTime: e.detail.value
    })
  },

  bindEndTime: function(e){
    this.setData({
      endTime: e.detail.value
    })
  },

  scanRoom: function(){
    wx.navigateTo({
      url: './roomList/roomList',
    })
  }

})
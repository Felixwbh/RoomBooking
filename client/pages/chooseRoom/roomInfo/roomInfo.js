// pages/roomInfo/roomInfo.js
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
    wx.showToast({
      title: '预定成功',
    })
    //添加数据库预定信息
  }

})
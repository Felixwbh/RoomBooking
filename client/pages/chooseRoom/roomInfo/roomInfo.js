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
  onLoad: function(){
    this.setData({
      choosedRoom: app.globalData.choosedRoom,
      isReserved: app.globalData.isReserved,
    })
    if(app.globalData.isReserved){
      this.setData({
        operation: '取消预定'
      })
    }
  },

  /**
   * 预定会议室
   */
  reserveRoom: function(){
    if(this.data.isReserved){   //取消预定
      wx.showModal({
        title: '取消预约',
        content: '确认取消',
        success(res){
          if(res.confirm){
            //删除数据库预定信息

          }
        }
      })
    }else{    //进行预约
      wx.showToast({
        title: '预定成功',
      })
      //添加数据库预定信息
      
    }
  }

})
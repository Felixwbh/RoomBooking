// pages/bindPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  getPhone: function(e){
    this.setData({
      phoneNum: e.detail.value
    })
  },

  bindConfirm: function(){
    if(this.data.phoneNum.length == 11){
      //服务器
      wx.showModal({
        title: '绑定成功',
        content: '点击确定进入预定界面',
        success: function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../chooseRoom/index',
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '无效手机号',
        content: '请输入正确手机号！',
      })
    }
  }
})
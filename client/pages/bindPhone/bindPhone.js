// pages/bindPhone/bindPhone.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    openid: ''
  },

  onLoad: function(opt){
    this.setData({
      openid: opt.openid
    })
  },

  getPhone: function(e){
    this.setData({
      phoneNum: e.detail.value
    })
  },

  bindConfirm: function(){
    if(this.data.phoneNum.length == 11){
      var that = this;
      qcloud.request({
        url: `${config.service.host}/weapp/bindPhone`,
        data: {
          phoneNum: that.data.phoneNum,
          openid: that.data.openid
        },
        login: false,
        success(res) {
          console.log('bindPhone', res)
          // 判断是否绑定成功
          if(res.data.data.isSuccessed){
            wx.showModal({
              title: '绑定成功',
              content: '点击确定进入预定界面',
              success: function(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '/pages/chooseRoom/index',
                  })
                }
              }
            })
          }else{
            wx.showModal({
              title: '绑定失败',
              content: '请确认输入在管理员注册的手机号',
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
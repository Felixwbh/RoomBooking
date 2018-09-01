//index.js
//获取全局变量
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index.js')
var config = require('../../config.js')


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /*
  **监听页面加载
  */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this
    // 加入callback处理获取 openid 不同步
    app.openidReadyCallback = res => {
      this.setData({
        openid: res
      })
      // 判断用户 openid 是否已经绑定手机号
      qcloud.request({
        url: `${config.service.host}/weapp/checkOpenId`,
        data: {
          openid: that.data.openid
        },
        login: false,
        success(res) {
          let userArray = res.data.data.result  // 数据库select之后返回的数组
          if(userArray.length > 0){ // 已经绑定过手机，进入预定会议室界面
            wx.switchTab({
              url: '../chooseRoom/index',
            })
          }else{  // 未绑定过手机，进入绑定手机界面
            wx.navigateTo({
              url: '../bindPhone/bindPhone?openid=' + that.data.openid,
            })
          }
        },
        fail(error) {
          console.log('失败！', error)
        }
      })
    }
  },

  /*
  **获取用户信息
  */
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})

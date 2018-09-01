//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
      // qcloud.setLoginUrl(config.service.loginUrl)
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      var that = this;
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code;
          var appId = 'wx20d8493ca5a5a537';
          var secret = '645952eb87d55e8366233ab23bcd6857';
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' 
              + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              // 由于获取 openid 是网络请求，可能会在 Page.onload 之后才返回
              // 所以此处加入 callback 以防止这种情况
              that.globalData.openid = res.data.openid
              if(that.openidReadyCallback){
                that.openidReadyCallback(res.data.openid )
              }
            }
          })
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    },

    globalData:{
      userInfo: null,
      client: null,
      mqttParam: {
        server: 'test001.mqtt.iot.gz.baidubce.com',
        username: 'test001/device001',
        password: '1W967P+DmkDGBUqtV7vXLPT3VI6veP2TDNE23C5L4VM=',
        topic: 'topic001'
      },
      openid: null,
      reserveInfo: null,
      roomList: []
    }
})
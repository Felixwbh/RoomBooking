// pages/roomInfo/roomInfo.js
const app = getApp()
//获取mqtt客户端
var { Client, Message } = require('../../../utils/paho-mqtt.js')
var status = true

const util = require('../../../utils/util.js');
var qcloud = require('../../../vendor/wafer2-client-sdk/index.js')
var config = require('../../../config.js');

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
    this.doConnect()   //初始化，建立mqtt连接
  },

  /**
   * 生成随机clientId
   */
  randomString: function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  /**
   * 建立mqtt连接
   */
  doConnect: function () {
    if (app.globalData.client && app.globalData.client.isConnected()) {
      return
    }
    //第一次连接
    var clientId = this.randomString();
    app.globalData.client = new Client(app.globalData.mqttParam.server, 8884, clientId);
    app.globalData.client.onMessageArrived = function (msg) {   //重写回调函数onMessageArrived
      let message = msg.payloadString;
      let receivedMessage = JSON.parse(message)
      console.log('receivedMsg', receivedMessage)
      if (receivedMessage.des == 'wx') {
        if (status) { //开门
          wx.showToast({
            title: '开门成功',
          })
          status = false;
        } else {
          wx.showToast({
            title: '关门成功',
          })
          status = true;
        }
      }
    }
    app.globalData.client.onConnectionLost = function (msg) {   //重写回调函数onConnection
      wx.showToast({
        title: '断开连接',
        image: '/pages/images/failure.png'
      })
    }
    app.globalData.client.connect({    //建立连接
      userName: app.globalData.mqttParam.username,
      password: app.globalData.mqttParam.password,
      useSSL: true,
      cleanSession: true,
      keepAliveInterval: 5,
      onSuccess: function () {
        app.globalData.client.subscribe(app.globalData.mqttParam.topic, {
          onSuccess: function () {
            console.log('订阅成功！')
          }
        });
      },
      onFailure: function (e) {
        console.log('error:', e)
        wx.showToast({
          title: '连接失败',
          image: '/pages/images/failure.png'
        })
      }
    });
  },

  /*
  **处理开门和关门
  */
  bindOpen: function () {
    let r_id = this.data.choosedRoom.r_id
    let message = { des: 'server', target: 'unlock', id: r_id, lasting: 1};
    let sendMessage = JSON.stringify(message)
    app.globalData.client.publish(app.globalData.mqttParam.topic, sendMessage)
  },

  bindClose: function () {
    let r_id = this.data.choosedRoom.r_id
    let message = { des: 'server', target: 'lock', id: r_id };
    let sendMessage = JSON.stringify(message)
    app.globalData.client.publish(app.globalData.mqttParam.topic, sendMessage)
  },

  /**
   * 预定会议室
   */
  reserveRoom: function(){
    let r_id = this.data.choosedRoom.r_id
    //添加数据库预定信息
    wx.showModal({
      title: '取消预定',
      content: '是否确定取消预定该会议室？',
      success: function(res){
        if(res.confirm){
          qcloud.request({
            url: `${config.service.host}/weapp/cancelReservation`,
            data: {
              openid: app.globalData.openid,
              r_id: r_id
            },
            login: false,
            success(result) {
              console.log(result)
              wx.switchTab({
                url: '/pages/reservedRoom/index',
              })
              console.log('取消成功！')
            },
            fail(error) {
              console.log('取消失败！', error)
            }
          })
        }
      }
    })
  }

})
//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    globalData:{
      choosedRoom: {},
      isReserved: false,
      roomList: [
        {
          id: '0001',
          building: '信息学馆',
          floor: '二楼',
          capacity: 8,
          image: '/pages/images/room/room1.jpg',
          position: '/pages/images/position/position.png',
          num: 'a-213'
        },
        {
          id: '0002',
          building: '信息学馆',
          floor: '三楼',
          capacity: 22,
          image: '/pages/images/room/room2.jpg',
          position: '/pages/images/position/position.png',
          num: 'b-312'
        },
        {
          id: '0003',
          building: '生命学馆',
          floor: '二楼',
          capacity: 14,
          image: '/pages/images/room/room3.jpg',
          position: '/pages/images/position/position.png',
          num: 'a-213'
        },
        {
          id: '0004',
          building: '建筑学馆',
          floor: '三楼',
          capacity: 50,
          image: '/pages/images/room/room4.jpg',
          position: '/pages/images/position/position.png',
          num: 'b-314'
        },
        {
          id: '0005',
          buliding: '文管学馆',
          floor: '四楼',
          capacity: 17,
          image: '/pages/images/room/room5.jpg',
          position: '/pages/images/position/position.png',
          num: 'b-421'
        },
        {
          id: '0006',
          building: '建筑学馆',
          floor: '二楼',
          capacity: 30,
          image: '/pages/images/room/room6.jpg',
          position: '/pages/images/position/position.png',
          num: 'a-215'
        }
      ]
    }
})
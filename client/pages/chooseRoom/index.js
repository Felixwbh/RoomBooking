// pages/chooseRoom/chooseRoom.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    currentDate: '',      //当天日期
    date: '',             //选择日期，初始值为当天日期
    weekDay: '',          //日期对应的星期
    startTime: '',        //开始时间
    keepTime: 0,          //结束时间
    isContinuous: false,    //判断连续预定
    continuousInfo: [],   //连续预定信息
    weekNum: 0,
    startTimeListIndex: [0, 0],
    //开始小时列表
    startTimeList: [['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', 
      '18', '19', '20'], ['00', '30']],  
    weekIndex: 0,
    week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五','星期六'],
    //处理连续预定
    continuousWeekIndex: 0,
    continuousWeek: [],
    startWeekIndex: 0,
    startWeek:['当前周', '下周', '下下周']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentTime = util.formatTime(new Date());
    let splitTime = currentTime.split(' ');
    let weekNum = 4 //从数据库获得教师可连续预定周数
    let continuousWeek = []
    for(let i = 1; i <= weekNum; i++){
      continuousWeek.push(i)
    }
    this.setData({
      currentDate: splitTime[0],
      date: splitTime[0],
      startTime: splitTime[1],
      weekDay: splitTime[2],
      weekNum: weekNum,
      continuousWeek: continuousWeek
    })
    // console.log('--', this.data.continuousWeek)
  },

  /**
   * 输入日期
   */
  bindDate: function(e){
    let choosedDate = e.detail.value
    let currentDateList = this.data.date.split('-')
    let choosedDateList = choosedDate.split('-')
    let invalid = false
    if(choosedDateList[0] < currentDateList[0]){
      invalid = true
    }else if(choosedDateList[0] == currentDateList[0] 
      && choosedDateList[1] <= currentDateList[1]){
        if(choosedDateList[1] < currentDateList[1]){
          invalid = true
        }else{
          if(choosedDateList[2] < currentDateList[2]){
            invalid = true
          }
        }
      }
    if(invalid){  //无效日期
      wx.showModal({
        title: '无效日期',
        content: '输入日期小于当前日期！',
      })
    }else{
      let date = new Date(choosedDate)
      let singleDay = date.getDay()
      this.setData({
        date: e.detail.value,
        weakDay: this.data.week[singleDay],
      })
    }
  },

  /**
   * 输入开始时间
   */

  bindStartTime: function(e){
    //获取选中开始时间
    let index = e.detail.value;   
    let hour = this.data.startTimeList[0][index[0]]
    let minute = this.data.startTimeList[1][index[1]]
    let startTime = [hour, minute].join(':')
    let hourNum = (hour[0] - '0')*10 + (hour[1] - '0')
    let minuteNum = (minute[0] - '0')*10 + (minute[1] - '0')
    let choosedTime = [hourNum, minuteNum]
    //获取当前时间
    let currentTime = util.formatTime(new Date()).split(' ')[1]
    let currentTimeList = currentTime.split(':')
    //预定当天，判断无效时间
    let invalid = false
    if(this.data.currentDate == this.data.date){
      if (currentTimeList[0] > choosedTime[0]) {
        invalid = true
      } else if (currentTimeList[0] == choosedTime[0] 
        && currentTimeList[1] > choosedTime[1]) {
        invalid = true
      }
    }
    if (invalid) {  //无效开始时间
      wx.showModal({
        title: '无效开始时间',
        content: '开始时间小于当前时间！',
      })
      this.setData({
        startTime: currentTime
      })
    }else{
      this.setData({
        startTime: startTime,
      })
    }
  },

  /**
   * 加减持续时间
   */
  bindAdd: function(){
    if(this.data.keepTime < 12.5){
      this.setData({
        keepTime: this.data.keepTime + 0.5
      })
    }else{
      wx.showModal({
        title: '无效时长',
        content: '单天时长最多为12.5个小时',
      })
    }
  },
  bindMinus: function(){
    if(this.data.keepTime > 0){
      this.setData({
        keepTime: this.data.keepTime - 0.5
      })
    }else{
      wx.showModal({
        title: '无效时长',
        content: '持续时间不能小于零',
      })
    }
  },

  //点击长期预定
  bindLongTimeBook: function(){
    this.setData({
      showModal: !this.data.showModal
    })
    console.log('bind button:', this.data.showModal)
  },

  /**
   * 处理弹窗
   */
  changeStartWeek: function(e){  //改变起始周
    this.setData({
      startWeekIndex: e.detail.value
    })
  },

  changeWeek: function(e){  //改变星期
    // console.log('start week index', this.data.startWeekIndex)
    this.setData({
      weekIndex: e.detail.value
    })
  },

  changeContinuousWeek: function(e){  //改变连续星期
    this.setData({
      continuousWeekIndex: e.detail.value
    })
  },

  hideModal: function(){  //隐藏弹窗
    this.setData({
      showModal: !this.data.showModal
    })
  },

  onCancel: function(){ //取消弹窗
    this.setData({
      showModal: !this.data.showModal
    })
  },

  onConfirm: function(){  //确定弹窗，获取数据
    let date = new Date(this.data.currentDay)
    let weekDayNum = date.getDay()
    if (this.data.startWeekIndex == 0) {
      if (this.data.weekIndex < weekDayNum) {
        wx.showModal({
          title: '无效星期',
          content: '起始星期小于当前星期！',
        })
        return
      }
    }
    //处理连续预定信息搜集
    let info = {
      date: '', 
      startTime: this.data.startTime,
      keepTime: this.data.keepTime,
    }
    let continuousWeek = this.data.continuousWeekIndex + 1
    for(let i = 0; i < continuousWeek; i++){

    }
  },


  scanRoom: function(){
    wx.navigateTo({
      url: './roomList/roomList',
    })
    if(!this.data.isContinuous){   //单次预定
      let info = {
        date: this.data.date,
        startTime: this.data.startTime,
        keepTime: this.data.keepTime,
      }
    }else{   //连续预定

    }
  }

})
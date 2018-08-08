Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservedRoomList: [
      {
        id: '0001',
        building: '信息学馆',
        floor: '二楼',
        capacity: 8,
        time: '2018-8-10 12:00',
        image: '/pages/images/room/room1.jpg',
        position: '/pages/images/position/position.png',
        num: 'a-213'
      },
      {
        id: '0002',
        building: '信息学馆',
        floor: '三楼',
        capacity: 22,
        time: '2018-9-1 13:30',
        image: '/pages/images/room/room2.jpg',
        position: '/pages/images/position/position.png',
        num: 'b-312'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 会议室详细信息
   */
  roomDetail: function(e){
    let choosedRoom = JSON.stringify(e.currentTarget.dataset.room)
    wx.navigateTo({
      url: './roomInfo/roomInfo?choosedRoom=' + choosedRoom,
    })
    this.setData({
      choosedRoom: e.currentTarget.dataset.room
    })
  }

})
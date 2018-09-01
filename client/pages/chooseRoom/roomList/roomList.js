// pages/roomList/roomList.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isMore: false,
    currentBuilding: 0,
    currentFloor: 0,
    currentCapacity: 0,
    filterBuilding: 0,
    filterFloor: 0,
    filterCapacity: 0,
    building:[{id: 0, name: '教学馆'},{id: 1, name: '信息学馆'}, 
      {id: 2, name: '生命学馆'}, {id: 3, name: '建筑学馆'}, {id: 4, name: '文管学馆'}],
    floor:[{id: 0, name: '楼层'},{id: 1, name: '一楼'}, {id: 2, name: '二楼'}, 
      {id: 3, name: '三楼'}, {id: 4, name: '四楼'}, {id: 5, name: '五楼'}],
    capacity:[{id: 0, name: '容纳人数'},{id: 1, name: '小于10人'}, 
      {id: 2, name: '10到20人'}, {id: 3, name: '20到30人'}, {id: 4, name: '大于30人'}],
    list: []
  },

  /**
   *生命周期函数--监听页面加载
   */
  onLoad: function(option){
    let roomList = JSON.parse(option.roomList)
    app.globalData.roomList = roomList
    this.setData({
      list: roomList
    })
  },

  /**
   * 处理picker事件
   */
  changeBuilding: function (e) {  //选择教学馆
    this.setData({ 
      currentBuilding: e.detail.value,
      filterBuilding: e.detail.value
    })
    let more = false;
    this.doChoose(e.detail.value, this.data.currentFloor, 
      this.data.currentCapacity, more)
  },
  changeFloor: function (e) {   //选择楼层
    this.setData({ 
      currentFloor: e.detail.value,
      filterFloor: e.detail.value
    })
    let more = false;
    this.doChoose(this.data.currentBuilding, e.detail.value, 
      this.data.currentCapacity, more)
  },
  changeCapacity: function(e) {   //选择容量
    this.setData({ 
      currentCapacity: e.detail.value,
      filterCapacity: e.detail.value
    })
    let more = false;
    this.doChoose(this.data.currentBuilding, this.data.currentFloor, 
      e.detail.value, more)
  },
  bindMore: function() {
    this.setData({ isMore: !this.data.isMore})
  },
  //修改筛选
  bindBuildingChange: function(e){
    this.setData({ filterBuilding: e.currentTarget.dataset.id})
  },
  bindFloorChange: function(e){
    this.setData({ filterFloor: e.currentTarget.dataset.id})
  },
  bindCapacityChange: function(e){
    this.setData({ filterCapacity: e.currentTarget.dataset.id})
  },
  //取消筛选
  filterCancel: function(){   
    this.setData({ 
      isMore: false,
      filterBuilding: this.data.currentBuilding,
      filterFloor: this.data.currentFloor,
      filterCapacity: this.data.currentCapacity
    })
  },
  //确定筛选
  filterConfirm: function(){    
    let tempBuilding = this.data.filterBuilding;
    let tempFloor = this.data.filterFloor;
    let tempCapacity = this.data.filterCapacity;
    this.setData({
      currentBuilding: tempBuilding,
      currentFloor: tempFloor,
      currentCapacity: tempCapacity,
    })
    let more = true;
    this.doChoose(tempBuilding, tempFloor, tempCapacity, more)
  },
  //筛选排序
  doChoose: function(tempBuilding, tempFloor, tempCapacity, more){
    if(more){
      this.setData({ isMore: !this.data.isMore})
    }
    let buildingName = this.data.building[tempBuilding].name;
    let floorName = this.data.floor[tempFloor].name;
    let capacity = this.data.capacity[tempCapacity].id;
    let min = 0;
    let max = 0;
    switch(capacity){
      case 0: max = 1000; break;
      case 1: max = 10; break;
      case 2: min = 10, max = 20; break;
      case 3: min = 20, max = 30; break;
      case 4: min = 30, max = 1000; break;
    }
    let tempList = [];
    for(let i = 0; i < app.globalData.roomList.length; i++){
      let tempRoom = app.globalData.roomList[i];
      if(tempBuilding == 0 && tempFloor == 0){    //选择全部
        if (tempRoom.r_capacity >= min && tempRoom.r_capacity < max){
          tempList.push(tempRoom)
        }
      }else if(tempBuilding != 0 && tempFloor == 0){    //楼层选择全部
        if (tempRoom.r_building == buildingName && tempRoom.r_capacity >= min 
          && tempRoom.r_capacity < max) {
          tempList.push(tempRoom)
        }
      }else if(tempBuilding == 0 && tempFloor != 0){    //教学馆选择全部
        if (tempRoom.r_floor == floorName && tempRoom.r_capacity >= min
          && tempRoom.r_capacity < max) {
          tempList.push(tempRoom)
        }
      }else{
        if(tempRoom.r_building == buildingName && tempRoom.r_floor == floorName
          && tempRoom.r_capacity >= min && tempRoom.r_capacity < max){
            tempList.push(tempRoom);
        }
      }
    }
    this.setData({ list: tempList})
  },

  /**
   * 处理会议室详细信息
   */
  roomDetail: function(e){
    let choosedRoom = JSON.stringify(e.currentTarget.dataset.room)
    wx.navigateTo({
      url: '../roomInfo/roomInfo?choosedRoom=' + choosedRoom
    })
  }
})
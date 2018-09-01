const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  let date = ctx.query.date
  let startTime = ctx.query.startTime
  let startTimeArray = startTime.split(':')
  let start = (parseInt(startTimeArray[0]) * 2) + (parseInt(startTimeArray[1]) == 30 ? 1 : 0)
  let keepTime = ctx.query.keepTime
  let keep = parseInt(keepTime * 2) 
  // 从数据库获取所有会议室信息
  var allRoom = await mysql('RoomInfo').select('*')
  // 从数据库中获取指定日期的会议室占用时段表
  var sameDate = await mysql('Date_Room_Schedule').where({ d_date: date }).select('*')
  var occupiedRoom = [] //记录占用会议室
  for(let i = 0; i < sameDate.length; i++){
    let tempSchedule = sameDate[i].d_r_schedule
    let isOccupied = false
    // 判断该时间段内当前会议室是否被占用
    for(let j = 0; j < keep; j++){
      if(tempSchedule[start + j] == '1'){
        isOccupied = true
        break
      }
    }
    // 当前占用会议室
    if(isOccupied){
      let r_id = parseInt(sameDate[i].r_id)
      occupiedRoom.push(r_id)
    }
  }
  var unoccupiedRoom = []
  // 计算当前时间段空闲会议室列表
  for(let i = 0, j = 0; i < allRoom.length; i++){
    if(i != occupiedRoom[j]){
      unoccupiedRoom.push(allRoom[i])
    }else{
      j++
    }
  }
  ctx.state.data = {roomList: unoccupiedRoom}
}
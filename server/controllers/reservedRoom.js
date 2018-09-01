const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async(ctx, next) => {
  let openid = ctx.query.openid
  let currentDate = ctx.query.currentDate
  let currentTime = ctx.query.currentTime
  let iniReservedRoom = await mysql('OrderInfo')
  .join('RoomInfo', 'OrderInfo.r_id', '=', 'RoomInfo.r_id')
  .where({u_openid: openid})
  .andWhere('OrderInfo.o_date', '>=', currentDate)
  .select('*')
  let reservedRoom = []
  for(let i = 0; i < iniReservedRoom.length; i++){
    let temp = iniReservedRoom[i]
    if(temp.o_date > currentDate ){
      reservedRoom.push(temp)
    } else if (temp.o_date == currentDate && temp.o_begin_time > currentTime){
      reservedRoom.push(temp)
    }
  }
  ctx.state.data = { reservedRoom: reservedRoom}
}
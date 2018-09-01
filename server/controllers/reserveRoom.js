const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async(ctx, next) => {
  let u_openid = ctx.query.u_openid
  let r_id = ctx.query.r_id
  let o_date = ctx.query.o_date
  let o_begin_time = ctx.query.o_begin_time
  let o_keep_time = ctx.query.o_keep_time
  await mysql('OrderInfo').insert({
    u_openid: u_openid,
    r_id: r_id,
    o_date: o_date,
    o_begin_time: o_begin_time,
    o_keep_time: o_keep_time
  })
  // 初始时段
  let iniSchedule = '000000000000000000000000000000000000000000000000'
  let existedSchedule = await mysql('Date_Room_Schedule').where({
    r_id: r_id,
    d_date: o_date
  }).select('d_r_schedule')
  // 当前会议室在该日期中已经存在预定
  if(existedSchedule.length > 0){
    iniSchedule = existedSchedule[0].d_r_schedule
  }
  let beignTimeArray = o_begin_time.split(':')
  let begin = (parseInt(beignTimeArray[0])*2) + (parseInt(beignTimeArray[1])==30?1:0)
  let keep = parseInt(o_keep_time*2)
  let tempSchedule = ''
  for(let i = 0; i < keep; i++){
    tempSchedule += '1'
  }
  // 更新时段
  let schedule = iniSchedule.substring(0, begin) + tempSchedule + iniSchedule.substring(begin + keep)
  if(existedSchedule.length > 0){
    await mysql('Date_Room_Schedule').where({
      r_id: r_id,
      d_date: o_date
    }).update({
      d_r_schedule: schedule
    })
  }else{
    await mysql('Date_Room_Schedule').insert({
      d_date: o_date,
      r_id: r_id,
      d_r_schedule: schedule
    })
  }
  ctx.state.data = {success: 'success'}
}
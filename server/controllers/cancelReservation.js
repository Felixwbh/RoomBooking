const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  let openid = ctx.query.openid
  let r_id = ctx.query.r_id
  await mysql('OrderInfo')
  .where({
    u_openid: openid,
    r_id: r_id
  })
  .del()
  ctx.state.data = { success: 'success' }
}
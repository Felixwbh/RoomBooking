const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  let openid = ctx.query.openid
  var result = await mysql('UserInfo').where({ u_openid: openid }).select('*')
  ctx.state.data = { result: result }
}
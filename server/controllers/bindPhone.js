const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  let openid = ctx.query.openid;
  let phoneNum = ctx.query.phoneNum;
  var isSuccessed = false
  var num = await mysql('UserInfo')
  .where({u_tel: phoneNum})
  .update({u_openid: openid})
  if(num > 0){
    isSuccessed = true
  }
  ctx.state.data = {isSuccessed: isSuccessed}
}
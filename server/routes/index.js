/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// 匹配openid
router.get('/checkOpenId', controllers.checkOpenId)
// 绑定手机号
router.get('/bindPhone', controllers.bindPhone)
// 筛选会议室
router.get('/chooseRoom', controllers.chooseRoom)
// 预定会议室
router.get('/reserveRoom', controllers.reserveRoom)
// 已经预定会议室
router.get('/reservedRoom', controllers.reservedRoom)
// 取消预定
router.get('/cancelReservation', controllers.cancelReservation)
// 查看历史预定
router.get('/historyReservation', controllers.historyReservation)

module.exports = router

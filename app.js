//app.js
var api = require('/config/api.js')
var http = require('/utils/http.js')

wx.cloud.init({
  env: 'cloud1-5gpithc6243657d0',
  traceUser: true,
})
App({
  onLaunch: function (query) {
    this.globalData.query = JSON.stringify(query)
    const q = decodeURIComponent(query.query.id) // 获取到二维码原始链接内容
    this.globalData.storeId = wx.getStorageSync('storeId')
    this.globalData.userInfo = wx.getStorageSync('userInfo')
    this.globalData.phone = wx.getStorageSync('phone')
    if (q && q!= 'undefined') {
      this.globalData.storeId = q
      wx.setStorageSync('storeId', q)
    }
    this.login()
  },
  login(){
    var that = this
    wx.login({
      success: function (res) {
        http.get(api.login, {
          js_code: res.code
        }).then(res => {
          that.globalData.openId = res.openId
          http.get(api.addUser, {
            openId: res.openId,
            tenantId: that.globalData.storeId
          }).then(res => {
            that.globalData.userId = res.id_user
          })
        })
      }
    })
  },
  //验证登录是否过期
  checksession(){
    let that = this
    wx.checkSession({
      success:function(res){
        console.log(res,'登录未过期')
      },
      fail:function(res){
        that.login()
      }
    })
  },
  onShow: function () {
  },
  onHide: function () {
  },
  globalData:{
    userInfo: null,
    openId: 'openid1',
    userId: null,
    storeId: null,
    carList: [],
    phone: null,
    query: null
  }
})
//app.js
var api = require('/config/api.js')
var http = require('/utils/http.js')
App({
  onLaunch: function () {
    this.globalData.userInfo = wx.getStorageSync('userInfo')
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
            openId: res.openId
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
    carList: []
  }
})
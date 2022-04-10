//app.js
var api = require('/config/api.js')
var http = require('/utils/http.js')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.login()
  },
  login(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          http.get(api.login, {
            js_code: res.code
          }).then(res => {
            that.globalData.openId = res.openId
            http.get(api.addUser, {
              openId: res.openId
            }).then(res => {
              that.globalData.userId = res.id
            })
            this.getUserInfo()
          })
        }
      })
    }
  },
  getUserInfo() {
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.globalData.userInfo = res.userInfo
        typeof cb == "function" && cb(that.globalData.userInfo)
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
    userInfo:null,
    openId: 1,
    userId: null,
    urlParam: null,
    storeId: null,
    carList: []
  }
})
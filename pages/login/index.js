var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    phone: null
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setGloabUserInfo(res.userInfo)
      }
    })
  },
  getUserInfo(e) {
    this.setGloabUserInfo(e.detail.userInfo)
  },
  setGloabUserInfo(data) {
    wx.setStorage({
      key: 'userInfo',
      data: data
    })
    app.globalData.userInfo = data
  },

  numberHandle(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  submit() {
    if(!app.globalData.userInfo) {
      return wx.showToast({
        title: '请获取头像昵称',
        icon: 'none'
      })
    }
    if (!this.data.phone || this.data.phone.length !== 11) {
      return wx.showToast({
        title: '输入正确手机号码',
        icon: 'none'
      })
    }
    app.globalData.phone = this.data.phone
    http.get(api.addUser, {
      openId: res.openId,
      nickname: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      telephone: this.data.phone,
    }).then(res => {
      that.globalData.userId = res.id_user
      wx.navigateBack()
    })
  }
})
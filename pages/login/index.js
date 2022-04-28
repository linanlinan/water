var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    phone: null,
    showModal: false,
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
    console.log(data);
    wx.setStorage({
      key: 'userInfo',
      data: data
    })
    app.globalData.userInfo = data
    this.setData({
      userInfo: data,
      showModal: true,
    })
  },

  numberHandle(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  getPhoneNumber(e) {
    wx.cloud.callFunction({
      name: 'getPhone',
      data: {
        cloudID: e.detail.cloudID
      }
    }).then(res => {
      let number = res.result.list[0].data.phoneNumber
      this.setData({
        phone: number
      }, () => {
        this.submit()
      })
    })
  },

  submit() {
    app.globalData.phone = this.data.phone
    wx.setStorage({
      key: 'phone',
      data: app.globalData.phone
    })
    http.get(api.addUser, {
      openId: app.globalData.openId,
      nickname: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      telephone: this.data.phone,
      tenantId: app.globalData.storeId
    }).then(res => {
      app.globalData.userId = res.id_user
      wx.navigateBack()
    })
  }
})
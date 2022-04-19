var app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
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
    wx.navigateBack()
  }
})
var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page( {
  data: {
    userInfo: {},
    userListInfo: [
      {
        icon: '../../images/iconfont-dingdan.png',
        text: '我的订单',
        router: '/pages/orderList/index'
      }, {
        icon: '../../images/iconfont-tuihuo.png',
        text: '押金退还',
        router: '/pages/refundList/index'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '投诉建议'
      }
    ],
    showModal:false,
    feedbackText: ''
  },

  onLoad: function() {
  },
  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },

  goRouter(e){
    var route = e.currentTarget.dataset.route
    var index = e.currentTarget.dataset.index
    if (route) {
      wx.navigateTo({
        url: route
      })
    }

    let item = this.data.userListInfo[index]
    if(item.text === '投诉建议') {
      this.setData({
        showModal: true
      })
    }
  },
  cancel() {
    this.setData({
      showModal: false
    })
  },
  bindinputFB(e) {
    this.setData({
      feedbackText: e.detail.value
    })
  },
  confirm() {
    if (!this.data.feedbackText) {
      return wx.showToast({
        icon: 'none',
        title: '投诉建议不能为空'
      })
    }
    http.get(api.feedback, {
      id_user: app.globalData.userId,
      id_store: app.globalData.storeId || '',
      content: this.data.feedbackText,
      nickname: app.globalData.userInfo.nickName,
    }).then(res => {
      wx.showToast({
        icon: 'success',
        title: '提交成功'
      })
      this.clearFeedbackText()
    })
  },
  cancel() {
    this.clearFeedbackText()
  },
  clearFeedbackText() {
    this.setData({
      feedbackText: ''
    })
    this.setData({
      showModal: false
    })
  }
})
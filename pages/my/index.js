var app = getApp()
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
    showModal:false
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
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
  confirm() {
    this.setData({
      showModal: false
    })
  },
})
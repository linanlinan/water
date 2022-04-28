var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page( {
  data: {
    list: []
  },

  onLoad: function() {
    console.log(app.globalData.storeId);
    http.get(api.getOrderList, {
      recuser: app.globalData.userId,
      isYj: '1',
      limit: 1000,
      page: 1,
      needLog: true
    }).then(res => {
      let data = res.data || []
      for (const item of data) {
        item.orderTime = item.createdtimeStr
        item.statusLabel = this.getStatusLabel(item.status)
      }
      this.setData({
          list: res.data || []
      })
    })
  },
  getStatusLabel(status) {
    let str = ''
    switch(status) {
      case 0:
        str = '待支付'
      break
      case 1:
        str = '已支付'
      break
      case 2:
        str = '已发货'
      break
      case 3:
        str = '已完成'
      break
      case 4:
        str = '已关闭'
      break
      case 5:
        str = '无效订单'
      break
      case 6:
        str = '支付取消'
      break
      case 7:
        str = '支付失败'
      break
      case 8:
        str = '待退款'
      break
      case 9:
        str = '已退款'
      break
    }
    return str
  }
})
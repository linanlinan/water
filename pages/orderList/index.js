var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page( {
  data: {
    list: []
  },

  onLoad: function() {
    http.get(api.getOrderList, {
      recuser: app.globalData.userId,
      isYj: '0',
      limit: 1000,
      page: 1,
      needLog: true
    }).then(res => {
      let data = res.data || []
      for (const item of data) {
        item.orderTime = item.createdtimeStr
      }
      this.setData({
          list: res.data || []
      })
    })
  }
})
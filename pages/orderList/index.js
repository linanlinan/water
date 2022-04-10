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
      page: 1
    }).then(res => {
      let data = res.data || []
      for (const item of data) {
        let time =  new Date(item.createdtime.time).toISOString().replace('T', ' ')
        item.orderTime = time.split('.')[0]
      }
      this.setData({
          list: res.data || []
      })
    })
  }
})
var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
		curIndex: 0
    },
    onLoad: function() {
        http.get(api.getCommodityPage, {
            page: 1,
            limit: 200
        }).then(res => {
            this.setData({
                navLeftItems: res.data,
                curNav: res.data[0].id
            })
        })
    },

    //事件处理函数
    switchRightTab: function(e) {
        let id = e.target.dataset.id
        let index = e.target.dataset.index
        this.setData({
            curNav: this.data.navLeftItems[index].id
        })
        this.getRightData(id)
    },

    getRightData(id) {
        http.get(api.getGoodsPage, {
            id_store: app.globalData.storeId,
            categoryId: id,
            limit: 1000,
            page: 1
        }).then(res => {
            this.setData({
                navRightItems: res.data || []
            })
        })
    },
    addCar(event) {
        var id = event.currentTarget.dataset.id

        http.get(api.addCar, {
            openid: app.globalData.openid,
            commodityId: id
        }).then(res => {
            wx.showToast({
                title: "添加成功"
            })
        }).catch(res => {
            wx.showToast({
                title: "添加失败"
            })
        })
    }
})
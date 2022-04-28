//获取应用实例
var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false,  // loading
        choiceItems: []
    },

    //事件处理函数
    swiperchange: function(e) {
    },

    onLoad: function(query) {
        const q = decodeURIComponent(query.id) // 获取到二维码原始链接内容
        if (q && q!= 'undefined') {
            app.globalData.storeId = q
            wx.setStorageSync('storeId', q)
        }
        this.getBanner()
        this.getChoices()
        setInterval(this.getChoices, 10000)
    },

    getBanner() {
        //sliderList
        http.get(api.IndexBanner).then(res => {
            this.setData({
                images: res.data || []
            })
        })
    },

    getChoices() {
        http.get(api.getGoodsPage, {
            id_store: app.globalData.storeId,
            limit: 1000,
            page: 1,
            tenantId: app.globalData.storeId
        }).then(res => {
            this.setData({
                choiceItems: res.data || []
            })
        })
    },

    addCar(event) {
        var id = event.currentTarget.dataset.id
        http.get(api.addCar, {
            openid: app.globalData.openId,
            idUser: app.globalData.userId,
            commodityId: id,
            needLog: true
        }).then(res => {
            wx.showToast({
                title: "添加成功"
            })
        }).catch(res => {
            wx.showToast({
                icon: 'none',
                title: res.msg
            })
        })
    }
})

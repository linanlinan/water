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
        //console.log(e.detail.current)
    },

    onLoad: function(query) {
        const q = decodeURIComponent(query.q) // 获取到二维码原始链接内容
        app.globalData.urlParam = q

        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        
        this.getBanner()
        this.getChoices()
        
    },

    getBanner() {
        //sliderList
        http.get(api.IndexBanner).then(res => {
            this.setData({
                images: res.data.data || []
            })
        })
        this.setData({
            images: [
                {"id":2,"title":"纯净水","addesc":" 纯净水","url":"https://hbimg.huabanimg.com/135316c562df15d10395b4a44217978ef29d473b54f82-fymDTm_/fw/480/format/webp"},
                {"id":3,"title":"矿泉水","addesc":"纯净水","url":"https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"}
            ]
        })
    },

    getChoices() {
        //choiceItems
        http.get(api.getCommodityPage).then(res => {
            this.setData({
                choiceItems: res.data.data || []
            })
        })
        this.setData({
            choiceItems: [
                {"id":1,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
                {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
                {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
                {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
                {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"}
            ]
        })
    },

    addCar(event) {
        var id = event.currentTarget.dataset.id
        console.log(id);

        http.get(api.getCommodityPage).then(res => {
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

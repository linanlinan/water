var app = getApp()
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
		curIndex: 0
    },
    onLoad: function() {

        var that = this
        
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    navLeftItems: res.data,
                    navRightItems: res.data
                })
            }
        })
        var treeData = [
            {
                id: '1',
                label: '分类1',
                chuildren: [
                    {"id":1-1,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
                    {"id":1-2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"}
                ]
            },
            {
                id: '2',
                label: '分类2',
                chuildren: [
                    {"id":2-1,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
                    {"id":2-2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"}
                ]
            }
        ]
        this.setData({
            navLeftItems: treeData,
            navRightItems: treeData[0].chuildren
        })
    },

    //事件处理函数
    switchRightTab: function(e) {
        let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
			curIndex: index
		})
    }

})
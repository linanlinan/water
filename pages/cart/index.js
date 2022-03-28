var app = getApp()
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    showEmpty: false,
    list: []
  },

  onLoad: function() {
    var that = this
    this.getList()
  },

  getList() {
    this.setData({
      list: [
        {"id":1,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,cheched: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,cheched: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,cheched: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,cheched: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,cheched: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"}
      ]
    })
  }
})

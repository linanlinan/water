var app = getApp()
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    showEmpty: false,
    list: [],
    total: 0, //金额合计
    selType: 1,
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
    this.calculat()
  },

  reduceNum(e) {
    let index = e.target.dataset.index
    let count = `list[${index}].count`
    this.setData({
      [count]: Math.max(this.data.list[index].count - 1, 0)
    })
    this.calculat()
  },

  addNum(e) {
    let index = e.target.dataset.index
    let count = `list[${index}].count`
    this.setData({
      [count]: this.data.list[index].count + 1
    })
    this.calculat()
  },
  settlement() {

  },
  radioChange(e) {
    this.setData({
      selType: e.detail.value
    })
  },

  // 计算金额
  calculat() {
    let count = 0
    for (const item of this.data.list) {
        let itemCount = item.price * item.count
        count = count + (itemCount || 0)
    }
    this.setData({
      total: count
    })
  }
})

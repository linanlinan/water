var app = getApp()
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    showEmpty: false,
    list: [],
    allSel: false, // 全选
    total: 0, //金额合计
  },

  onLoad: function() {
    var that = this
    this.getList()
  },

  getList() {
    this.setData({
      list: [
        {"id":1,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,checked: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,checked: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,checked: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,checked: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"},
        {"id":2,"goodsname":"小浣熊","price":3,"stock":35,"pricein":0,"id_brand":35,"brand":"零食",rest: 4,checked: false,count:1,remark:"含水桶",img: "https://hbimg.huabanimg.com/fd2697308ec81249de76210b731314fd288f3df03e159-ZwOBLq_/fw/480/format/webp"}
      ]
    })
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
  // 去结算页
  settlement() {
    wx.navigateTo({
      url: '/pages/settle/index'
    })
  },

  changeAllSel(e) {
    let flag = e.detail.value
    for (const key in this.data.list) {
      let str = `list[${key}].checked`
      this.setData({
        [str]: flag.length > 0
      })
    }
    this.calculat()
  },

  changeSel(e) {
    let index = e.target.dataset.index
    let checked = e.target.dataset.checked
    let flag = e.detail.value
    let str = `list[${index}].checked`
    this.setData({
      [str]: flag.length > 0
    })
    this.calculat()
  },

  // 计算金额
  calculat() {
    let count = 0
    for (const item of this.data.list) {
      if(item.checked) {
        let itemCount = item.price * item.count
        count = count + (itemCount || 0)
      }
    }
    this.setData({
      total: count
    })
  }
})

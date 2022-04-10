var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
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
    http.get(api.carList, {
      openid: app.globalData.openId,
      limit: 1000,
      page: 1
    }).then(res => {
        let data = res.data || []
        for (const item of data) {
          item.checked = false
          item.salecount = 1
        }
        this.setData({
            list: data
        })
    })
  },

  reduceNum(e) {
    let index = e.target.dataset.index
    let salecount = `list[${index}].salecount`
    this.setData({
      [salecount]: Math.max(this.data.list[index].salecount - 1, 0)
    })
    this.calculat()
  },

  addNum(e) {
    let index = e.target.dataset.index
    let salecount = `list[${index}].salecount`
    this.setData({
      [salecount]: this.data.list[index].salecount + 1
    })
    this.calculat()
  },
  // 去结算页
  settlement() {
    if (this.data.total > 0) {
      app.globalData.carList = this.data.list
      wx.navigateTo({
        url: '/pages/settle/index'
      })
    } else {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1000
      })
    }
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
    let salecount = 0
    for (const item of this.data.list) {
      if(item.checked) {
        let itemsalecount = item.price * item.salecount
        salecount = salecount + (itemsalecount || 0)
      }
    }
    this.setData({
      total: salecount
    })
  },

  delCar(e) {
    let index = e.target.dataset.index
    let carItem = this.data.list[index]
    http.get(api.delCarItem, {
      id: carItem.id,
      ds: 1
    }).then(res => {
      this.getList()
      let list = this.data.list.splice(index, 1)
      this.setData({
        lsit: list
      })
    })
  }
})

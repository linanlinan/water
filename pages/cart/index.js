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
    this.getList()
  },

  onShow() {
    this.getList()
    this.setData({
      allSel: false,
      total: 0
    })
  },

  getList() {
    http.get(api.carList, {
      openid: app.globalData.openId,
      limit: 1000,
      page: 1,
      needLog: true
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
    this.setSaleCount(Math.max(this.data.list[index].salecount - 1, 0), index)
  },

  addNum(e) {
    let index = e.target.dataset.index
    this.setSaleCount(this.data.list[index].salecount + 1, index)
  },
  bindKeyInput(e) {
    let value = Number(e.detail.value) || 0
    let index = e.target.dataset.index
    this.setSaleCount(value, index)
  },
  setSaleCount(count, index) {
    let salecount = `list[${index}].salecount`
    let item = this.data.list[index]
    if (item.stock) {
      this.setData({
        [salecount]: Math.min(count, item.stock)
      })
    } else {
      this.setData({
        [salecount]: count
      })
    }
    this.calculat()
  },
  // 去结算页
  settlement() {
    if (this.data.total > 0) {
      app.globalData.carList = this.data.list.filter(el => el.checked)
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
      total: Number(salecount.toFixed(2))
    })
  },

  delCar(e) {
    let index = e.target.dataset.index
    let carItem = this.data.list[index]
    let that = this
    wx.showModal({
      content: '您是否要删除该商品?',
      success (res) {
        if (res.confirm) {
          http.get(api.delCarItem, {
            id: carItem.id,
            ds: 1,
            needLog: true
          }).then(res => {
            that.getList()
            let list = that.data.list.splice(index, 1)
            that.setData({
              lsit: list
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})

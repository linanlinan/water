var app = getApp()
var api = require('../../config/api.js')
var http = require('../../utils/http.js')
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    showEmpty: false,
    list: [],
    total: 0, //金额合计
    selType: 1,
    address: '', // 收货地址
  },

  onLoad: async function() {
    this.getList()
    let addressList = await this.getAddress()
    if(addressList.length > 0) {
      this.setData({
        address: addressList[0].conaddress
      })
    }
  },

  getList() {
    this.setData({
      list: app.globalData.carList
    })
    this.calculat()
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
  // 结算
  settlement() {

  },
  radioChange(e) {
    this.setData({
      selType: e.detail.value
    })
  },

  // 计算金额
  calculat() {
    let salecount = 0
    for (const item of this.data.list) {
        let itemsalecount = item.price * item.salecount
        salecount = salecount + (itemsalecount || 0)
    }
    this.setData({
      total: salecount
    })
  },

  getAddress() {
    return http.get(api.getAddress, {
      id_user: app.globalData.userId
    }).then(res => {
      let data = res
      return data
    })
  },

  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },

  async confirm() {
    let addressList = await this.getAddress()
    if (addressList[0]) {
      http.get(api.updateAddress, {
        conaddress: this.data.address,
        id: addressList[0].id
      }).then(res => {
      })
    } else {
      http.get(api.addAddress, {
        conaddress: this.data.address,
        id_user: app.globalData.userId
      }).then(res => {
      })
    }
    this.pay()
  },
  pay() {
    let newList = []
    for (const item of list) {
      newList.push({
        ...item,
        recaddress: this.data.address,
        recuser: app.globalData.userId,
        adId: item.id,
        isHaveYJ: this.data.selType == 1 ? '0' : '1'
      })
    }
    http.post(api.payUrl, {
      totalMoney: this.data.total,
      openId: app.globalData.openId,
      orders: newList
    }).then(res => {
      wx.requestPayment({
        provider: 'wxpay',
        nonceStr: res.map.nonceStr,
        package: res.map.package,
        signType: res.map.signType,
        paySign: res.map.paySign,
        timeStamp: res.map.timeStamp,
        success: function(res) {
          wx.navigateTo({
            url: "index"
          })
        },
        fail: function(err) {
          wx.showToast({
            title: "支付失败",
            icon: 'none'
          })
        }
      });
    })
  }
})

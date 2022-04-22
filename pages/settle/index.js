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
    yjTotal: 0, // 押金总计
    selType: 1,
    address: '', // 收货地址
    showModal: false,
    showMoney: 0, // 显示的金额
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
  radioChange(e) {
    this.setData({
      selType: e.detail.value
    })
    if (e.detail.value == 2) {
      this.setData({
        yjTotal: 0
      })
      this.calculat()
    } else {
      this.calculat()
    }
  },

  // 计算金额和押金
  calculat() {
    let salecount = 0
    for (const item of this.data.list) {
        let itemsalecount = item.price * item.salecount
        salecount = salecount + (itemsalecount || 0)
    }
    this.setData({
      total: Number(salecount.toFixed(2))
    })

    this.getTotalYj()
  },

  getAddress() {
    return http.get(api.getAddress, {
      id_user: app.globalData.userId,
      needLog: true
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
    if (!this.data.address && this.data.selType == 2) {
      return wx.showToast({
        title: '请输入收货地址',
        icon: 'none'
      })
    }
    let addressList = await this.getAddress()
    if (addressList[0]) {
      http.get(api.updateAddress, {
        conaddress: this.data.address,
        id: addressList[0].id,
        needLog: true
      }).then(res => {
      })
    } else {
      http.get(api.addAddress, {
        conaddress: this.data.address,
        id_user: app.globalData.userId,
        needLog: true
      }).then(res => {
      })
    }
    this.pay()
  },
  pay() {
    let newList = []
    for (const item of this.data.list) {
      newList.push({
        ...item,
        recaddress: this.data.address,
        recuser: app.globalData.userId,
        adId: item.goodId,
        isHaveYJ: this.data.selType == 1 ? '1' : '0',
        recphone: app.globalData.phone
      })
    }
    let total = this.data.selType == 1 ? (this.data.total + this.data.yjTotal) * 100 : this.data.total * 100
    http.post(api.payUrl, {
      totalMoney: total,
      openId: app.globalData.openId,
      orders: newList,
      needLog: true
    }).then(res => {
      console.log(res);
      wx.requestPayment({
        provider: 'wxpay',
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        timeStamp: res.timeStamp,
        success: function() {
          http.get(api.updateOrder, {
            id: res.yjOrderId,
            status: '1'
          })
          wx.navigateTo({
            url: "index"
          })
        },
        fail: function(err) {
          http.get(api.updateOrder, {
            id: res.yjOrderId,
            status: '7'
          })
          wx.showToast({
            title: "支付失败",
            icon: 'none'
          })
        }
      });
    }).catch(res => {
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      })
    })
  },

  showAgreement() {
    this.setData({
      showModal: true
    })
  },

  closeDia() {
    this.setData({
      showModal: false
    })
  },

  async getTotalYj() {
    let total = 0
    for (const item of this.data.list) {
      let yj = await this.getYjByName(item.goodsname)
      total += yj * item.salecount
    }
    this.setData({
      yjTotal: total
    })
    let showtotal = this.data.selType == 1 ? this.data.total + this.data.yjTotal : this.data.total
    this.setData({
      showMoney: Number(showtotal).toFixed(2)
    })
  },

  getYjByName(name) {
    return http.get(api.getYj, {
      page: 1,
      limit: 1000,
      comname: name
    }).then(res => {
      let data = res.data
      return data[0] ? data[0].price : 0
    })
  }
})

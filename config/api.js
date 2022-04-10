//测试地址
const ApiRootUrl = 'http://123.57.66.216:8080'

module.exports = {
  login: ApiRootUrl + '/water/WxPay/getOpenIdAndKey',
  // 获取banner接口
  IndexBanner: ApiRootUrl + '/water/ad/querypage',

  // 分页获取商品列表
  getGoodsPage: ApiRootUrl + '/water/commodity/querypage',

  // 添加用户
  addUser: ApiRootUrl + '/water/users/wcadd',

  // 分页获取商品分类
  getCommodityPage: ApiRootUrl + '/water/category/querypage',
  
  // 添加购物车
  addCar: ApiRootUrl + '/water/cart/add',

  // 购物车列表
  carList: ApiRootUrl + '/water/cart/querypage',

  // 删除购物车
  delCarItem: ApiRootUrl + '/water/cart/update',

  // 获取订单列表和押金列表
  getOrderList: ApiRootUrl + '/water/order/querypage',

  // 地址管理
  getAddress: ApiRootUrl + '/water/useraddress/querypage',
  addAddress: ApiRootUrl + '/water/useraddress/add',
  updateAddress: ApiRootUrl + '/water/useraddress/update',

  // 支付
  payUrl: ApiRootUrl + '/water/WxPay/wxPayOrder',
}
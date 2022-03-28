//测试地址
const ApiRootUrl = 'http://47.97.178.20/api'

module.exports = {
  // 获取banner接口
  IndexBanner: ApiRootUrl + '/water/ad/querypage',

  // 添加用户
  addUser: ApiRootUrl + '/water/users/wcadd',

  // 分页获取商品列表
  getCommodityPage: ApiRootUrl + '/water/commodity/querypage',
  
  // 添加购物车
  addCar: ApiRootUrl + '/water/commodity/querypage'
}
/**
 * GET请求封装
 */
function get(url, data = {}) {
  return request(url, data, 'GET')
}

/**
 * POST请求封装
 */
function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 微信的request
 */
function request(url, data = {}, method = "GET") {
  let userInfo = wx.getStorageSync('userInfo')
  if (data.needLog && !userInfo) {
    return wx.navigateTo({
      url: '/pages/login/index',
    })
  }
  var contentType = 'application/json'
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        // 'Authorization': 'Bearer ' + getDataByKey('token')
      },
      success: function(res) {
        if (res.statusCode == 200) {
          //请求正常200
          //AES解密返回的数据
          var daesData = null
          try {
            daesData = res.data
            if (daesData.code == 0 || (daesData.code == 200)) {
              //正常
              resolve(daesData.data);
            } else {
              //错误
              reject(daesData)
            }
          } catch (error) {
            console.log('==    数据解码失败')
            reject("数据解码失败")
          }
        } else if (res.statusCode == 401) {
          //此处验证了token的登录失效，如果不需要，可以去掉。
          //未登录，跳转登录界面
          reject("登录已过期")
          wx.showModal({
            title: '提示',
            content: '登录已过期，请立即登录，否则无法正常使用',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login?toPageUrl=401',
                })
              } else if (res.cancel) {
              }
            }
          })
        } else {
          //请求失败
          reject(res)
        }
      },
      fail: function(err) {
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}

module.exports = {
  request,
  get,
  post
}
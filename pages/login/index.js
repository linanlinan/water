
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showClose: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    unLogin: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showLogin () {
      this.setData({
        unLogin: true
      })
    },
    hideLogin() {
      this.setData({
        unLogin: false
      })
    },
    close() {
      if (!this.data.showClose) {
        return
      }
      this.setData({
        unLogin: false
      });
      this.triggerEvent('close')
    },
    setUserInfo(userInfo) {
      this.triggerEvent('authSuccess', userInfo)
    },
    onGotUserInfo(e) {
      console.log(e);
      if (e.detail.userInfo) {
        this.hideLogin();
      }
    },
    onGotPhoneNumber (e) {
      console.log('getPhoneNumber====', e)
    }
  }
})

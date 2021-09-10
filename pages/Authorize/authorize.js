import services from "../../services/api.js"
import Login from "../../services/login.js"
const app = getApp()
Page({
  data: {
    
  },

  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateBack({
            delta: 0,
          })
        }
      }
    })
  },
  onShow() {
    wx.hideHomeButton()
  },

  getPhoneNumber(e) {
    console.log(e)
  },

  getUserInfo: function (e) {
    console.log(e)
    if ((e.detail.userInfo != '') && (e.detail.userInfo != undefined)) {
      wx.switchTab({
        url: '/pages/Index/index/index',
      })
    }
  },

  getRealUserInfo(){
    console.log(this.data.userInfo)
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          'userInfo.nickname': res.userInfo.nickName,
          'userInfo.avatarUrl': res.userInfo.avatarUrl,
        })
        app.globalData.userInfo = this.data.userInfo
        this.updateUserInfo()
      }
    })
  },


})
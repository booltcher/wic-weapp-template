import services from "../../services/api.js";
import Login from "../../services/login.js";
const app = getApp();
Page({
  data: {
    userInfo: {
      avatarUrl: "../../static/images/avatar.png",
      name: "blcher",
      github: "https://github.com/blcher",
      blog: "https://blcher.github.io",
    },
  },

  onLoad: function () {

  },

  onShow() {
    wx.hideHomeButton();
  },

  getRealUserInfo() {
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          "userInfo.name": res.userInfo.nickName,
          "userInfo.avatarUrl": res.userInfo.avatarUrl,
        });
        app.globalData.userInfo = this.data.userInfo;
        this.updateUserInfo();
      },
    });
  },
});

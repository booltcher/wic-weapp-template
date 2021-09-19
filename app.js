import { promisifyAll } from "miniprogram-api-promise";
promisifyAll(wx);
App({
  onLaunch: async function () {
    // let { authSetting } = await wx.getSetting();
    // if (!authSetting["scope.userInfo"]) {
    //   wx.showModal({
    //     title: "提示",
    //     content: "您还没有登录哦",
    //     showCancel: false,
    //     confirmText: "立即登录",
    //     success(res) {
    //       if (res.confirm) {
    //         wx.reLaunch({
    //           url: "/pages/System/authorize/authorize",
    //         });
    //       }
    //     },
    //   });
    // }
  },

  globalData: {
    REQUEST_BASE_URL: "https://api.test.com",
    REQUEST_TIMEOUT: 10000,

    EARLIEST_SUB_TIME: 9,
    LATEST_SUB_TIME: 20,
    SUB_TIME_INTERVAL: 2, //间隔
    SUB_TIME_DELAY: 2, //延迟多久后可预约
    userInfo: null,
    token: "",
    THEME_COLOR: "#313131",
  },
});

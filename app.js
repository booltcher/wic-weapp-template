import { promisifyAll, promisify } from 'miniprogram-api-promise';
promisifyAll(wx)
App({
  onLaunch: async function () {
    let { authSetting } = await wx.getSetting()
    if (!authSetting['scope.userInfo']) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录哦',
        showCancel: false,
        confirmText: '立即登录',
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/System/authorize/authorize',
            })
          }
        }
      })
    }
  },
  globalData: {
    BASE_URL: 'https://api.xzhs.tobyao.com',
    // BASE_URL:'http://zhangbro.top',
    EARLIEST_SUB_TIME: 9,
    LATEST_SUB_TIME: 20,
    SUB_TIME_INTERVAL: 2, //间隔
    SUB_TIME_DELAY: 2, //延迟多久后可预约
    userInfo: null,
    token:'',
    // token:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvYmlTXzVUeVlLeTRnLXVjRTEweDhIdEZiaVRNIiwiaXNzIjoidG9ieTEyMTVAMTYzLmNvbSIsImRldGFpbHMiOiJ7XCJsb2dpbklwXCI6XCIxMjcuMC4wLjFcIn0iLCJleHAiOjE2MjkzMDA2NDAsImlhdCI6MTYyODY5NTg0MCwianRpIjoiMTQyNTQ3OTc4OTU2NjIzODcyMSJ9.TpYcF-wju-YxZC4OP77i6QssDRRk6aN-6vq_veR7H44",
    themeColor: '#eb4450'
  }
})
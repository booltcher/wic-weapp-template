const setUserMessage = async (app) => {
  const arr = ['KMoAjcwe-Gzx-mgAvs4_xUxlbNHEuUEefVHPLIHZxaM', '1tafSpXdT8Dkpy-6DvAqsd_uO-0CFNLKxMfkBVHPPCQ']
  let need = []
  if (!app.globalData.msgKey1) {
    console.log('未订阅 msg1')
    need.push(arr[0])
  }
  if (!app.globalData.msgKey2) {
    console.log('未订阅 msg2')
    need.push(arr[1])
  }
  if (app.globalData.msgKey1 && app.globalData.msgKey2) {
    console.log('已订阅 2 消息')
    return
  }
  let msgRes = await wx.requestSubscribeMessage({ tmplIds: need })
  if (msgRes.errMsg === 'requestSubscribeMessage:ok') {
    let settingRes = await wx.getSetting({
      withSubscriptions: true
    })
    if (settingRes.subscriptionsSetting.itemSettings) {
      if (settingRes.subscriptionsSetting.itemSettings['KMoAjcwe-Gzx-mgAvs4_xUxlbNHEuUEefVHPLIHZxaM']) {
        app.globalData.msgKey1 = true
      }
      if (settingRes.subscriptionsSetting.itemSettings['1tafSpXdT8Dkpy-6DvAqsd_uO-0CFNLKxMfkBVHPPCQ']) {
        app.globalData.msgKey1 = true
      }
    } else {
      app.globalData.msgKey1 = false
      app.globalData.msgKey2 = false
    }
    wx.switchTab({
      url: '/pages/Index/index/index',
    })
  }
}
export default setUserMessage
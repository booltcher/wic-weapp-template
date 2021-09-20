import Prompt from "./prompt.js";
const manualLocate = async () => {
    let setting = await wx.getSetting()
    if (setting && !setting.authSetting['scope.userLocation']) {
        Prompt.dialog({
            message: "请授权获取您的位置信息",
            showCancelButton: true,
            title: '提示'
        })
            .then(() => {
                wx.openSetting({
                    withSubscriptions: true,
                })
            });
        return null
    }
    try {
        const res = await wx.chooseLocation()
        if (res.name) {
            return {
                addressName: res.name,
                latitude: res.latitude,
                longitude: res.longitude,
            }
        }
    } catch (err) {
        if (err.errMsg === 'chooseLocation:fail auth deny')
        Prompt.error('授权失败')
        return null
    }
}
export default manualLocate
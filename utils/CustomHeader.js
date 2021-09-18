const Customheader = async () => {
    const systemInfo = await wx.getSystemInfoSync()
    const menuButton = await wx.getMenuButtonBoundingClientRect()
    let customheaderHeight = systemInfo.statusBarHeight + menuButton.height + (menuButton.top - systemInfo.statusBarHeight) * 2
    let paddingTop = systemInfo.statusBarHeight + menuButton.top - systemInfo.statusBarHeight
    let innerHeight = menuButton.height
    return {
        customheaderHeight,
        paddingTop,
        innerHeight
    }
}
export default Customheader
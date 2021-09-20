const syncThemeFromGlobal = (ctx) => {
    ctx.setData({
        THEME_COLOR: getApp().globalData.THEME_COLOR
    })
}
export default syncThemeFromGlobal
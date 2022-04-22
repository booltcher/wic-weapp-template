const SyncThemeFromGlobal = (ctx) => {
    ctx.setData({
        THEME_COLOR: getApp().globalData.THEME_COLOR
    })
}
export default SyncThemeFromGlobal
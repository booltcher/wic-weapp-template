import toast from "../../../miniprogram_npm/@vant/weapp/toast/toast.js";
import services from "../../../services/api.js"
import { SuccessToast, ErrorToast, oToast, Dialog, LoadingToast } from "../../../utils/toast.js";

const app = getApp()
Page({
    data: {
        name: '',
        historySearchList: [],
        STORAGE_KEY: 'historySearchValues',
    },

    onLoad: function (options) {
        this.getHistoryStorage()
    },

    onShow: function () {

    },

    onHide() {
        this.setData({
            name: ''
        })
    },

    onSearchValueChange(e) {
        this.setData({
            name: e.detail.value
        })
    },

    async searchRequest() {
        const name = this.data.name
        console.log(name)
        if (name === '') {
            ErrorToast('请输入回收物品名称')
            return
        }
        try {
            const res = await services.searchByText({ name, hideError: true })
            if (res.code === '200') {
                const { contain, explain, tip, type } = res.data
                const pararms = encodeURIComponent(JSON.stringify({
                    contain,
                    explain,
                    name,
                    tip,
                    type
                }))
                wx.navigateTo({
                    url: `/pages/Index/searchResult/searchResult?params=${pararms}`,
                })
                console.log(res)
            } else {
                ErrorToast('无匹配结果')
            }
        } catch (error) {

        }
    },

    handleSearch() {
        const name = this.data.name
        let list = this.data.historySearchList
        if (name.trim() === '') return
        if (!list.includes(name)) {
            list.push(name)
        }
        this.setData({
            historySearchList: list,
        })
        this.setHistoryStorage()

        this.searchRequest()
    },

    //读取缓存
    getHistoryStorage() {
        try {
            const res = wx.getStorageSync(this.data.STORAGE_KEY)
            console.log(res)
            this.setData({
                historySearchList: (!res || !res.length) ? [] : JSON.parse(res)
            })
        } catch (err) {
            console.log(err)
        }
    },

    //设置缓存
    setHistoryStorage() {
        let data = this.data.historySearchList.length ? JSON.stringify(this.data.historySearchList) : null;
        wx.setStorage({
            key: this.data.STORAGE_KEY,
            data,
            success(res) {
                console.log(res)
            },
            fail(err) {
                console.log(err)
            }
        })
    },

    //清除缓存
    clearHistoryStorage() {
        wx.removeStorage({
            key: this.data.STORAGE_KEY,
            success(res) {
                console.log(res)
            }
        })
    },

    //点击历史搜索
    clickItemEvent(e) {
        this.setData({
            name: e.currentTarget.dataset.value
        })
        this.searchRequest()
    },

    delConfirm(e) {
        let _self = this
        Dialog({
            message: '确认删除全部历史搜索记录？',
            showCancelButton: true,
            title: '提示'
        })
            .then(() => {
                this.setData({
                    historySearchList: []
                })
                this.clearHistoryStorage()
            });
    },

    cameraClickHandle() {
        wx.chooseImage({
            count: 1,
            success(res) {
                const path = res.tempFiles[0].path
                const arr = path.split('.')
                const type = arr[arr.length - 1].toLocaleLowerCase()
                LoadingToast('正在识别')
                wx.uploadFile({
                    url: app.globalData.BASE_URL + '/client/search/img',
                    filePath: path,
                    name: 'file',
                    header: {
                        'Authorization': app.globalData.token,
                        'content-type': 'multipart/form-data'
                    },
                    formData: {
                        suffix: type
                    },
                    success: (res) => {
                        toast.clear()
                        let result = JSON.parse(res.data)
                        if(result.code === '200'){
                            const { name, lajitip, lajitype } = result.data
                            const pararms = encodeURIComponent(JSON.stringify({
                                name,
                                tip: lajitip,
                                type: lajitype
                            }))
                            wx.navigateTo({
                                url: `/pages/Index/searchResult/searchResult?params=${pararms}`,
                            })
                        } else {
                            ErrorToast('无匹配结果')
                        }
                    }
                });
            },
            fail(err) {
                ErrorToast(err.msg)
            }
        })
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onReachBottom: function () {

    },
})
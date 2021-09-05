import services from "../../../services/api.js"
import { SuccessToast, ErrorToast, oToast, Dialog } from "../../../utils/toast.js";

const app = getApp()
Page({
    data: {
        info: {
            name: '',
            tip: '',
            contain: '',
            type: ''
        }
    },

    onLoad: function (options) {
        let params = JSON.parse(decodeURIComponent(options.params))
        this.setData({
            info: params
        })
    },

    onShow: function () {

    },
})
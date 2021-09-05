import services from "../../../services/api.js"
import {
    SuccessToast,
    ErrorToast,
    oToast,
    Dialog
} from "../../../utils/toast.js";
import Paging from "../../../utils/PagingBase";

const app = getApp()
let PagingInstance;
Page({

    data: {
        activeTabKey: '0',
        canLoadMore: true,
        tabList: [{
                title: '未接单',
                key: '0'
            },
            {
                title: '已接单',
                key: '1,2'
            },
            {
                title: '已完成',
                key: '3'
            },
            {
                title: '已取消',
                key: '10,11,12'
            },
        ],
        list: []
    },
    onLoad: function (options) {
        let key = options.key
        this.setData({
            activeTabKey: key
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },

    async onShow() {
        PagingInstance = new Paging({
            context: this,
            pagingName: '订单分页',
            requestApi: 'getOrderList',
            size: 10,
            params: {
                orderStatus: this.data.activeTabKey
            },
        })
        await PagingInstance.init()
    },

    changeTab(e) {
        let key = e.currentTarget.dataset.key
        if (key !== this.data.activeTabKey) {
            this.setData({
                activeTabKey: key
            })
            PagingInstance.init({
                orderStatus: key
            })
        }
    },

    navOrderInfo(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/User/orderInfo/orderInfo?id=${id}`,
        })
    },

    dailToRecycler(e) {
        let mobile = e.currentTarget.dataset.mobile
        wx.makePhoneCall({
            phoneNumber: mobile,
        })
    },

    copyOrderNumber(e) {
        let text = e.currentTarget.dataset.number
        wx.setClipboardData({
            data: text,
        })
    },

    handleCancel(e) {
        let id = e.currentTarget.dataset.id
        Dialog({
                message: '确认要取消该订单吗？',
                showCancelButton: true,
                title: ''
            })
            .then(() => {
                this.cancelRequest(id)
            });
    },

    async cancelRequest(id) {
        // 取消订单
        try {
            const res = await services.cancelOrder({
                orderId: id,
                reason: '用户手动取消'
            })
            if (res) {
                console.log(res)
                await PagingInstance.init({
                    orderStatus: this.data.activeTabKey
                })
                listComponent.setDividerText()
            }
        } catch (error) {

        }
    },

    handleEvaluate(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/User/evaluateForm/evaluateForm?id=${id}`,
        })
    },

    async onPullDownRefresh() {
        wx.stopPullDownRefresh()
        await PagingInstance.init({
            orderStatus: this.data.activeTabKey
        })
        listComponent.setDividerText()
    },
    async onReachBottom() {
        await PagingInstance.get()
        listComponent.setDividerText()
    },

})
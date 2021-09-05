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
let listComponent;
Page({
    data: {
        list: [],
        canLoadMore: true
    },
    onLoad: function (options) {
        
    },
    async onShow(){
        listComponent = this.selectComponent("#list")
        PagingInstance = new Paging({
            context: this,
            pagingName:'反馈记录分页', 
            requestApi:'getFeedbackRecord',
            size:20,
            params:{}
        })
        await PagingInstance.init()
        listComponent.setDividerText()
    },
    showOnMap(e){
        let { longitude, latitude} = e.currentTarget.dataset.item
        wx.openLocation({
          latitude,
          longitude
        })
    },
    dailPhone(e) {
        let phoneNumber = e.currentTarget.dataset.number;
        wx.makePhoneCall({
            phoneNumber
        })
    },
    async onPullDownRefresh() {
        wx.stopPullDownRefresh()
        await PagingInstance.init()
        listComponent.setDividerText()
    },
    async onReachBottom() {
        await PagingInstance.get()
        listComponent.setDividerText()
    },
})
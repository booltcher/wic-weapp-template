import services from "../../../services/api.js"
import {
  SuccessToast,
  ErrorToast,
  oToast,
  Dialog
} from "../../../utils/toast.js";
import Login from "../../../services/login"
const app = getApp()
Page({
  data: {
    paddingTop: '',
    bannerList: [],
    noticeList: [],
    promiseList: [{
        title1: '及时上门',
        title2: '5分钟内响应',
        title3: '2小时内完成',
        icon: '../../../static/images/icon-promise1.jpg'
      },
      {
        title1: '即时到账',
        title2: '收益秒结',
        title3: '无需提现',
        icon: '../../../static/images/icon-promise2.jpg'
      },
      {
        title1: '价格透明',
        title2: '线上估价',
        title3: '公开透明',
        icon: '../../../static/images/icon-promise3.jpg'
      },
      {
        title1: '隐私保护',
        title2: '虚拟拨号',
        title3: '隐私安全',
        icon: '../../../static/images/icon-promise4.jpg'
      },
    ],
    processList: [{
        text: '在线预约',
        icon: "../../../static/images/icon-pro1.png"
      },
      {
        text: '免费上门',
        icon: "../../../static/images/icon-pro2.png"
      },
      {
        text: '完成订单',
        icon: "../../../static/images/icon-pro3.png"
      },
      {
        text: '领取奖励',
        icon: "../../../static/images/icon-pro4.png"
      }
    ]
  },

  async onLoad(e) {
    await this.login()
    this.getBannerList()
    this.getDynamicList()
    this.getSetting()
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  async getSetting() {
    const arr = ['KMoAjcwe-Gzx-mgAvs4_xUxlbNHEuUEefVHPLIHZxaM', '1tafSpXdT8Dkpy-6DvAqsd_uO-0CFNLKxMfkBVHPPCQ']
    let res = await wx.getSetting({
      withSubscriptions: true
    })
    if (res.subscriptionsSetting.itemSettings) {
      if (res.subscriptionsSetting.itemSettings['KMoAjcwe-Gzx-mgAvs4_xUxlbNHEuUEefVHPLIHZxaM']) {
        app.globalData.msgKey1 = true
      }
      if (res.subscriptionsSetting.itemSettings['1tafSpXdT8Dkpy-6DvAqsd_uO-0CFNLKxMfkBVHPPCQ']) {
        app.globalData.msgKey1 = true
      }
    } else {
      app.globalData.msgKey1 = false
      app.globalData.msgKey2 = false
    }
  },

  async getBannerList() {
    try {
      const res = await services.getBannerList({
        carouselType: 0
      })
      if (res.code === '200') {
        this.setData({
          bannerList: res.data
        })
      }
    } catch (error) {

    }
  },

  bannerHandle(e) {
    let item = e.currentTarget.dataset.item
    let url = item.linkClientPageUrl
    let params = item.linkParams
    let path = params ? `${url}?id=${params}` : `${url}`
    wx.navigateTo({
      url: path,
    })
  },

  async getDynamicList() {
    try {
      const res = await services.getDynamicOrderInfo({
        size: 20
      })
      if (res.code === '200') {
        let noticeList = res.data.records
        noticeList.forEach(v => {
          v.smobile = v.addressMobile.substr(0, 5) + '******';
          v.goods = v.items.map(v => v.productName).join(',');
          v.money = v.payAmount;
        })
        this.setData({
          noticeList
        })
      }
    } catch (error) {

    }

  },

  //登录
  async login() {
    try {
      await Login()
    } catch (err) {
      console.log(err)
    }
  },


  headerRenderedHandle(e) {
    this.setData({
      paddingTop: e.detail
    })
  },

  navSearch() {
    wx.navigateTo({
      url: '/pages/Index/search/search',
    })
  },

  navCreateDeal() {
    wx.navigateTo({
      url: '/pages/Index/createDeal/createDeal',
    })
  }
})
import services from "../../services/api.js"
import {
  SuccessToast,
  ErrorToast,
  oToast,
  Dialog
} from "../../utils/toast.js";
import Login from "../../services/login";
const app = getApp()

Page({
  data: {
    userInfo: {
      nickname:'',
      avatarUrl:'',
      totalAmount: 0,
      totalCount: 0,
      coin: 0
    },
    orderStatusList: [
      { icon: '../../../static/images/icon-order1.jpg', title: '未接单', key:'0' },
      { icon: '../../../static/images/icon-order2.jpg', title: '已接单', key:'1,2' },
      { icon: '../../../static/images/icon-order3.jpg', title: '已完成', key:'3' },
      { icon: '../../../static/images/icon-order4.jpg', title: '已取消', key:'10,11,12' },
    ],
    toolList: [
      { icon: '../../../static/images/icon-tools-addr.jpg', title: '地址管理', type: 'link', value: '/pages/User/addressList/addressList' },
      { icon: '../../../static/images/icon-tools-about.jpg', title: '关于我们', type: 'link', value: '/pages/User/aboutUs/aboutUs' },
      { icon: '../../../static/images/icon-tools-feedback.jpg', title: '意见反馈', type: 'event', value: 'navFeedback' },
      // { icon: '../../../static/images/icon-tools-share.jpg', title: '分享好友', type: 'event', value: 'share' },
      { icon: '../../../static/images/icon-tools-shop.jpg', title: '回收商家', type: 'link', value: '/pages/User/siteList/siteList' },
      // { icon: '../../../static/images/icon-tools-service.jpg', title: '在线客服', type: 'event', value: 'contactServices' },
    ]
  },
  async onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  async onShow() {
    this.initUserData()
  },

  async initUserData() {
    if (app.globalData.userInfo === null) {
      await Login()
    }
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  async getRealUserInfo() {
    const profileRes = await wx.getUserProfile({ desc: '用于完善用户资料' })
    if (profileRes) {
      const modifyRes = await services.modifyUserInfo({
        avatarUrl: profileRes.userInfo.avatarUrl,
        nickname: profileRes.userInfo.nickName,
      }, false)
      if (modifyRes.code === '200') {
        this.setData({
          'userInfo.nickname': profileRes.userInfo.nickName,
          'userInfo.avatarUrl': profileRes.userInfo.avatarUrl,
        })
        app.globalData.userInfo = this.data.userInfo
      }
    }
  },

  toolsHandle(e) {
    let { type, value } = e.currentTarget.dataset.item
    if (type === 'event') {
      this[value]()
    } else if (type === 'link') {
      wx.navigateTo({
        url: value
      })
    }
  },

  navFeedback(){
    wx.showActionSheet({
      itemList: ['我要反馈','查看反馈记录'],
      success(res){
        if(res.errMsg === 'showActionSheet:ok'){
          if(res.tapIndex === 0){
            wx.navigateTo({
              url: '/pages/User/feedbackForm/feedbackForm',
            })
          } else if(res.tapIndex === 1){
            wx.navigateTo({
              url: '/pages/User/feedbackRecord/feedbackRecord',
            })
          }
        }
      }
    })
  },

  share() {

  },

  contact() {

  },

  getPhoneNumber(e) {
    if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
      ErrorToast('绑定失败')
    } else if (e.detail.errMsg === "getPhoneNumber:ok") {
      this.bindMobile(e.detail)
    }
  },

  async bindMobile(params) {
    try {
      let res = await services.bindMobile({
        encryptedData: params.encryptedData,
        iv: params.iv
      })
      if (res.code === '200') {
        SuccessToast('已绑定')
        this.setData({
          'userInfo.mobile': res.data
        })
        app.globalData.userInfo.mobile = res.data
      }
    } catch (error) {

    }
  },

  navOrderList(e){
    let key = e.currentTarget.dataset.key
    wx.navigateTo({
      url: `/pages/User/orderList/orderList?key=${key}`,
    })
  }

})
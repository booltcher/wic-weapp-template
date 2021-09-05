import services from "../../../services/api.js"
import {
  SuccessToast,
  ErrorToast,
  oToast,
  Dialog
} from "../../../utils/toast.js";
const app = getApp()

Page({
  data: {
    addressList: []
  },
  async onLoad() {

  },

  onShow() {
    this.getAddressList(true)
  },

  async getAddressList(br) {
    try {
      let res = await services.getAddressList({}, br)
      if (res.code === '200') {
        this.setData({
          addressList: res.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  },

  //删除确认
  delConfirm(e) {
    let item = e.currentTarget.dataset.item
    Dialog({
      message: '确认要删除该地址吗？',
      showCancelButton: true,
      title: ''
    })
      .then(() => {
        this.deleteAddr(item.id)
      });
  },

  //删除
  async deleteAddr(id) {
    try {
      let res = await services.deleteAddress(id)
      if (res.code === '200') {
        SuccessToast('删除成功')
        this.getAddressList(false)
      }
    } catch (err) {
      console.log(err)
    }
  },

  //新增
  navAddAddress() {
    wx.navigateTo({
      url: '/pages/User/addressInfo/addressInfo',
    })
  },

  //编辑
  navEditAddress(e) {
    let item = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: `/pages/User/addressInfo/addressInfo?item=${item}`,
    })
  },

  //设为默认
  async setDefault(e) {
    let item = e.currentTarget.dataset.item
    item.defaultFlag = 1
    try {
      let res = await services.modifyAddress(item)
      if (res.code === '200') {
        SuccessToast('设置成功')
        this.getAddressList(false)
      }
    } catch (error) {

    }
  },

  //获取微信地址
  getWxAddress() {
    wx.chooseAddress({
      success: async (res) => {
        console.log(res)
        let response = await services.createAddress({
          name: res.userName,
          mobile: res.telNumber,
          addressName: `${res.provinceName} ${res.cityName} ${res.countyName}`,
          details: res.detailInfo,
          defaultFlag: 0
        })
        console.log(response)
        if (response.code === '200') {
          SuccessToast('添加成功')
          this.getAddressList(false)
        }
      },
    })
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.getAddressList(true)
  }
})
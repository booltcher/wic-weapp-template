import { LoadingToast, ErrorToast, SuccessToast, Dialog } from "../../../utils/toast";
import Validator from "../../../utils/validator";
import getAddressName from "../../../utils/getAddressName"
import manualChooseLocation from "../../../utils/manualChooseLocation"
import { setGoodStorage, getAllGoodStorage, removeGoodStorage, clearGoodStorage } from "../../../utils/goodStorage";
import services from "../../../services/api";
import { dateAfterCount } from "../../../utils/util"
import setUserMessage from "../../../utils/setUserMessage"

const app = getApp()
Page({
  data: {
    addressPickerVisible: false,
    activeDateIndex: 0,
    dateList: [],
    activeTimeIndex: 0,
    goodStorage: [],
    formData: {
      activeAddress: null,
      preMinAmount: '--',
      preMaxAmount: '--',
      items: [],
      remark: ''
    },
    formRules: [
      { prop: 'activeAddress', validator: (value) => value !== null, msg: '请选择回收地点' },
      { prop: 'items', validator: (value) => value.length, msg: '请添加回收物品' }
    ]
  },

  onLoad: function (options) {
    this.initTimeList()
  },

  onShow() {
    getAllGoodStorage()
    this.setData({
      'formData.items': getAllGoodStorage()
    })
    this.setEstimatePrice();
  },

  setEstimatePrice() {
    const goodStorage = this.data.formData.items
    const preMinAmount = goodStorage.reduce((total, current) => {
      return total + current.minPrice
    }, 0)
    const preMaxAmount = goodStorage.reduce((total, current) => {
      return total + current.maxPrice
    }, 0)
    this.setData({
      'formData.preMinAmount': preMinAmount.toFixed(2),
      'formData.preMaxAmount': preMaxAmount.toFixed(2)
    })
  },

  onHide() {
    this.hideAddressPicker()
  },

  initTimeList() {
    // 早9 晚8 每两个小时一个选项，从当前时间开始计算两个小时后是第一个选项
    const earliestClock = app.globalData.EARLIEST_SUB_TIME
    const latestClock = app.globalData.LATEST_SUB_TIME
    const clockInterval = app.globalData.SUB_TIME_INTERVAL
    const clockDelay = app.globalData.SUB_TIME_DELAY

    const currentClock = (new Date()).getHours()
    // const currentClock = 15
    const canToday = (currentClock + clockDelay) < latestClock
    const wholeSchedule = this.genWholeSchedule(earliestClock, latestClock, clockInterval, clockDelay)
    let dateList = [
      { text: '明天', times: wholeSchedule, day: dateAfterCount(1) },
      { text: '后天', times: wholeSchedule, day: dateAfterCount(2) }]
    if (canToday) {
      let times = this.genWholeSchedule(earliestClock, latestClock, clockInterval, clockDelay, currentClock)
      dateList.unshift({ text: '今天', times, day: dateAfterCount(0) })
    }
    this.setData({
      dateList
    })
  },

  genWholeSchedule(start, end, gap, delay, current) {
    let schedule = []
    let scheduleStart;
    if (current && current > start) {
      scheduleStart = current + delay
    } else {
      scheduleStart = start
    }
    let scheduleLen = (end - scheduleStart) % gap === 0 ? ((end - scheduleStart) / gap) : Math.floor(((end - scheduleStart) / gap) + 1)
    for (let i = 0; i < scheduleLen; i++) {
      let start_clock = scheduleStart + (i * gap)
      let end_clock = (start_clock + gap > end) ? end : (start_clock + gap)
      schedule[i] = `${start_clock}:00-${end_clock}:00`
    }
    return schedule
  },

  async removeGood(e) {
    const id = e.currentTarget.dataset.id
    const goodStorage = await removeGoodStorage(id)
    this.setData({
      'formData.items': goodStorage
    })
    this.setEstimatePrice()
  },

  navCategory() {
    wx.navigateTo({
      url: '/pages/Form/category/category',
    })
  },

  clearGoods() {
    const items = this.data.formData.items
    const self = this
    Dialog({
      message: '是否确认清空所有回收物品',
      showCancel: true,
      title: ''
    })
      .then(() => {
        clearGoodStorage()
        self.setData({
          'formData.items': []
        })
        self.setEstimatePrice()
      });
  },

  chooseDate(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activeDateIndex: index,
      activeTimeIndex: 0
    })
  },

  chooseTime(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activeTimeIndex: index
    })
  },

  navAddressInfo() {
    wx.navigateTo({
      url: '/pages/User/addressInfo/addressInfo',
    })
  },

  //从地址薄选择
  showAddressPicker() {
    this.setData({
      addressPickerVisible: true
    })
  },
  hideAddressPicker() {
    this.setData({
      addressPickerVisible: false
    })
  },
  handleAddressPickerChange(e) {
    this.setData({
      'formData.activeAddress': e.detail,
      addressPickerVisible: false
    })
  },
  handleAddressPickerUpdate(e) {
    this.setData({
      'formData.activeAddress': e.detail
    })
  },

  handleInput(e) {
    this.setData({
      'formData.remark': e.detail.value
    })
  },

  submit() {
    const formData = this.data.formData
    Validator(formData, this.data.formRules).then(async res => {
      LoadingToast()
      try {
        let itemsList = formData.items.map(v => {
          return {
            preMaxPrice: v.maxPrice,
            preMinPrice: v.minPrice,
            preSpec: v.optionName,
            productId: v.productId
          }
        })
        let params = {
          ...this.data.formData,
          items:itemsList,
          addressId: formData.activeAddress.id,
          appointTime: this.genTimeString(),
          orderType: 0
        }
        const res = await services.createOrder(params)
        if (res.code === '200') {
          Dialog({
            message: '您可以前往个人中心 - 我的订单查看',
            showCancel: false,
            title: '下单成功'
          })
            .then(() => {
              setUserMessage(app)
            });
        }
      } catch (error) {

      }
    }).catch(err => {
      console.log(err);
    })
  },

  // 预约根据选项生成字符串
  genTimeString() {
    const day = this.data.dateList[this.data.activeDateIndex].day
    const time = this.data.dateList[this.data.activeDateIndex].times[this.data.activeTimeIndex]
    return `${day} ${time}`
  }
})
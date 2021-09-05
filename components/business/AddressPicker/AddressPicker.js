import services from "../../../services/api.js"
import {
  SuccessToast,
  oToast
} from "../../../utils/toast.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      default: true
    },
    showActive:{
      type: Boolean,
       default: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeAddress: null,
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('close')
    },

    navCreateAddress() {
      this.triggerEvent('close')
      wx.navigateTo({
        url: '/pages/User/addressInfo/addressInfo',
      })
    },

    //编辑
    navEditAddress(e) {
      this.triggerEvent('close')
      let item = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: `/pages/User/addressInfo/addressInfo?item=${item}`,
      })
    },

    //获取地址列表
    async getAddressList() {
      try {
        let res = await services.getAddressList({}, false)
        if (res.code === '200') {
          let defaultValue = res.data.find(item => item.defaultFlag === 1)
          if (defaultValue) {
            this.triggerEvent('update', defaultValue)
          }
          this.setData({
            list: res.data,
            activeAddress: defaultValue
          })
        }
      } catch (error) {

      }
    },

    //选中
    handleAddressEvent(e) {
      let item = e.currentTarget.dataset.item
      this.setData({
        activeAddress: item
      })
      this.triggerEvent('change', item)
    }
  },

  pageLifetimes: {
    show: function () {
      this.getAddressList()
    },
  }

})

import services from "../../../services/api.js"
import { SuccessToast, ErrorToast, oToast, Dialog } from "../../../utils/toast.js";
import { isEmpty } from "../../../utils/util"
import Validator from "../../../utils/validator"

const app = getApp()
Page({
  data: {
    formData: {
      contact: '',
      content: ''
    },
    formRules: [
      // { prop: 'contact', validator: 'required', msg: '请输入您的联系方式' },
      { prop: 'content', validator: 'required', msg: '请输入您的宝贵意见' }
    ]
  },

  onLoad(options) {

  },

  onContactInput(e) {
    this.setData({
      'formData.contact': e.detail.value
    })
  },

  contentInputHandle: function (e) {
    this.setData({
      'formData.content': e.detail.value
    })
  },
  //提交申请
  async submit() {
    Validator(this.data.formData, this.data.formRules).then(async res => {
      try {
        const res = await services.sendFeedback(this.data.formData)
        if(res){
          SuccessToast('感谢反馈，我们会在第一时间做出回应')
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        }
      } catch (error) {

      }
    })
  }
})
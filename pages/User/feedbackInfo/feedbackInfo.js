import { oToast,Error,Success } from "../../../utils/toast";
import _  from "../../../utils/util";

const app = getApp()
Page({
  data: {
    contentValue: ''
  },

  onLoad (options) {

  },

  contentInputHandle: function (e) {
    this.setData({
      contentValue: e.detail.value
    })
  },
  //提交申请
  submit() {
    if (_.isEmpty(this.data.contentValue)) {
      Error('请输入内容')
      return
    }
    //请求
  }
})
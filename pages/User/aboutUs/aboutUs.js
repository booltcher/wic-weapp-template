import services from "../../../services/api.js"
import { LoadingToast, ErrorToast, SuccessToast, Dialog } from "../../../utils/toast";

const app = getApp()
Page({
  data: {
    articleContent:''
  },

  onLoad: function (options) {

  },
  onShow: function () {
    this.initInfo()
  },

  async initInfo(){
    try {
      const res = await services.getArticle({
        groupId: 0 //1资讯
      })
      if(res.code === '200'){
        res.data.records[0].articleContent = res.data.records[0].articleContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        this.setData({
          articleContent: res.data.records[0].articleContent
        })
      }
    } catch (error) {
      
    }
  }
})
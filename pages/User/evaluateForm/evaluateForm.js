import services from "../../../services/api.js"
import { LoadingToast, ErrorToast, SuccessToast, Dialog } from "../../../utils/toast";
import Validator from "../../../utils/validator";
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast.js";

const app = getApp()

Page({
  data: {
    orderId: null,
    formData: {
      score: 0,
      appraiseContent: '',
    },
    maxlength: 300,
    appraiseImgs: [],
    appraiseImgsUploaded: [],
    formRules: [
      { prop: 'score', validator: value => value !== 0, msg: '请对回收员评分' },
      { prop: 'appraiseContent', validator: 'required', msg: '请用文字描述一下吧' }
    ]
  },
  async onLoad(options) {
    this.setData({
      orderId: options.id
    })
  },

  clickFill(e) {
    let score = e.currentTarget.dataset.index + 1
    this.setData({
      'formData.score': score
    })
  },
  clickHollow(e) {
    let score = e.currentTarget.dataset.index + this.data.formData.score + 1
    this.setData({
      'formData.score': score
    })
  },

  onContentInput(e) {
    this.setData({
      'formData.appraiseContent': e.detail.value
    })
  },

  chooseImg() {
    let _self = this
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (r) => {
        console.log(r)
        _self.setData({
          appraiseImgs: _self.data.appraiseImgs.concat(r.tempFilePaths)
        })
      }
    })
  },

  removeImg(e) {
    let index = e.currentTarget.dataset.index
    let appraiseImgs = this.data.appraiseImgs
    appraiseImgs.splice(index, 1)
    this.setData({
      appraiseImgs
    })
  },

  submit() {
    Validator(this.data.formData, this.data.formRules).then(async res => {
      if (this.data.appraiseImgs.length) {
        LoadingToast('上传图片')
        this.data.appraiseImgs.forEach(async (ele) => {
          await this.uploadImgs(ele)
        })
      } else {
        this.submitRequest()
      }
    }).catch(err => {
      console.log(err)
    })
  },

  uploadImgs(path) {
    let _self = this
    wx.uploadFile({
      url: app.globalData.BASE_URL + '/client/file/upload',
      filePath: path,
      name: 'file',
      header: {
        'Authorization': app.globalData.token,
      },
      formData: {
        suffix: 'png'
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        _self.data.appraiseImgsUploaded.push(data.data)
        if (_self.data.appraiseImgsUploaded.length === _self.data.appraiseImgs.length) {
          Toast.clear()
          _self.submitRequest()
        }
      }
    });
  },

  async submitRequest() {
    let { score, appraiseContent } = this.data.formData
    let { appraiseImgsUploaded } = this.data
    try {
      let res = await services.evaluate({
        score,
        appraiseContent,
        appraiseImgList: appraiseImgsUploaded,
        orderId: this.data.orderId,
        // orderType: this.data.orderType
      })
      if (res.code === '200') {
        SuccessToast('评价成功')
        setTimeout(() => {
          wx.navigateBack()
        }, 1200)
      }
    } catch (error) {

    }
  },

  previewImg(e) {
    let index = e.currentTarget.dataset.index
    let current = this.data.appraiseImgs[index]
    wx.previewImage({
      urls: this.data.appraiseImgs,
      current
    })
  }

})
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
import {
  LoadingToast,
  ErrorToast,
  oToast,
  Dialog
} from '../utils/toast';
import ErrorCodeMap from "./ErrorCodeMap";
import Login from "./login"

const app = getApp()

const reloginList = ['U_006', 'U_007', 'U_008']

function Network(args) {
  if (args.loadingVisible) {
    LoadingToast();
  }
  let {
    url,
    method,
    data,
    header
  } = args
  return new Promise((resolve, reject) => {
    const _tmp = {
      url: app.globalData.BASE_URL + url,
      method,
      timeout: 8000,
      header: {
        ...header,
        Authorization: app.globalData.token
      },
      data,
      success: (res) => {
        if (res.data.code === '200') {
          //防止清楚其他请求的loading
          if (args.loadingVisible || data.loginRequest) {
            Toast.clear()
          }
        } else {
          if (args.data && !args.data.hideError) {
            Toast.clear()
            //reloginList.includes(res.data.code) ? Login() : Error(ErrorCodeMap[res.data.code])
            if (reloginList.includes(res.data.code)) {
              Login()
              wx.switchTab({
                url: '/pages/Index/index/index',
              })
            } else {
              oToast(res.data.msg)
            }
            //reloginList.includes(res.data.code) ? Login() : oToast(res.data.msg)
          } else if (args.data && args.data.hideError) {  //隐藏错误信息
            Toast.clear()
          } else {
            Toast.clear()
            reloginList.includes(res.data.code) ? Login() : oToast(res.data.msg)
          }
        }
        if (res.header.Authorization) {
          getApp().globalData.token = res.header.Authorization
        }
        if (data && data.loginRequest) {
          resolve(res)
        } else {
          resolve(res.data)
        }
      },
      fail: (err) => {
        Dialog({
          message: '请求超时，请检查网络后重试',
          showCancel: false,
          title: ''
        })
          .then(() => {
            let pages = getCurrentPages() //获取加载的页面
            let currentPage = pages[pages.length - 1] //获取当前页面的对象
            let url = currentPage.route //当前页面url
            Login()
            if (url !== 'pages/Index/index/index') {
              wx.switchTab({
                url: '/pages/Index/index/index',
              })
            }
          });
        reject()
      },
    }
    // _tmp.data.app_token = getApp().globalData.app_token;
    if (!_tmp.header['content-type']) {
      _tmp.header['content-type'] = (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') ? 'application/x-www-form-urlencoded' : 'application/json'
    }
    wx.request(_tmp)
  })
}

export function _GET_(url, params, loadingVisible = true) {
  return Network({
    url: url,
    method: 'GET',
    data: params,
    loadingVisible
  })
}
export function _POST_(url, params, loadingVisible = true) {
  return Network({
    url: url,
    method: 'POST',
    data: params,
    loadingVisible
  })
}
export function _PUTJSON_(url, params, loadingVisible = true) {
  return Network({
    url: url,
    method: 'PUT',
    data: params,
    header: {
      'content-type': 'application/json'
    },
    loadingVisible
  })
}
export function _PUT_(url, params, loadingVisible = true) {
  return Network({
    url: url,
    method: 'PUT',
    data: params,
    loadingVisible
  })
}
export function _DELETE_(url, params, loadingVisible = true) {
  return Network({
    url: url,
    method: 'DELETE',
    data: params,
    loadingVisible
  })
}
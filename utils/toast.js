import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
const toastDefaultConfig = {
      success: {
            type: 'success',
            message: '操作成功',
            forbidClick: true,
            mask: false,
            duration: 1500
      },
      error: {
            type: 'fail',
            message: '请求失败',
            forbidClick: true,
            mask: false,
            duration: 2000
      },
      loading: {
            type: 'loading',
            message: '加载中',
            forbidClick: true,
            mask: false,
            duration: 0
      }
}

function _TOAST_(type, params) {
      let argmentsType = typeof params
      let config = toastDefaultConfig[type]
      if (argmentsType === 'string') {
            config.message = params
      }
      if (argmentsType === 'object' && params.d !== 'undefined') {
            config.duration = params.d
      }
      Toast(config)
}

export function LoadingToast(params) {
      _TOAST_('loading', params)
}

export function SuccessToast(params) {
      _TOAST_('success', params)
}

export function ErrorToast(params) {
      _TOAST_('error', params)
}
export function oToast(params) {
      if(typeof params === 'string'){
            params = {
                  title:params
            }
      }
      params.duration = 1200;
      params.mask = true;
      params.icon = 'none'
      wx.showToast(params)
}

export function Dialog(options) {
      return new Promise((resolved, rejected) => {
            wx.showModal({
                  title: options.title,
                  content: options.message,
                  //confirmColor: '#3DB61B',
                  showCancel: options.showCancelButton,
                  confirmColor: '#fe75a9',
                  cancelColor: '#999',
                  success(res) {
                        if (res.confirm) {
                              resolved()
                        } else {
                              rejected()
                        }
                  }
            })
      })
}
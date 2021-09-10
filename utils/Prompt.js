import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";
const toastDefaultConfig = {
  success: {
    type: "success",
    message: "操作成功",
    forbidClick: true,
    mask: false,
    duration: 1500,
  },
  error: {
    type: "fail",
    message: "请求失败",
    forbidClick: true,
    mask: false,
    duration: 2000,
  },
  loading: {
    type: "loading",
    message: "加载中",
    forbidClick: true,
    mask: false,
    duration: 0,
  },
};

const _TOAST_ = (type, params) => {
  const argmentsType = typeof params;
  const config = toastDefaultConfig[type];
  if (argmentsType === "string") {
    config.message = params;
  }
  if (argmentsType === "object" && params.d !== "undefined") {
    config.duration = params.d;
  }
  Toast(config);
};

const Loading = (params) => {
  _TOAST_("loading", params);
};

const Success = (params) => {
  _TOAST_("success", params);
};

const Error = (params) => {
  _TOAST_("error", params);
};
const Native = (params) => {
  if (typeof params === "string") {
    params = {
      title: params,
    };
  }
  params.duration = 1200;
  params.mask = true;
  params.icon = "none";
  wx.showToast(params);
};
const Clear = () => {
  wx.hideToast();
  Toast.clear();
};

export function Dialog(options) {
  return new Promise((resolved, rejected) => {
    wx.showModal({
      title: options.title,
      content: options.message,
      showCancel: options.showCancelButton,
      confirmColor: "#fe75a9",
      cancelColor: "#999",
      success(res) {
        if (res.confirm) {
          resolved();
        } else {
          rejected();
        }
      },
    });
  });
}

const Prompt = {
  native: Native,
  loading: Loading,
  success: Success,
  error: Error,
  clear: Clear,
  dialog: Dialog,
};

export default Prompt;

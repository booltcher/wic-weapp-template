import Prompt from "../utils/Prompt";
import Login from "./login";

const App = getApp();

const FailureLoginList = ["U_006", "U_007", "U_008"];

class Network {
  constructor(url, method, header, data, useLoading, useError) {
    this.url = App.globalData.REQUEST_BASE_URL + url;
    this.methos = method;
    this.header = header;
    this.data = data;
    this.useLoading = useLoading;
    this.useError = useError;
    this.isLoginReq = data && data.isloginReq;
    this.timeout = App.globalData.REQUEST_TIMEOUT;
  }

  send() {
    if (this.useLoading) {
      Prompt.loading();
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.url,
        data: this.data,
        method: this.method,
        header: {},
        success: (res) => {
          if (res.data.code === "200") {
            this.successHandler(res, resolve);
          } else {
            this.errorHandler(res, reject);
          }
        },
        fail: (err) => {
          this.errorHandler(err, reject);
        },
      });
    });
  }

  successHandler(res, callback) {
    this.setToken(res);
    this.isloginReq ? callback(res) : callback(res.data);
  }

  errorHandler(res, callback) {
    // network error
    if (res.statusCode !== 200) {
      Prompt.dialog({
        message: "请求超时，请检查网络后重试",
        showCancel: false,
        title: "",
      }).then(() => {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let url = currentPage.route;
        Login();
        if (url !== "pages/Index/index") {
          wx.switchTab({
            url: "/pages/Index/index",
          });
        }
      });
      return
    }

    // tolen expired
    if (FailureLoginList.includes(res.data.code)) {
      this.reconnect();
      return;
    }

    // other error
    if (this.data && this.data.useError) {
      Prompt.clear();
      Prompt.error(res.data.msg);
      return;
    }

    callback();
  }

  setToken(res) {
    if (res.header.Authorization) {
      getApp().globalData.token = res.header.Authorization;
    }
  }

  reconnect() {
    Login();
    // wx.switchTab({
    //   url: "/pages/Index/index/index",
    // });
  }
}

export const HttpGet = (url, data, useLoading = true, useError = true) =>
  new Network(url, "GET", null, data, useLoading, useError).send();

export const HttpPost = (url, data, useLoading = true, useError = true) =>
  new Network(url, "POST", null, data, useLoading, useError).send();

export const HttpPut = (url, data, useLoading = true, useError = true) =>
  new Network(url, "PUT", null, data, useLoading, useError).send();

export const HttpDelete = (url, data, useLoading = true, useError = true) =>
  new Network(url, "DELETE", null, data, useLoading, useError).send();

export const HttpPostJson = (url, data, useLoading = true, useError = true) =>
  new Network(
    url,
    "POST",
    { "content-type": "application/json" },
    data,
    useLoading,
    useError
  ).send();

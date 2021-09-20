import { createAddress, modifyAddress, bindMobile } from "../../services/api.js";
import SyncThemeFromGlobal from "../../utils/syncThemeFromGlobal.js";
import Prompt from "../../utils/prompt";
import FormValidator from "../../utils/formValidator";
import manualLocate from "../../utils/manualLocate";
const app = getApp();

Page({
  data: {
    THEME_COLOR: null,
    info: {
      name: "",
      mobile: "",
      addressName: "地理位置",
      details: "",
      defaultFlag: true,
      latitude: "",
      longitude: "",
    },
    formRules: [
      { prop: "name", validator: "required", msg: "请输入联系人姓名" },
      { prop: "mobile", validator: "required", msg: "请输入联系电话" },
      {
        prop: "mobile",
        validator: "regexp:mobile",
        msg: "请输入正确的联系电话",
      },
      {
        prop: "addressName",
        validator: (value) => {
          return value && value !== "回收地点";
        },
        msg: "请选择地理位置",
      },
      { prop: "details", validator: "required", msg: "请输入详细地址" },
    ],
  },
  async onLoad(options) {
    SyncThemeFromGlobal(this)
    this.setData({
      bindMobileFlag: app.globalData.userInfo.bindMobileFlag,
    });
    if (!options.item) return;
    let info = JSON.parse(decodeURIComponent(options.item));
    info.defaultFlag = info.defaultFlag === 1;
    this.setData({
      info,
    });
  },

  onShow() {},

  async submit() {
    const formData = {
      ...this.data.info,
      defaultFlag: formData.defaultFlag ? 1 : 0,
    };

    FormValidator(this.data.info, this.data.formRules)
      .then(async () => {
        Prompt.loading();
        try {
          let res = this.data.info.id
            ? await modifyAddress(formData)
            : await createAddress(formData);
          if (res.code === "200") {
            Prompt.success("保存成功");
            setTimeout(function () {
              wx.navigateBack();
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  onNameChange(e) {
    this.setData({
      "info.name": e.detail,
    });
  },

  onMobileChange(e) {
    this.setData({
      "info.mobile": e.detail,
    });
  },

  async manualLocate() {
    const res = await manualLocate();
    if (res) {
      this.setData({
        "info.addressName": res.addressName,
        "info.latitude": res.latitude,
        "info.longitude": res.longitude,
      });
    }
  },

  getBindedMobile() {
    this.setData({
      "info.mobile": app.globalData.userInfo.mobile,
    });
  },

  getPhoneNumber(e) {
    if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
      Prompt.error("绑定失败");
    } else if (e.detail.errMsg === "getPhoneNumber:ok") {
      this.bindMobile(e.detail);
    }
  },

  async bindMobile(params) {
    try {
      let res = await bindMobile({
        encryptedData: params.encryptedData,
        iv: params.iv,
      });
      if (res.code === "200") {
        Prompt.success("已绑定");
        this.setData({
          bindMobileFlag: 1,
        });
        app.globalData.userInfo.mobile = res.data;
      }
    } catch (error) {
        console.log(error);
    }
  },

  onDetailsChange(e) {
    this.setData({
      "info.details": e.detail,
    });
  },

  onDefaultChange(e) {
    this.setData({
      "info.defaultFlag": e.detail,
    });
  },
});

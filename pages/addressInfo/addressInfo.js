// import { getExample } from "../../services/api.js";
// import Prompt from "../../utils/Prompt";
// import FormValidator from "../../utils/FormValidator";
// import manualChooseLocation from "../../../utils/manualChooseLocation";
// import { deepClone } from "../../../utils/util";
// const app = getApp();

// Page({
//   data: {
//     info: {
//       name: "",
//       mobile: "",
//       addressName: "回收地点",
//       details: "",
//       defaultFlag: true,
//       latitude: "",
//       longitude: "",
//     },
//     formRules: [
//       { prop: "name", validator: "required", msg: "请输入联系人姓名" },
//       { prop: "mobile", validator: "required", msg: "请输入联系电话" },
//       {
//         prop: "mobile",
//         validator: "regexp:mobile",
//         msg: "请输入正确的联系电话",
//       },
//       {
//         prop: "addressName",
//         validator: (value) => {
//           return value && value !== "回收地点";
//         },
//         msg: "请选择回收地点",
//       },
//       { prop: "details", validator: "required", msg: "请输入详细地址" },
//     ],
//   },
//   async onLoad(options) {
//     this.setData({
//       bindMobileFlag: app.globalData.userInfo.bindMobileFlag,
//     });
//     if (!options.item) return;
//     let info = JSON.parse(decodeURIComponent(options.item));
//     info.defaultFlag = info.defaultFlag === 1;
//     this.setData({
//       info,
//     });
//   },

//   onShow() {},

//   async submit() {
//     let formData = deepClone(this.data.info);
//     formData.defaultFlag = formData.defaultFlag ? 1 : 0;

//     FormValidator(this.data.info, this.data.formRules)
//       .then(async (res) => {
//         LoadingToast();
//         try {
//           let res = this.data.info.id
//             ? await services.modifyAddress(formData)
//             : await services.createAddress(formData);
//           if (res.code === "200") {
//             SuccessToast("保存成功");
//             setTimeout(function () {
//               wx.navigateBack();
//             }, 1500);
//           }
//         } catch (error) {}
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },

//   //收货人
//   onNameChange(e) {
//     this.setData({
//       "info.name": e.detail,
//     });
//   },

//   //联系电话
//   onMobileChange(e) {
//     this.setData({
//       "info.mobile": e.detail,
//     });
//   },

//   // 手动选择位置
//   async manualLocate() {
//     let res = await manualChooseLocation();
//     console.log(res);
//     if (res) {
//       this.setData({
//         "info.addressName": res.addressName,
//         "info.latitude": res.latitude,
//         "info.longitude": res.longitude,
//       });
//     }
//   },

//   getBindedMobile() {
//     this.setData({
//       "info.mobile": app.globalData.userInfo.mobile,
//     });
//   },

//   getPhoneNumber(e) {
//     if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
//       ErrorToast("绑定失败");
//     } else if (e.detail.errMsg === "getPhoneNumber:ok") {
//       this.bindMobile(e.detail);
//     }
//   },

//   async bindMobile(params) {
//     try {
//       let res = await services.bindMobile({
//         encryptedData: params.encryptedData,
//         iv: params.iv,
//       });
//       if (res.code === "200") {
//         SuccessToast("已绑定");
//         this.setData({
//           bindMobileFlag: 1,
//         });
//         app.globalData.userInfo.mobile = res.data;
//       }
//     } catch (error) {}
//   },

//   //详细地址
//   onDetailsChange(e) {
//     this.setData({
//       "info.details": e.detail,
//     });
//   },

//   //默认
//   onDefaultChange(e) {
//     this.setData({
//       "info.defaultFlag": e.detail,
//     });
//   },
// });

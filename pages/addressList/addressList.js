import { getAddressList, createAddress } from "../../services/api.js";
import Prompt from "../../utils/prompt";

Page({
  data: {
    addressList: [
      {
        addressName: "禧悦轩茶馆",
        defaultFlag: 1,
        details: "2714",
        id: "1",
        latitude: "34.3404",
        longitude: "108.94162",
        mobile: "15675444444",
        name: "王大锤",
      },
      {
        addressName: "禧悦轩茶馆",
        defaultFlag: 0,
        details: "2714",
        id: "2",
        latitude: "34.3404",
        longitude: "108.94162",
        mobile: "15675444444",
        name: "王大锤",
      }
    ],
  },
  async onLoad() {},

  onShow() {
    // this.getAddressList(true);
  },

  async getAddressList(useLoading) {
    try {
      let res = await getAddressList(null, useLoading);
      if (res.code === "200") {
        this.setData({
          addressList: res.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  navAddAddress() {
    wx.navigateTo({
      url: "/pages/addressInfo/addressInfo",
    });
  },

  getWxAddress() {
    wx.chooseAddress({
      success: async (res) => {
        const response = await createAddress({
          name: res.userName,
          mobile: res.telNumber,
          addressName: `${res.provinceName} ${res.cityName} ${res.countyName}`,
          details: res.detailInfo,
          defaultFlag: 0,
        });
        if (response.code === "200") {
          Prompt.success("添加成功");
          this.getAddressList(false);
        }
      },
    });
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.getAddressList(true);
  },
});

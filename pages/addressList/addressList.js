import {
  getAddressList,
  deleteAddress,
  modifyAddress,
  createAddress,
} from "../../services/api.js";
import Prompt from "../../utils/Prompt";

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

  delInquiry(e) {
    let item = e.currentTarget.dataset.item;
    Prompt.dialog({
      message: "确认要删除该地址吗？",
      showCancelButton: true,
      title: "",
    }).then(() => {
      this.deleteAddress(item.id);
    });
  },

  async deleteAddress(id) {
    try {
      let res = await deleteAddress(id);
      if (res.code === "200") {
        Prompt.success("删除成功");
        this.getAddressList(false);
      }
    } catch (err) {
      console.log(err);
    }
  },

  navAddAddress() {
    wx.navigateTo({
      url: "/pages/User/addressInfo/addressInfo",
    });
  },

  navEditAddress(e) {
    let item = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item));
    wx.navigateTo({
      url: `/pages/User/addressInfo/addressInfo?item=${item}`,
    });
  },

  async setDefault(e) {
    let item = e.currentTarget.dataset.item;
    item.defaultFlag = 1;
    try {
      let res = await modifyAddress(item);
      if (res.code === "200") {
        Prompt.success("设置成功");
        this.getAddressList(false);
      }
    } catch (error) {
      console.log(error);
    }
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

import { getAddressList } from "../../../services/api.js";
import SyncThemeFromGlobal from "../../../utils/SyncThemeFromGlobal.js";
Component({
  properties: {
    visible: {
      type: Boolean,
      default: true,
    },
    showActive: {
      type: Boolean,
      default: true,
    },
  },

  data: {
    THEME_COLOR: null,
    activeAddress: null,
    list: [
      {
        addressName: "禧悦轩茶馆",
        defaultFlag: 1,
        details: "2714",
        id: "1",
        latitude: "34.3404",
        longitude: "108.94162",
        mobile: "15675444444",
        name: "王大锤",
      },{
        addressName: "黄龙岛桂花超市南门",
        defaultFlag: 0,
        details: "2714",
        id: "2",
        latitude: "34.3404",
        longitude: "108.94162",
        mobile: "15675444444",
        name: "王二",
      },{
        addressName: "黄龙岛桂花超市南门",
        defaultFlag: 0,
        details: "2714",
        id: "3",
        latitude: "34.3404",
        longitude: "108.94162",
        mobile: "15675444444",
        name: "王二",
      },
    ],
  },

  lifetimes:{
    created(){
      SyncThemeFromGlobal(this)
    }
  },

  methods: {
    onSelectorClose() {
      this.triggerEvent("close");
    },

    navCreateAddress() {
      this.triggerEvent("close");
      wx.navigateTo({
        url: "/pages/addressInfo/addressInfo",
      });
    },

    async getAddressList() {
      try {
        const res = await getAddressList(null, false);
        if (res.code === "200") {
          const defaultValue = res.data.find((item) => item.defaultFlag === 1);
          if (defaultValue) {
            this.triggerEvent("update", defaultValue);
          }
          this.setData({
            list: res.data,
            activeAddress: defaultValue,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleAddressChange(e) {
      this.setData({
        activeAddress: e.detail
      })
      this.triggerEvent("change", e.detail);
    },
  },

  pageLifetimes: {
    show: function () {
      this.getAddressList();
    },
  },
});

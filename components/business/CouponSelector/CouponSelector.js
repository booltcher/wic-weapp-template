import { getAddressList } from "../../../services/api.js";
import { SyncThemeFromGlobal } from "../../../lib/enhance";
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
    activeCoupon: null,
    list: [
      {
        cid: '1',
        color: 'green',
        name: '开学季满减优惠券',
        conditions: 100,
        amount: '10',
        type: 1,
        expireBegin: 1632209865211,
        expireDays: 2,
        expireEnd: 1632409865211,
        disabled: false
      },
      {
        cid: '2',
        color: 'red',
        name: '开学季满减优惠券',
        conditions: 100,
        amount: '10',
        type: 1,
        expireBegin: 1632209865211,
        expireDays: 2,
        expireEnd: 1632409865211,
        disabled: false
      },
      {
        cid: '4',
        color: 'red',
        name: '开学季满减优惠券',
        conditions: 100,
        amount: '10',
        type: 1,
        expireBegin: 1632209865211,
        expireDays: 2,
        expireEnd: 1632409865211,
        disabled: true
      },
      {
        cid: '3',
        color: 'blue',
        name: '开学季满减优惠券',
        conditions: 100,
        amount: '10',
        type: 1,
        expireBegin: 1632209865211,
        expireDays: 2,
        expireEnd: 1632409865211,
        disabled: false
      }
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

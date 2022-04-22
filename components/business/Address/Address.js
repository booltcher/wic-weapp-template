import { behavior as computedBehavior } from "miniprogram-computed";
import { Prompt, SyncThemeFromGlobal } from "../../../lib/enhance";
import { deleteAddress, modifyAddress } from "../../../services/api.js";

Component({
  behaviors: [computedBehavior],
  properties: {
    mode: {
      type: String,
      value: "card", // card, list
    },
    cid: String,
    name: String,
    mobile: Number,
    defaultFlag: Number,
    addressName: String,
    details: String,
    latitude: Number,
    longitude: Number,
    active: {
      type: Boolean,
      value: false,
    },
    hideActions: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    THEME_COLOR: null,
    activeAddress: null,
    info: null,
  },

  lifetimes: {
    created() {
      SyncThemeFromGlobal(this);
    },
  },

  computed: {
    info(data) {
      return {
        id: data.cid,
        name: data.name,
        mobile: data.mobile,
        defaultFlag: data.defaultFlag,
        addressName: data.addressName,
        details: data.details,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    },
  },

  methods: {
    emitChangeEvent() {
      this.triggerEvent("change", this.data.info);
    },

    async setDefault() {
      const cellInfo = {
        ...this.data.info,
        defaultFlag: 1,
      };
      try {
        let res = await modifyAddress(cellInfo);
        if (res.code === "200") {
          Prompt.success("设置成功");
          this.triggerEvent("fetch", this.data.id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    delInquiry() {
      Prompt.dialog({
        message: "确认要删除该地址吗？",
        showCancelButton: true,
        title: "",
      })
        .then(() => {
          this.deleteAddress();
        })
        .catch((err) => console.info(err));
    },

    async deleteAddress() {
      try {
        let res = await deleteAddress(this.data.id);
        if (res.code === "200") {
          Prompt.success("删除成功");
          this.triggerEvent("fetch", this.data.id);
        }
      } catch (err) {
        console.log(err);
      }
    },

    navEditAddress() {
      const item = encodeURIComponent(JSON.stringify(this.data.info));
      wx.navigateTo({
        url: `/pages/addressInfo/addressInfo?item=${item}`,
      });
    },
  },
});

import { behavior as computedBehavior } from "miniprogram-computed";
const colorMap = {
  green: "#3db61b",
  blue: "#3f68f6",
  red: "#ff5859",
};
Component({
  behaviors: [computedBehavior],
  properties: {
    cid: String,
    color: String,
    name: String,
    conditions: Number,
    amount: String,
    type: Number,
    expireBegin: Number,
    expireDays: Number,
    expireEnd: Number,
    expireType: Number,
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  data: {},

  computed: {
    bgUrl(data) {
      const bucketPath =
        "http://qzqgxn9wl.hb-bkt.clouddn.com/wic-weapp-template/image/coupon@";
      if (data.disabled) {
        return bucketPath + "gray" + ".png";
      } else {
        return bucketPath + data.color + ".png";
      }
    },

    textColor(data) {
      if (data.disabled) {
        return "#aaa";
      } else {
        return colorMap[data.color];
      }
    },
  },

  methods: {
    emitClickEvent() {
      console.log(this.data);
      this.triggerEvent("click", {
        id: this.data.coupounId,
      });
    },
  },
});

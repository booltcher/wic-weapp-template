import { behavior as computedBehavior } from "miniprogram-computed";
const PRESETS = [
  "chart",
  "access",
  "order",
  "record",
  "location",
  "server",
  "search",
  "network",
  "building",
  "product",
  "message",
  "welfare",
];

Component({
  behaviors: [computedBehavior],
  properties: {
    image: String,
    des: String,
    visible: Boolean,
  },
  computed: {
    imageUrl(data) {
      if (PRESETS.indexOf(data.image) !== -1) {
        return (
          "http://qzqgxn9wl.hb-bkt.clouddn.com/wic-weapp-template/image/empty@" +
          data.image +
          ".png"
        );
      }
      return data.image;
    },
  },
});

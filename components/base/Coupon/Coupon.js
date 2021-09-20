Component({
  properties: {
    image: String,
    des: String,
    visible: Boolean
  },

  data: {
    presets: ["error", "network", "search"],
    extendPresets: ["address", "message", "order"],
    imageParse: "error",
  },

  methods: {},

  lifetimes: {
    attached() {
      console.log('hidden', !this.data.visible);
      const image = this.data.image;
      if (this.data.extendPresets.includes(image)) {
        this.setData({
          imageParse: `/static/images/wic-empty-${image}.png`,
        });
      } else {
        this.setData({
          imageParse: image,
        });
      }
    },
  },
});

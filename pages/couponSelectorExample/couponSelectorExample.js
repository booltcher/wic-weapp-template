//Just for exmple
Page({
  data: {
    selectorVisible: false,
  },

  //Events handler
  showSelector() {
    this.setData({
      selectorVisible: true,
    });
  },

  hideSelector() {
    this.setData({
      selectorVisible: false,
    });
  },

  handleSelectorChange(e) {
    const { addressName, details, name, mobile, longitude, latitude } =
      e.detail;
    this.setData({
      selectorVisible: false,
      addressForm: "app",
      "formData.addressName": addressName,
      "formData.details": details,
      "formData.name": name,
      "formData.mobile": mobile,
      "formData.longitude": longitude,
      "formData.latitude": latitude,
    });
  },

  handleSelectorUpdate(e) {
    console.log("update", e);
  },
});

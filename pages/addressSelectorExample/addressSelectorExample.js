//Just for exmple
Page({
  data: {
    addressPickerVisible: false,
  },

  //Events handler
  showAddressPicker() {
    this.setData({
      addressPickerVisible: true,
    });
  },

  hideAddressPicker() {
    this.setData({
      addressPickerVisible: false,
    });
  },

  handleAddressPickerChange(e) {
    const { addressName, details, name, mobile, longitude, latitude } =
      e.detail;
    this.setData({
      addressPickerVisible: false,
      addressForm: "app",
      "formData.addressName": addressName,
      "formData.details": details,
      "formData.name": name,
      "formData.mobile": mobile,
      "formData.longitude": longitude,
      "formData.latitude": latitude,
    });
  },

  handleAddressPickerUpdate(e) {
    console.log('update', e);
  },
});

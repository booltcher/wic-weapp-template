import { getExample } from "../../services/api.js";
import Prompt from "../../utils/Prompt.js";
const App = getApp();
Page({
  data: {
    kits: [
      "Network",
      "Paging",
      "Iconfont",
      "Form Validator",
      "Address-picker",
      "Coupon",
      "Product-card",
    ],
    modules: [
      "Address",
      "Order",
      "Message",
      "Search",
      "Wallet",
      "Feedback",
      "Category",
      "Product",
      "Evaluate",
    ],
  },

  async onLoad() {
    this.testApi();
  },

  async testApi() {
    // try {
    //   const res = await getExample({
    //     id: 1,
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(getExample);
    //   console.log(App.globalData.REQUEST_BASE_URL);
    //   Prompt.error("Something Wrong");
    // }
  },
});

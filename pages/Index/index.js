import { getExample } from "../../services/api.js";
import Prompt from "../../utils/prompt";
const App = getApp();
Page({
  data: {
    kits: [
      "Network Request",
      "Paging List",
      "Icon Font",
      "Form Validator",
      "Address Selector",
      "Product Card",
      "Nav Bar",
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
      "Coupon",
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

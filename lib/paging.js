import services from "../services/api.js";
import prompt from "./prompt";

class Paging {
  constructor({ context, pagingName, requestApi, size, params }) {
    this.context = context;
    this.pagingName = pagingName;
    this.requestApi = requestApi;
    this.size = size;
    this.current = 1;
    this.canLoadMore = true;
    this.params = params;
    this.list = [];
  }

  async get(params) {
    if (params) {
      this.params = params;
    }
    if (!this.canLoadMore) {
      return;
    }
    await this.query(false, params);
  }

  async init(params) {
    if (params) {
      this.params = params;
    }
    this.current = 1;
    this.canLoadMore = true;
    await this.query(true, params);
  }

  async query(isInitial = false, payload) {
    prompt.loading();
    try {
      const params = payload || this.params;
      const res = await services[this.requestApi]({
        current: this.current,
        size: this.size,
        ...params,
      });
      if (res.code === "200") {
        this.canLoadMore = res.data.current * res.data.size < res.data.total;
        (this.current =
          res.data.current * res.data.size < res.data.total
            ? res.data.current + 1
            : res.data.current),
          (this.list = isInitial
            ? res.data.records
            : this.list.concat(res.data.records));
        this.context.setData({
          canLoadMore: this.canLoadMore,
          current: this.current,
          list: this.list,
        });
        return this;
      }
    } catch (err) {
      console.log(err);
    } finally {
      prompt.clear();
    }
  }
}
export default Paging;

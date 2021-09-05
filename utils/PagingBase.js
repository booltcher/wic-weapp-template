
import services from "../services/api.js"
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
import {
    SuccessToast,
    ErrorToast,
    oToast,
    Dialog, LoadingToast
} from "./toast.js";
class Paging {
    constructor({ context, pagingName, requestApi, size, params }) {
        this.context = context
        this.pagingName = pagingName
        this.requestApi = requestApi;
        this.size = size;
        this.current = 1;
        this.canLoadMore = true;
        this.params = params;
        this.list = []
    }

    async get(params) {
        if(params){
            this.params = params
        }
        if(!this.canLoadMore){
            // console.log('已加载全部')
            return
        }
        await this.query(false, params)
    }

    async init(params) {
        if(params){
            this.params = params
        }
        this.current = 1
        this.canLoadMore = true
        await this.query(true, params)
    }

    async query(isInitial=false, payload){
        LoadingToast()
        try {
            const params = payload || this.params
            const res = await services[this.requestApi]({
                current: this.current,
                size: this.size,
                ...params
            })
            if (res.code === '200') {
                this.canLoadMore = res.data.current * res.data.size < res.data.total
                this.current = res.data.current * res.data.size < res.data.total ? res.data.current + 1 : res.data.current,
                this.list = isInitial ? res.data.records : this.list.concat(res.data.records)
                this.context.setData({
                    canLoadMore: this.canLoadMore,
                    current: this.current,
                    list: this.list,
                })
                return this
            }
        } catch (err) {
            console.log(err)
        } finally{
            Toast.clear()
            wx.hideToast()
        }
    }
}
export default Paging
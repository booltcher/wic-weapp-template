import {
      _GET_,
      _POST_,
      _PUT_,
      _DELETE_,
      _PUTJSON_
} from "./network.js";

const services = {
      login: (data, loadingVisible) => _POST_('/client/user/login', data, loadingVisible), //系统登录
      getBannerList: (data, loadingVisible) => _GET_('/client/carousel/list', data, loadingVisible), //查询轮播图
      modifyUserInfo: (data, loadingVisible) => _POST_('/client/user/update', data, loadingVisible), //修改资料

      bindMobile: (data, loadingVisible) => _POST_('/client/user/mobile/bind', data, loadingVisible), //绑定微信手机号

      searchByImg: (data, loadingVisible) => _POST_('/client/search/img', data, loadingVisible), //根据图片查询垃圾分类
      searchByText: (data, loadingVisible) => _GET_('/client/search/name', data, loadingVisible), //根据文字查询垃圾分类

      getAddressList: (data, loadingVisible) => _GET_('/client/address/list', data, loadingVisible), //查询所有收货地址
      createAddress: (data, loadingVisible) => _PUT_('/client/address/create', data, loadingVisible),//新增收货地址
      deleteAddress: (id, loadingVisible) => _DELETE_(`/client/address/delete/${id}`, loadingVisible),//删除收货地址
      modifyAddress: (data, loadingVisible) => _POST_(`/client/address/update`, data, loadingVisible),//修改收货地址

      getSiteList: (data, loadingVisible) => _GET_(`/client/merchant/page`, data, loadingVisible),//分页查询回收商家

      getCategoryList: (data, loadingVisible) => _GET_(`/client/product/category/list`, data, loadingVisible),//查询商品分类
      getGoodList: (data, loadingVisible) => _GET_(`/client/product/page`, data, loadingVisible),//分页查询商品

      cancelOrder: (data, loadingVisible) => _POST_(`/client/order/cancel`, data, loadingVisible),//取消订单
      createOrder: (data, loadingVisible) => _PUTJSON_(`/client/order/create`, data, loadingVisible),//小程序下单

      getOrderInfo: (orderId, loadingVisible) => _GET_(`/client/order/get/${orderId}`, loadingVisible),//查询订单详情
      getDynamicOrderInfo: (data, loadingVisible) => _GET_(`/client/order/list`, data, loadingVisible),//订单滚动信息
      getOrderList: (data, loadingVisible) => _GET_(`/client/order/page`, data, loadingVisible),//分页查询订单

      sendFeedback: (data, loadingVisible) => _PUT_(`/client/feedback/create`, data, loadingVisible),//创建反馈
      getFeedbackRecord: (data, loadingVisible) => _GET_(`/client/feedback/page`, data, loadingVisible),//查询反馈记录
      getFeedbackInfo: (id, loadingVisible) => _GET_(`/client/feedback/get/${id}`, loadingVisible),//查询反馈详情

      evaluate: (data, loadingVisible) => _PUT_(`/client/appraise/create`, data, loadingVisible),//发布评价
      uploadFile: (data, loadingVisible) => _POST_(`/client/file/upload`, data, loadingVisible),//上传文件

      getArticle: (data, loadingVisible) => _GET_(`/client/article/page`, data, loadingVisible),//查询文章
      getArticleInfo: (id, loadingVisible) => _GET_(`/client/article/get/${id}`, loadingVisible),//查询文章详情

      getCollecterNearby: (loadingVisible) => _GET_(`/client/order/recyclers/available`, loadingVisible),//在线的回收员列表
}
export default services
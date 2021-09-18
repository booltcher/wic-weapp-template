// import services from "../../../services/api.js";
// import {
//     SuccessToast,
//     ErrorToast,
//     oToast,
//     Dialog
// } from "../../../utils/toast.js";
// Page({
//     data: {
//         info: {

//         },
//         orderId: null,
//         userLocationAuth: true,
//         mapMarkers: null,
//         mapInitial: false,
//         boardCollapsed: true,
//     },
//     onLoad: function (options) {
//         const orderId = options.id
//         this.setData({
//             orderId
//         })
//         // this.setData({
//         //     orderId: '1426497379278336002'
//         // })
//         this.initInfo()
//         wx.showShareMenu({
//             withShareTicket: true,
//             menus: ['shareAppMessage', 'shareTimeline']
//         })
//     },
//     onShow: function () {
//         this.initLocation()
//         this.initInfo()
//     },

//     async initInfo() {
//         try {
//             const res = await services.getOrderInfo(this.data.orderId)
//             if (res.code === '200') {
//                 const mapMarkers = [{
//                     title: '回收地点',
//                     latitude: res.data.latitude,
//                     longitude: res.data.longitude,
//                     iconPath: '../../../static/images/icon-tab-index-active.jpg',
//                     width: 30,
//                     height: 30,
//                     callout: {
//                         content: '回收地点',
//                         fontSize: 20,
//                         color: '#fff',
//                         bgColor: '#fe75a9'
//                     },
//                 }]
//                 this.setData({
//                     info: res.data,
//                     mapMarkers,
//                     mapInitial: true
//                 })
//             }
//         } catch (error) {

//         }
//     },

//     async initLocation() {
//         wx.getLocation().then(async res => {
//             this.setData({
//                 userLocationAuth: true,
//                 userLatitude: res.latitude,
//                 userLongitude: res.longitude
//             })
//             let addrInfo = await getAddressName({
//                 latitude: res.latitude,
//                 longitude: res.longitude
//             })
//             if (addrInfo.message === 'query ok') {
//                 this.setData({
//                     'formData.addressName': addrInfo.result.formatted_addresses.recommend
//                 })
//             }
//         }).catch(err => {
//             if (err.errMsg === 'getLocation:fail auth deny') {
//                 this.setData({
//                     userLocationAuth: false
//                 })
//             }
//         })
//     },

//     collapseInfoBoard() {
//         this.setData({
//             boardCollapsed: !this.data.boardCollapsed
//         })
//     },

//     handleCancel() {
//         let id = this.data.info.id
//         Dialog({
//                 message: '确认要取消该订单吗？',
//                 showCancelButton: true,
//                 title: ''
//             })
//             .then(() => {
//                 this.cancelRequest(id)
//             });
//     },

//     async cancelRequest(id) {
//         // 取消订单
//         try {
//             const res = await services.cancelOrder({
//                 orderId: id,
//                 reason: '用户手动取消'
//             })
//             if (res) {
//                 console.log(res)
//                 await PagingInstance.init({
//                     orderStatus: this.data.activeTabKey
//                 })
//                 listComponent.setDividerText()
//             }
//         } catch (error) {

//         }
//     },

//     handleEvaluate(e) {
//         let id = this.data.info.id
//         wx.navigateTo({
//             url: `/pages/User/evaluateForm/evaluateForm?id=${id}`,
//         })
//     },
// })
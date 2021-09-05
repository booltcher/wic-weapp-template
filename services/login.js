import {
      LoadingToast,
      SuccessToast,
      ErrorToast
} from "../utils/toast";
import Dialog from '../miniprogram_npm/@vant/weapp/dialog/dialog';
import services from './api';
const app = getApp()

//微信登陆
function wxLogin() {
      return new Promise((resolve, reject) => {
            wx.login({
                  success: res => {
                        resolve(res)
                  },
                  fail: err => {
                        reject(err)
                  }
            })
      })
}

//微信权限
function wxSetting() {
      return new Promise((resolve, reject) => {
            wx.getSetting({
                  success: res => {
                        console.log('wx setting success');
                        if (res.authSetting['scope.userInfo']) {
                              resolve(res)
                        }
                  },
                  fail: err => {
                        reject(err)
                  }
            })
      })
}

//微信获取用户信息
function wxUserInfo() {
      return new Promise((resolve, reject) => {
            wx.getUserInfo({
                  success: res => {
                        console.log('wx user info success');
                        resolve(res)
                  },
                  fail: err => {
                        Dialog.alert({
                              confirmButtonColor: '#67C23A',
                              title: '提示',
                              message: '获取微信用户信息失败，请开启授权',
                              confirmButtonOpenType: 'openSetting'
                        });
                  }
            })
      })
}

async function Login() {
      let loginRes = await wxLogin();
      //let settingRes = await wxSetting();
      let infoRes = await wxUserInfo();
      // console.log(infoRes);
      if (loginRes && infoRes) {
            let params = {
                  code: loginRes.code,
                  avatarUrl: infoRes.userInfo.avatarUrl,
                  nickname: infoRes.userInfo.nickName,
                  loginRequest: true
            }
            return await systemLogin(params)
      }

}

async function systemLogin(params){
      try {
            let systemLoginRes = await services.login(params)
            if (systemLoginRes) {
                  if (systemLoginRes.header.Authorization) {
                    app.globalData.token = systemLoginRes.header.Authorization
                  }
                  app.globalData.userInfo = systemLoginRes.data.data
                }
            return systemLoginRes.data.data
      } catch (err) {
            console.log(err)
      }
}

export default Login
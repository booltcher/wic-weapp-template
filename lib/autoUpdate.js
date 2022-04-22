import { Dialog } from "./Prompt";
const versionMonitor = () => {
  //更新新版本
  // 获取小程序更新机制兼容
  console.log("canUndate", wx.canIUse("getUpdateManager"));
  if (wx.canIUse("getUpdateManager")) {
    const updateManager = wx.getUpdateManager();
    //1. 检查小程序是否有新版本发布
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("hasUpdate", res);
      if (res.hasUpdate) {
        Dialog({
          message: "检测到新版本，请下载新版本并重启小程序",
          showCancel: false,
          title: "更新提示",
        }).then(() => {
          versionUpdater();
        });
      }
    });
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示

    Dialog({
      message: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      showCancel: false,
      title: "提示",
    }).then(() => {});
  }
};

const versionUpdater = (updateManager) => {
  wx.showLoading();
  //静默下载更新小程序新版本
  updateManager.onUpdateReady(function () {
    wx.hideLoading();
    //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    updateManager.applyUpdate();
  });
  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
    Dialog({
      message: "新版本已经上线啦，请您删除当前小程序，并重新搜索打开。",
      showCancel: false,
      title: "提示",
    }).then(() => {});
  });
};

export { versionMonitor, versionUpdater };

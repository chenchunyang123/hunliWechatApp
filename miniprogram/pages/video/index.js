// pages/video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passWord: '',
    ifPass: false,
    videoUrl: '',
  },

  // 监听输入事件
  onInput(e) {
    this.setData({
      passWord: e.detail?.value
    })
  },

  // 点击确认按钮触发
  onHandleButton() {
    wx.showLoading({
      title: '翻找中...'
    });
    const { passWord } = this.data;
    // 检查密码并查找对应url
    wx.cloud.callFunction({
      name: 'getVideo',
    }).then(data => {
      const { result } = data; //{passWord, videoUrl}
      const filterArr = result.filter(item => item.passWord === passWord) || [];
      if (filterArr.length) {
        wx.hideLoading();
        const { videoUrl } = filterArr[0];
        this.setData({
          ifPass: true,
          videoUrl: videoUrl,
        })
      } else {
        wx.showToast({
          title: '亲，密码错误了，再试试吧~',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const videoContext = wx.createVideoContext('myVideo');
    videoContext.requestFullScreen();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'Wedding Invitation🤵👰',
      imageUrl: 'cloud://ccy-fim80.6363-ccy-fim80-1302878065/weddingPhotos/D55A5960-1.jpg'
    }
  }
})
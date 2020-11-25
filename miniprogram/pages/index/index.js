// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoVisible: false,
  },

  toWishPage() {
    wx.navigateTo({
      url: '../wish/index',
    })
  },

  toVideoPage() {
    wx.navigateTo({
      url: '../video/index',
    });
    // 进入视频播放页面暂停
    this.innerAudioContext.pause();
  },

  goToTheDestination(){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.508709,//要去的纬度-地址
          longitude: 105.572892,//要去的经度-地址
          name: "筵语尚宴·福宴厅",
          address: '四川省遂宁市船山区和平西路49号附近'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getSettings'
    }).then(data => {
      const { result } = data;
      const { videoVisible } = result;
      this.setData({
        videoVisible,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // 页面渲染完成后，播放音乐

    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = true
    this.innerAudioContext.src = 'http://sr.sycdn.kuwo.cn/59adff9fa8059dd6901947f6c64bbd82/5fbe7f5a/resource/n1/46/13/1246809444.mp3'
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
  },





  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.innerAudioContext.play();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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
  },
  onShareTimeline(){
    return {
      title: 'Wedding Invitation🤵👰',
      imageUrl: 'cloud://ccy-fim80.6363-ccy-fim80-1302878065/weddingPhotos/D55A5960-1.jpg'
    }
  }
})
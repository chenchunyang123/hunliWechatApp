// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoVisible: false,
    src: '',
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

  goToTheDestination() {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: 30.508709, //要去的纬度-地址
          longitude: 105.572892, //要去的经度-地址
          name: "筵语尚宴宴会厅",
          address: '四川省遂宁市船山区和平西路69号翰林名苑(北区)双发广场1号楼二层2号楼'
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
      const {
        result
      } = data;
      console.log(result)
      const {
        videoVisible
      } = result;
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
    this.innerAudioContext.src = 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_92279059&response=res&type=convert_url&'
    this.innerAudioContext.play();
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
  onShareAppMessage: function (options) {

    return {
      title: '婚礼祝福',
      path: '/pages/index/index',
      complete: function () {
        console.log('finish')
      }
    }
  }
})
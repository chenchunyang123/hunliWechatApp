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
    })
  },

  goToTheDestination(){
    console.log('xiett');
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.508709,//要去的纬度-地址
          longitude: 105.572892,//要去的经度-地址
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
      const { result } = data;
      console.log(result)
      const { videoVisible } = result;
      this.setData({
        videoVisible,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onShareAppMessage: function (res) {
    return {
      title: '婚礼祝福',
      path: '/pages/index/index'
    }
  }
})
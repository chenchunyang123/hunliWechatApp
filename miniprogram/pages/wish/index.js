let doommList = []; // 弹幕项
let visibleLoveList = []; // 储存显示的点赞爱心个数项
let nowGiftList = [];  // 储存当前显示的礼物
let page = undefined;
let i = 0; //用做弹幕唯一的wx:key
let love_i = 0; // 用作爱心点赞唯一的key
let touchStartTime = 0;   // 检测双击屏幕出爱心的变量
let toggleLikeTimeStamp = 0;    // 检测用户是否快速切换点赞状态的变量
let toggleLikeTimer = null; // 检测用户是否快速切换点赞状态的定时器

const blessWords = [
  '祝你们永结同心，百年好合！新婚愉快，甜甜蜜蜜！',
  '横看新郎与新娘，温情喜色尽相同。露出幸福真面目，只缘身在祝福中。祝你们新婚快乐、永远幸福！',
  '缘分的牵引，让两个人生的轨迹交错，编织出炫耀夺目爱的花纹！衷心的祝福你们：相互珍惜，同心永结！',
  '永不退色的是相互的关心，是无穷无尽深深的爱！爱情也因这一刻的融合而更温馨更美好！祝你们白头偕老！',
  '用彼此的深情画出一道美丽的彩虹，架起爱情的桥梁，不分你我，共尝甘苦，融入彼此的生命，敬祝你们百年好合，永结同心！',
  '恭喜你们步入爱的殿堂。祝百年好合！',
  '相亲相爱幸福永，同德同心幸福长。愿你俩情比海深！',
  '佳偶双双已天成，金玉良缘喜结盟。祝：钟爱一生。',
  '愿你们携手百年，家庭幸福。',
  '于茫茫人海中找到她，分明是千年前的一段缘，祝你俩幸福美满，共谐连理。',
  '真诚地祝你们新婚快乐，白头偕老，此生幸福平安!',
  '愿你俩恩恩爱爱，意笃情深，此生爱情永恒，爱心与日俱增!',
  '缘分的牵引，让两个人生的轨迹交错，编织出炫耀夺目爱的花纹!衷心的祝福你们：相互珍惜，同心永结!',
  '愿你俩恩恩爱爱，意笃情深，此生爱情永恒，爱心与日俱增!',
  '在你们大喜的日子里，送上一份祝福：张灯结彩新婚际，鸿雁双飞齐比翼，花年共结连理枝，丽日莲开并蒂时。来年喜笑得贵子，夫妻恩爱百年期。',
  '礼炮一响，喜事登场，鲜花掌声，八方涌来，祝福贺喜，铺天盖地，新郎新娘，情定三生，交杯互饮，白头到老，一份心意，信息遥寄，新婚快乐，永结同心。',
  '愿爱洋溢在你甜蜜的生活中，让以后的每一个日子，都象今日这般辉煌喜悦!',
  '愿你俩用爱去缠着对方，彼此互相体谅和关怀，共同分享今后的苦与乐。敬祝百年好合永结同心。',
  '欢庆此日成佳偶，且喜今朝结良缘',
  '今天，百花为你们芬芳，小鸟为你们歌唱，幸福展开甜蜜的翅膀，快乐在阳光中放声歌唱，相爱的恋人走进结婚的殿堂，愿你们携手奔快乐，幸福万年长。'
]

const blessColors = ['white', 'red', 'orange', 'lightblue', 'pink'];

const giftList = [
  {type: 0, name: '飞机', url: 'https://img.zcool.cn/community/01de115a94cca6a801219231e700bc.png@2o.png'},
  {type: 1, name: '棒棒糖', url: 'https://img.zcool.cn/community/0113695a94cca4a8012045b378e744.png@2o.png'},
  {type: 2, name: '气球', url: 'https://img.zcool.cn/community/0170495a94cca4a801219231be2010.png@1280w_1l_2o_100sh.png'},
  {type: 3, name: '金元宝', url: 'https://img.zcool.cn/community/01a3325a94cca5a80121923150f17c.png@1280w_1l_2o_100sh.png'},
]   // 礼物编号和地址

Page({

  onLoad() {
    page = this;
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      wx.hideLoading();
    }, 2000);
    // 获取云数据库的内容
    // 相册
    wx.cloud.callFunction({
      name: 'getWeddingPhotos',
    }).then(data => {
      const { result } = data;
      this.setData({
        // imgList: result,
        renderImgList: [result[result.length - 1], result[0], result[1]],
      })
    })
    // 总点赞数
    wx.cloud.callFunction({
      name: 'getAllLikeTimes',
    }).then(data => {
      const { result } = data;
      this.setData({
        likeTimes: result.likeTimes,
      })
    })
    // 获取设置
    wx.cloud.callFunction({
      name: 'getSettings',
    }).then(data => {
      const { result } = data;
      const { blessColors, blessWords, giftList, giftVisible } = result;
      this.setData({
        blessColors,
        blessWords,
        giftList,
        giftVisible
      })
    })
  },

  data: {
    // blessWords: blessWords,   // 祝福语句库
    imgList: [],
    renderImgList: [],
    current: 1,
    // like: false,  // 当前用户是否点赞
    likeTimes: 0, // 总点赞次数
    // barrageList: [],
    modalName: null,
    // gift: -1, // 当前选中的礼物索引
    loveList: [],
    // giftVisible: false, // 礼物是否展示
    // giftNowUrl: '',
    // giftList: giftList,
  },

  swiperChange(e) {
    const current = e.detail?.current;
    const { imgList } = this.data;
    this.setData({
      current: current,
      renderImgList: imgList.slice(current - 1, current + 1),
      // renderImgList: imgList.slice(current, current + 3),
    })
  },

  doubleClick(e) {
    if (e.timeStamp - touchStartTime < 300) {
      const { x, y } = e.detail;
      visibleLoveList.push(new OneLove(y, x));
      const newLikeTimes = this.data.likeTimes + 1;
      this.setData({
        loveList: visibleLoveList,
        likeTimes: newLikeTimes,
      })
      wx.cloud.callFunction({
        name: 'updateLikeTimes',
      })
    }
    touchStartTime = e.timeStamp;
  },

  toggleLike(e) {
    console.log(e)
    if(e.timeStamp - toggleLikeTimeStamp < 1000) {
      clearTimeout(toggleLikeTimer);
    }
    let likeTimes = this.data.likeTimes;
      visibleLoveList.push(new OneLove(Math.random()*400 + 100, Math.random()*300));
      likeTimes++;
    this.setData({
      loveList: visibleLoveList,
      likeTimes: likeTimes,
    })
    toggleLikeTimeStamp = e.timeStamp;
      wx.cloud.callFunction({
        name: 'updateLikeTimes',
      }).then(data => {
      })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})

class OneLove {
  constructor(top, left) {
    this.top = top - 38;
    this.left = left - 38;
    this.rotate = Math.random()*90 - 45;
    this.id = love_i++;
    this.timer = setTimeout(() => {
      visibleLoveList.splice(visibleLoveList.indexOf(this), 1); //动画完成，从列表中移除这项
      page.setData({
        loveList: visibleLoveList
      })
      clearTimeout(this.timer);
    }, 1000) //定时器动画完成后执行。
  }
}
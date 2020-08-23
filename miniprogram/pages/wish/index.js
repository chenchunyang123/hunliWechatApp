let doommList = []; // 弹幕项
let visibleLoveList = []; // 储存显示的点赞爱心个数项
let nowGiftList = [];  // 储存当前显示的礼物
let page = undefined;
let i = 0; //用做弹幕唯一的wx:key
let love_i = 0; // 用作爱心点赞唯一的key
let touchStartTime = 0;
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
  },

  data: {
    imgList: [{
        url: 'https://wedding-1257961174.cos.ap-chengdu.myqcloud.com/221597493852_.pic_hd.jpg'
      },
      {
        url: 'https://wedding-1257961174.cos.ap-chengdu.myqcloud.com/281597493858_.pic_hd.jpg'
      },
      {
        url: 'https://wedding-1257961174.cos.ap-chengdu.myqcloud.com/321597493863_.pic_hd.jpg'
      }
    ],
    like: false,
    likeTimes: 22,
    barrageList: [],
    modalName: null,
    gift: -1, // 当前选中的礼物索引
    loveList: [],
    giftVisible: false, // 礼物是否展示
    giftNowUrl: '',
    giftList: giftList,
  },

  doubleClick(e) {
    if (e.timeStamp - touchStartTime < 300) {
      const { x, y } = e.detail;
      visibleLoveList.push(new OneLove(y, x));
      let newLikeTimes = this.data.like ? this.data.likeTimes : ++this.data.likeTimes;
      this.setData({
        loveList: visibleLoveList,
        likeTimes: newLikeTimes,
        like: true,
      })
    }
    touchStartTime = e.timeStamp;
  },

  toggleLike() {
    let likeTimes = this.data.likeTimes;
    if (!this.data.like) {
      visibleLoveList.push(new OneLove(Math.random()*400 + 100, Math.random()*300));
      likeTimes++;
    } else {
      likeTimes--;
    }
    this.setData({
      like: !this.data.like,
      loveList: visibleLoveList,
      likeTimes: likeTimes,
    })
  },

  sendWish() {
    doommList.push(new OneBarrage(
      blessWords[Math.ceil(Math.random() * (blessWords.length - 1))], 
      Math.ceil(Math.random() * 100),
      16,
      blessColors[Math.ceil(Math.random() * (blessColors.length - 1))]
    ))
    this.setData({
      barrageList: doommList
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

  chooseGift(e) {
    this.setData({
      gift: e.currentTarget.dataset.idx
    })
  },

  sendGift() {
    if (this.data.gift === -1) { // 还没有选择礼物
      wx.showToast({
        title: '选择礼物再发送吧~',
        icon: 'none'
      })
      return;
    }
    if (this.data.giftVisible) {  // 动画还没消失就返回
      wx.showToast({
        title: '休息一下吧~',
        icon: 'none'
      })
      return;
    }
    new OneGift();
    this.setData({
      modalName: null,
      giftVisible: true,
      giftNowUrl: giftList.find(v => v.type === this.data.gift).url
    })
  }
})

// 主要用来做定时器的
class OneGift {
  constructor() {
    this.timer = setTimeout(() => {
      page.setData({
        giftVisible: false,
      })
      clearTimeout(this.timer);
    }, 4000)
  }
}

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

class OneBarrage {
  constructor(text = '新婚快乐', top, time = 16, color = 'red') {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.id = i++;
    this.timer = setTimeout(() => {
      doommList.splice(doommList.indexOf(this), 1); //动画完成，从列表中移除这项
      page.setData({
        barrageList: doommList
      })
      clearTimeout(this.timer);
    }, this.time * 1000) //定时器动画完成后执行。
  }
}
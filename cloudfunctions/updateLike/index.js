// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { like } = event;
  const db = cloud.database()
  const _ = db.command
  // 下面分为点赞和取消点赞两个逻辑
  db.collection('all').doc('8a6c3bf65f422cba0021b9787df8dd1a').update({
    data: {
      likeUserIds: like ? _.addToSet(wxContext.OPENID) : _.pull(wxContext.OPENID),
    }
  })

  return {
    openid: wxContext.OPENID,
  }
}
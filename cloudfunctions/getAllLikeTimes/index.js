// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 从数据库拿点赞相关数据
  const db = cloud.database()
  const allCol = db.collection('all')
  const result = await allCol.get();
  // 判断当前用户的id是否在数据库的点赞用户列表里面
  const nowUserOpenId = wxContext.OPENID;

  return {
    likeTimes: result.data[0].likeUserIds.length,
    ifLike: result.data[0].likeUserIds.some(item => item === nowUserOpenId)
  };
}
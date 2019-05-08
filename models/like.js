import {
  HTTP
} from '../utils/http.js'

class LikeModel extends HTTP {
  /**
   * 喜欢/取消喜欢的接口
   * @param [artId] - 喜欢具体东西的主键
   * @param [category] - 100-电影；200-音乐；300-句子
   */
  like(behavior, artId, category) {
    let url = behavior === 'like'?'like':'like/cancel'
    this.request({
      url: url,
      method: "POST",
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  /**
   * 获取某个期刊当前的喜欢状态
   */
  getClassicLikeStatus(artId, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artId + '/favor',
      success: sCallback
    })
  }
}

export { LikeModel }
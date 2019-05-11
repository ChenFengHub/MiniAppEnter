import {HTTP} from '../utils/http-p.js'
class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10

  /**
   * 利用缓存原理，获取缓存中的搜索历史
   */
  getHistory() {
    let words = wx.getStorageSync(this.key)
    if (!words) {
      words = []
    }
    return words
  }

  getHot() {
      return this.request({
          url:'/book/hot_keyword'
      })
  }

  /**
   * 将搜索关键字放入历史列表，存储缓存中。设置最大列表存储长度
   */
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 超过长度，则将末尾元素删除。words 相当于一个队列
      if (words.length > this.maxLength) {
        words.pop()
      }
    } else {
      const index = words.indexOf(keyword)
      words.splice(index, 1)
    }
    words.unshift(keyword)
    wx.setStorageSync(this.key, words)
  }
}

export { KeywordModel }

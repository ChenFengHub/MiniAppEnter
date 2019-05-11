import { HTTP } from '../utils/http-p.js'

class BookModel extends HTTP {
  /**
   * 获取热门书籍的列表
   */
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  /**
   * 搜索书籍方法
   */
  search(q, start) {
    return this.request({
      url: 'book/search',
      data: {
        q,
        start,
        count: 20, // 每页条数，默认：20
        summary: 0 // 0-完整内容（默认）；1-简介
      }
    })
  }

  /**
   * 获取我拥有的书的数目
   */
  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }

  /**
   * 获取书籍的详情
   */
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  /**
   * 获取书籍喜欢的状态
   */
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  /**
   * 获取书籍的评论
   * @param {*} bid
   */
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  /**
   * 表表评论
   */
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export { BookModel }

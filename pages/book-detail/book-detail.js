import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    detail.then(res=>{
      this.setData({
        book: res
      })
    })
    comments.then(res=>{
      console.log('comments', res.comments)
      this.setData({
        comments: res.comments
      })
    })
    likeStatus.then(res=>{
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
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
  onShareAppMessage: function () {

  },

  onLike(event) {
    const likeOrCancel = event.detail.behavior
    likeModel.like(likeOrCancel, this.data.book.id, 400)
    // 更新已有书籍点赞数
    // this.setData({
    //   likeCount: likeOrCancel === 'like' ?this.data.likeCount + 1: this.data.likeCount - 1
    // })
  },

  onFakePost(event) {
    this.setData({
      posting: !this.data.posting
    })
  },

  onCancel(event) {
    this.setData({
      posting: !this.data.posting
    })
  },

  onPost(event) {
    // 点击标签获取的数据
    const comment = event.detail.text || event.detail.value

    // comfirm 事件获取的数据。两者只会一个有值
    //const commetInput = event.detail.value

    if(!comment) {
      return
    }
    if(comment.length > 12) {
      wx.showToast({
        title: '短评最多 12 个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment).then(res=>{
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })

      if(!this.data.comments) {
        this.data.comments = []
      }
      this.data.comments.unshift({
        content:comment,
        nums:1
      })

      this.setData({
        posting: !this.data.posting,
        comments: this.data.comments
      })
    })
  }

})

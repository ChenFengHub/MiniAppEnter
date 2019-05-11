// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'
import {
  random
} from '../../utils/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const hotList = bookModel.getHotList()  // 第 1 次调用接口
    hotList
      .then(res => {
        this.setData({
          books : res
        })
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 关闭搜索框
   */
  onCancel(event) {
    this.setData({
      searching : false
    })
  },

  /**
   * 打开搜索框
   */
  onOpen(event) {
    this.setData({
      searching : true
    })
  },

  /**
   * 页面拉到最后触发的事件，用于分页加载
   */
  onReachBottom() {
    this.setData({
      more:random(16)
    })
  }
})

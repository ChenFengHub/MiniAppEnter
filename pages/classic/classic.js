// pages/test/test.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    lastest: true,
    first: false,
    likeCount: 0,  // classic.fav_nums
    likeStatus: false // classic.like_status
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest((res) => {
      // this._getLikeStatus(res.id, res.type)   // 数据已经存在了，没必要再次调用这个取
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 喜欢点击事件
   */
  onLike: function(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  /**
   * 上一首
   */
  onPrevious() {
    this._updateClassic('previous')
  },

  /**
   * 下一首点击
   */
  onNext() {
    this._updateClassic('next')
  },

  _updateClassic: function(nextOrPre) {
    classicModel.getClassic(this.data.classic.index, nextOrPre, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        lastest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus:function(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status 
      })
    })
  }
})
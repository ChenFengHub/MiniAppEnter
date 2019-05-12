import { BookModel } from '../../models/book'
import { ClassicModel } from '../../models/classic'

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    authorized: false,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
  },

  /**
   * 获取我喜欢书的数量
   */
  getMyBookCount() {
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount: res.count
      })
    },
    error=>{
      this.setData({
        bookCount: 0
      })
    })
  },

  /**
   * 获取最喜欢的书籍列表
   */
  getMyFavor() {
    classicModel.getMyFavor(res=>{
      this.setData({
        classics: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMyBookCount()
    this.getMyFavor()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * 判断用户是否授权
   */
  userAuthorized() {
    wx.getSetting({
      success: result => {
        if (result.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            authorized: false,
            userInfo: {}
          })
        }
      },
      fail: () => {},
      complete: () => {}
    })
  },

  /**
   * 获取用户信息
   */
  onGetUserInfo(event) {
    console.log('onGetUserInfo', event)
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  /**
   * 跳转到关于我们的页面
   */
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  /**
   * 跳转到详情页
   */
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  /**
   * 喜欢学习详情点击
   */
  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  }
})

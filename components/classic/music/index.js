import {
  classicBeh
} from '../classic-beh.js'

// 创建音乐播放器对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      observer: function(newVal, oldVal, changedPaht) {
        this._recoverStatus()
      }
    },
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png'
  },

  attached:function(){
    // 给音乐播放器的总控开关设置监听事件
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      // 图片切换
      this.setData({
        playing: !this.data.playing
      })
      if (this.data.playing) {
        mMgr.src = this.properties.src
        // title 不能为空，否则报错
        mMgr.title = this.properties.title
      } else {
        mMgr.pause()
      }
    },

    // 恢复状态判断当前页面的初始化显示哪个状态
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
      } else {
        if (mMgr.src === this.properties.src) {
          this.setData({
            playing: true
          })
        }
      }
    },

    // 定义音乐总控开关操作事件的回到函数
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
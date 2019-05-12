import { paginationBev } from '../behavior/pagination.js'
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: Boolean,
    more: {
      type: String,
      value: '',
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keywordsHistory: [],
    hotKeywords: [],
    searching: false,
    bookName: '',
    loadingCenter: false
  },

  attached() {
    let keywordsHistory = keywordModel.getHistory()
    this.setData({
      keywordsHistory
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotKeywords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(newVal, oldVal, changedPath) {
      this._loadMore(newVal)
    },
    _loadMore(event) {
      if (!this.data.bookName) {
        // 初始会触发此，此时不应该加载
        return
      }
      if (this.isLocked()) {
        // 正在加载，已经上锁，直接结束
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.data.bookName, this.getCurrentStart()).then(
          res => {
            this.setMoreData(res.books)
            this.unLocked()
          },
          error => {
            this.unLocked()
          }
        )
      }
    },

    onClose(event) {
      this.initialize()
      this.triggerEvent('on-cancel')
    },
    onClear(event) {
      this.initialize()
      this._closeSearching()
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.text

      this._showSearching()
      this.initialize()
      this._showLoadingCenter()
      bookModel.search(q, 0).then(
        res => {
          this.setTotal(res.total)
          this.setMoreData(res.books)
          this.setData({
            bookName: q
          })
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        },
        error => {
          this._hideLoadingCenter()
        }
      )
    },
    // 显示搜索页面，隐藏历史、热销
    _showSearching() {
      this.setData({
        searching: true
      })
    },
    _closeSearching() {
      this.setData({
        searching: false,
        bookName: ''
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})

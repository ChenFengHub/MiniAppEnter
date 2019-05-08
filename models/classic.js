import {
  HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {

  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: (res) => {
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
        sCallback(res)
      }
    })
  }

  getClassic(index, nextOrPre, sCallback) {
    let key = nextOrPre === 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (classic) {
      sCallback(classic)
    } else {
      this.request({
        url: `classic/${index}/${nextOrPre}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    return index === this._getLatestIndex() ? true : false
  }

  _getKey(index) {
    return 'classic-' + index
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

}

export {
  ClassicModel
}
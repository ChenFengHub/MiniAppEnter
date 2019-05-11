const paginationBev = Behavior({
  data: {
    total: 0,
    dataArray: [],
    noneResult: false,
    loading: false
  },

  methods: {
    getCurrentStart() {
      return this.data.dataArray.length
    },

    setMoreData(arr) {
      const tmpArr = this.data.dataArray.concat(arr)
      this.setData({
        dataArray: tmpArr
      })
    },

    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    setTotal(total) {
      this.setData({
        total: total
      })
      if (total > 0) {
        this.setData({
          noneResult: false
        })
      } else {
        this.setData({
          noneResult: true
        })
      }
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

    initialize() {
      this.setData({
        dataArray: [],
        total: 0,
        nodeResult: false
      })
    }
  }
})

export { paginationBev }

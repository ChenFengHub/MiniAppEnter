// components/classic/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      value: "9",
      observer(newVal, oldVal, changedPath) {
        this.setData({
          _index: newVal < 10 ? "0" + newVal : newVal
        })
        console.log('data:',this.data)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    year: 0,
    month: "",
    _index: "8"
  },

  attached: function() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
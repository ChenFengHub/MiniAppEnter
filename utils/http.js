import config from '../config.js'

const tips = {
  1: "抱歉，出现了一个错误",
  1005: "The appkey is useless，please go to the website www.7yue.pro to apply for the appkey",
  3000: "期刊不存在"
}

class HTTP {
  request(params) {
    if(!params.method) {
      params.method = "GET"
    }
    wx.request({
      "url": config.api_base_url + params.url,
      "method": params.method,
      "data": params.data,
      "header":{
        "content-type":"application/json",
        "appKey": config.appkey
      },
      "success":(res)=>{
        let code = res.statusCode.toString()
        if(code.startsWith("2")) {
          // 回调函数存在时，才执行回调
          params.success && params.success(res.data)
        } else {
          // 服务器调用异常，统一处理
          this._show_error(res.data.error_code)
        }

      },
      "fail":(err)=>{
        // api 调用失败，不会返回任何结果。在 api 对应服务不存在或者断网情况时发生。
        let code = 1
        this._show_error(code)
      }
    })
  }

  //  下划线开头的方法标识为私有方法。但是 ES6 并没有真正私有方法，仅供我们识别
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}

import { HTTP } from '../utils/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
              sCallback && sCallback(res)
              this._setLatestIndex(res.index)
            }
        })
    }

    getClassic(index, nextOrPrevious, sCallback){
      this.request({
        url:'classic/' + index + '/' + 'nextOrPrevious',
        success: (res) => {
          sCallback && sCallback(res)
        }
      })
    }

    isFirst(index){
      return index == 1 ? true : false 
    }

    isLatest(index){
      let latestIndex = this._getLatestIndex()
      return latestIndex==index ? true : false
    }
    // 存储缓存
    _setLatestIndex(index){
      wx.setStorageSync('latest', index)
    }
    // 读取缓存
    _getLatestIndex(){
      let index = wx.getStorageSync('latest')
      return index
    }

}

export { ClassicModel }
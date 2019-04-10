import {
    HTTP
} from '../utils/http.js'

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

    getClassic(index, nextOrPrevious, sCallback) {
        //缓存中寻找 or API写入倒缓存中
        //key 确定key
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback && sCallback(res)
                }
            })
        } else {
            sCallback(classic)
        }
    }

    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
            let latestIndex = this._getLatestIndex()
            return latestIndex == index ? true : false
        }
        // 存储缓存
    _setLatestIndex(index) {
            wx.setStorageSync('latest', index)
        }
        // 读取缓存
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
    _getKey(index) {
        let key = 'classic-' + index
        return key
    }
}

export {
    ClassicModel
}
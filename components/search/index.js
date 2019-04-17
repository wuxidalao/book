import { KeywordModel } from '../../models/keyword.js'

const keywordModel = new KeywordModel()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: []
    },

    attached() {
        //const historyWords = keywordModel.getHistory()
        //const hotWords = keywordModel.getHot()
        this.setData({
            historyWords: keywordModel.getHistory()
        })

        keywordModel.getHot().then(res => {
            this.setData({
                hotWords: res.hot
            })
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this.triggerEvent('cancel', {}, {})
        },
        onConfirm(event) {
            const words = event.detail.value
            keywordModel.addToHistory(words)
        }
    }
})
import {
    KeywordModel
} from '../../models/keyword.js'

import {
    BookModel
} from '../../models/book.js'

import {
    paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()

const bookModel = new BookModel()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false
    },

    attached() {
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
        loadMore() {
            if (!this.data.q) {
                return
            }
            if (this._isLocked()) {
                return
            }

            if (this.hasMore()) {
                this._locked()
                bookModel.search(this.getCurrentStart(), this.data.q)
                    .then(res => {
                        this.setMoreData(res.books)
                        this._unLocked()
                    })
            }
        },

        onCancel() {
            this.triggerEvent('cancel', {}, {})
        },

        onDelete(event) {
            this._colseResult()
        },

        onConfirm(event) {
            this._showResult()
            this.initialize()
            const q = event.detail.value || event.detail.text
            bookModel.search(0, q).then(res => {
                this.setMoreData(res.books)
                this.setTotal(res.total)
                this.setData({
                    q
                })
                keywordModel.addToHistory(q)
            })
        },

        _showResult() {
            this.setData({
                searching: true
            })
        },

        _colseResult() {
            this.setData({
                searching: false,
                q: ''
            })
        },

        _isLocked() {
            return this.data.loading ? ture : false
        },

        _locked() {
            this.data.loading = true
        },

        _unLocked() {
            this.data.loading = false
        }
        //scroll-view | Page onReachBottom

    }
})
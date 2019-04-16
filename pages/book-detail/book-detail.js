import {
    BookModel
} from '../../models/book.js'

import {
    LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        book: null,
        likeStatus: false,
        liekCout: 0,
        posting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const bid = options.bid
        const detail = bookModel.getDetail(bid)
        const comments = bookModel.getComments(bid)
        const likeStatus = bookModel.getLikeStatus(bid)

        detail.then(res => {
            this.setData({
                book: res
            })
            console.log(res)
        })

        comments.then(res => {
            this.setData({
                comments: res.comments
            })
            console.log(res)
        })

        likeStatus.then(res => {
            this.setData({
                likeStatus: res.like_status,
                likeCount: res.fav_nums
            })
            console.log(res)
        })
    },

    onLike(event) {
        const like_or_cancel = event.detail.behavior
        likeModel.like(like_or_cancel, this.data.book.id, 400)
    },

    onFakePost(event) {
        this.setData({
            posting: true
        })
    },

    onCancel(event) {
        this.setData({
            posting: false
        })
    },

    onPost(event) {
        const comment = event.detail.text

        if (comment.lenght > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }

        bookModel.postComment(this.data.book.id, comment)
            .then(res => {
                wx.showToast({
                    title: '+ 1',
                    icon: 'none'
                })

                this.data.comments.unshift({
                    comment: comment,
                    nums: 1
                })

                this.setData({
                    comments: this.data.comments
                })
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
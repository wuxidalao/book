import {
    BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const hotList = bookModel.getHotList()
        hotList.then(
                res => console.log(res)
            )
            // const promise = new Promise((resolve, reject) => {
            //     // pending fulfilled rejected
            //     //进行中 已成功 已失败
            //     //Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。
            //     //在回调中执行一些操作（例如异步），如果一切都正常，则调用 resolve，否则调用 reject。
            //     wx.getSystemInfo({
            //         success: (res) => {
            //             resolve(res)
            //         },
            //         fail: (error) => {
            //             reject(error)
            //         }
            //     })
            // })
            // promise.then((res) => {
            //     console.log(res)
            // }, (error) => {
            //     console.log(res)
            // })

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
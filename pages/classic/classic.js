import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let ClassicModelNew = new ClassicModel()
let LikeModelNew = new LikeModel()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        classic: null,
        first:false,
        latest:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      ClassicModelNew.getLatest((res) => {
            this.setData({
                classic: res
            })
            // console.log(this.data)
        })
    },

    onLike: function(event) {
        // console.log(event)
        let behavior = event.detail.behavior
      LikeModelNew.like(behavior, this.data.classic.id, this.data.classic.type)
    },

    onNext: function(event) {
      
    },
    
    onPrevious: function(event) {
      let index = this.data.classic.index
      ClassicModelNew.getPrevious(index, (res) => {
        // console.log(res)
        this.setData({
          classic:res,
          latest: ClassicModelNew.isLatest(res.index),
          first: ClassicModelNew.isFirst(res.index)
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
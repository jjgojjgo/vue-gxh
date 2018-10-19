<template>
  <div class="seller-show bg-lightblue">
    <scroll-view>
      <div slot="scroll-view-content">
        <swiper :imgs="imgs"></swiper>
        <div class="content ft-14">
          <div class="seller-info">
            <div class="avatar">
              <img :src="retailerInfo.avatar">
              <div class="name">
                <span class="col-white">{{retailerInfo.linkman}}</span>
                <span class="ft-12 col-gray">{{retailerInfo.province}}.{{retailerInfo.city}}</span>
              </div>
              <button class="contact-btn bg-red col-white">联系</button>
            </div>
            <div class="slogan">
              <span class="col-red1">卖家说：</span><span>{{retailerInfo.slogan}}</span>
            </div>
            <div class="label">
              <span class="col-red1">卖家标签：</span>
              <div class="label-item col-white ft-12" v-for="item in retailerInfo.tags" :key="item.id">{{item.title}}({{item.timelines}})</div>
            </div>
          </div>
          <div class="friends-list-wraper" v-if="friendsList.length > 0">
            <div class="title">{{friendsListCount}}位好友关注了TA</div>
            <div class="friends-list">
              <div class="friend" v-for="(item, index) in friendsList" :key="item.id" v-if="index < 5">
                <img :src="item.avatar">
                <span class="col-gray t-center">{{item.username}}</span>
              </div>
              <div class="friend friends-more t-center ft-16" v-if="friendsListCount > 5" @click="onFriendsMore">...</div>
            </div>
          </div>
          <div class="timelines">
            <div class="timeline" v-for="timeline in timelines" :key="timeline.id">
                <img :src="timeline.avatar">
                <div class="timeline-con">
                  <span class="username col-blue">{{timeline.username}}</span>
                  <div v-html="formatEmots(timeline.title)" class="title"></div>
                  <div class="photos">
                    <img :src="photo" v-if="timeline.photo.length>0" v-for="photo in timeline.photo.split(',')" :key="photo.id">
                  </div>
                  <div class="ope">
                    <span class="time">{{time(timeline.dateline * 1000)}}</span>
                    <span class="delete col-blue t-left">删除</span>
                    <div class="rating-like">
                      <span class="like al t-center">赞</span>
                      <span class="rating al t-center">评论</span>
                    </div>
                    <span class="icon t-right al al-pinglun"></span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <friends-more v-if="friendsMoreShow" :friendsList="friendsList" @setFriendsMoreShow="setFriendsMoreShow" :friendsMoreShow="friendsMoreShow"></friends-more>
  </div>
</template>

<script type="text/javascript">
import Swiper from '@/base/swiper/swiper'
import * as Config from '@/api/config'
import getRetailerInfo from '@/api/getRetailerInfo'
import getFriendsList from '@/api/getFriendsList'
import getTimelines from '@/api/getTimelines'
import time from '@/common/js/time'
import formatEmots from '@/common/js/formatEmots'
import {mapState, mapMutations} from 'vuex'
import FriendsMore from '@/base/friends-more/friends-more'
import ScrollView from '@/base/scroll-view/scroll-view'
// let pagestart = 0
// let limit = 5
export default {
  data () {
    return {
      friendsList: [],
      friendsListCount: null,
      friendsMoreShow: false,
      type: 'retailer',
      tagid: 0,
      pagestart: 0,
      limit: 10,
      timelines: [],
      time: time,
      formatEmots: formatEmots
    }
  },
  computed: {
    ...mapState(['userInfo', 'retailerInfo']),
    imgs () {
      if (this.retailerInfo.showphoto) {
        return this.retailerInfo.showphoto.split(',')
      } else {
        return []
      }
    }
  },
  created () {
    console.log(this.$route.query)
    let wid = this.$route.query.id
    this._getRetailerInfo(wid)
    this._getFriendsList(wid)
    this._getTimelines(wid)
  },
  methods: {
    ...mapMutations(['setRetailerInfo']),
    _getRetailerInfo (wid) {
      getRetailerInfo(wid).then(res => {
        console.log(res)
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          this.setRetailerInfo(data.data)
        }
      })
    },
    _getFriendsList (wid) {
      getFriendsList(wid).then(res => {
        console.log(res)
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          this.friendsListCount = data.count
          this.friendsList = data.data
        }
      })
    },
    _getTimelines (wid) {
      getTimelines(wid, this.type, this.tagid, this.pagestart, this.limit).then(res => {
        console.log(res)
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          if (this.pagestart === 0) {
            this.timelines = data.data
          } else {
            this.timelines.push(...data.data)
          }
        }
      })
    },
    onFriendsMore () {
      this.friendsMoreShow = true
      // pagestart++
      // getFriendsList(wid, pagestart, limit).then(res => {
      //   const data = res.data
      //   if (data.flag !== Config.ERR_NUM) {
      //     // this.friendsListCount = data.count
      //     this.friendsList.push(data.data)
      //   }
      // })
    },
    setFriendsMoreShow () {
      this.friendsMoreShow = false
    }
  },
  components: {
    Swiper,
    FriendsMore,
    ScrollView
  }
};
</script>

<style lang="stylus" scoped>
  .seller-show
    min-height: 100vh
    .content
      position: relative
      // padding-top: 1.333333rem
      .seller-info
        position: relative
        margin-top: -1.066667rem
        width: 100vw
        padding-bottom: 0.266667rem
        border-bottom: 1px solid #f2f2f2
        .avatar
          display: flex
          flex-direction: row
          align-items: flex-end
          padding: 0 0.266667rem
          box-sizing: border-box
          img
            flex: 0 0 2.133333rem
            width: 2.133333rem
            height: 2.133333rem
            border-radius: 50%
          .name
            display: flex
            flex-direction: column
            flex: 1
            height: 2.133333rem
            margin-left: 0.266667rem
            span
              flex: 1
              line-height: 1.066667rem
            span:nth-child(1)
              font-weight: 700
          button
            flex: 0 0 2.0rem
            border-radius: 0.533333rem
            padding: 0.133333rem 0
        .slogan
          padding: 0 0.266667rem
          box-sizing: border-box
          margin: 0.266667rem 0
        .label
          padding: 0 0.266667rem
          box-sizing: border-box
          display: flex
          flex-direction: row
          flex-wrap: wrap
          align-items: center
          .label-item
            margin-right: 0.266667rem
            padding: 0.133333rem 0.266667rem
            border-radius: 0.266667rem
          .label-item:nth-child(odd)
            background-color: #9bd1fd
          .label-item:nth-child(even)
            background-color: #fd9a9b
      .friends-list-wraper
        margin-top: 0.266667rem
        padding: 0 0.266667rem 0.266667rem
        box-sizing: border-box
        border-bottom: 0.013333rem solid #f2f2f2
        .title
          width: 100%
          margin-bottom: 0.266667rem
        .friends-list
          display: flex
          flex-direction: row
          .friend
            // display: flex
            // flex-direction: column
            width: 1.066667rem
            margin-right: 0.613333rem
            img
              // flex: 0 0 1.013333rem
              width: 100%
              height: 1.066667rem
              border-radius: 50%
              // margin-bottom: 0.133333rem
            span
              display: block
              width: 100%
              // flex: 0 0 1.013333rem
          .friend:last-child
            margin-right: 0
          .friends-more
            line-height: 1.066667rem
            font-weight: 700
      .timelines
        width: 100vw
        padding: 0.266667rem
        box-sizing: border-box
        .timeline
          display: flex
          flex-direction: row
          align-items: flex-start
          margin-bottom: 0.266667rem
          img
            flex: 0 0 0.933333rem
            width: 0.933333rem
            height: 0.933333rem
            margin-right: 0.266667rem
          .timeline-con
            display: flex
            flex: 0 0 8.266667rem
            flex-direction: column
            justify-content: flex-start
            .username
              width: 100%
              font-weight: bold
              margin-bottom: 0.133333rem
            .title
              width: 100%
              margin-bottom: 0.133333rem
            .photos
              width: 100%
              display: flex
              flex-direction: row
              flex-wrap: wrap
              justify-content: space-between
              img
                flex: 0 0 2.133333rem
                width: 2.4rem
                height: 2.4rem
                margin-right: 0 !important
                margin-bottom: 0.266667rem
                object-fit: cover
            .ope
              position: relative
              display: flex
              flex-direction: row
              align-items: center
              .delete
                margin: 0 0.266667rem
              .icon
                flex: 1
              .rating-like
                position: absolute
                right: 0.533333rem
                flex: 0 0 4.0rem
                display: flex
                flex-direction: row
                background-color: #4d5154
                padding: 0.133333rem 0
                border-radius: 0.133333rem
                color: #fff
                width: 4.0rem
                span
                  flex: 1
                .like
                  border-right: 1px solid #404547
                  box-sizing: border-box
                .like::after
                  content: '\e603'
                  font-size: 16px
                .rating::after
                  content: '\e83e'
</style>

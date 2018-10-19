<template>
  <div class="apply-seller">
    <div class="logo-wraper">
      <div class="logo bg-white">
        <img src="./logo.png">
      </div>
    </div>
    <div class="info-wraper ft-14">
      <form @submit="onSubmit" @reset="onReset">
        <div class="info name">
          <span>姓名</span>
          <span class="al"></span>
          <input type="text" v-model="name">
        </div>
        <div class="err-info ft-12 col-red" v-if="errInfoAboutName.length > 0"><span class="al al-jinggao"></span><span>{{errInfoAboutName}}</span></div>
        <div class="info telnum">
          <span>手机号</span>
          <span class="al"></span>
          <input type="number" v-model="telnum">
          <button type="button" class="col-white" v-if="showBtnForCode" @click="onCode">获取验证码</button>
          <button type="button" class="col-white" v-else>{{second}} 秒</button>
        </div>
        <div class="err-info ft-12 col-red" v-if="errInfoAboutTelnum.length > 0"><span class="al al-jinggao"></span><span>{{errInfoAboutTelnum}}</span></div>
        <div class="info code">
          <span>验证码</span>
          <span class="al"></span>
          <input type="number" v-model="code">
        </div>
        <div class="err-info ft-12 col-red" v-if="errInfoAboutCode.length > 0"><span class="al al-jinggao"></span><span>{{errInfoAboutCode}}</span></div>
        <div class="tips">
          <input type="checkbox" id="agree" v-model="agree">
          <!-- <el-radio v-model="agreeTips"></el-radio> -->
          <span @click="onAgree">同意卖家入驻协议</span>
        </div>
        <div class="btn t-center">
          <input class="submit col-white" type="submit" value="注册">
          <input class="reset col-white" type="reset" value="重置">
        </div>
      </form>
    </div>
    <transition>
      <div class="tips-content bg-lightblue t-center ft-16" v-if="tipsContentShow">
        <p>卖家协议！</p>
        <button @click="onClose">关闭</button>
      </div>
    </transition>
    <msg @resetmsgshow="onResetMsgShow" :message="message" :msgShow="msgShow" :msgTitle="msgTitle"></msg>
  </div>
</template>

<script type="text/javascript">
import * as Config from '@/api/config'
import getCode from '@/api/getCode'
import applySeller from '@/api/applySeller'
import Msg from '@/base/msg/msg'
let intervalId = null
export default {
  data () {
    return {
      tipsContentShow: false,
      showBtnForCode: true,
      second: 60,
      name: '',
      telnum: null,
      code: null,
      retCode: null,
      agree: false,
      errInfoAboutName: '',
      errInfoAboutTelnum: '',
      errInfoAboutCode: '',
      msgShow: false,
      message: '',
      msgTitle: ''
    }
  },
  components: {
    Msg
  },
  // watch: {
  //   telnum (newValue) {
  //     console.log(newValue)
  //   }
  // },
  methods: {
    onResetMsgShow () {
      this.msgShow = false
      this.message = ''
      this.msgTitle = ''
    },
    onAgree () {
      this.tipsContentShow = true
    },
    onClose () {
      this.tipsContentShow = false
    },
    onCode () {
      if (!this.telnum) {
        // this.$message({
        //   message: '必填项不能为空！',
        //   type: 'warning'
        // })
        // this.$vux.alert.show({
        //   title: '错误信息',
        //   content: '手机号不能为空！'
        // })
        // this.msgShow = true
        // this.message = '手机号不能为空！'
        this.errInfoAboutTelnum = '手机号不能为空！'
        return
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.telnum)) {
        // this.initErrInfo()
        this.errInfoAboutTelnum = '手机号格式不对！'
        return
      }
      if (this.errInfoAboutTelnum.length > 0) {
        this.errInfoAboutTelnum = ''
      }
      this.showBtnForCode = false
      intervalId = setInterval(() => {
        this.second--
        if (this.second === 0) {
          this.showBtnForCode = true
          this.second = 60
          clearInterval(intervalId)
        }
      }, 1000)
      this._getCode()
    },
    initErrInfo () {
      this.errInfoAboutName = ''
      this.errInfoAboutTelnum = ''
      this.errInfoAboutCode = ''
    },
    onSubmit (event) {
      console.log('in onSubmit')
      if (this.name === '') {
        // this.$message.error('姓名不能为空！')
        // let second = 5
        // let _this = this
        // _this.$vux.alert.show({
        //   title: '错误信息',
        //   content: `姓名不能为空！${second}秒后将自动关闭`,
        //   onShow () {
        //     console.log('in alert onshow')
        //     setInterval(() => {
        //       second--
        //       if (second === 0) {
        //         _this.$vux.alert.hide()
        //       }
        //     }, 1000)
        //   },
        //   onHide () {
        //     console.log('in alert onhide')
        //   }
        // })
        this.initErrInfo()
        this.errInfoAboutName = '姓名不能为空！'
        event.preventDefault()
      } else if (this.code === null) {
        // this.$message.error('验证码不能为空！')
        // this.$vux.alert.show({
        //   title: '错误信息',
        //   content: '验证码不能为空！'
        // })
        this.initErrInfo()
        this.errInfoAboutCode = '验证码不能为空！'
        event.preventDefault()
      } else if (this.code !== this.retCode) {
        // this.$message.error('验证码错误！')
        // this.$vux.alert.show({
        //   title: '错误信息',
        //   content: '验证码错误！'
        // })
        this.initErrInfo()
        this.errInfoAboutCode = '验证码错误！'
        event.preventDefault()
      } else if (!this.agree) {
        // this.$message.error('请同意卖家协议！')
        // this.$vux.alert.show({
        //   title: '错误信息',
        //   content: '未同意卖家协议！'
        // })
        // this.errAboutAgree = '请同意卖家协议！'
        this.initErrInfo()
        this.msgShow = true
        this.message = '请同意卖家协议！'
        this.msgTitle = '错误信息'
        event.preventDefault()
      } else {
        console.log('可以提交了！')
        event.preventDefault()
        this._applySeller()
      }
    },
    onReset () {
      this.name = ''
      this.telnum = null
      this.code = null
      this.agree = false
      this.errInfoAboutName = ''
      this.errInfoAboutTelnum = ''
      this.errInfoAboutCode = ''
    },
    _getCode () {
      getCode(this.telnum).then(res => {
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          this.retCode = data.data
        }
      })
    },
    _applySeller () {
      applySeller(this.code, this.telnum, this.name).then(res => {
        console.log(res)
        let intervalId = null
        let second = 5
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          let _this = this
          this.msgShow = true
          this.message = `${second}秒后将自动跳转至卖家中心！`
          this.msgTitle = '注册成功'
          this.isReadyJump = true
          intervalId = setInterval(() => {
            second--
            this.message = `${second}秒后将自动跳转至卖家中心！`
            if (second === 0) {
              this.msgShow = false
              this.message = ''
              this.isReadyJump = false
              clearInterval(intervalId)
              _this.$router.replace({
                path: '/sellerCenter'
              })
            }
          }, 1000)
          // let _this = this
          // _this.$message({
          //   message: '注册卖家成功，系统将自动跳转至卖家中心！',
          //   type: 'success',
          //   onClose () {
          //     _this.$router.replace({
          //       path: '/sellerCenter'
          //     })
          //   }
          // })
          // _this.$vux.alert.show({
          //   title: '恭喜',
          //   content: `注册卖家成功，系统将在${second}秒后自动跳转至卖家中心！`,
          //   onShow () {
          //     intervalId = setInterval(() => {
          //       second--
          //       if (second === 0) {
          //         _this.$vux.alert.hide()
          //       }
          //     }, 1000)
          //   },
          //   onHide () {
          //     if (intervalId !== null) {
          //       clearInterval(intervalId)
          //     }
          //     _this.$router.replace({
          //       path: '/sellerCenter'
          //     })
          //   }
          // })
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .logo-wraper
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    width: 100vw
    height: 3.466667rem
    background-color: #2e90eb
    .logo
      display: flex
      justify-content: center
      align-items: center
      width: 2.133333rem
      height: 2.133333rem
      border-radius: 50%
      img
        width: 1.066667rem
  .info-wraper
      padding: 0 0.266667rem
      box-sizing: border-box
      margin-top: 0.266667rem
      .info
        display: flex
        flex-direction: row
        align-items: center
        border: 1px solid #eee
        margin-bottom: 0.266667rem
        border-radius: 0.133333rem
        span:nth-child(1)
          flex: 0 0 60px
          text-align: center
        input
          flex: 1
          height: 1.066667rem
          line-height: 1.066667rem
          padding: 0.266667rem
          box-sizing: border-box
          border: none
        button
          width: 2.533333rem
          height: 1.066667rem
          padding: 0.2rem
          border: none
          border-radius: 0.133333rem
          background-color: #2e90eb
      .err-info
        display: flex
        flex-direction: row
        align-items: center
        height: 0.4rem
        // line-height: 0.4rem
        margin-bottom: 0.266667rem
        .al
          margin-right: 0.133333rem
          font-size: 18px
      .tips
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        margin-bottom: 0.266667rem
        input
          margin-right: 0.266667rem
      .btn
        input
          padding: 0 0.533333rem
          height: 1.066667rem
          font-size: 14px
          border: none
          border-radius: 0.133333rem
        .submit
          background-color: #2e90eb
        .reset
          background-color: #ccc
          color: #000
  .tips-content
    position: fixed
    left: 0
    top: 0
    width: 100vw
    height: 100vh
    button
      height: 1.066667rem
      padding: 0.2rem
      border: none
      border-radius: 0.133333rem
      background-color: #2e90eb
  .v-enter-active, .v-leave-active
    transition: all .5s linear
  .v-enter, .v-leave-to
    transform: translateY(100vh)
</style>

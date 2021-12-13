<template>
  <div>
    <div class='videoBox'>
            <video ref="video1" src="/video/brothers.mp4" @timeupdate="timeupdate" controls width='640px' height="363px">
<!--      <video ref="video1" src="/video/laugh.mp4" controls @timeupdate="timeupdate" width='480px' height="270px"-->
             poster='/img/logo.jpg'>设置标签宽度就可以，如果都设置控制条会掉
      </video>
    </div>
    <div class="btnBar">
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="muted">静音</button>
      <button @click="volumePlus">声音+</button>
      <button @click="volumeMinus">声音-</button>
      <button @click="requestFullScreen">最大化</button>
    </div>
    <div>视频时长：{{ videoTime }}秒</div>
    <div>当前播放时间：{{ currentPlayTime }}毫秒</div>
    <div>当前播放百分比：{{ playedPercent }}%</div>
  </div>
</template>
<script>
export default {
  name: 'videoComponent',
  props: {},
  data () {
    return {
      videoTime: 0,
      currentPlayTime: 0,
      playedPercent: 0,
      count:0
    }
  },
  mounted () {
    // 屏幕最大化操作不能裸奔运行，必须放在一个用户的操作上(事件)
    // 下面语句均无效  Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
    // this.requestFullScreen()
    // setTimeout((requestFullScreen)=>{
    //   this.requestFullScreen()
    // },1000)
  },
  beforeDestroy () {

  },
  methods: {
    /**播放*/
    play () {
      let countThis = this.count + 1
      this.count = this.count + 1
      setTimeout(()=>{
        console.log(`按了${this.count}次，countThis:${countThis},if判断前,还未触发`)

        if(countThis >= this.count){
        console.log(`触发了，按了${this.count}次，countThis:${countThis}`)
        this.count = 0
      }
      },1000)
    },

    /**暂停*/
    pause () {
      this.$refs.video1.pause()
    },

    /**是否静音*/
    muted () {
      let video = this.$refs.video1
      video.muted = !video.muted
    },

    /**声音+*/
    /** 0~1的值，超过范围会出错。这里是小数计算会有偏差，0.9+0.1可能会大于1，所以
     方法1：需要预先判断加0.1<1才赋值
     */
    volumePlus () {
      let video = this.$refs.video1
      if (video.volume + 0.1 < 1) {
        video.volume += 0.1
      } else {
        video.volume = 1
      }
    },

    /**声音- */
    volumeMinus () {
      let video = this.$refs.video1
      /* 0~1的值,方法2：try catch,catch后面e一定要写，否则会报错，做try里面的，出错的话做catch里面的，也可以用finish*/
      try {
        video.volume -= 0.1
      } catch (e) {
        video.volume = 0
      }
    },

    //timeupdate视频播放时间位置变化事件，播放的时候会不断地激活
    timeupdate () {
      let video = this.$refs.video1
      this.videoTime = video.duration // video.duration视频总长，单位为秒
      // console.log(video)

      // video.currentTime视频当前放到的时间位置，单位为秒
      this.currentPlayTime = Math.round(video.currentTime * 1000)
      this.playedPercent = Math.round(video.currentTime / video.duration * 100)
    },

    /**全屏 */
    requestFullScreen () {
      // 屏幕最大化操作不能裸奔运行，必须放在一个用户的操作上(事件)
      let video = this.$refs.video1
      if (video.requestFullscreen) {
        video.requestFullscreen() //w3c
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen() //兼容chrome
      } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen() //兼容火狐
      }

    },
  }
}
</script>
<style scoped lang="scss">
.videoBox {
  // width: 960px;
  // height: 544px;
}
</style>

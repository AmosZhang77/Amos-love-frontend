<template>
  <div class="p">
    <div class="c">

    </div>
  </div>
</template>
<style>
.p{
  position: relative;
  background-color: #ccc;
  height: 900px;
}
.c{
  position: absolute;
  height: 300px;
  width: 400px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  background-color: red;
}
</style>
<script>
export default {
  name: 'center1',
  props: {},
  data () {
    return {
      videoTime: 0,
      currentPlayTime: 0,
      playedPercent: 0
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
    play () {
      // let list = ['红','绿','黄']
      // let count = 0
      // let index = 0
      // setInterval(()=>{
      //   console.log(count,index,list[index])
      //
      //   if(count>3){
      //     count = 0
      //     if(index>1){
      //       index = 0
      //     }else {
      //       index +=1
      //     }
      //   }else {
      //     count += 1
      //   }
      // },1000)


      // let list = ['红','绿','黄']
      // let index = 0
      // setInterval(() => {
      //   setTimeout(()=>{
      //     if (index > 1) {
      //       index = 0
      //     } else {
      //       index += 1
      //     }
      //     console.log('我是宏任务，我后打印',index)
      //
      //   })
      // }, 5000)
      // setInterval(() => {
      //   new Promise((resolve, reject)=>{
      //     resolve(list[0])
      //   }).then(()=>{
      //     console.log('我是微任务，我先打印',index,list[index])
      //   })
      // }, 1000)
      (async () => {
        let list = ['红', '绿', '黄']

        for (let i = 0; i < 3; i += 1) {
          let p = await new Promise((resolve, reject) => {
            let value = list[i]
            let count = 0
            let timer
            timer = setInterval(() => {
              console.log('count', count)
              if (count < 5) {
                count++
                console.log(count + value)
              } else {
                clearInterval(timer)
                resolve()
              }
            }, 1000)

          })
          console.log('p',p)
        }
      })()



      const p1 = new Promise((resolve, reject) => {
        let value = '红'
        let count = 0;
        let timer;
        timer = setInterval(()=>{
          console.log("count", count);
          if(count < 5){
            count++;
            console.log(count + value);
          }else{
            clearInterval(timer)
            resolve(list[0]);
          }
        }, 1000);

      }).then((value)=>{
        new Promise((resolve, reject) => {
          resolve(list[1]);
          reject("error");
        }).then((value)=>{
          let count = 0;
          let timer;
          timer = setInterval(()=>{
            console.log("count", count);
            if(count < 5){
              count++;
              console.log(count + value);
            }else{
              clearInterval(timer)
            }
          }, 1000);
        });
      });

      const p2 = new Promise((resolve, reject) => {
        resolve(list[1]);
        reject("error");
      }).then((value)=>{
        let count = 0;
        let timer;
        timer = setInterval(()=>{
          console.log("count", count);
          if(count < 5){
            count++;
            console.log(count + value);
          }else{
            clearInterval(timer)
          }
        }, 1000);
      });
      const p3 = new Promise((resolve, reject) => {
        resolve(list[2]);
        reject("error");
      }).then((value)=>{
        let count = 0;
        let timer;
        timer = setInterval(()=>{
          console.log("count", count);
          if(count < 5){
            count++;
            console.log(count + value);
          }else{
            clearInterval(timer)
          }
        }, 1000);
      });
    },

  }
}

</script>


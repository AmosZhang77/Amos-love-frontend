<template>
  <div class="p">
    <div class="c">

    </div>
  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'byteDance',
  props: {},
  data () {

    return {}
  },
  mounted () {

    const sumR = (()=>{
      let count = 0
      const sum = (...arr) => {
        if (arr.length === 0) {
          let r = count
          count = 0
          return r

        }
        if (arr.length > 0) {
          count = count + arr.reduce((o, n) => o + n, 0)
          console.log('count', count)
          return sum
        }

      }
      return sum
    })()

    console.log(sumR(2, 3)())
    console.log(sumR(2, 3)(1, 3)())
    console.log(sumR(2, 3)(0, 1)(1, 3)())


    const sumR2 = (...arr) => {
      if (arr.length === 0) {
        // let r = count
        // count = 0
        return r

      }
      if (arr.length > 0) {
        let countT = arr.reduce((o, n) => o + n, 0)
        console.log('countT', countT)
        return ((countT) => (...arr2) => {
          return countT + arr2.reduce((o, n) => o + n, 0)
        })(countT)
      }

    }

    console.log(sumR2(2, 3)())
    console.log(sumR2(2, 3)(1, 3)())
    console.log(sumR2(2, 3)(0, 1)(1, 3)())


    // return ((r) => (...arr2) => {
    //   if(arr2.length===0){
    //     console.log(r)
    //
    //     return r
    //
    //   }
    //   return r + arr2.reduce((o, n) => o + n, 0)
    // })(r)
  },

  beforeDestroy () {

  },
  methods: {
    play () {
    },

  }
}

</script>


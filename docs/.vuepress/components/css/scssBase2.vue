<template>
  <div class="outBox">
    <div class="move"></div>
  </div>
</template>

<style scoped lang="scss">
@mixin keyframes($name) {
  @keyframes #{$name} {
    @content;
  }
  @-webkit-keyframes #{$name} {
    @content; //用于一次性传一大堆可能被错误解析的参数，
  }
  @-moz-keyframes #{$name} {
    @content;
  }
  @-ms-keyframes #{$name} {
    @content;
  }
}

@include keyframes(demo) {
  from {
    width: 20px
  }
  to {
    width: 400px
  }
}

// 引用@mixin样式块普通的写法是@include keyframes(demo),mixin内的name替换成demo字符串
// 如果用于@content就在@include keyframes(demo)后面加一个花括号。花括号内容传到@content位置

.outBox {
  padding: 20px;
  height: 100px;
  position: relative;
  // 关键帧
  .move {
    width: 100px;
    height: 100px;
    background: red;
    position: absolute;
    animation: demo 8s infinite;
    //animation-delay:3s;
    //animation-direction: reverse;
  }
}

</style>

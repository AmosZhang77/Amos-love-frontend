css 一些功能的实现

## 一些功能的css实现

### 设定宽度，要求高度根据宽度变化，并保持一定的宽高比

利用margin padding的两个方向均是以宽度为准，设定好父宽度，如100px，子宽度10%，子高度设为0，子paddingBottom设为10%，就可以得到1：1宽高比

```html

<div class="father">
    <div class="child"></div>
</div>
```

```scss
.father {
  width: 100px;

  // child是一个宽高比1：5的div
  .child {
    width: 20%;
    padding-top: 100%;
    background: yellow;
  }
}
```

上面有个小问题，子div把空间占了，里面写东西还要套一层。

另一种也是这个原理，但子不被占的用法。用绝对定位撑开子div。

```html

<div class="father">
    <div class="child"></div>
</div>
```

```scss
.father {
  position: relative;
  padding-bottom: 75%;
  // child是一个宽高比4：3的div
  .child {
    position: absolute; // 利用这组css使子div，即使被padding占满父，也能撑开和父一样大
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
```

### css不确定高度收起展开动画

（个人解决方案没有考察查过其他人是否有更好的） 展开收起动画，在不知道高度时，用 max-height。Height ：Auto浏览器 无法计算高度，不会动画。 可以定高一点，但是因为高度太高，比实际撑开的高度高，
所以收起的时候要先快后慢，开始的动画看不见的过程时间会缩短。 展开要先慢后快。

```css
.closeTable {
    transition: max-height 500ms ease-out;
    overflow: hidden;
    max-height: 0;
}

.openTable {
    transition: max-height 500ms ease-in;
    overflow: hidden;
    max-height: 1000px
}
```

### 鼠标失效，用来做遮罩层 css3

```css
.disableMouse {
    pointer-events: none;
}
```

### 光圈

```html
<!-- <span></span>-->
<!-- <span></span>-->
<!-- <span></span>-->
<!-- <span></span>-->

```

```scss
overflow: hidden

;
& > span {
  position: absolute;
  display: block;
  z-index: 99999;
}



@light: #ffffff;
& > span:nth-child(1) {
  @keyframes span1 {
    0% {
      left: -3800px;
    }
    100% {
      left: 3800px;
    }
  }
  height: 5px;
  width: 3800px;
  top: 0px;
  left: -200px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), @light);
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  animation: span1 2s linear infinite;
  animation-delay: 1s;
}

& > span:nth-child(2) {
  @keyframes span2 {
    0% {
      top: -320px;
    }
    100% {
      top: 320px;
    }
  }
  height: 320px;
  width: 5px;
  top: -320px;
  right: 0px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), @light);
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  animation: span2 2s linear infinite;
  animation-delay: 2s;
}

& > span:nth-child(3) {
  @keyframes span3 {
    0% {
      right: -3800px;
    }
    100% {
      right: 3800px;
    }
  }

  height: 5px;
  width: 3800px;
  right: -3800px;
  bottom: 0px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0), @light);
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  animation: span3 2s linear infinite;
  animation-delay: 3s;
}

& > span:nth-child(4) {
  @keyframes span4 {
    0% {
      bottom: -320px;
    }
    100% {
      bottom: 320px;
    }
  }
  height: 320px;
  width: 5px;
  bottom: -320px;
  left: 0px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0), @light);
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
  animation: span4 2s linear infinite;
  animation-delay: 4s;
}

```

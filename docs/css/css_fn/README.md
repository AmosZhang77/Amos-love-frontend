
## 一些功能的css实现

### 背景范围

background-clip

```css
.demo:nth-child(1) {
    background-clip: border-box; /*背景平铺到边框,但是左上角默认第一张背景设置从边框内部开始,想要从边框上开始设置background-position:负值*/
    /*background-position: -10px -10px;*/
}

.demo:nth-child(2) {
    background-clip: padding-box; /*背景平铺到边框内*/
}

.demo:nth-child(3) {
    background-clip: content-box; /*背景平铺到padding内*/
}
```

### 背景图平铺方式

```css
    .backgroundSize2 {
      background-size: 100% 100%; // 填满，比例会失调
      background-repeat: no-repeat;
    }

    .backgroundSize3 {
      background-size: cover; // 填满，比例会保证。 尺寸不对剪裁图，不留空白
      background-repeat: no-repeat;

    }

    .backgroundSize4 {
      background-color: red;
      background-size: contain; //填满，比例会保证， 尺寸不对，不剪裁图，空白留给背景色发挥。
      background-repeat: no-repeat;
    }
```


### 清除浮动

```css
.clearFix:after{
    content: "";
    display: block;
    clear: both;
}
```

### 设定宽度，要求高度根据宽度变化，并保持一定的宽高比

利用margin padding的两个方向均是以宽度为准，设定好父宽度，如100px，
子宽度10%，子高度设为0，子paddingBottom设为10%，就可以得到1：1宽高比

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

### 光圈动画 逼格光环

<css-lightRing/>

```html
<div className='lightRing'>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
```

```less
.lightRing .lightRing {
  @boxWidth: 400px; // 容器宽度
  @boxHeight: 300px; // 容器高度
  @lightColorMain: rgba(0, 255, 0, 1); // 光圈主颜色
  @lightColorSub: rgba(0, 0, 0, 0); // 光圈副颜色，一般就用默认的
  @lightWidth: 4px; // 光圈宽度
  @lightTime: 0.6s; // 光圈过一条边的时间
  @lightBorderRadius: @lightWidth/2; // 光圈倒角

  background-color: #555;
  overflow: hidden;
  width: @boxWidth;
  height: @boxHeight;
  position: relative;
  margin: 50px;
  border: none;

  & > span {
    position: absolute;
    display: block;
    z-index: 9999;
    border-radius: @lightBorderRadius;
  }

  & > span:nth-child(1) {
    @keyframes span1 {
      0% {
        left: -@boxWidth;
      }
      100% {
        left: @boxWidth;
      }
    }
    height: @lightWidth;
    width: @boxWidth;
    top: 0;
    background: linear-gradient(to right, @lightColorSub, @lightColorMain);
    animation: span1 2*@lightTime linear infinite;
    animation-delay: 0s;
  }

  & > span:nth-child(2) {
    @keyframes span2 {
      0% {
        top: -@boxHeight;
      }
      100% {
        top: @boxHeight;
      }
    }
    height: @boxHeight;
    width: @lightWidth;
    right: 0;
    background: linear-gradient(to bottom, @lightColorSub, @lightColorMain);
    animation: span2 2*@lightTime linear infinite;
    animation-delay: @lightTime;
  }

  & > span:nth-child(3) {
    @keyframes span3 {
      0% {
        left: @boxWidth;
      }
      100% {
        left: -@boxWidth;
      }
    }

    height: @lightWidth;
    width: @boxWidth;
    bottom: 0;
    background: linear-gradient(to left, @lightColorSub, @lightColorMain);
    animation: span3 2*@lightTime linear infinite;
    animation-delay: 0s;
  }

  & > span:nth-child(4) {
    @keyframes span4 {
      0% {
        bottom: -@boxHeight;
      }
      100% {
        bottom: @boxHeight;
      }
    }
    height: @boxHeight;
    width: @lightWidth;
    left: 0;
    background: linear-gradient(to top, @lightColorSub, @lightColorMain);
    animation: span4 2*@lightTime linear infinite;
    animation-delay: @lightTime;
  }
}
```

### 阻止选中 阻止变蓝 阻止选中图片

1.css3方法

```css
.className::selection {
  background-color: transparent; /*css3方法，设置选中效果，不让图片被选中后产生蓝色阴影*/
}
```

2.浏览器对应方法

```css
.className {
  user-select: none; /*阻止用户选中*/
}
```



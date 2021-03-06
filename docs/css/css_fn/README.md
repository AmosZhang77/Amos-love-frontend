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
  background-size: 100% 100%;
/ / 填满，比例会失调 background-repeat: no-repeat;
}

.backgroundSize3 {
  background-size: cover;
/ / 填满，比例会保证。 尺寸不对剪裁图，不留空白 background-repeat: no-repeat;

}

.backgroundSize4 {
  background-color: red;
  background-size: contain;
/ / 填满，比例会保证， 尺寸不对，不剪裁图，空白留给背景色发挥。 background-repeat: no-repeat;
}
```

### 清除浮动

```css
.clearFix:after {
  content: "";
  display: block;
  clear: both;
}
```

### 设定宽度，要求高度根据宽度变化，并保持一定的宽高比

利用margin padding的两个方向均是以宽度为准，设定好父宽度，如100px， 子宽度10%，子高度设为0，子paddingBottom设为10%，就可以得到1：1宽高比

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

会让js的鼠标点击事件等鼠标事件无效！！！（js点击无效时的一个可能原因！）

none 元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

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

### rem

```js
function setRem () {
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth

  // 这个系数10也可以为100都可以，只要不太小，否则会导致rem的值过大，
  // 表示小尺寸的时候超出浏览器小数精度出现错误
  document.querySelector("html").style.fontSize = clientWidth / 10 + "px"
}

// 在开始和窗口resize的时候调用
jQuery(function () {
  setRem()
  jQuery(window).on("resize", function () {
    setRem()
  })
})
```

```scss
// $width 设计稿宽度
$widthDesign: 1440;
$widthDesign2: 1920;

// 缩放高度处理函数，得出数据单位rem
@function t($width) {
  // 这个系数10要与js中的一致
  @return $width/($widthDesign/10)+rem;
}

// 使用
.btn1 {
  width: t(100); // 设计稿中100px
}
```

vw可以完全代替rem方案， 不需要添加事件，根据窗口宽度变化改变rem。100vw永远等于窗口宽度。

vw方案： 设计稿750宽，1px相当于1/750*100vw 可以用

```scss
// $width 设计稿宽读
$widthDesign: 750;
$widthDesign2: 1920;

// 缩放高度处理函数，得出数据单位rem
@function t($width) {
  // 这个系数10要与js中的一致
  @return $width/($widthDesign/100)+vw;
}

// 使用
.btn1 {
  width: t(100); // 设计稿中100px
}
```

也可都写px，用webpack插件postcss-px-to-viewport，px统一计算并替换成vw

配置
```ts
{
  extraPostCSSPlugins: [
    px2vw({
      // 设计稿宽度
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      // 最小不转换的阈值
      minPixelValue: 1,
    }),
  ]
}

```

微信浏览器文字打断，连续逗号打断，因为兼容性问题，目前只找到以下方法：

```css
.white-space {
  white-space: pre-wrap;
  word-break: break-word;
}
```

### flex实现高度撑满

```jsx
// list 长度会变化

<div className="father">
  <div className="changeableHead">
    高度会变化的head
    {list.map((item) => (<div key={item.id}>item.name</div>))}
  </div>
  <div className="content">
    我需要占满father容器

    <div className="scrollBox">
      <div className="longContent">
        我是很长的内容
      </div>
    </div>
  </div>
</div>
```

```less
.father {
  height: 100vh;
  display: flex;
  flex-direction: column; // 垂直方向弹性布局

  .changeableHead {
    flex-grow: 0; // 弹性布局方向上，尺寸不会自动长大，不占多余垂直高度尺寸
  }

  .content {
    flex-grow: 1; // 弹性布局方向上，尺寸会自动长大，这样就能实现content占满
    overflow-y: hidden; // 这条非常关键，因为如果内部内容太高，会撑开content容器。
    .scrollBox {
      // 这里如果没有content里面的overflow-y:hidden， longContent会把定义了height:100%的scrollBox撑高，
      // 即scrollBox和longContent等高，从而使此处overflow-y: auto的滚动效果永远出不来
      height: 100%;
      overflow-y: auto;
    }
  }

}
```

### 苹果安全区

html的meta标签name=viewport里面加 ,viewport-fit=cover

不要再谢谢一条meta否则会覆盖上面的标签，导致上面的meta标签name=viewport失效
```html
  <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"/>
```
constant(safe-area-inset-bottom)

env(safe-area-inset-bottom)

顺序不能变，是变量，在对应苹果种会起效果
```less
body {
  height: 100vh;
  background-color: #fff;

  #root {
    height: ~'calc(100% - constant(safe-area-inset-bottom))';
    height: ~'calc(100% - env(safe-area-inset-bottom))';
    overflow-y: hidden;
  }
}

```

超出两行省略号

```css
.clip2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

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
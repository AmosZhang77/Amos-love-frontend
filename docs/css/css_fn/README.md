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
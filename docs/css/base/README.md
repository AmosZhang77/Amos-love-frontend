## calc

```css
.a {
  width: calc(100% - 50px);
}
.a {
  width: calc (100% - 50px); // calc和'('之间一定不能加空格,加了浏览器不认！
}
```

### 多张背景图

background支持多张背景图，逗号隔开

```css
.backgroundBox {
  height: 200px;
  background: url("./1.jpg") no-repeat 0 0,
  url("./2.jpg") no-repeat 200px 0,
  url("./3.jpg") no-repeat 600px 0;
}
```

### 选择器

正则选择器

```css
div[id*="demo"] { /*id包含demo的div，注意，demo要加引号*/
  font-size: 30px;
}

div[herf^="http"] { /* herf以http开头的div*/
  color: red;
}

div[herf$=".pdf"] { /* herf属性以.pdf结尾的div*/
  color: blue;
}
```

### z-index

有时候发现A元素提高z-index无论怎么往大设置都覆盖不了z-index低的B元素，因为A元素有一个父元素的z-index比较低，需要增加父元素的z-index
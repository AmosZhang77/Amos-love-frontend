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

### flex

flex容器的子元素如果没有指定宽度，子元元素会被孙子等元素的内容撑开。
发生flex容器宽度变小了，但是子元素宽度莫名其妙不缩小的问题（其实是被孙子元素的内容撑开了）。

子元素加上overflow:hidden。可解决（好一些）。

或者设定子元素的宽度100%或者calc(100% - 100px)等都可以。（实际效果是flex弹性布局和设定宽度的结合，规则比较复杂，用到实际看）

### sticky 小于

```css
.title{
    position: sticky;
    top: 50px;    
}
```

-webkit-input-placeholder 伪元素浏览器查看不到

需要在控制台勾选 Show user agent shadow DOM

<img src="./images/shadowDom.png" />

```css
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: yellow;
}
```
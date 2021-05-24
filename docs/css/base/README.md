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
## em 大小参照

em如果自己有font-size，就以自己的font-size为基准，不用用父亲的为基准

```scss
.father {
  font-size: 16px; // 如果child没有设定font-size，1em就是16px，父的font-size
  .child {
    font-size: 18px;
    font-size: 1em; // 这里1em等于18px，没有以父的font-size为基准
  }
}
```
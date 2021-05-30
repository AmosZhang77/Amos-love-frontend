### 获取元素当前样式

```js
let style = window.getComputedStyle(element, [pseudoElt]);
```
element:用于获取计算样式的Element。
pseudoElt 可选:指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
返回的style（只读）是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。
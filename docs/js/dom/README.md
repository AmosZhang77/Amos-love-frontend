### 获取元素当前样式

```js
let style = window.getComputedStyle(element, [pseudoElt]);
```
element:用于获取计算样式的Element。
pseudoElt 可选:指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
返回的style（只读）是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。

### 拿到某dom所属的 #document

在 HTML 中，HTML 文档本身始终是元素的 ownerDocument。

可用于作为全局dom，用于添加全局事件。比如点击空白关闭某个小框

```js
document.getElementById("demo").ownerDocument
```


### 标签嵌套

p标签不能套h3
h不能套h

```html
<p class="pClass">
  p内容前
  <h1>h1标题</h1>
  p内容后
</p>
```

p标签会被打散（事件和样式系统都会发生错误，千万别这样套）
chrome实际会渲染成： 
```html
<p class="pClass">
  p内容前
</p>
<h1>h1标题</h1>
p内容后
<p></p>
```

### 转义

< : \&lt; 

(less than的首字母缩写， md前面要加\，否则被转义，显示<)

\> : \&gt;  

(greater than)

```html
<div>&lt;</div>
<div>&gt;</div>
```

### 限制输入内容长度

maxlength

```html
<input type='text' maxlength='10'/>
```

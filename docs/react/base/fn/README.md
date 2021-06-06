### 阻止冒泡

onClick={(e)=>{e.stopPropagation()}} 阻止往上冒泡（react提供已做浏览器兼容）

相当于vue里面e.self处理类似问题

```html

<Tabs onClick={(e)=>{e.stopPropagation()}} />

```



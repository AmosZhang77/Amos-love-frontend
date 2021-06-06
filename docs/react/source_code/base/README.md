PureComponent 只有一个生命周期，shouldComponentUpdate

###props

react props 在传给子组件时会把框架本身要用的４个键名(key,ref,__self,__source)过滤掉，导致这四个参数无法通过pros传到子组件。
props传参的时候千万注意，不要用这4个键名！
```js

```

组件唯一性，安全性，$$typeof: REACT_ELEMENT_TYPE //SYMBOL

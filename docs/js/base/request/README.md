## 请求

### 不确定多请求一起发，得到所有结果后，一起处理 Promise.all

请求promise推到一个数组中，Promise.all，可以得到所有结果后一起返回

### async await

```js
// axios() 只是伪代码，随便用什么请求框架或者new Promise请求
// 只要是请求然后返回ES6的promise对象的就行
const reqFn = async () => {
  const requestPromiseList = requestDataList.reduce((o, n, i) =>
    item.check === true ? [...o, axios(n.url)] : o, [])
  const res = await Promise.all(requestPromiseList)
  console.log(res)
}
```


## 对象

### 对象合并

#### Object.assign 方法
```js
let o1 = { a: 1, b: 1, c: 1 }
let o2 = { b: 2, c: 2 }
let o3 = { c: 3 }

let obj = Object.assign({}, o1, o2, o3)
console.log(obj); // { a: 1, b: 2, c: 3 }

```
#### 剩余运算符 方法
```js
let o1 = { a: 1, b: 1, c: 1 }
let o2 = { b: 2, c: 2 }
let o3 = { c: 3 }

let obj = { ...o1, ...o2, ...o3}
console.log(obj); // { a: 1, b: 2, c: 3 }

```

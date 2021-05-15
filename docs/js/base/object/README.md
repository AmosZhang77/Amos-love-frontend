## 对象

### 对象合并

#### Object.assign 方法

```js
let o1 = { a: 1, b: 1, c: 1 }
let o2 = { b: 2, c: 2 }
let o3 = { c: 3 }

let obj = Object.assign({}, o1, o2, o3)
console.log(obj) // { a: 1, b: 2, c: 3 }

```

#### 剩余运算符 方法

```js
let o1 = { a: 1, b: 1, c: 1 }
let o2 = { b: 2, c: 2 }
let o3 = { c: 3 }

let obj = { ...o1, ...o2, ...o3 }
console.log(obj) // { a: 1, b: 2, c: 3 }
```

### 对象的浅拷贝

循环方法

```js
const easyClone = (Obj) => {
  varobjNew = {};
  for (vari in Obj) {
    objNew[i] = Obj[i]
  }
  return objNew
}
```

#### Object.assign方法

其实就是将每个原对象的属性和值复制到新对象上去，当然我们也可以使用Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象，同时Object.assign() 也是浅拷贝。

```js
let o1 = { a: 1, b: 1, c: 1 }
let obj = Object.assign({}, o1, o2)
console.log(obj) // { a: 1, b: 1, c: 1 }
```

#### 剩余运算符 方法

```js
let o1 = { a: 1, b: 1, c: 1 }
let obj = { ...o1 }
console.log(obj) // { a: 1, b: 1, c:1 }
```

### 对象的深拷贝

浅拷贝因为没有递归循环检查对象的每个值是否是对象，而是直接进行了赋值，所以如果某个值是对象的时候就会出现问题，所以在一般情况下我们需要用深拷贝来进行备份。

最简单的深拷贝 但是这种深拷贝有一定的局限性，第一：无法复制函数，第二：原形链没了，对象就是object，所属的类没了。

```js
var b = JSON.parse(JSON.stringify(a))
```

其实简单的深拷贝只需要我们递归调用浅拷贝就可以了： 循环拷贝，这里也只是拷贝对象和数组，没有拷贝方法

```js
const deepCopy = (obj) => {
  varobjNew = objNew || {}
  for (var i in obj) {
    if (typeof p[i] === 'object') {
      objNew[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(obj[i], objNew[i])
    } else { objNew[i] = obj[i] }
  }
  return objNew
}
```

### 遍历对象

for...in语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性，会可以遍历出对象原型链上的属性。

下面是去掉原型链上属性的遍历方法

```js
for (var key in obj) { // 只遍历对象自身的属性，而不包含继承于原型链上的属性。
  if (obj.hasOwnProperty(key) === true) {
    keys.push(key)
    values.push(obj[key])
    alert("keys is ：" + keys + " and values is ：" + values)
  }
}
```

for in遍历数组的毛病 1.index索引为字符串型数字，不能直接进行几何运算 2.遍历顺序有可能不是按照实际数组的内部顺序 3.使用for in会遍历数组所有的可枚举属性，包括原型。例如下面例子中的原型方法methods和name属性

```js
Array.prototype.methods = function () {
  console.log(this.length)
}
var myArray = [1, 2, 4, 5, 7]
myArray.name = "数组"
for (var value in myArray) {
  console.log(value) // 0 //1 //2 //3 //4 //name// methods 
  // 这里属性，和原型链上的方法都遍历出来了
}
```

for of (原生没有对象迭代器，想要便利对象需要自定义遍历器 Symbol.interater)
for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

用法：

```js
let iterable = [10, 20, 30]
for (let value of iterable) {
  value += 1
  console.log(value) // 11 // 21 // 31
}
```

### 多属性对象剔除少量属性

巧用解构赋值，剔除可能出现的某些属性，这里剔除了前两个属性，即使前两个属性没有也不用处理，不会报错。

```js
let { jobGroup, childJobList, ...needContent } = envItemF.sub[envItemF.subShowIndex].content
envItemT.sub[envItemT.subShowIndex].content = needContent // 如果表格是执行器的情况，执行器和子任务不复制
```

### 除去对象的null和undefined属性

这里用的 lodash的方法

```js
pickBy(object, it => !(it == null))
```
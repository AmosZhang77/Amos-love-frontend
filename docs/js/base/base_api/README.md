## js原生api

### new Function

eval 和 newFunction 都可以把一个字符串当成一段代码执行 //很少有var a = new Function(param,body);// 并且body里面只能是string类型.
这两种放在现版本chrome浏览器控制台会报安全性错误，不让运行。edge的控制台可以运行

new Function:
new Function(param,string) // param入参。string运行的代码字符串，必须是string类型

```js
let str = 'console.log(`Hello ${name}!`)'
let func = new Function('name', str);
func('Jack') // "Hello Jack!"
```

### function

如果function是整个声明语句的第一个词，就是函数声明， 否则，function就是函数表达式（表达式结果是个值，不是声明）

```js
function a () { // function是声明
  console.log('a')
}

a() // a

  (function b () { // function是表达式
    console.log('b')
  })
b() // 报错，Uncaught ReferenceError: b is not defined
```

表达式不会声明变量，表达式结果是个值

```js
let c = (function c () { // function是表达式
  console.log('c')
})
c() // c
```

```js
var c = function c () { // function是表达式
  console.log('c')
}
c() // c
```

```js

let c = (function () { // function是表达式
  console.log('c')
})
c() // c
```

```js

let c = function () { // function是表达式
  console.log('c')
}
c() // c
```

### eval

eval: 非严格模式下，用var定义变量，会在词法作用于中插入变量b的声明定义（工作原理）， 从而改变了浏览器编译时的词法作用域。 （浏览器会通过词法静态分析优化变量和函数。如果eval存在，会动态改变词法作用域，
浏览器只能选择不做优化避免引起程序逻辑变化。所以会影响性能。）

```js
const b = 2

function org (a, str) {
  eval(str)
  console.log(a, b)
}

org(1, 'var b = 3') // 1 3
org(1, 'let b = 3') // 1 2

function fn () {
  const b = Math.random()
  org(1, `let b = ${b}`) // 1 2
  org(1, `var b = ${b}`) // 1 0.32133
}

fn()
```

### async await

**async后面的函数需要return一个promise，否则，如果返回一个undefined， 会被包装成new Promise((resolve)=>resolve(undefined))
await等的promise不是真正要等的那个setTimeout了，所以等到得到undefined后就往下执行了， 不等想要等的setTimeout了。**

```js
const wait1s = async (i) => {
  // 将需要等待的setTimeout的promise返回了
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, 3000)
  })
}
let iR = await wait1s(1) // await会正确等待setTimeout的promise
console.log('iR:', iR)
```

返回一个undefined，await一个undefined不会等

```js
const wait1s = async (i) => {
  // 没写返回，默认返回一个undefined，被包装成promise。 
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i) // 三秒后打印 i:1
      resolve(i)
    }, 3000)
  })
}
let iR = await wait1s(1) // await没有等待setTimeout的promise，等到undefined后就往下执行了
console.log('iR:', iR) // 0秒打印 iR: undefined
```

### async await 遍历方法 结合的问题

async await放在遍历方法（map、reduce、reduceRight、forEach、filter、some、every）中，会失效 （即遍历过程，不会等待一个结束之后再遍历下一个，并且遍历还可能会出错，得到乱七八糟的结果）。

（方案1.考虑是否可以把异步逻辑从遍历中抽出来，不用async await，方案2.按照下面讨论的思路进行处理）。

个人碰到的问题：

理想中是，按照顺序拿到1st，2nd，3rd，4th的值。然后在循环结束的下面语句，拿到处理后的list。 实际上2nd，4th会最先执行，执行的时候拿不到1st，3rd里面期望拿到的值。整个循环结束时，异步并未结束，
所以循环结束后期望得到的最后结果无法获得

```js
const list = [{ api: true, val: '1st' }, { api: false, val: '2nd' },
  { api: true, val: '3rd' }, { api: false, val: '4th' }]
list.forEach(async (item, i, arr) => {
  if (item.api === true) {
    // 调接口类的异步操作
    let res = await new Promise((resolve) => {resolve(item.val)}) // await api()
    // 操作item
    item.val2 = res
    // 最后打印出来。操作item的影响list的作用效果也会最后出现，上面实际需要的地方拿不到。
    console.log('item.val:', item.val)
  } else if (item.api === false) {
    // 无调接口的异步逻辑,第一个打印出来，操作item的影响list的作用效果，能在需要结果的地方拿到
    // （也有下面的巨坑，打印arr，展开arr里面arr[0].val2有值，直接打印arr[0].val2没值）
    console.log('item.val:', item.val, 'arr:', arr, 'arr[0].val2:', arr[0].val2)
  }
})
// 在两个同步之后打印，两个异步还没结束，forEach入参函数async和异步分支中的await失效。
// 这里拿不到想要的异步结果，异步逻辑做的item处理效果这里也会漏掉'
// 需要结果的地方list[0]和list[3]的val2值拿不到
console.log('list:', list, 'list[0].val2:', list[0].val2)
/**
 * 这里有个超级巨坑！list在浏览器中能打印出来想要的结果，
 * 浏览器打印list，list对象展开看到的是最后的list，
 * 而不是程序执行当时的list（会导致问题怎么都查不出来，能打印出来但是程序却怎么都拿不到）。
 * 通过打印list[0].val2的值，能打印出实际运行时的值。
 */
```

打印顺序:

item.val: 2nd arr: [{…}, {…}, {…}, {…}] arr[0].val2: undefined // 打印arr，展开arr里面arr[0].val2有值，直接打印arr[0].val2没值

item.val: 4th arr: [{…}, {…}, {…}, {…}] arr[0].val2: undefined

需要结果的地方，list: (4) [{…}, {…}, {…}, {…}] list[0].val2: undefined // 最后一行console.log拿不到想要的结果

item.val: 1st // 最后打印出来。操作item的影响list的作用效果也会最后出现,上面实际需要的地方拿不到。

item.val: 3rd // 最后打印出来。操作item的影响list的作用效果也会最后出现,上面实际需要的地方拿不到。

#### 基础回顾 async await编译成支持Promise浏览器代码时

```js
const res = await fn()
// code here

// 编译成
fn().then(res => {
  // code here
})

// await后面的语句会包到.then的回调函数中
```

```js
async function fn2 () {
  return 1
}

// 编译成类似，async后函数返回非promise包装成promise，promise不用再包装
function fn2 () {
  return new Promise(resolve => (1))
}

// async函数会内容和结果被包一层Promise，
// Promise(resolve => {async函数内容和返回被包在这里})，async函数返回即是resolve返回
```

#### map

虽然不能让map中的async await使的数组按照数组的顺序去执行异步。

但可以让map中所有异步都执行（并行同时执行）都完成后，再执行遍历之后的语句（能保证拿到所有异步的结果）

```js
const res = [1, 2, 3].map(item => item ** 2) // 对数组元素求平方（无async await的普通map）
console.log(res) // [1, 4, 9]
```

```js
const res = [1, 2, 3].map(async item => item ** 2) // 对数组元素求平方（有async await的map）
console.log(res) // [Promise, Promise, Promise]
// 直接用得不到想要的结果[1, 4, 9]，得到的是Promise数组
```

解决方案：用Promise.all来处理

```js
const res = await Promise.all([1, 2, 3].map(item => item ** 2))
console.log(res) // [1, 4, 9]
// map对async await算比较友好，生成了一个Promise数组
// 只要用Promise.all处理Promise数组，就可以得到想要的最后结果
// map的时候，所有Promise已经开始执行了（并行同时执行），
// await可以使后面语句在所有async都有结果后，才执行
```

#### reduce/reduceRight

```js
// 对数组元素求和（无async await的普通reduce）
const res = [1, 2, 3].reduce((accumulator, item) => accumulator + item, 0)
console.log(res) // 6
```

```js
// 对数组元素求和（有async await的reduce）
const res = [1, 2, 3].reduce(async (accumulator, item) => accumulator + item, 0)
console.log(res) // Promise{<fulfilled>: "[object Promise]3"}
// 直接用得不到想要的结果6，得到的结果貌似很奇怪
// 得到的是 Promise转的字符串的结果：[object Promise] 拼接 3转字符串结果，再外面包一层Promise

// 因为，reduce最后一次，拿倒数第二次的o，也就是上一个async函数（promise对象）+ 3，
// 此时会被转成字符串[object Promise]，再拼接'3'
// 然后最终返回时外面因为有async，再包一层Promise
```

解决方案：每次使用accumulator，将accumulator（Promise对象）用await得到内容，再+3。

reduce的结果是Promise所以最外面还需要一个await得到内容

虽然也无法实现每个reduce按照顺序依次依赖。但是能等到所有都好了再计算，相当于也有Promise.all的效果

```js
const res = await ([1, 2, 3].reduce(async (accumulator, item) => (await accumulator) + item, 0))
console.log(res) // 6
```

添加一个延迟函数，看看实际执行顺序

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

const res = await ([1, 2, 3].reduce(async (accumulator, item, i) => {
  console.log('reduce开始') // 3个reduce会一起瞬间开始，这里开始就连续打印3个
  let iR = await wait1s(i)
  let r = (await accumulator) + item
  console.log('r:', r, 'iR:', iR) // 按照延迟时间打印，2秒打印第三个i:2，
  // 第4秒打印二个i:1，第6秒打印二个i:0
  // 这里相当于reduce被block住，所有延迟结束后在计算最后结果
  return r
}, 0))
// 6秒后，也就是reduce里面的延时都并行走完了，再拿所有等待后结果，计算reduce的最后结果
console.log(res) // 6
```

打印结果如下：

reduce开始 // 开始立即打印三遍

i: 2 // 第2秒打印

i: 1 // 第4秒打印

i: 0 // 第6秒打印

r: 1 iR: 0 // 第6秒打印

r: 3 iR: 1 // 第6秒打印

r: 6 iR: 2 // 第6秒打印

6 // 第6秒打印

#### filter

可以让map中所有异步都执行（并行同时执行）都完成后，再执行遍历之后的语句（能保证拿到所有异步的结果）

```js
const res = [1, 2, 3].filter(item => item % 2 !== 0) // 对数组元素选取奇数项（无async await的普通filter）
console.log(res) // [1, 3]
```

```js
const res = [1, 2, 3].filter(async item => item % 2 !== 0) // 对数组元素选取奇数项（有async await的filter）
console.log(res) // [1, 2, 3]
// 直接用得不到想要的结果[1, 3]，得到的是错误的结果[1, 2, 3]
// 因为async函数返回一个promise，filter根据返回值判断是否需要过滤，promise判断永远是true，所以过滤功能失效。
```

```js
const res = [1, 2, 3].filter(async item => item % 2 !== 0) // 对数组元素求平方（有async await的map）
console.log(res) // [1, 2, 3]
// 直接用得不到想要的结果[1, 3]，得到的是错误的结果[1, 2, 3]
// 因为async函数返回一个promise，filter根据返回值判断是否需要过滤，promise判断永远是true，所以过滤功能失效。
```

添加一个延迟函数，看看实际执行顺序

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

const res = await [1, 2, 3].filter(async (item, i) => {
  console.log('filter开始，item:', item) // 3个filter会一起瞬间开始，这里开始就连续打印3个
  let iR = await wait1s(i)
  console.log('item:', item, 'iR:', iR) // 按照延迟时间打印，2秒打印第三个i:2，
  return item % 2 !== 0
}) // 对数组元素求平方（有async await的map）
console.log(res) // [1, 2, 3]
// 直接用得不到想要的结果[1, 3]，得到的是错误的结果[1, 2, 3]
// 因为async函数返回一个promise，filter根据返回值判断是否需要过滤，promise判断永远是true，所以过滤功能失效。
```

打印结果如下：

filter开始，item: 1 // 开始就打印

filter开始，item: 2 // 开始就打印

filter开始，item: 3 // 开始就打印

[1, 2, 3] // 开始就打印

i: 2 // 2秒打印

item: 3 iR: 2 // 2秒打印

i: 1 // 4秒打印

item: 2 iR: 1 // 4秒打印

i: 0 // 6秒打印

item: 1 iR: 0 // 6秒打印

#### 解决方案1：自己重写一个方法，用map 和 Promise.all来处理拿到结果，最后再用filter处理。（添加一个延迟函数，看看实际执行顺序）

方案一最终效果，迭代之间没有先后顺序，一起开始执行，都执行完了往下走。

原生map参数1-函数中的await不能使迭代之间等待

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

Array.prototype.filterSync = async function (callback, thisArg) {
  // thisArd： 原生filter第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值
  let resultAll = await Promise.all(this.map(callback)) // [true, false, true]
  return this.filter((_, index) => resultAll[index])
}

let res = await [1, 2, 3].filterSync(async (item, i) => {
  console.log('filter开始，item:', item) // 3个filter会一起瞬间开始，这里开始就连续打印3个
  let iR = await wait1s(i)
  console.log('item % 2 !== 0:', item % 2 !== 0, 'iR:', iR) // 按照延迟时间打印，2秒打印第三个i:2，
  return item % 2 !== 0
})
console.log(res)
```

打印结果

filter开始，item: 1 // 第0秒打印

filter开始，item: 2 // 第0秒打印

filter开始，item: 3 // 第0秒打印

4 i: 2 // 第2秒打印

item % 2 !== 0: true iR: 2 // 第2秒打印

i: 1 // 第4秒打印

item % 2 !== 0: false iR: 1 // 第4秒打印

i: 0 // 第6秒打印

item % 2 !== 0: true iR: 0 // 第6秒打印

[1, 3] // 第6秒打印

#### 解决方案2：自己重写一个方法，用reduce来处理。非异步情况，相当于方案 map + filter

方案二最终效果：迭代之间有先后顺序，后面的迭代会等前面的迭代中异步完成之后才执行

**重要理解：**

**reduce参数1-函数中的await能使迭代之间等待 （个人理解，对比map，map本身迭代之间没有联系，所以设计成await不等待，并行执行；
而reduce每个迭代需要上个迭代的结果才能往下计算，所以设计成await等待，按顺序依次执行）**

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

Array.prototype.filterSync = async function (callback, thisArg) {
  // thisArd： 原生filterh第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值

  // reduce和filter,forEach,map不同，不能支持传入this
  const res = await (this.reduce(async (accumulator, item, index) => {
    let r = await accumulator // accumulator是上次async函数的返回
    if (await callback(this[index], index, this)) {r.push(item)}
    return r
  }, []))

  /*  const res = await (this.reduce(async (accumulator, item, index) => { // 这样写和上面一样效果
      let r = await accumulator // accumulator是上次async函数的返回
      if (await callback(this[index], index)) {(await accumulator).push(item)}
      return (await accumulator)
    }, []))
    console.log(res) // [1, 3] */
  return res
}

let saveArr = []
let res = await [1, 2, 3].filterSync(async (item, i, arr) => {
  console.log('filter开始，item:', item) // 3个不会一起瞬间开始，
  saveArr[i] = await wait1s(i)
  // 第二个会等第一个迭代的异步完成才执行，能拿到第一个的异步结果，可以通过saveArr的内容发现
  console.log('item % 2 !== 0:', item % 2 !== 0, 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
  return item % 2 !== 0
})
console.log(res) // [1, 3]
```

打印结果如下：

filter开始，item: 1 // 第0秒打印

i: 0 // 第6秒打印

item % 2 !== 0: true saveArr: 0 undefined undefined // 第6秒打印， 拿不到第二次第三次迭代的内容，因为第二次第三次迭代还没开始

filter开始，item: 2 // 第6秒打印

i: 1 // 第10秒打印

item % 2 !== 0: false saveArr: 0 1 undefined // 第10秒打印，第二次迭代执行是在第一次得到结果之后的，自然能拿到第一次的结果

filter开始，item: 3 // 第10秒打印

i: 2 // 第12秒打印

item % 2 !== 0: true saveArr: 0 1 2 // 第12秒打印

[1, 3] // 第12秒打印

[1, 3] // 第12秒打印 // 代码最后一行打印

#### some

some 和 filter 有些相像，参1函数返回布尔，决定最后结果，区别是，filter通过布尔挑选最后选哪几个元素，some通过所有布尔得出一个最终布尔

```js
const res = [1, 2, 3].some(item => {
  console.log(item === 4)
  return item === 2
}) // （无async await的普通some）
console.log(res) // false
```

```js
const res = await [1, 2, 3].some(async item => {
  console.log(item === 4)
  return item === 4
}) //（有async await的some）,也是因为返回值是promise，所以永远是true，some语句失效
console.log(res) // true
```

#### 解决方案1：自己重写一个方法，用map 和 Promise.all来处理拿到结果，最后再用some处理。（添加一个延迟函数，看看实际执行顺序）

方案一最终效果，迭代之间没有先后顺序，一起开始执行，都执行完了往下走。与filter的方案1一样。

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

Array.prototype.someSync = async function (callback, thisArg) {
  // thisArd： 原生filter第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值
  let resultAll = await Promise.all(this.map(callback)) // [true, false, true]
  return this.some((_, index) => resultAll[index])
}

let res = await [1, 2, 3].someSync(async (item, i) => {
  console.log('some开始，item:', item) // 3个some会一起瞬间开始，这里开始就连续打印3个
  let iR = await wait1s(i)
  console.log('item === 4:', item === 4) // 按照延迟时间打印，2秒打印第三个i:2，
  return item === 4
})
console.log(res)
```

打印结果如下：

some开始，item: 1 // 第0秒打印

some开始，item: 2 // 第0秒打印

some开始，item: 3 // 第0秒打印

i: 2 // 第2秒打印

item === 4: false // 第2秒打印

i: 1 // 第4秒打印

item === 4: false // 第4秒打印

i: 0 // 第6秒打印

item === 4: false // 第6秒打印

false // 第6秒打印

#### 解决方案2：自己重写一个方法，用reduce来处理。

方案二最终效果：迭代之间有先后顺序，后面的迭代会等前面的迭代中异步完成之后才执行，与filter方案二一样。

some方案2，实用场景，接口速度很快，多次等待前端体验仍可以保证，中途得到结果后，之后的接口可以不调取，节省后端资源。 但其实，reduce因为语法上无法打断（所以第二种方案丢弃，前端体验不好，后端资源并没有节省），故用for
of的第三种方案

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

Array.prototype.someSync = async function (callback, thisArg) {
  // thisArd： 原生filterh第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值

  // reduce和filter,forEach,map不同，不能支持传入this
  const res = await (this.reduce(async (accumulator, item, index) => {
    let r = await accumulator // accumulator是上次async函数的返回
    if (await callback(this[index], index, this)) {r = true}
    return r
  }, false))
  return res
}

let saveArr = []
let res = await [1, 2, 3].someSync(async (item, i, arr) => {
  console.log('some开始，item:', item) // 3个不会一起瞬间开始，
  saveArr[i] = await wait1s(i)
  // 第二个会等第一个迭代的异步完成才执行，能拿到第一个的异步结果，可以通过saveArr的内容发现
  console.log('item === 4:', item === 4, 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
  return item === 4
})
console.log(res) // false
```

打印结果如下：

some开始，item: 1 // 第0秒打印

i: 0 // 第6秒打印

item === 4: true saveArr: 0 undefined undefined // 第6秒打印， 拿不到第二次第三次迭代的内容，因为第二次第三次迭代还没开始

some开始，item: 2 // 第6秒打印

i: 1 // 第10秒打印

item === 4: false saveArr: 0 1 undefined // 第10秒打印，第二次迭代执行是在第一次得到结果之后的，自然能拿到第一次的结果

some开始，item: 3 // 第10秒打印

i: 2 // 第12秒打印

item === 4: false saveArr: 0 1 2 // 第12秒打印

false // 第12秒打印

#### 解决方案3：自己重写一个方法，用for of来处理。

方案三最终效果：迭代之间有先后顺序，后面的迭代会等前面的迭代中异步完成之后才执行，与some方案二一样，但是可以中途停止。

some方案3，实用场景，接口速度很快，多次等待前端体验仍可以保证，中途得到结果后，之后的接口可以不调取，节省后端资源。

**重要理解：**

**for of 循环中await也有效果，迭代会一次执行，比起reduce多了中断循环的作用**

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

Array.prototype.someSync = async function (callback, thisArg) {
  // thisArd： 原生some第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值

  for (let [index, item] of Object.entries(this)) {
    if (await callback(item, index, this)) {
      return true // 当匹配到可以通过return跳出循环
    }
  }
  return false
}

let saveArr = []
let res = await [1, 2, 3].someSync(async (item, i, arr) => {
  console.log('some开始，item:', item) // 3个不会一起瞬间开始，
  saveArr[i] = await wait1s(i)
  // 第二个会等第一个迭代的异步完成才执行，能拿到第一个的异步结果，可以通过saveArr的内容发现
  console.log('item === 4:', item === 4, 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
  return item === 4
})
console.log(res) // false
```

打印结果如下：

some开始，item: 1 // 第0秒打印

i: 0 // 第6秒打印

item === 4: true saveArr: 0 undefined undefined // 第6秒打印， 拿不到第二次第三次迭代的内容，因为第二次第三次迭代还没开始

some开始，item: 2 // 第6秒打印

i: 1 // 第10秒打印

item === 4: false saveArr: 0 1 undefined // 第10秒打印，第二次迭代执行是在第一次得到结果之后的，自然能拿到第一次的结果

some开始，item: 3 // 第10秒打印

i: 2 // 第12秒打印

item === 4: false saveArr: 0 1 2 // 第12秒打印

false // 第12秒打印

### every

every 与 some一样无法直接用async await

改造方法与every一样，只是逻辑判断有所不同，some有一个true跳出循环结果为true;

every有一个false跳出循环，结果为false.

#### forEach

forEach没有整体返回值，无法直接Promise.all直接处理结果

```js
const res = [1, 2, 3].forEach(item => {
  console.log(item ** 2) // 1 // 4 // 9  // 依次打印1，4，9
}) // 对数组元素求平方（无async await的普通forEach）
console.log(res) // undefined // forEach没有返回值
```

```js
const res = await [1, 2, 3].forEach(async item => {
  console.log(item ** 2) // 1 // 4 // 9  // 依次打印1，4，9
}) // 对数组元素求平方（有async await的forEach）
console.log(res) // undefined // 无论res=后加不加await，都是undefined，forEach没有返回值
```

添加一个延迟函数，看看实际执行顺序. 下面forEach中的async await无法使的每个迭代按照顺序去等待上一个迭代结束再执行下一个迭代。

一起开始，自己结束了就自己打印。

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

let arr = [1, 2, 3]
let saveArr = []
const res = await (arr.forEach(async (item, i) => { // 即使加了这个await，也没有效果
  console.log('forEach开始，item:', item) // 3个forEach会一起瞬间开始，这里开始就连续打印3个
  saveArr[i] = await wait1s(i)
  console.log('item:', item, 'saveArr:', saveArr[0], saveArr[1], saveArr[2]) // 按照延迟时间打印，2秒打印第三个i:2，
  // 第4秒打印二个i:1，第6秒打印二个i:0
  return item
}))
console.log('res', res) // undefined // 开始瞬间打印3个forEach后，立即打印undefined
console.log('Last:', 'arr:', arr[0], arr[1], arr[2], 'saveArr:', saveArr[0], saveArr[1], saveArr[2])

```

打印结果如下：

forEach开始，item: 1 // 第0秒打印

forEach开始，item: 2 // 第0秒打印

forEach开始，item: 3 // 第0秒打印

res undefined // 第0秒打印

Last: arr: 1 2 3 saveArr: undefined undefined undefined // 第0秒打印

i: 2 // 第2秒打印

item: 3 saveArr: undefined undefined 2 // 第2秒打印

i: 1 // 第4秒打印

item: 2 saveArr: undefined 1 2 // 第4秒打印

i: 0 // 第4秒打印

item: 1 saveArr: 0 1 2 // 第4秒打印

能够看出，在forEach中用async await，完全不等，迭代一起开始，之间没有先后顺序依赖，也无法直接拿到全部等待结束后的结果

#### 自定义forEach 用于async await

处理方案一，编写一个自定义forEach函数，并添加一个延迟函数，看看实际执行顺序。

可以实现每次迭代之间的等待。即：i:0第6秒出结果，i:1第10秒出结果，i:0第12秒出结果，最后整体给一个返回值

```js
Array.prototype.forEachSync = async function (callback, thisArg) {
  // thisArg： 原生forEach第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值
  for (let [index, item] of Object.entries(this)) { // for of 中的async await竟然有等待效果
    await callback(item, index, this)
  }
  return this // 把变化后的数组返回出去，使forEachSync有返回值
}
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}
let arr = [1, 2, 3]
let saveArr = [] // 存储异步结果
let res = await arr.forEachSync(async (item, i, arr) => {
  console.log('forEach开始，item:', item) // 3个forEach开始会按顺序，和时间间隔6，4，2打印。而不是上面一起打印。
  saveArr[i] = await wait1s(i)
  arr[i] = item ** 2
  console.log(item ** 2, 'saveArr:', saveArr[0], saveArr[1], saveArr[2]) // iR能拿到，相当于，每次迭代都能拿到上次迭代的异步结果
})
console.log(res)
```

打印结果如下：

forEach开始，item: 1 // 第0秒打印

i: 0 // 第6秒打印

1 "saveArr:" "0" undefined undefined // 第6秒打印

forEach开始，item: 2 // 第6秒打印

i: 1 // 第10秒打印

4 "saveArr:" "0" "1" undefined // 第10秒打印

forEach开始，item: 3 // 第10秒打印

i: 2 // 第12秒打印

9 "saveArr:" "0" "1" "2" // 第12秒打印

[1,4,9] // 第12秒打印

处理方案二，编写一个自定义forEach函数，并行所有迭代，最后都执行完，用Promise.all。请参考map处理方法，或filter处理方法1

### for

for迭代没有返回值，也不能return，return了会报错

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, (3 - i) * 2000)
  })
}

let arr = [1, 2, 3]
let saveArr = [] // 存储异步结果

for (let i = 0; i < arr.length; i += 1) { // for前不需要加await，最后一句也会等待
  console.log('for开始，arr[i]:', arr[i]) // 3个不会一起瞬间开始，
  saveArr[i] = await wait1s(i)
  // 第二个会等第一个迭代的异步完成才执行，能拿到第一个的异步结果，可以通过saveArr的内容发现
  console.log('arr[i]:', arr[i], 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
  arr[i] = arr[i] * 2
}

console.log('arr:', arr[0], arr[1], arr[2], 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
```

打印结果如下：

for开始，arr[i]: 1 // 第0秒打印

i: 0 // 第2秒打印

arr[i]: 1 saveArr: 0 undefined undefined // 第2秒打印

for开始，arr[i]: 2 // 第2秒打印

i: 1 // 第4秒打印

arr[i]: 2 saveArr: 0 1 undefined // 第4秒打印

for开始，arr[i]: 3 // 第4秒打印

i: 2 // 第6秒打印

arr[i]: 3 saveArr: 0 1 2 // 第6秒打印

arr: 2 4 6 saveArr: 0 1 2 // 第6秒打印，最后一句最后打印，for前不需要加await，最后一句也会等待

***综上所述***

***结合async await使用时***

***for, for of：***

***可以直接使用***

1. ***迭代本身没有返回值***
2. ***本来就是同步语句，前面不需要加await，整个循环下面的语句就会等***
3. ***循环迭代中的等待会影响下一轮迭代，即第二个迭代会等第一个迭代结束之后再开始***
4. ***上一轮循环的等待结果（如异步接口返回）如果存起来，下一轮迭代运行时可以拿到***
5. ***迭代可以随时退出，在有需要的地方可以提升性能***
6. ***可以用于改写自定义map，some，every，forEach,用于支持async await， 改写成迭代之间会等待-迭代顺序运行，后面迭代可以依赖前面迭代异步结果!!!filter逻辑上要所有数据过滤出来结果，
   一般不适合迭代之间先后依赖和打断操作***

***forEach：***

***直接使用不会报错，但是无法按照理想中的需求执行，无法直接使用***

1. ***迭代本身没有返回值***
2. ***前面即使加await，整个循环下面的语句不会等待***
3. ***迭代一起开始，相互无依赖，无顺序，所有迭代异步完成后也没有回调***
4. ***自定义forEach，方案1：用for,for of,reduce可以实现迭代顺序执行，相互等待， 最后一个迭代完成后（或者中途跳出后），再运行迭代后面语句一起处理；
   方案2：用map,forEach等将promise推到数组中，Promise.all可以实现迭代同时并行执行， 结果都得到之后，再运行迭代后面语句一起处理***

***map filter some every：***

***因为参1函数返回必定是Promise，直接运行逻辑上肯定是错误的，所以无法直接使用***

1. ***可以自定义函数实现需要的功能，方案1：用for,for of,reduce可以实现迭代顺序执行，相互等待， 最后一个迭代完成后（或者中途跳出后），再运行迭代后面语句一起处理；
   方案2：用map,forEach等将promise推到数组中，Promise.all可以实现迭代同时并行执行， 结果都得到之后，再运行迭代后面语句一起处理***
2. ***filter一般直接用Promise.all方案改写，原因见for第6条***
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

### eval

eval:

```js
let str = 'let name = `jack`;' + ' console.log( ' + '`Hello ${name}!`' + ')';
eval(str) // "Hello Jack!"
```

### async await

async必须要return一个promise，否则返回一个undefined，await一个undefined不会等

```js
const wait1s = async (i) => {
  // async必须要return一个promise，否则返回一个undefined，await一个undefined不会等 
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, 3000)
  })
}
let iR = await wait1s(1)
console.log('iR:', iR)
```

返回一个undefined，await一个undefined不会等

```js
const wait1s = async (i) => {
  // 默认返回一个undefined 
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i)
      resolve(i)
    }, 3000)
  })
}
let iR = await wait1s(1) // await一个undefined不会等
console.log('iR:', iR)
```

### async await 遍历方法 结合的问题

async await放在遍历方法（map、reduce、reduceRight、forEach、filter、some、every）中，会失效（不会等待一个之后再等，遍历会同步瞬间执行完）。
并且遍历还会出错，得到乱七八糟的结果（要么拿出来，要么特殊处理）。

个人碰到的问题：

理想中是，按照顺序拿到1st，2nd，3rd，4th的值。然后在循环结束的下面语句，拿到处理后的list。
实际上2nd，4th会最先执行，执行的时候拿不到1st，3rd里面期望拿到的值。整个循环结束时，异步并未结束，所以循环结束后期望得到的最后结果无法获得

```js
const list = [{ api: true, val: '1st' }, { api: false, val: '2nd' },
  { api: true, val: '3rd' }, { api: false, val: '4th' }]
list.forEach(async (item, i, arr) => {
  if (item.api === true) {
    // 调接口类的异步操作
    let res = await new Promise((resolve) => {resolve(item.val)}) // await api()
    // 操作item
    item.val2 = res
    // 最后打印出来。操作item的影响list的作用效果也会最后出现,上面实际需要的地方拿不到。
    console.log('item.val:', item.val)
  } else if (item.api === false) {
    // 无调接口的异步逻辑,第一个打印出来，操作item的影响list的作用效果,能在需要结果的地方拿到
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
 * 通过打印list[0].val2，能打印出实际运行时的值。
 */
```

打印顺序:

item.val: 2nd arr[0].val2 + "_save": undefined_save

item.val: 4th arr[0].val2 + "_save": undefined_save

需要结果的地方，list: (4) [{…}, {…}, {…}, {…}] list[0].val2 + "_save": undefined_save

item.val: 1st 最后打印出来。操作item的影响list的作用效果也会最后出现,上面实际需要的地方拿不到。

item.val: 3rd 最后打印出来。操作item的影响list的作用效果也会最后出现,上面实际需要的地方拿不到。

特殊处理如下：

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

// 编译成
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

reduce的结果时Promise所以最外面还需要一个await得到内容

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

i: 2 // 2秒后打印

i: 1 // 4秒后打印

i: 0 // 6秒后打印

r: 1 iR: 0 // 6秒后打印

r: 3 iR: 1 // 6秒后打印

r: 6 iR: 2 // 6秒后打印

6 // 6秒后打印

#### forEach

无法让map中的async await使的数组按照数组的顺序去执行异步。

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

const res = await ([1, 2, 3].forEach(async (item, i) => {
  console.log('forEach开始，item:', item) // 3个forEach会一起瞬间开始，这里开始就连续打印3个
  let iR = await wait1s(i)
  console.log('item:', item, 'iR:', iR) // 按照延迟时间打印，2秒打印第三个i:2，
  // 第4秒打印二个i:1，第6秒打印二个i:0
  return item
}))
console.log(res) // undefined // 开始瞬间打印3个forEach后，立即打印undefined
```

打印结果如下：

forEach开始 // 开始立即打印三遍

undefined // 立即打印res，完全不等待

i: 2 item: 3 iR: 2// 2秒后打印

i: 1 item: 2 iR: 1// 4秒后打印

i: 0 item: 1 iR: 0 // 6秒后打印

如下处理，与上面不处理没有区别，不能解决问题

```js
Array.prototype.forEachSync = async function (callback, thisArg) {
  // thisArg： 原生forEach第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值
  for (let [index, item] of Object.entries(this)) {
    await callback(item, index, this)
  }
}
let res = await [1, 2, 3].forEachSync(async item => {
  console.log(item ** 2)
})
console.log(res)
```

#### filter

虽然不能让map中的async await使的数组按照数组的顺序去执行异步。

但可以让map中所有异步都执行（并行同时执行）都完成后，再执行遍历之后的语句（能保证拿到所有异步的结果）

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

解决方案：用Promise.all来处理 加了 await 表现与上面一样

```js
const res = await [1, 2, 3].filter(async item => item % 2 !== 0) // 对数组元素求平方（有async await的map）
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
  console.log('filter开始，item:', item) // 3个forEach会一起瞬间开始，这里开始就连续打印3个
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

解决方案1：自己重写一个方法，用map 和 Promise.all来处理拿到结果，最后再用filter处理

```js
Array.prototype.filterSync = async function (callback, thisArg) {
  // thisArd： 原生forEach第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值
  let filterResult = await Promise.all(this.map(callback)) // [true, false, true]
  return this.filter((_, index) => filterResult[index])
}

let res = await [1, 2, 3].filterSync(async item => {
  console.log(item % 2 !== 0)
  return item % 2 !== 0
})
console.log(res)
```

打印结果

true

false

true

[1, 3]

解决方案2：自己重写一个方法，用reduce来处理，相当于 map Promise.all filter

```js
Array.prototype.filterSync = async function (callback, thisArg) {
  // thisArd： 原生forEach第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值

  const res = await (this.reduce(async (accumulator, item, index) => {
    let r = await accumulator // accumulator是上次async函数的返回
    if (await callback(this[index])) {r.push(item)}
    return r
  }, []))
  console.log(res) // [1, 3]
  return res
}

let res = await [1, 2, 3].filterSync(async (item) => {
  console.log('441行','item:',item,item % 2 !== 0)
  return item % 2 !== 0
})
console.log(res) // [1, 3]
```

打印结果如下：

true

false

true

[1, 3]

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
Array.prototype.filterSync = async function (callback, thisArg) {
  // thisArd： 原生forEach第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值

  const res = await (this.reduce(async (accumulator, item, index) => {
    let r = await accumulator // accumulator是上次async函数的返回
    if (await callback(this[index], index)) {(await accumulator).push(item)}
    return (await accumulator)
  }, []))
  console.log(res) // [1, 3]
  return res
}

let res = await [1, 2, 3].filterSync(async (item,i) => {
  console.log('开始filterSync,item:',item,i)
  let iR = await wait1s(i)
  console.log('441行','item:',item,item % 2 !== 0)
  return item % 2 !== 0
})
console.log(res) // [1, 3]
```
打印结果如下：

开始filterSync,item: 1 0 // 0秒

i: 0 // 6秒

441行 item: 1 true // 6秒

开始filterSync,item: 2 1 // 6秒

i: 1 // 10秒

441行 item: 2 false // 10秒

开始filterSync,item: 3 2 // 10秒

i: 2 // 12秒

441行 item: 3 true // 12秒

[1, 3] // 12秒

[1, 3] // 12秒
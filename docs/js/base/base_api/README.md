## js原生api

### Math对象

```js
Math.round(3.6) //4 四舍五入

Math.random() //var x = Math.random() 产生一个0-1的小数，包含0，不包含1

Math.max(num1, num2) //返回交大数

Math.min(num1, num2) //返回交小数

Math.abs(num) //绝对值

Math.ceil() //向上取整

Math.floor() //向下取整

Math.pow(x, y) //x的y次方

Math.sqrt(num) //开平方
```

### Date

```js
let date = new Date() // 新建时间对象的方法。不设定参数时，为计算机当时的时间。

let date1 = new Date(2006,2,8,12,15,35) // 参数形式 ：YYYY,M,D,H,M,S

let date2 = new Date(2003,2,8) // 年月日

let date3 = new Date(2325545454) // 毫秒数

// 获取/设置年月日

date.getFullYear()
date.setFullYear(2014)

date.getMonth()
date.setMonth(8) // 值从0-11，0指1月

date.getDate()
date.setDate(29)

date.getDay() // 得到星期，星期无法写入，值0-6，0是星期天

date.getHours()
date.setHours() // 值0-23

date.getMinutes()
date.setMinutes() // 值0-59

date.getSeconds()
date.setSeconds() // 值0-59

date.getTime()
date.setTime() // 单位：毫秒数
```

### 计算精度产生小数问题
0.29*100不会得到29，而是28.99999999
希望得到正确结果

```javascript
// 1、toFixed()方法
// 需注意，保留两位小数，将数值类型的数据改变成了字符串类型

// 1.四舍五入
var num =2.446242342;
num = num.toFixed(2);
console.log(num); //2.45
console.log(typeof num); // string

// 2、Math.floor()，不四舍五入 ，向下取整
// 注意，不改变数据类型

// 2.不四舍五入 向下取整
num = Math.round(num * 100) / 100;
console.log(num); //2.44
console.log(typeof num); // number
```

### localStorage sessionStorage cookie 对比

|     对比        | localStorage    | sessionStorage  | cookie |
| :-------------: | :-------------: | :-----: | :-----: |
|  **失效**    | 关浏览器不会丢失 | 关闭浏览器窗口数据销毁 | 关浏览器不会丢失，可设置过期时间 |
|  **大小**      | 5MB      |   5MB |4KB |
|  **共享**  | 同域名共享数据，浏览器不同窗口实时同步共享 | 新建立的页面不会共享session数据，同一浏览器已经开的相同的2个页面之间也不会共享。</br>通过当前页面跳转的会共享数据，比如window.open，但是之后两个页面的session数据是相互独立的|同域名共享数据，浏览器不同窗口实时同步共享 |
|  **请求** | 请求不会自动附上     |    请求不会自动附上| 请求会自动附上， 因此会浪费一部分带宽 |

### localStorage

基本方法：

1. 存储：localStorage.setItem(key,value)

通过键名写入键值，如果key存在时，更新value

2. 获取：localStorage.getItem(key)

通过键名获得键值，如果key不存在返回null

3. 删除：localStorage.removeItem(key)

通过键名删除键值对，一旦删除，键名和值将会全部删除

4. 全部清除：localStorage.clear()

清除所有localStorage对象保存的数据

5. 遍历localStorage存储的key

数据总数：localStorage.length

localStorage.key(index) 获取key

6. 不能直接保存对象，存储JSON格式数据或对象需要转字符串

JSON.stringify(data) 将一个对象转换成数据串

JSON.parse(data) 将数据解析成对象

7. 遍历

迭代，localStorage（sessionStorage）是一个对象，它包含存储的内容键值对，最后还有一个length:长度，
用自身循环方法key迭代时，不会迭代出长度属性。

```js
for (let i = 0; i <= localStorage.length; i++) {
   let key = localStorage.key(i) //遍历键值，这里设计的方法比较特别，
   // 相当于序号，键名，键值3个内容互相绑定。 这里通过序号遍历键名
   
   console.info(localStorage.key(i), localStorage.getItem(key)) // key  val
}
```

无法用for of迭代

```js
for (key of localStorage){ // localStorage is not iterable 
  // localStorage和sessionStorage无法枚举
   
  console.log('key:',key,'localStorage[key]',localStorage[key])
}
```

### localhost

127.0.0.1 等同于 localhost

### switch

条件是 === 比较

```js
// 其中case是全等才走
let str
switch (level) {
   case 'a': // 不写break穿透合并，即a 会执行后面A的语句

   case 'A':
      str = '您的成绩是85-100之间'
      break
   case 'b':

   case 'B':
      str = '您的成绩是60-84之间'
      break
   case 'c':

   case 'C':
      str = '您挂科了'
      break
   default:
      str = '数据错误'
      break
}
```

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
function a () { // function是声明，会提升至作用域最上面
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
var c = function () { // function是表达式，表达式方式声明函数，申明不会提升
  console.log('c')
}
c() // c
```

### 函数声明提升优先

函数声明整体首先会被提升，然后才是普通变量声明的提升（普通变量只是声明提升，赋值及其他逻辑均留在原处）

```js
foo() // 1
var foo
function foo(){
  console.log(1)
}
foo = function () {
   console.log(2)
}
```

引擎理解成如下形式：

```js
function foo(){
   console.log(1)
}

var foo // 尽管普通变量声明提升在后面，但是普通变量声明只有声明被提升，赋值在原地，
// 然后重复声明并没有把前面值覆盖，而是忽略了重复声明。

foo() // 1
foo = function () {
   console.log(2)
}
```

### 函数声明

尽可能避免把函数声明放在判断条件中，因为js未来版本中解析规则可能会发生变化
(当chrome前版本84，已经将function解析在内部了，无法提升，打印Uncaught TypeError: foo is not a function)

```js
foo() // b // 84版chrome打印Uncaught TypeError: foo is not a function
var a = true
if(a){
  function foo(){console.log('a')}
   foo() // a
} else {
  function foo(){console.log('b')}
}
{
   function foo(){console.log('c')}
}
(function foo(){console.log('c')}) // Uncaught TypeError: foo is not a function
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
const aFn = async (val) => val

const list = [{ api: true, val: '1st' }, { api: false, val: '2nd' },
   { api: true, val: '3rd' }, { api: false, val: '4th' }]
list.forEach(async (item, i, arr) => {
   if (item.api === true) {
      // 调接口类的异步操作
      // let res = await new Promise((resolve) => {resolve(item.val)}) // await api()
      let res = await aFn(item.val) // 即使是个看似直接返回的函数，
      // 只要包了async，如同下面基础回顾描述的，
      // 执行的时候会包成new Promise((resolve) => {resolve(item.val)})

      // 操作item
      item.val2 = res
      // 最后打印出来。操作item的影响list的作用效果也会最后出现，上面实际需要的地方拿不到。
      console.log('item.val:', item.val)
   } else if (item.api === false) {
      item.val2 = item.val
      // 无调接口的异步逻辑,第一个打印出来，操作item的影响list的作用效果，能在需要结果的地方拿到
      // （也有下面的巨坑，打印arr，展开arr里面arr[0].val2有值，直接打印arr[0].val2没值）
      console.log('item.val:', item.val, 'arr:', arr, 'arr[0].val2:', arr[0].val2)
   }
})
// 在两个同步之后打印，两个异步还没结束，forEach入参函数async和异步分支中的await失效。
// 这里拿不到想要的异步结果，异步逻辑做的item处理效果这里也会漏掉'
// 需要结果的地方list[0]和list[3]的val2值拿不到
console.log('list:', list, 'list[0].val2:', list[0].val2, 'list[1].val2:', list[1].val2)
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

// async函数一定会返回一个promise对象。如果一个async函数的返回值看起来不是promise，那么它将会被隐式地包装在一个promise中。
async function fn2 () {
  return new Promise(resolve => resolve(1))
}
```

#### map

map参1函数无法直接使用 async await

利用for，for of，reduce自定义map能让map中的async await使的数组按照数组的顺序去执行异步。（参考下面filter，some）

下面是让map中所有异步都执行（并行同时执行）都完成后，再执行遍历之后的语句（能保证拿到所有异步的结果）

```js
const res = [1, 2, 3].map(item => item ** 2) // 对数组元素求平方（无async await的普通map）
console.log(res) // [1, 4, 9]
```

```js
const res = [1, 2, 3].map(async item => item ** 2) // 对数组元素求平方（有async await的map）
console.log(res) // [Promise, Promise, Promise]
// 直接用得不到想要的结果[1, 4, 9]，得到的是Promise数组
```

解决方案：用Promise.all来处理直接map后的结果

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

```js
const res = await ([1, 2, 3].reduce(async (accumulator, item) => (await accumulator) + item, 0))
console.log(res) // 6
```

添加一个延迟函数，看看实际执行顺序。

这里非常有意思， 既可以实现每个迭代中的异步按照顺序依次依赖，最后一个迭代结束，计算出reduce结果。 也可以实现，每个迭代中异步同时开始，等到所有迭代都好了，再计出reduce结果。类似与Promise.all的效果。

1.每个异步同时开始，等到所有都好了再计算，相当于也有Promise.all的效果

**将要等待的异步操作语句放在await accumulator之前。 reduce内部本身所有迭代会同时执行，放在await accumulator之前的异步语句会同时开始执行。 碰到await
accumulator会block，因为上一个迭代的promise还在等待状态（即await accumulator还在等待状态）**

下面例子分析：

因为wait1s(1),wait1s(2),wait1s(3)同时执行，所以wait1s分别在6s，4s，2s完成。

因为第2秒时完成的是第三个迭代中的wait1s， 第三个迭代走到await accumulator， 因为第三个accumulator需要前面的accumulator变成完成状态后才能开始，所以block在这里。

第4秒，第二个迭代同之前第三个迭代，也block在accumulator，因为第一个accumulator还是未完成。

第6秒，第一个迭代wait1s结束，走到第一个迭代的accumulator，第一个accumulator是初始值也就是0，不是一个promise，不用等待，直接往下走。
还是第6秒，第一个迭代的accumulator瞬间走完promise状态变成完成，此时第二个accumulator因为它前面的第一个accumulator的promise完成了，
它自身没有block，所以也一下子变成了完成状态，一次类推，第三个accumulator也瞬间变成完成状态。reduce所有迭代都走到了最后。 reduce的结果就出来了。

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i) // 按照延迟时间打印，2秒打印第三个i:2，
      // 第4秒打印二个i:1，第6秒打印二个i:0
      resolve(i)
    }, (3 - i) * 2000)
  })
}

let saveArr = []
const res = await ([1, 2, 3].reduce(async (accumulator, item, i) => {
  console.log('reduce开始') // 3个瞬间连续打印
  console.log('item:', item, 'saveArr:', saveArr[0], saveArr[1], saveArr[2]) // 3个瞬间连续打印，saveArr都是undefined

  saveArr[i] = await wait1s(i) // 同时开始执行3个wait1s，返回promise，延时函数已经开始计时，秒数到之前block下面语句
  let r = (await accumulator) + item // accumulator是前一个迭代返回的promise，会被前面promise的等待状态block
  // 只有第一个是默认值，不是promise，不会被block
  // 前一个迭代的promise(即本次accumulator)状态变成完成后，这句马上继续马上往下走，本身没有其他等待的动作

  console.log('item:', item, 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
// 这里相当于reduce被block住，所有延迟结束后在计算最后结果，三个结果一起打印
  return r
}, 0))
// 6秒后，也就是reduce里面的语句都走完了，拿到所有等待后结果，计算reduce的最后结果
console.log(res) // 6
```

打印结果如下：

reduce开始 // 第0秒打印

item: 1 saveArr: undefined undefined undefined // 第0秒打印

reduce开始 // 第0秒打印

item: 2 saveArr: undefined undefined undefined // 第0秒打印

reduce开始 // 第0秒打印

item: 3 saveArr: undefined undefined undefined // 第0秒打印

i: 2 // 第2秒打印

i: 1 // 第4秒打印

i: 0 // 第6秒打印

item: 1 saveArr: 0 1 2 // 第6秒打印

item: 2 saveArr: 0 1 2 // 第6秒打印

item: 3 saveArr: 0 1 2 // 第6秒打印

6 // 第6秒打印

2.每个异步按照顺序依次依赖执行

***与上面代码唯一的区别就是await wait1s(i)语句和 await accumulator语句交换了顺序***

下面例子分析：

每个迭代accumulator前面的语句，按顺序瞬间一起执行， 执行到accumulator，除了第一个都被前一个迭代promise的状态是等待block住， 第一个迭代直接执行到accumulator，进入延时函数，第一个开始延时。

6s后延时结束，wait1s的promise状态变成完成，第一个迭代后面没有异步语句，所以一下子都走完。 第二个迭代accumulator状态因此瞬间变成完成，第二个wait1s执行，第二个开始延时。

同上， 第10秒，第二个迭代的wait1s的promise状态变成完成，第二个迭代后面没有异步语句，所以一下子都走完。 第三个迭代accumulator状态因此瞬间变成完成，第三个wait1s执行，第三个开始延时。

同上，第12秒第三个迭代的wait1s的promise状态变成完成，第二个迭代后面语句一下子都走完。 reduce里的迭代都走完，开始走reduce的最终结果计算

```js
const wait1s = async (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('i:', i) // 第6秒打印i:0， 第10秒打印i:1，第12秒打印i:2，
      resolve(i)
    }, (3 - i) * 2000)
  })
}

let saveArr = []
const res = await ([1, 2, 3].reduce(async (accumulator, item, i) => {
  console.log('reduce开始') // 3个瞬间连续打印
  console.log('item:', item, 'saveArr:', saveArr[0], saveArr[1], saveArr[2]) // 3个瞬间连续打印，saveArr都是undefined

  let r = (await accumulator) + item // accumulator是前一个迭代返回的promise，会被前面promise的等待状态block
  // 只有第一个是默认值，不是promise，不会被block。这里就是第一个，直接走完，accumulator的promise状态变成成功
  // 第二个以及之后的await accumulator也已经走到，也会立刻建立promise，但因为之前的迭代返回promise状态没有完成，promise状态保持等待，block在这里

  saveArr[i] = await wait1s(i) // 第一个wait1s因为第一个accumulator直接成功，这里也可以直接开始，延时函数开始计时。当第一个延时6秒结束
  // 第二个accumulator（即第一个迭代返回值的promise）才完成，走到第二个wait1s，第二个延时函数开始

  console.log('item:', item, 'saveArr:', saveArr[0], saveArr[1], saveArr[2])
  // 这里6s，10s，12s打印
  return r
}, 0))
// 第12秒，最后一个迭代的语句也走完了，计算reduce的最后结果
console.log(res) // 6
```

打印结果如下：

reduce开始 // 第0秒打印

item: 1 saveArr: undefined undefined undefined // 第0秒打印

reduce开始 // 第0秒打印

item: 2 saveArr: undefined undefined undefined // 第0秒打印

reduce开始 // 第0秒打印

item: 3 saveArr: undefined undefined undefined // 第0秒打印

i: 0 // 第6秒打印

item: 1 saveArr: 0 undefined undefined // 第6秒打印

i: 1 // 第10秒打印

item: 2 saveArr: 0 1 undefined // 第10秒打印

i: 2 // 第12秒打印

item: 3 saveArr: 0 1 2 // 第12秒打印

6 // 第12秒打印

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

方案一效果，迭代之间没有先后顺序，一起开始执行，都执行完了Promise.all拿到结果。

原生map参数1-函数中的await不能使迭代之间有等待的效果

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
  // 第4秒打印二个i:1，第6秒打印二个i:0
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

#### 解决方案2：自己重写一个方法，用for或for of 或 reduce来处理。迭代之间会相互等待，最后一个结果也拿到之后，所有结果filter一下

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
let saveArr = []

Array.prototype.filterSync = async function (callback, thisArg) {
  // thisArd： 原生filterh第二个可选参数
  // 可选。传递给函数的值一般用 "this" 值。
  // 如果这个参数为空， "undefined" 会传递给 "this" 值

  // reduce和filter,forEach,map不同，不能支持传入this
  const res = await (this.reduce(async (accumulator, item, index) => {

    let r = await accumulator // accumulator是上次async函数的返回
    console.log('item:', item, 'saveArr:', saveArr[0], saveArr[1], saveArr[2])

    if (await callback(this[index], index, this)) {r.push(item)} // 这里很重要，这里是callback里面的wait1s，在accumulator后面，所以和reduce里面第二种解决方案执行结果一样

    return r
  }, []))

  /*  const res = await (this.reduce(async (accumulator, item, index) => { // await accumulator后面没用变量r代替，这样写和上面一样效果， 
      //同一个promise结果是相同的，不会因为用的是变量还是原来的await表现的不同
      
      let r = await accumulator // accumulator是上次async函数的返回
      if (await callback(this[index], index)) {(await accumulator).push(item)}
      return (await accumulator)
    }, []))
    console.log(res) // [1, 3] */
  return res
}

let res = await [1, 2, 3].filterSync(async (item, i, arr) => {
  console.log('filter开始，item:', item) // 3个不会一起瞬间开始，
  saveArr[i] = await wait1s(i)
  // 第二个wait1s会等第一个迭代的异步完成才执行，能拿到第一个的异步结果，可以通过saveArr的内容发现
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
  // 第4秒打印二个i:1，第6秒打印二个i:0
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
    if (await callback(this[index], index, this)) {r = true} // 这里很重要，这里是callback里面的wait1s，在accumulator后面，所以和reduce里面第二种解决方案执行结果一样

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

#### 解决方案3：自己重写一个方法，用for或for of来处理。

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

#### every

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

处理方案一，利用for或for of编写一个自定义forEach函数，并添加一个延迟函数，看看实际执行顺序。

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

***直接使用，需要有所改动（具体见上面reduce）***

1. ***迭代本身有返回值***
2. ***每次迭代返回值都会因为是async函数被包一层promise，用之前需要用await解开***
2. ***最后的返回值也会因为是async函数被包一层promise，所以最后结果也要用await解开***
3. ***可以实现和for，for of一样的迭代之间有依赖，一次执行的效果。异步等待写在accumulator(即上一次迭代返回的promise)后面，通过accumulator来block异步操作的开始。***
4. ***也可以实现异步一起执行，异步都完成后Promise.all一起处理的效果。异步等待写在accumulator(即上一次迭代返回的promise)前面，因为reduce所有迭代本身都会一起开始执行。***
5. ***相较与for，for of，reduce迭代无法中断，无法做条件判断中断的性能优化***
6. ***可以用于改写自定义map，some，every，forEach的两种方式改写。***
7. ***filter逻辑上要所有数据过滤出来结果， 一般不适合迭代之间先后依赖和打断操作，所有不会用reduce改写***

***forEach：***

***直接使用不会报错，但是无法按照理想中的需求执行，无法直接使用***

1. ***迭代本身没有返回值***
2. ***前面即使加await，整个循环下面的语句不会等待***
3. ***迭代一起开始，相互无依赖，无顺序，所有迭代异步完成后也没有回调***
4. ***自定义forEach，方案1：用for,for of,reduce可以实现迭代顺序执行，相互等待，
   最后一个迭代完成后（或者中途跳出后），再运行迭代后面语句一起处理（如过用reduce，见reduce方案1，注意关键语句先后顺序）；
   方案2：用map,forEach等将promise推到数组中，Promise.all可以实现迭代同时并行执行， 结果都得到之后，再运行迭代后面语句一起处理。也可用reduce实现，见reduce方案1，注意关键语句先后顺序***

***map filter some every：***

***因为参1函数返回必定是Promise，直接运行逻辑上肯定是错误的，所以无法直接使用***

1. ***可以自定义函数实现需要的功能，方案1：用for,for of,reduce可以实现迭代顺序执行，相互等待，
   最后一个迭代完成后（或者中途跳出后），再运行迭代后面语句一起处理（如过用reduce，见reduce方案1，注意关键语句先后顺序）；
   方案2：用map,forEach等将promise推到数组中，Promise.all可以实现迭代同时并行执行， 结果都得到之后，再运行迭代后面语句一起处理。也可用reduce实现，见reduce方案1，注意关键语句先后顺序***
2. ***filter一般直接用Promise.all方案改写，原因见for第6条***


### await 无限等待

new Promise 时如果不resolve，await可以一直卡着后面代码。（await转译成回调形式，回调形式永远不调回调，所以会调里面的永远不会运行）

```js
const wait1 = () => {
   return new Promise((resolve) => {
      //如果不调用resolve
      // setTimeout(()=>{resolve({})},5000)
   })
}
const back = async () => {
   await wait1();
   console.log('reload!!!!!2222') // 如果不调用resolve，这里会一直被wait卡着，不打印
};

```


### console

### 打印dom信息

1. 把它作为数组的一项或者是对象的一个属性值
2. console.dir()

### 打印对象

运行中打印对象会显示运行最后的结果，需要打印当时的结果：

console.log(JSON.stringify(obj)) 或者深拷贝

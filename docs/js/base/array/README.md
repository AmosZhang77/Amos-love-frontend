## 数组

### 遍历数组

```

forEach

```js
let arr = [1, 2, 3, 4];
arr.forEach(function (value, index, array) {
  array[index] == value //结果为true
  sum += value
})
console.log(sum) //结果为 10
```

for of

```js
let arr = [1, 2, 3, 4];
let sum
for (item of arr) {
  if (item) {
    console.log(item) // 1 // 2 // 3 // 4 // undefined 
    // 最后会遍历出一个undefined，所以要判断一下，要注意!
    sum += item
  }
}
console.log(sum) //结果为 10

```

# indexOf

数组的内容是对象，可以用对象的引用来搜索位置
```js
const arr = [{n:1},{n:2},{n:3}]
arr.indexOf(zjx[1]) // 1
```

### 数组浅拷贝

```js
arr2 = arr1.slice()
```

```js
arr2 = [...arr1]
```
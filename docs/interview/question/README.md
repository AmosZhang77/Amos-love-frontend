```js
const sum
sum(2,3)() === 5
sum(2,3)(1,3)() === 9
sum(2,3)(0,1)(1,3)() === 10
sum(2,3)() === 5
```
写出sum

<interview-byteDance/>

写出一个函数入参为n，返回值如下

n=1 时  ['()']

n=2 时 ['()()','(())']

n=3 时 ['()()()','(())()','()(())','(()())']
## js原生方法



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
let str = 'let name = `jack`;' + ' console.log( ' + '`Hello ${name}!`'+')';
eval(str) // "Hello Jack!"
```


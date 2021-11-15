超文本传输协议（Hyper Text Transfer Protocol，HTTP）是一个简单的请求-响应协议，它通常运行在TCP之上。 它指定了客户端可能发送给服务器什么样的消息以及得到什么样的响应。

Protocol 英 [ˈprəʊtəkɒl] 美 [ˈproʊtəkɑːl]

HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道， 在HTTP的基础上通过*传输加密*和*身份认证*保证了传输过程的安全性。

HTTPS 在HTTP 的基础下加入SSL，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。

传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议

tcp三次握手：

第一次握手：S只可以确认 自己可以接受C发送的报文段

第二次握手：C可以确认 S收到了自己发送的报文段，并且可以确认 自己可以接受S发送的报文段

第三次握手：S可以确认 C收到了自己发送的报文段

HTTP请求的方式，HEAD方式

参考回答：

head：类似于get请求，只不过返回的响应中没有具体的内容，用户获取报头

options：允许客户端查看服务器的性能，比如说服务器支持的请求方式等等。

fetch发送2次请求的原因

参考回答：

fetch发送post请求的时候，总是发送2次，第一次状态码是204，第二次才成功？

原因很简单，因为你用fetch的post请求的时候，导致fetch 第一次发送了一个Options请求， 询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求。

Cookie如何防范XSS攻击

参考回答：

XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上，set-cookie： httponly-这个属性可以防止XSS,它会禁止javascript脚本来访问cookie。
Set-Cookie由服务器发送，它包含在响应请求的头部中。

=== 与 object.is的区别之处

```js
Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
NaN === NaN // false
+ 0 === -0 // true
```

微任务(microtask)
async/await，Promise.then，Object.observe，MutationObserver

宏任务(macroTask)
绑定事件（如click），setTimeout，setInterval，ajax

Promise.allSettled 无论对错，全部返回

```js
const p1 = new Promise((resolve, reject) => {setTimeout(() => {resolve(1)}, 1000)})
const p2 = new Promise((resolve, reject) => {setTimeout(() => {reject(2)}, 1000)})

// right [{status:'fullfilled, value:1}, {status:'rejected, reason:1}]
Promise.allSettled([p1, p2, p3]).then((e) => {console.log('right', e)}).catch((e) => {console.log('err', e)})
```

Promise.all 只要有一个错误就返回这个错误，如果有两个以上报错只返回第一个报错
```js
const p1 = new Promise((resolve, reject) => {setTimeout(() => {resolve(1)}, 1000)})
const p2 = new Promise((resolve, reject) => {setTimeout(() => {reject(2)}, 1000)})
const p3 = new Promise((resolve, reject) => {setTimeout(() => {reject(3)}, 1000)})
// err 2 
Promise.all([p1, p2, p3]).then((e) => {console.log('right', e)}).catch((e) => {console.log('err', e)})
```

垂直水平居中

1. absolute 加 margin auto

```vue

<template>
  <div class="p">
    <div class="c">

    </div>
  </div>
</template>
<style>
.p {
  position: relative;
  background-color: #ccc;
  height: 900px;
}

.c {
  position: absolute;
  height: 300px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: red;
}
</style>
```

<interview-center1/>

2. 

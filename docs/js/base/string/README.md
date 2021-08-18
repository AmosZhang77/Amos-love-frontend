## 字符串

### 字符串中是否包含字符串

String.prototype.includes()

includes() 方法用于判断一个字符串searchString是否包含在另一个字符串str中，根据情况返回 true 或 false。

语法

str.includes(searchString[, position])

```js
/**
 * 参数
 searchString
 要在此字符串中搜索的字符串。
 
 position 可选
 从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 0。
 */
str.includes(searchString[, position])

```

区分大小写
includes() 方法是区分大小写的。例如，下面的表达式会返回 false ：
```js
'Blue Whale'.includes('blue'); // returns false
```

实例

```js
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false
```
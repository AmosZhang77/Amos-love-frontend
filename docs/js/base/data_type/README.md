## 数据类型判断
### 数据类型判断
Instance of & type of
Instance of 操作符左边一定要是实例，如果是基本类型直接返回false。检测对象之间的关联，a是否是b的实例。 
```js
new Number(888) instanceof Number // true
888 instanceof Number // false

```
用new 创建的数组 字符串 数字都是引用类型，可以用instance of

[comment]: <> (![An image]&#40;./img1.png&#41;)
<img src="./img1.png" width = "450" height = "250" align=center />

[comment]: <> (## 数据类型判断2)

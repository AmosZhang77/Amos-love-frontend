## class

### 遍历数组

```js
class classA {
  constructor () {

  }

  playOrg () {console.log('playOrgClaseFn')} // 类的内部所有定义的方法，都是不可枚举的
}

/**
 * class 是语法糖，和es5一样靠原型链实现。
 * 所以可以用es5的assign给class加方法，
 * 但是这样普通赋值属性的方法，在生成对象上可枚举
 * */
Object.assign(classA.prototype, { // Object.assign()拷贝的是（可枚举）属性值
  play () {console.log('palyFnDo')}
})
// 但是这里是Object.assign的方法格式, 这里面需要往Point.prototype里面添加的方法就需要符合对象的默认格式

let p = new classA

for (let o in p) {
  console.log(o) // play
}

p.playOrg() // playOrgClaseFn
p.play() // palyFnDo
```

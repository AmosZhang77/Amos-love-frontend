### 全文忽略
```ts
/* tslint-disable */
/* eslint-disable */
```

### 忽略ts单行检查

```ts
// @ts-ignore
```

### 忽略ts全文检查

```ts
// @ts-nocheck
```


### 取消忽略ts全文检查

```ts
// @ts-check
```



### 忽略单行检查
/* tslint:disable */

ts内建重要类型

dom
```typescript
const dom: HTMLElement = document.getElementById('app')
```


### 其他没有设定属性，设定一个类型，[propName: string]

```typescript
interface a {
  a: string;
  b: number;
  [propName: string]: any;
}
```

其他没有使用的属性名 可以统一使用[propName: string]: number | string | boolean | Array<string>;


## declare namespace API 申明全局命名空间

在typings.d.ts文件中申明全局命名空间，所有typings.d.ts文件中都可以
（不同的文件中有相同的两个命名空间，如API会产生冲突，因避免）
在使用类型时，可以通过申明的命名空间直接使用

```ts
// typings.d.ts
declare namespace API1 {
  type InitialStateItem<T = any> = {
    id?: number | string;
    name?: string;
  };
}
```
```ts
export default function(initialState: API1.InitialStateItem) {
}
```

### 接口合并 接口拓展

可使用继承接口的方式

也可以使用&拼接的作用
```typescript
type A1 = {name:string}
type A2 = {age:number}
type A = A1 & A2
let b: A = {name:'sansan',age:22}
```


引入js模块因为没有类型文件而报错，在typings.d.ts加入declare module '模块名'

```typescript
// typings.d.ts
declare module 'uuid';
```
```typescript
// uuid 为js包
import { v4 } from 'uuid';
```
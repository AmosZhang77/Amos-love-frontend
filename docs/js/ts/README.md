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
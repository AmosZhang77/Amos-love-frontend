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
### ts基础学习

tsconfig.json 文件，ts配置文件
```javascript
// tsconfig.json
const config = {
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. 指定ECMAScript的目标版本*/
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 指定模块代码的生成方式*/
    // "lib": [],                             /* Specify library files to be included in the compilation. 指定编译的时候用来包含的编译文件*/
    // "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译JS文件*/
    // "checkJs": true,                       /* Report errors in .js files. 在JS中包括错误*/
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定JSX代码的生成方式 是保留还是react-native或者react*/
    // "declaration": true,                   /* Generates corresponding '.d.ts' file.生成相应的类型声明文件 */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. 为每个类型声明文件生成相应的sourcemap*/
    // "sourceMap": true,                     /* Generates corresponding '.map' file. 生成对应的map文件 */
    // "outFile": "./",                       /* Concatenate and emit output to single file. 合并并且把编译后的内容输出 到一个文件里*/
    // "outDir": "./",                        /* Redirect output structure to the directory.按原始结构输出到目标目录 */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 指定输入文件的根目录，用--outDir来控制输出的目录结构*/
    // "composite": true,                     /* Enable project compilation 启用项目编译*/
    // "removeComments": true,                /* Do not emit comments to output. 移除注释*/
    // "noEmit": true,                        /* Do not emit outputs. 不要输出*/
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. 当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule').r把每一个文件转译成一个单独的模块 */

    /* Strict Type-Checking Options */
    //"strict": true,                           /* Enable all strict type-checking options. 启用完全的严格类型检查 */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. 不能使用隐式的any类型*/
    // "strictNullChecks": true,              /* Enable strict null checks. 启用严格的NULL检查*/
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. 启用严格的函数类型检查*/
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions.启用函数上严格的bind call 和apply方法 */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. 启用类上初始化属性检查*/
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type.在默认的any中调用 this表达式报错 */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. 在严格模式下解析并且向每个源文件中发射use strict*/

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用到的本地变量时报错 */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用到的参数时报错*/
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 当不是所有的代码路径都有返回值的时候报错*/
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 在switch表达式中没有替代的case会报错 */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). 指定模块的解析策略 node classic*/
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. 在解析非绝对路径模块名的时候的基准路径*/
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. 一些路径的集合*/
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. 根目录的列表，在运行时用来合并内容*/
    // "typeRoots": [],                       /* List of folders to include type definitions from. 用来包含类型声明的文件夹列表*/
    // "types": [],                           /* Type declaration files to be included in compilation.在编译的时候被包含的类型声明 */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking.当没有默认导出的时候允许默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
    //"esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.*/
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks.不要symlinks解析的真正路径 */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. 指定ts文件位置*/
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. 指定 map文件存放的位置 */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. 源文件和sourcemap 文件在同一文件中，而不是把map文件放在一个单独的文件里*/
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. 源文件和sourcemap 文件在同一文件中*/

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启动装饰器*/
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

### 1. 数据类型

#### 1.1 布尔类型(boolean)

```typescript
let married: boolean = false;
```

#### 1.2 数字类型(number)

```typescript
let age: number = 10;
```

#### 1.3 字符串类型(string)

```typescript
let firstname: string = 'Jack';
```

#### 1.4 数组类型(array)

```typescript
let arr2: number[] = [4, 5, 6];
let arr3: Array<number> = [7, 8, 9];
```

#### 1.5 元组类型(tuple)

在 TypeScript 的基础类型中，元组（ Tuple ）表示一个已知数量和类型的数组

```typescript
let tuple: [string, number] = ['tuple', 5];
tuple[0].length;
tuple[1].toFixed(2);
```

| 元组        | 数组           |
| :-------------:|:-------------:|
| 每一项可以是不同的类型    | 每一项都是同一种类型 | 
| 有预定义的长度      | 没有长度限制      |
| 用于表示一个结构 | 用于表示一个列表 | 


```typescript
const animal: [string, number, boolean] = ['cat', 10, true];
```

#### 1.6 枚举类型(enum)

事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值 比如性别、月份、星期、颜色、单位、学历

#### 1.6.1 普通枚举

```typescript
enum Gender {
    GIRL,
    BOY
}

console.log(`李雷是${Gender.BOY}`);
console.log(`韩梅梅是${Gender.GIRL}`);

enum Week {
    MONDAY = 1,
    TUESDAY = 2
}

console.log(`今天是星期${Week.MONDAY}`);
```

#### 1.6.2 常数枚举

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

假如包含了计算成员，则会在编译阶段报错

枚举常量不会编译出函数，而是常量，提高性能

```typescript
const enum Colors {
    Red,
    Yellow,
    Blue
}

let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];

const enum Color {Red, Yellow, Blue = "blue".length}; // 这里会报错
// const enum member initializers can only contain literal values and other computed enum values.
```

#### 1.7 任意类型(any)

any就是可以赋值给任意类型

第三方库没有提供类型文件时可以使用any

类型转换遇到困难时

数据结构太复杂难以定义

```typescript
let root: any = document.getElementById('root');
root.style.color = 'red';

// 这里只是举个例子，实际上这里应该用ts内建类型
let root2: HTMLElement = document.getElementById('root2');
```

3.8 null 和 undefined

null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined

strictNullChecks // 一般会开启

```typescript
// strictNullChecks = false
let x: number;
x = 1;
x = undefined;
x = null;

// strictNullChecks = true
let y: number | null | undefined;
y = 1;
y = undefined;
y = null;  
```

#### 1.9 void 类型

void 表示没有任何类型

当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。

当我们声明一个变量类型是 void 的时候，它的非严格模式下仅可以被赋值为 null 和 undefined;

严格模式 仅为undefined（此处严格模式指的时ts中的strictNullChecks配置）

```typescript
function greeting(name: string): void {
    console.log('hello', name);
}

greeting('boy');
```

#### 1.10 never类型

never是其它类型(null undefined)的子类型，代表不会出现的值

#### 1.10.1

作为不会返回（ return ）的函数的返回值类型

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点

```typescript
function error(message: string): never {
    throw new Error(message);
}
```

// 由类型推论得到返回值为 never

```typescript
function fail() {
    return error("Something failed");
}

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

#### 1.10.2 strictNullChecks

在 TS 中， null 和 undefined 是任何类型的有效值，所以无法正确地检测它们是否被错误地使用。
于是 TS 引入了 --strictNullChecks 这一种检查模式 

由于引入了 --strictNullChecks ，在这一模式下，null 和 undefined 能被检测到。
所以 TS 需要一种新的底部类型（ bottom type ）。所以就引入了 never。

// Compiled with --strictNullChecks

```typescript
function fn(x: propType) {
    if (typeof x === 'number') {
// x: number 类型
    } else if (typeof x === 'string') {
// x: string 类型
    } else {
// x: never 类型
// --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
    }
}
```

一种适用场景
```typescript
// strictNullChecks 配置为true
type AllPropType = number | string
function handleValue(val: propType) {
    switch (val.type) {
        case 'number':
            // 这里 val 被收窄为 number
            break
        case 'string':
            // val 在这里是 string
            break
        default:
            // val 在这里是 never
            const exhaustiveCheck: never = val
            break
    }
}


```
但是假如后来有一天你的同事改了 propType 的类型：

type AllPropType = number | string | boolean

然而他忘记了在 handleValue 里面加上针对 boolean 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 boolean，
导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 AllPropType 的可能类型。

#### 1.10.3 never 和 void 的区别

void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。

拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

#### 1.11 类型推论

是指编程语言中能够自动推导出值的类型的能力，它是一些强静态类型语言中出现的特性

定义时未赋值就会推论成any类型

如果定义的时候就赋值就能利用到类型推论

```typescript
let username2; // 这里会推论成any
username2 = 10;
username2 = 'cat';
username2 = null;
```

#### 1.12 包装对象（Wrapper Object）

JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

所有的原始数据类型都没有属性（property）

原始数据类型

布尔值 数值 字符串 null undefined Symbol

```typescript
let name = 'cat';
console.log(name.toUpperCase());

console.log((new String('cat')).toUpperCase());
```

当调用基本数据类型方法的时候，JavaScript 会在原始数据类型和对象类型之间做一个迅速的强制性切换

```typescript
let isOK1: boolean = true; // 编译通过
let isOK2: boolean = Boolean(1) // 编译通过
let isOK3: boolean = new Boolean(1); // 编译失败   期望的 isOK 是一个原始数据类型
```

#### 1.13 联合类型

联合类型上只能访问两个类型共有的属性和方法

```typescript
function fn (name4: string | number){
    console.log(name4.toUpperCase()); // 报错 Property 'toUpperCase' does not exist on type 'string | number'.
}
fn()
```

#### 1.14 类型断言

类型断言可以将一个联合类型的变量，指定为一个更加具体的类型

不能将联合类型断言为不存在的类型

```typescript
function fn(name5: string | number) {
    const a = (name5 as number).toFixed(3);
    const b = (name5 as string).length;
    
    // 不能将联合类型断言为不存在的类型
    const c = (name5 as boolean); // 报错Conversion of type 'string | number' to type 'boolean' may be a mistake because neither type sufficiently overlaps with the other.
    console.log(a, b, c)
}

fn()
```

#### 1.15 字符串、数字、布尔值字面量

```typescript
type Lucky = 1 | 'One' | true;
let foo: Lucky = 'One';
```

#### 1.16 字符串字面量 vs 联合类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种

字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致

#### 2. 函数
#### 4.1 函数的定义

```typescript

```
   function hello(name:string):void {
   console.log('hello',name);
   }
   hello('zfpx');
#### 4.2 函数表达式
   定义函数类型
```typescript

```
   type GetUsernameFunction = (x:string,y:string)=>string;
   let getUsername:GetUsernameFunction = function(firstName,lastName){
   return firstName + lastName;
   }
#### 4.3 没有返回值
```typescript

```
   let hello2 = function (name:string):void {
   console.log('hello2',name);
   }
   hello('zfpx');
   hello2('zfpx');
#### 4.4 可选参数
   在TS中函数的形参和实参必须一样，不一样就要配置可选参数,而且必须是最后一个参数
```typescript

```
function print(name:string,age?:number):void {
console.log(name,age);
}
print('zfpx');
#### 4.5 默认参数
```typescript

```
function ajax(url:string,method:string='GET') {
console.log(url,method);
}
ajax('/users');
#### 4.6 剩余参数
```typescript

```
function sum(...numbers:number[]) {
return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3));
#### 4.7 函数重载
在Java中的重载，指的是两个或者两个以上的同名函数，参数不一样
在TypeScript中，表现为给同一个函数提供多个函数类型定义
let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
if (typeof val === 'number') {
obj.age=val;
} else {
obj.name=val;
}
}
attr('zfpx');
attr(9);
attr(true);
console.log(obj);
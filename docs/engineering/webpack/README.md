webpack5

安装

安装webpack，webpack-cli 工具命令包

```shell
yarn init
yarn add webpack webpack-cli --save -D
```

配置文件 webpack.config.js

- entry：配置入口文件的地址，默认 ./src/index.js，Webpack 执行构建的第一步将从 Entry 开始
- output：配置出口文件的地址
- module：配置模块,主要用来配置不同文件的加载器，在 Webpack 里一切皆模块，一个模块对应着一个文件。
Webpack 会从配置的 Entry 开始递归找出所有依赖的模块
- plugins：配置插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
- devServer：配置开发服务器


兼容性

不支持，支持符合es5标准浏览器，ie8及以下版本

import() require.ensure() 需要promise。在不支持的旧浏览器上要提前加载垫片polyfill




```javascript
const path = require("path");
const rawLoader = require("./src/loader/myRowLoader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  // mode: "development", // development production(默认)
  mode: "production",
  entry: "./src/index.js",
  output: {
    // 打包结果文件放置目录
    // 打包至D:\learnpro\webpack5learn\dist\assets\bundle.js
    // path: path.resolve(__dirname, 'dist/assets'),

    // 打包到当前目录下dist目录 D:\learnpro\webpack5learn\dist\bundle.js
    path: path.resolve(__dirname, "dist"), // 输出文件夹的绝对路径 // __dirname 当前文件所在目录

    filename: "bundle.js", // 输出文件名

    // 资源目录，可以从html文件中引入其他文件的路径看出来有什么作用
    // D:\learnpro\webpack5learn\dist1/bundle.js // html里面引入的路径
    // publicPath: path.resolve(__dirname, "dist1"),

    // 打包后模块引入路径是publicPath + 文件名(从打包结果html里看),同样也会影响dev server
    // <script defer src="D:\learnpro\webpack5learn\dist\static/bundle.js?77a54ecf0d3233dc7438"></script>
    // publicPath: path.resolve(__dirname, "dist", "static"),
    // publicPath: path.resolve(__dirname, "dist"),

    // dev server中需要默认 / 同下,才能获取到html
    // publicPath: path.resolve(__dirname, "/"), // dev server和默认不同,会拿不到bundle.js  server去这个文件夹找file:///D://bundle.js?0eb1357aaac1e02b34f2
    // publicPath: path.resolve(__dirname, "a"),
    // publicPath:  "/p",
    // publicPath:  "../", // 默认 server去这个文件夹找http://localhost:8075/bundle.js?a24bbf3561471eb579f3

    // 资源放到cdn的情况
    // publicPath: 'https://cdn.example.com/assets/',

    /** 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。
     如果指定了一个错误的值，则在加载这些资源时会收到 404 错误
     */
  },
  // devServer会启动一个http开发服务器，把一个文件夹作为静态根目录
  // 看不见distDev目录，使用的内存文件系统，提高性能
  devServer: {
    // static: true,
    static: [
      {
        // 设置静态资源放置的目录，开发服务器可以访问，可以放一些不打包的资源
        // directory: path.resolve(__dirname, "distDev"),
        // directory: path.resolve(__dirname, "src"),
        // directory: path.resolve(__dirname, "./"),
        // directory: path.resolve(__dirname, "./dist"),
        // directory: path.join(__dirname, "./public"),

        // publicPath: "/p", // 默认/ 能取到不打包的其他资源，可修改
        // publicPath: "/a",

        /** 下面这个配置会使dev server 内存溢出,无法完成编译,可能是逻辑上循环, 默认/目录找不到,到配置的静态资源/里面找,
         dev server认为/目录里面没找到的话,应该去配置的静态资源的地方再找,于是又去/里面找,一直重复往里找
         JS stacktrace
         FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
         */
        // directory: path.resolve(__dirname, "/"),
      },
      {
        // 设置静态资源放置的目录，开发服务器可以访问，可以放一些不打包的资源
        directory: path.resolve(__dirname, "distDev"),
        // directory: path.resolve(__dirname, "distDev"),
        // directory: path.resolve(__dirname, "./"),
        // directory: path.join(__dirname, "./public"),
        // directory:  "./src",

        // 提供浏览器不打包资源的地址, distDev 浏览器在localhost:8075/p可以访问到
        // publicPath: "/p", // 默认值"/"
        // publicPath: "/",
      },
    ],
    // static:'./src',
    // static:'false',

    // compress: false, // 启用压缩，一般禁用
    port: 8075, // 端口号
    open: true, // 自动打开浏览器
    hot: true, // 启用 webpack 的热模块替换特性，一般启用
    proxy: {
      // 将/api代理到localhost，一般用于开发环境代理不同名域接口
      /* "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }, // 这里是把原来地址里面的/api 替换成空
      },*/
    },
  },
  module: {
    rules: [
      // {test: /\.txt$/,use:'raw-loader'},
      // { test: /\.txt$/, use: rawLoader },
      {
        test: /\.txt$/,
        use: path.resolve(__dirname, "src", "loader", "myRowLoader.js"),
      },
      {
        test: /\.css$/,
        // use: ["css-loader"], // 用来翻译处理@import和url()

        // style-loader，把css用到html中，可以把style标签插入dom
        use: ['style-loader','css-loader'], // 后面的先处理，有顺序
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"], // 后面的先处理，有顺序
      },

      // 把小图片处理成base64，超过限制不处理
      {
        test: /\.(jpg|png|bmp|gif|svg)/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 4000 },
          },
        ],
      },
      {
        test: /\.(ts)/,
        use: [
          {
            loader:'babel-loader',
            options: {
              presets: [
                "@babel/preset-typescript", // 对ts文件的预设
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // contentBase: path.resolve(__dirname, "dist1"), // 废弃
      template: "./src/indexTemplate.html", // 指定模板文件
      // template: "./src/index.html", // 指定模板文件
      filename: "index.html", // 产出后的文件名
      // inject: false, // 是否插入html中
      hash: true, // 为了避免缓存，可以在产出的资源后面添加hash值
    }),

    // 打包前先清空输出目录
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!static-files*"],
    }),

    // 拷贝静态文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "distDev", // 静态资源目录源地址
          to: "distDev", // 目标地址，相对于output的path目录
        },
        // { from: 'other', to: 'public' },
      ],
    }),

    // 内置签名
    // new webpack.BannerPlugin("Jack"),
  ],
};
```

resolve解析当前目录绝对路径+连接
join连接
```javascript
const {resolve, join} = require('path')
console.log(resolve('a','b')) // d:\Amos-love-frontend\a\b
console.log(join('a','b')) // a\b
```


package.json
使用某个文件作为配置文件打包（默认webpack.config.js）
```json
{
  "scripts": {
    "build": "webpack --config webpack.config.js"
  }
}
```


环境

开发环境
- 需要sourcemap
- 需要打印debug信息
- 热更新
- 代理服务器

生产环境
- 压缩混淆代码
- 压缩图片


开发服务器

打开浏览器，热更新

npm i webpack-dev-server -D

// 内部使用内存文件系统， memory-fs

打包完塞入html文件运行


loader

通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等

- test：匹配处理文件的扩展名的正则表达式
- use：loader名称，就是你要使用模块的名称
- include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
- query：为loaders提供额外的设置选项

txt 文件

安装 npm i raw-loader -D

支持css

css-loader用来翻译处理@import和url()
style-loader，把css用到html中，可以吧css插入dom

npm i style-loader css-loader -D

npm i less less-loader -D

{
test: /\.less$/,
use: ['style-loader','css-loader','less-loader'], // 后面的先处理，有顺序
},

npm i file-loader url-loader -D

file-loader 解决CSS等文件中的引入图片路径问题
url-loader 当图片小于limit的时候会把图片BASE64编码打包到js中，大于limit参数的时候还是使用file-loader 进行拷贝

在webpack使用图片的三种方式
1，html中img标签地址是静态资源地址绝对路径
2，html中img标签地址是开发目录相对路径
3. js图片引入（以地址形式）
```javascript

// esm js中引入，相较于commentJs，有可以进行tree shaking优化的优势
import myImg from './img.png';

// // commentJs js中引入
// let imgCommentjs = requre('./img.png')
let img=new Image();
img.src = myImg;

document.body.appendChild(img);
```
4.css中，url()，依靠内建asset（或者类似url-loader）和 css-loader解析

```css
.image-container{
  width: 200px;
  height: 100px;
  background-image: url('./img.png')
}

```

ts

@babel/preset-typescript是babel-loader 解析ts的插件
npm i @babel/core babel-loader @babel/preset-typescript

plugin

- 在 webpack 的构建流程中(利用构建过程中的钩子函数)，plugin 用于处理更多其他的一些构建任务
- 模块代码转换的工作由 loader 来处理
- 除此之外的其他任何工作都可以交由 plugin 来完成

自动能产出HTML文件，并在里面引入产出后的资源
```shell
npm i html-webpack-plugin -D
```

拷贝静态文件
有时项目中没有引用的文件也需要打包到目标目录

npm i copy-webpack-plugin -D

new CopyWebpackPlugin([{
from: path.resolve(__dirname,'src/assets'),//静态资源目录源地址
to:path.resolve(__dirname,'dist/assets') //目标地址，相对于output的path目录
}])

npm install --save-dev clean-webpack-plugin

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
plugins:[
new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],})
]


#### 性能优化

Tree Shaking

esm 可以被优化，只打包模块中用到的方法
```javascript
// math.js
export function square(x) {
    return x * x;
}

export function cube(x) {
    return x * x * x;
}
```
```javascript
// index.js
console.log('cube', cube(2));
// console.log('square', square(2));
```
commentjs 无法被优化，只要引入模块，打包模块中所有方法
```javascript
// mathrequire.js
function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}

module.exports.square = square;
module.exports.cube = cube;
```
```javascript
// index.js
// const math = require('./mathrequire.js');
// console.log('cube', math.cube(2));
```


win对目录文件名大小写不敏感，linux敏感，会造成win上错误路径可以打包运行，linux上无法运行


任务5：5.201122.JS的兼容性 第7分钟
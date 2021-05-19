### 函数参数类型提示

如果误关闭了，可以这样打开 settings -> editor -> Inlay Hints -> javaScript -> Type annotations

<img src="./img.png" width = "798" height = "288" align=center />


### webStorm识别vue项目的配置路径

由于 Vue CLI 4 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别alias别名，
需要在项目中添加一个文件让webstorm识别。文件名为alias.config.js

内容如下：
```js
/**
 * 由于 Vue CLI 4 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 * */
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@pack': resolve('packages')
    }
  }
}
```

### tsconfig

配置绝对路径:
配置绝对路径会去src中开始寻找。

/* baseUrl用于设置解析非相对模块名称的基本目录，相对模块不会受baseUrl的影响 */

```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

引入src下的page下的test文件

```ts
import test from 'page/test'
```

根据官方文档安装prettier yarn add --dev --exact prettier

Pre-commit Hook

官方文档配合lint-staged一起使用，（在git时自动lint代码）Run linters on git staged files

安装lint-staged npx mrm@2 lint-staged

package.json 加入ts,tsx到prettier规则中
"lint-staged": {
"*.{js,css,md}": "prettier --write"
}

"lint-staged": {
"*.{js,css,md，ts,tsx}": "prettier --write"
}

eslint和prettier规则有些冲突，官网给出了安装eslint-config-prettier和stylelint-config-prettier的方法
https://prettier.io/docs/en/install.html

然后配置eslint规则后面加上prettier，覆盖上面重复的eslint的规则

```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  }
}
```

```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  }
}
```
新版husky会新建一个.husky文件夹，里面创建pre-commit文件写配置

```text
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

之前在package.json中配置
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```

规范commit信息
commitlint

https://github.com/conventional-changelog

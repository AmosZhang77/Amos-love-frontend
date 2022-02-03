## 第三方优秀资源 地址收集

## 日期时间处理 https://github.com/moment/moment

## vue 文档项目 https://vuepress.vuejs.org/zh/

## 项目代码量统计 https://github.com/AlDanial/cloc

安装cloc之前要安装perl垫片ActiveState Perl 5.6.1或者 Strawberry Perl（我用了ActiveState）

（https://strawberryperl.com/ 或者 https://www.activestate.com/products/perl/）

npm install -g cloc

### 统计文件夹命令 cloc filename

### XSS攻击 防御 dompurify

```shell
npm install dompurify
```

```js
import DOMPurify from 'dompurify';

var clean = DOMPurify.sanitize(dirty);

let text = '<img/src=1 onerror=alert(1)>' // 用户填写的可能有风险的内容

// 没有防护的时候，
return (
  <div
    dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} // 将换行符替换成br，为了显示换行
  />
)

// 用法
return (
  <div
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text.replace(/\n/g, '<br />')) }}
  />
)
```

方便切npm源工具： nrm

```shell
npm install -g nrm
```

执行命令nrm ls查看可选的源

```shell
nrm uls
```

添加自定义源

```shell
nrm add newname http://registry.npm.frp.trmap.cn/
```

切换

```shell
nrm use taobao
```

测试速度

```shell
nrm test newname
```

移动端调试功能
vconsole

通过环境判断决定是否启用vconsole，比如开发环境，或者线上环境
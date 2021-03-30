## coding

### 注释

高亮注释，也可特别做函数注释，入参类型和默认值也可以按照这样规范写注释。
```js
/**
 * @method 超出行显示省略号
 * @param {string} contextClass 超出行显示省略号
 * @param {number} [lineNum=2] 第几行需要省略号
 * @param {number} [lineHeight=28] 行高
 * @param {number} [safeNum=30] 用于提高dom操作性能，每行安全的字符数，如30，2行，不会检查30*2以内的字符是否需要填充‘...’
 * @return null 返回值说明
 */
const dot = function (contextClass, lineNum, lineHeight, safeNum) {
    lineNum = lineNum || 2
    lineHeight = lineHeight || 28
    safeNum = lineHeight || 30
}
```

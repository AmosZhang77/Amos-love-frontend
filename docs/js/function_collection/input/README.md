## input

### 强制数字

```html
<input type="text" v-model="amount" v-on:input="parseFloatNum">
```

```js
// (自写，经过测试验证)如果输入不符合的数字，强制变回上次符合要求的数字
const parseFloatNum = function (num, last) { // last 为上次正确输入的值
  if ((num === undefined || num === null)
    || (num < 0 || num.toString().trim() === '')) {
    return ''
  } else {
    if (/^[1-9]\d*\.?\d{0,2}$/.test(num)) {
      return num
    } else {
      return last
    }
  }
}
```

### 校验数 tostring trim

强制保留2位小数正数111保留2位 isNaN用法很怪NaN不等于NaN，别用，es5 Number.isNaN可以片段是否是NaN。要判断是否是数字typeof() === ‘number’

```js
// (自写，经过测试验证)
const methods = {
  inputCheck (val, type, num) {
    if (type === 'checkSpace') {
      if ((val !== null && val !== undefined) && val.toString().trim() === '') {
        return true // 空未填返回true
      } else {
        return false
      }
    } else if ('checkLength') {
      if (val !== null && val !== undefined) {
        console.log('checkLength', val.toString().replace(/[\u4e00-\u9fa5]/g, 'aaa'))
        if (val.toString().replace(/[\u4e00-\u9fa5]/g, 'aaa').length > num) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else if ('checkNumLength') {
      if (val !== null && val !== undefined) {
        if (val.toString().trim().length > num) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  toString () {
    if ((val !== null && val !== undefined)) {
      return val.toString()
    } else {
      return ''
    }
  },
  trim () {
    if ((val !== null && val !== undefined)) {
      return val.toString().trim()
    } else {
      return ''
    }
  }
}
```
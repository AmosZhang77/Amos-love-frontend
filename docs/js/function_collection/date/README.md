## date

### 近一个月 近一月

```js
// (自写，经过测试验证)
const autoSetTime = function (d) {
  varmyDate = new Date()
  varendDate = myDate.getTime()
  varendDataStr = pubZ.secondsToDateStr(endDate)
  varthisMonthDay = 0
  varlastMonthDay = 0
  this.$refs.endDate.value = pubZ.secondsToDateStr(endDate)
  if (isNaN(d)) {
    varlastMonthDate = new Date()
    // lastMonthDate.setTime(pubZ.dateStrToSeconds(this.$refs.endDate.value)) // 测试
    varthisMonthFirst = 0
    varlastMonthFirst = 0
    if (lastMonthDate.getMonth() > 0) {
      lastMonthDate.setDate(1)
      thisMonthFirst = lastMonthDate.getTime()
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
      // lastMonthDate.setDate(1)
      lastMonthFirst = lastMonthDate.getTime()
      console.log('当前日期', thisMonthFirst / (24 * 3600 * 1000), '上月天数', lastMonthDay)
      lastMonthDay = (thisMonthFirst - lastMonthFirst) / (24 * 3600 * 1000)
      lastMonthDate = new Date() //测试结束放开
      // lastMonthDate.setTime(pubZ.dateStrToSeconds(this.$refs.endDate.value)) // 测试
      if (lastMonthDate.getDate() > lastMonthDay) {
        //现在日期大于上个月天数
        // console.log('当前月份', lastMonthDate.getMonth())
        vartemp = lastMonthDate.getMonth() - 1
        lastMonthDate.setMonth(temp)
        lastMonthDate.setMonth(temp)
        lastMonthDate.setDate(lastMonthDay)
      } else {
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
      }
    } else {
      // 1月 12月都是31天
      console.log('1月 12月都是31天')
      lastMonthDate.setFullYear(lastMonthDate.getFullYear() - 1)
      lastMonthDate.setMonth(11)
    }
    this.$refs.beginDate.value = pubZ.secondsToDateStr(lastMonthDate.getTime())
    /*if(lastMonthDate.getMonth() > 0 ) {
    lastMonthDate.setMonth(lastMonthDate.getMonth-1)
    }*/
  } else {
    varbeginDate = endDate - d * 24 * 3600 * 1000
    this.$refs.beginDate.value = pubZ.secondsToDateStr(beginDate)
  }
}
```

### dom转pdf下载

第一个将页面html转换成图片

```shell
npm install html2canvas --save
```

第二个将图片生成pdf

```shell
npm install jspdf --save
```

```js
// toPDF.js
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */
function downloadPDF (ele, pdfName) {
  document.documentElement.scrollTop = 0
  html2canvas(ele, {
    dpi: 300,
    useCORS: true  // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  }).then((canvas) => {
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    // 一页pdf显示html页面生成的canvas高度;
    const pageHeight = contentWidth / 592.28 * 841.89
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight
    // 页面偏移
    let position = 0
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28
    const imgHeight = 595.28 / contentWidth * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new JsPDF('', 'pt', 'a4')
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {    // 分页
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        // 避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }
    // 可动态生成
    pdf.save(pdfName)
  })
}

export default {
  downloadPDF
}

```

使用toPDF.js

```js
import htmlToPdf from "@/assets/js/htmlToPdf"

htmlToPdf.downloadPDF(
  document.querySelector("#myexport"), // 需要转化的dom
  "下载文件的文件名"
)
```
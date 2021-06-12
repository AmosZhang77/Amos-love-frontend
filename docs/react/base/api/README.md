### 标签属性由对象解构得到

```js
class PieReact extends React.Component {
  state = {
    boolean: true
  };

  render () {
    const fullStyle = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div>
        <div width='100vw' height='100vh'>标签中的属性</div>
        <div {...fullStyle}>标签中的属性通过对象展开，达到上面标签一样的效果。{...fullStyle}外层的{} 表示要解析js了</div>
        <div {...this.state.boolean ? fullStyle : {}}>控制标签中的属性有无</div>

      </div>
    )
  }
}
```

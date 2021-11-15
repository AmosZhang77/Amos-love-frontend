其实我也不太想复制粘贴这部分内容的

具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。

比如antd的table，单元格，你可以传入一个render。

```js
 render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
```

看似children也能实现这个功能，其实不然。这里text，record数据的来源和处理逻辑其实都交给table组件了，我们只要关心render的渲染，我们的render传给table，其他数据逻辑都交给table。

如果是children，我们必须把逻辑都自己写了，无法由table组件处理。



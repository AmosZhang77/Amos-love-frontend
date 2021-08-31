函数组件，组件复用，初始化状态无法的到更新。
useState初始化中

错误，状态只在第一次加载组件是获得，之后无法得到更新
```ts
const initCardOpen = window.localStorage.getItem('biDepartmentCard') !== 'close' // 只在组件第一个实例时执行
const [leaderCardOpen, setLeaderCardOpen] = useState<boolean>(initCardOpen) // 只能获得上述一个时间点的值
```

useState初始值给函数，组件复用多次，在不同复用实例中可以正确拿到最新的localStorage
```ts
const initCardOpen = () => window.localStorage.getItem('biDepartmentCard') !== 'close' // 只在组件第一个实例时执行
const [leaderCardOpen, setLeaderCardOpen] = useState<boolean>(initCardOpen()) // 每个实例在载入时都会去重新获取新的值
```
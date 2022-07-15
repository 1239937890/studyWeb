// setup函数是一个新的组件选项。作为组件内使用组合式API的入口点
// 创建组件实例，然后初始化props，紧接着调用setup函数。它会在beforeCreate钩子之前调用。
// setup返回一个对象。则对象的所有属性（它是响应式的数据）都可以直接在模板中使用。相当于vue2.0
// 中data函数返回的对象。

//响应式数据
//ref：可传任意类型的值并返回一个响应式且可改变的ref对象。ref对象拥有一个指向内部值的单一属性.value,
// 改变值的时候必须使用其value属性

// reactive: 接收一个普通对象然后返回该普通对象的响应式代理。等同于2.X的Vue.observable
// 简写之：ref负责基本类型的数据结构包装成响应式 reactive负责引用类型数据结构

//toRefs 将响应式对象转换为普通对象，其中结果对象的每个property都是指向原始对象的property
//从合成函数返回响应式对象时,toRefs非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解/扩散

//computed 传入一个getter函数，返回一个默认不可手动修改的ref对象

//watchEffect 立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。

// watch API 完全等效于 2.x this.$watch （以及 watch 中相应的选项）。watch 需要侦听特定的数据源，
// 并在回调函数中执行副作用。默认情况是懒执行的，也就是说仅在侦听的源变更时才执行回调。

// provide和inject提供依赖注入，功能类似2.x的provide/inject。两者都只能在当前组件的setup()中调用
// 父级通过provide传值  子级通过inject接收值

// 模板引用refs
// 当使用组合式API时，reactive refs和template refs的概念已经是统一了。
// 为了获得对模板内元素或者组件实例的引用，可以直接在setup()中声明一个ref并返回它

// Teleport
// Teleport 就像是哆啦 A 梦中的「 任意门」， 任意门的作用就是可以将人瞬间传送到另一个地方。
// 有了这个认识， 我们再来看一下为什么需要用到 Teleport 的特性呢， 看一个小例子：
// 在子组件Header中使用到Dialog组件， 我们实际开发中经常会在类似的情形下使用到 Dialog，
// 此时Dialog就被渲染到一层层子组件内部， 处理嵌套组件的定位、 z - index和样式都变得困难。
// Dialog从用户感知的层面， 应该是一个独立的组件， 从 dom 结构应该完全剥离 Vue 顶层组件挂载的 DOM；
// 同时还可以使用到 Vue 组件内的状态（ data或者props） 的值。 简单来说就是, 即希望继续在组件内部使用Dialog,
// 又希望渲染的 DOM 结构不嵌套在组件的 DOM 中。 此时就需要 Teleport 上场，
// 我们可以用 < Teleport > 包裹Dialog, 此时就建立了一个传送门， 可以将Dialog渲染的内容传送到任何指定的地方。

// v-slot
// 在 Vue2.x 中具名插槽和作用域插槽分别使用slot和slot-scope来实现， 在 Vue3.0 中将slot和slot-scope进行了合并同意使用。 Vue3.0 中v-slot
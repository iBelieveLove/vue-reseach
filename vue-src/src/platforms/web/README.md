## mount
1. 在编译完成后, 执行$mount时进入到mountComponent方法中
2. 此时会指定一个updateComponent方法, 内部调用`vm._update(vm._render(), hydrating)`, 用于作为渲染watcher的更新函数, 然后进行`new watcher`操作, 此时会绑定vm._watcher作为当前的渲染watcher
3. 在`new watcher`的构造方法中, 因为options.lazy为false, 此时会执行一次渲染watcher函数, 用于收集依赖, 以及创建VNode, 后续依赖项更新时也会走这里的更新
4. 然后就进入到了`mounted`事件中

## vm._render() 返回一个VNode
1. 在此方法中, 调用组件的render函数
2. 随后进入_createElement函数中, _createElement函数会递归的创建出其子节点VNode并返回当前节点VNode
3. 在创建子节点时, VNode的context设置为当前的component


## vm._update(vm._render(), hydrating)
1. 这里的`vm._render()`的意思是, 如果渲染watcher被通知更新时, 此时会先在内存中生成一个VNode.
2. 然后进入到`vm._update`, 如果没有获取到`prevVnode`, 则是初次渲染, 直接进入渲染流程
3. 如果获取到了`prevVnode`, 则此时调用`vm.__patch__(prevVnode, vnode)`
4. 走到`patch.js`, 在patch中, 有几个策略
   1. 如果新节点不存在, 老节点存在, 此时调用destroy方法
   2. 如果老节点不存在, 新节点存在(v-if或组件首次渲染), 此时直接调用createElm
   3. 如果是真实元素, 基于老节点创建一个新的空白节点, 基于新节点创建dom树并插入到老节点的父元素下, 更新父占位元素, 移除老节点(目前只看到在$mount挂载到dom节点时会进入)
   4. 默认路径: 如果是判断sameVnode一致, 同时不是真实元素, 此时进入patchVnode方法


### sameVnode 
1. 根据key/tag等判断是否同一个vnode, 判断相同后进入patchVNode方法

### patchVnode方法, vue diff所在的方法
1. 更新节点
   *   全量的属性更新
   *   如果新老节点都有孩子，则递归执行 diff
   *   如果新节点有孩子，老节点没孩子，则新增新节点的这些孩子节点
   *   如果老节点有孩子，新节点没孩子，则删除老节点的这些孩子
   *   更新文本节点

### diff 过程, 这是针对VNode[]的情况下的假设
diff 优化：做了四种假设，假设新老节点开头结尾有相同节点的情况，一旦命中假设，就避免了一次循环，以提高执行效率
* 如果不幸没有命中假设，则执行遍历，从老节点中找到新开始节点
* 找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置
* 如果老节点先于新节点遍历结束，则剩余的新节点执行新增节点操作
* 如果新节点先于老节点遍历结束，则剩余的老节点执行删除操作，移除这些老节点
找到对应一致的节点后, 执行patchVNode方法, 进行更新


## 总结
1. VNode响应渲染更新到界面的几种类型
   1. 首次mount, 替换对应的真实元素
   2. 在patch方法中, 发现老节点不存在(v-if/新组件渲染), 此时创建新元素
   3. 在`updateChildren`时发现存在老节点找不到的child节点
   4. 在同一个VNode的新老节点patch时, 设置textContent, 赋值属性
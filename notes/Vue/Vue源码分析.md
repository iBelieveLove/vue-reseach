* https://www.jianshu.com/u/a23e6ccef90b
* https://ustbhuangyi.github.io/vue-analysis/
vue 响应式原理其实是 initData 初始化数据  调用观察 observe 函数  判断 数据是否有value.__ob__ 如果没有则调用 Observer 添加__ob__ 函数中 会判断是否是数组对象还是基本数据类型 如果是对象则添加Object.defineProperty 监听数据，如果是数组 则递归 循环监听 


Object.defineProperty 会调用到dep对象更新数据  dep有 添加数据addSub，删除数据removeSub，添加dep  depend，更新数据notify  这几个方法


事件 
初始化事件initEvents-> eventsMixin->$on 把事件添加到vm._events[event] 队列数组中 _hasHookEvent 为系统内置函数  $off解绑事件splice 删除vm._events[event]数组中数据
$emit 触发事件

虚拟dom 其实就是用js创建dom节点，然后在appendChild进去，而不是获取的dom再操作

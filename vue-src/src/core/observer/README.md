## 观察者模式
/**
* @description 观察者模式
* 观察者模式（Observer Pattern）也称发布订阅模式，它是一种在项目中经常使用的模式。
* 定义对象间一种一对多的依赖关系，使得每当一个对象改变状态，则所有依赖于它的对象都会得到通知并被自动更新。
* 观察者模式具有以下4个角色。
* ■ 抽象主题（Subject）角色：该角色又称为“被观察者”，可以增加和删除观察者对象。
* ■ 抽象观察者（Observer）角色：该角色为所有的具体观察者定义一个接口，在得到主题的通知时更新自己。
* ■ 具体主题（Concrete Subject）角色：该角色又称为“具体被观察者”，它将有关状态存入具体观察者对象，在具体主题的内部状态改变时，给所有登记过的观察者发出通知。
* ■ 具体观察者（Concrete Observer）角色：该角色实现抽象观察者所要求的更新接口，以便使自身的状态与主题的状态相协调。
*/

## 响应式原理的两个核心类为dep.js 和 watcher.js

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty 使用`Object.defineProperty`来设置一个对象字段时, 如果设置了setter/getter方法, 则此时在访问对象字段/更新对象字段时, 会调用setter/getter方法.
## array.js
* `methodsToPatch` 定义变量, 然后替换array对应的原生protoType函数操作, 在调用对应函数方法时, 调用`ob.observeArray`(当前为观察者, 在index.js)方法通知列表更新, 然后调用`ob.dep.notify()` (当前为被观察者)通知观察者更新, 此时依次调用所有观察者的update方法, 被替换的方法包括'push', 'pop', 'shift', 'unshift',  'splice', 'sort', 'reverse'

## traverse.js 递归调用以触及, 不对外暴露
* `traverse` 深度递归遍历对象, 在watcher中设置了`deep: true`时会调用, 如果是list, 则依次遍历所有值, 如果是对象, 则依次遍历key值, 并加入到set中, 在访问对应key值时, 会触发(index.js中)`Object.defineProperty`设置的getter函数, 此时会添加对应依赖项

## dep.js 父类, 可以同时是观察者和被观察主题
* `export default class Dep` 在class中add/remove sub时, 将当前对象作为被观察者, 调用`notify`时, 此时通知所有的观察者更新事件, `addDep` 时将该方法作为其他事件的观察者设置, `notify` 依次调用所有观察者的update方法
    * `addSub` 将一个watcher对象加入队列
    * `removeSub` 将队列中的一个watcher对象删除
    * `depend` 如果存在Dep.target, 则在target对象中绑定当前的dep对象
    通过 `addSub`和`depend` 两个方法, 实现了双向绑定

* `static target` 当前的被观察对象, 对象类型应该是watcher实例
* `targetStack` 栈
* `pushTarget` 将Dep.target更新为最新的target, 并推送到栈中(在watcher里面, 收集新依赖时, 会先执行pushTarget)
* `popTarget` 将Dep.target更新为前一个target(在watcher里面, 收集新依赖完成后, 执行popTarget)


## watcher.js   `class Watcher`, 入口1
> 结合Vue实例看watcher对象的创建, 有三种类型: 
  1. Watch函数
  2. getter函数 
  3. Vue组件, 会把watcher对象存放在_watchers中
##### 属性
  * `vm: Component;` 当前vue对象
  * `expression: string;` 表达式, 类似task.id
  * `cb: Function;` watch回调函数
  * `id: number; ` 用于在收集依赖时, 判断在newDepIds中是否存在
  * `deep: boolean;` 设为true时, 在get函数中会调用`traverse`函数
  * `user: boolean;` 不确定作用, 似乎是用于判断收集错误的
  * `lazy: boolean;` 就是immediate : false, 当lazy值为true时, 在update函数中不会立即求值, 而是只设置`dirty`表示为true, 然后再后续执行求值
  * `sync: boolean;` 标识同步方法
  * `dirty: boolean;` 当lazy为true时有用, 在update方法中用来标记当前的值已经失效, 在后续重新求值
  * `active: boolean;` 默认为true, 在tearDown中会置为false, 为false时不会执行`run`方法
  * `deps: Array<Dep>;` 当前依赖项
  * `newDeps: Array<Dep>;` 重新收集依赖时使用, 收集完成后赋值给deps
  * `depIds: SimpleSet;` 当前依赖id
  * `newDepIds: SimpleSet;` 重新收集依赖时使用, 收集完成后赋值给depIds
  * `before: ?Function;` 在watch.run函数执行前执行, 在新建watcher时赋值
  * `getter: Function;` 存放watch表达式的计算函数
  * `value: any;` 值
##### 函数
  * `constructor` 在构造函数中, 初始化getter函数等
  * `getter` 函数, 用于计算watch的值
  * `get` 计算getter函数, 然后重新收集依赖. 如果deep设置为true, 则执行`traverse`函数
  * `addDep` 添加一个依赖对象到newDeps和newDepIds 中, 在`dep.depend`方法中会调用
  * `cleanupDeps` 清理旧依赖对象, 在`get`方法中重新收集依赖后调用
  * `update` 当依赖被修改时调用, 在`dep.notify`方法中对子观察者依次调用
  * `run` 当this.sync为true时, update方法中调用, 会先调用get方法后, 调用回调方法
  * `evaluate` 当lazy为true时调用, 计算get值
  * `depend` 设置所有收集的依赖项, 调用的是`dep.depend`
  * `teardown` 删除所有的依赖项, 此时watch函数不再生效

## scheduler.js 主要为 queueActivatedComponent用于插入keepalive队列, queueWatcher用于插入watcher并且执行方法
> 调度watcher方法
* `resetSchedulerState` 重置所有变量
* `getNow` 定义一个返回时间戳的函数, 如果是在浏览器中, 则优先使用`performance.now`, 否则使用`Date.now`
* `callUpdatedHooks` 依次调用队列中的update钩子函数, 即指令定义对象的update回调
* **`queueActivatedComponent` 插入一个keep-alive对象到active队列中, 并将_inactive置为false**
* `callActivatedHooks` 依次active队列中的对象的_inactive置为true, 然后激活对象的子模块, 调用对象的activated钩子函数(注意子模块的钩子函数先执行)
* **`queueWatcher` 将一个watcher插入队列, 然后在nextTick中调用`flushSchedulerQueue` 方法**
* `flushSchedulerQueue` 首先排序队列, 然后依次执行队列中的`watcher.before`和`watcher.run`, 调用`resetSchedulerState` 重置变量, 随后调用`callActivatedHooks` 和`callUpdatedHooks` 通知模块更新

## index.js 总入口
* `toggleObserving` 开关观察
* `class Observer` 定义观察者, 并绑定到`__ob__`上, 如果当前对象是array, 则调用`observeArray`, 否则调用`walk`, 并在内部绑定一个Dep对象
* `observeArray` 对array中的每一个值依次调用`observe` 方法
* `walk` 依次对object.keys的值调用`defineReactive`方法
* `observe` 如果已经存在了`__ob__`属性, 则可以直接返回, 否则创建一个新的`Observer`对象进行监听
* `defineReactive` 给对象设置属性, 并且设置getter/setter方法, 在触发getter方法时, 会调用`dep.depend()`添加对应的依赖项, 触发setter方法时, 会调用上面的`observe`方法并且执行`dep.notify()`方法

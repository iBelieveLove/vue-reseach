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

## array.js
* `methodsToPatch` 定义变量, 然后替换array对应的原生protoType函数操作, 在调用对应函数方法时, 调用`ob.observeArray`方法通知列表更新, 然后调用`ob.dep.notify()` 通知观察者更新, 被替换的方法包括'push', 'pop', 'shift', 'unshift',  'splice', 'sort', 'reverse'

## dep.js 抽象设置, 可以同时是观察者和主题
* `export default class Dep` 在class中add/remove sub时, 将当前对象作为被观察者, 调用notify时, 此时通知所有的观察者更新事件, addDep 时将该方法作为其他事件的观察者设置, `notify` 依次调用所有观察者的update方法, 

## scheduler.js 总入口为queueActivatedComponent用于插入keepalive队列, queueWatcher用于插入watcher并且执行方法
* `resetSchedulerState` 重置所有变量
* `getNow` 定义一个返回时间戳的函数, 如果是在浏览器中, 则优先使用`performance.now`, 否则使用`Date.now`
* `callUpdatedHooks` 依次调用队列中的update钩子函数, 即指令定义对象的update回调
* `queueActivatedComponent` 插入一个keep-alive对象到active队列中, 并将_inactive置为false
* `callActivatedHooks` 依次active队列中的对象的_inactive置为true, 然后激活对象的子模块, 调用对象的activated钩子函数(注意子模块的钩子函数先执行)
* `queueWatcher` 将一个watcher插入队列, 然后在nextTick中调用`flushSchedulerQueue` 方法
* `flushSchedulerQueue` 首先排序队列, 然后依次执行队列中的`watcher.before`和`watcher.run`, 调用`resetSchedulerState` 重置变量, 随后调用`callActivatedHooks` 和`callUpdatedHooks` 通知模块更新 

## traverse.js
* `traverse` 深度递归遍历对象, 在watcher中设置了`deep: true`时会调用, 如果是list, 则依次遍历所有值, 如果是对象, 则依次遍历key值, 并加入到set中

## watcher.js   `class Watcher`
* `constructor` 在构造函数中, 
* `get` 计算getter函数, 然后重新收集依赖. 如果deep设置为true, 则执行`traverse`函数(还不明白在执行traverse函数时是如何收集的依赖)
* `addDep` 添加一个依赖对象
* `cleanupDeps` 清理旧依赖对象, 在get方法中重新收集依赖后调用
* `update` 依赖被修改时调用
* `run` 当this.asyc为true时, update调用, 会先调用get方法后, 调用回调方法
* `evaluate` 当lazy为true时调用, 计算get值
* `depend` 设置所有收集的依赖项, 调用的是`dep.depend`
* `teardown` 删除所有的依赖项

## index.js 总入口
* `toggleObserving` 开关观察
* `class Observer` 定义观察者, 并绑定到`__ob__`上, 如果当前对象是array, 则调用`observeArray`, 否则调用`walk`, 在内部绑定一个Dep对象
* `observeArray` 对array中的每一个值依次调用`observe` 方法
* `walk` 依次对object.keys的值调用`defineReactive`方法
* `observe` 如果已经存在了`__ob__`属性, 则可以直接返回, 否则创建一个新的`Observer`对象进行监听
* `defineReactive` 

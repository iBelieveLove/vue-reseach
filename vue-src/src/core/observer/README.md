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
* `methodsToPatch` 定义变量, 然后替换对应的原生protoType函数操作, 在调用对应函数方法时, 调用`ob.observeArray`方法通知列表更新, 然后调用`ob.dep.notify()` 通知观察者更新

## dep.js 抽象设置, 可以同时是观察者和主题
* `export default class Dep` 在class中add/remove sub时, 将当前对象作为被观察者, 调用notify时, 此时通知所有的观察者更新事件, addDep 时将该方法作为其他事件的观察者设置

## scheduler.js
* `resetSchedulerState` 重置所有变量
* `getNow` 定义一个返回时间戳的函数, 如果是在浏览器中, 则优先使用`performance.now`, 否则使用`Date.now`
* 

## watcher.js
* ``





## index.js

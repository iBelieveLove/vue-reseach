## util 提供了多个常用方法


## 双向绑定的实现
1. 首先`model.js`解析和生成`v-model`代码, 在编译html->解析v-model属性时, 会根据表达式生成一个`{key: null, exp: xxx }`的对象, key是否有值取决于表达式是否对象取值如`obj.xxx`
2. 按格式生成callbask函数, 如果key为空, 则直接返回`exp=value`, 否则返回`$set()`方法.
3. 在生成jsx代码时, 按格式拼接`model:{value:${el.model.value},callback:${el.model.callback},expression:${el.model.expression}},`代码. 结果类似
  `_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(msg),expression:\"msg\"}],attrs:{\"placeholder\":\"hello world\"},domProps:{\"value\":(msg)},on:{\"input\":function($event){if($event.target.composing)return;msg=$event.target.value}}})`
4. 然后v-model跟v-if不一样, 它是作为一种内置的directive实现的. 在创建元素的时候, 会根据解析到的jsx设置对应的input事件监听. 并且触发directive中的`inserted`方法.
5. 当用户输入的是字母或数字的时候, 直接触发的是在create-element中指定的input事件, 将变量更新.
6. 当用户输入的是输入法内容时, 在directive添加的`compositionstart`和`compositionend`事件被触发. 进而更新变量. 以上是界面到数据的绑定.
7. 数据到界面的绑定就是响应式原理的范畴了.


## instance 
#### `events.js`
1. `initEvents` 初始化事件, 挂在`vm._events`上, 在创建元素的时候调用.
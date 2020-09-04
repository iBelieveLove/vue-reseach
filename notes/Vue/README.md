## Vue源码
1. Vue初始化函数
2. initMixin为Vue原型对象中添加_init函数, new Vue构造对象时调用_init函数
   1. 判断_isComponent是否组件, 如果是, 则调用initInternalComponent初始化组件
   2. initRender初始化渲染函数, 为Vue实例化的对象添加_c和$createElement方法, $attrs属性和$listeners事件加入观察者中
   3. initLifecycle初始化Vue组件生命周期标志
   4. initEvents初始化组件事件 --> updateComponentListeners更新组件事件 --> 更新事件updateListeners
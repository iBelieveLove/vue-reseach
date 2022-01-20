### 初始化时的入口
1. `./index.js`的`function Vue`方法实现new Vue的构造
2. `init.js`的`initMixin`中


Vue 的初始化过程（new Vue(options)）都做了什么？
* 处理组件配置项
* 初始化根组件时进行了选项合并操作，将全局配置合并到根组件的局部配置上
* 初始化每个子组件时做了一些性能优化，将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
* 初始化组件实例的关系属性，比如 $parent、$children、$root、$refs 等
* 处理自定义事件
* 调用 beforeCreate 钩子函数
* 初始化组件的 inject 配置项，得到 ret[key] = val 形式的配置对象，然后对该配置对象进行响应式处理，并代理每个 key 到 vm 实例上
* 数据响应式，处理 props、methods、data、computed、watch 等选项
* 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
* 调用 created 钩子函数
* 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount 方法，反之，没提供 el 选项则必须调用 $mount

### 生命周期
0. 初始化
    1. 初始化组件实例关系, 比如$children, $parent
    2. 初始化自定义事件
1. beforeCreate
    1. 初始化inject配置项
    2. 初始化props、methods、data、computed、watch
    3. 解析provide 对象
2. created

3. beforeMount之前
    0. 非runtime版本的时候, 先编译模板
    1. 查找传入的选择器元素, 并设置到$el上
3. beforeMount
    1. 指定updateComponent方法
    2. 创建渲染watcher函数
4. mounted
    1. 创建watcher完成后调用

5. beforeUpdated
    1. 在创建渲染watcher的时候指定的before回调, 在依赖变量改变时先调用
6. updated
    1. 渲染watcher执行后调用

7. beforeDestroy
    1. 标识已销毁
    2. 从父节点的children中移除.
    3. 移除依赖收集
    4. 销毁节点
8. destroyed
    1. 销毁事件监听

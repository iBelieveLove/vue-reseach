# global
### 提供mixin, extend等接口

### assets.js
在global中会调用执行, 将`["component", "directive", "filter"]`三个值在Vue中映射为function方法

### extend.js
注册Vue.extend, 

### mixin.js
注册Vue.mixin, 调用mergeOptions方法将this.options与传入的mixins合并.

### use.js
注册vue.use, 先查找installedPlugins是否有当前的plugin, 有则直接返回, 如果么有, 则调用`plugin.install || plugin`方法, 最后将plugin 加入到installedPlugins 中
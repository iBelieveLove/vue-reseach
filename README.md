# knowledge is power.
# 芝士就是力量.
## Vue From Start To Give Up
## Vue 从入门到放弃

#### compiler
包含vue.js所有编译相关代码。包括把模版解析成ast树，ast语法树优化，代码生成等工具。

编译的工作可以在构建时候做，（借助webpack、vue-loader等辅助插件）；也可以在运行时候做，使用包含构建工具的vue.js。显然，编译是一种耗性能的工作，所以更推荐前者——离线编译。

#### core
core目录包含了vue.js的核心代码，包括内置组建，全局API封装，Vue实例化，观察者，虚拟DOM，工具函数等等。

这个的代码是vue.js的灵魂，是我们着重分析的地方。

#### platform
vue.js是一个跨平台的MVVM框架，它可以跑在web上，也可以配合weex跑在native客户端上。platform是vue.js的入口，2个目录代表2个主要入口，分别打包成运行在web上和weex上的Vue.js。

我们会着重分析web入口打包后的Vue.js，对于weex入口打包的vue.js感兴趣的同学，可以自行研究。

#### server
Vue.js2.0支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下。注意：这部分代码是跑在服务端的Node.js，不要和跑在浏览器端的Vue.js混为一谈。

服务端渲染主要工作是把组件渲染为服务器端的HTML字符串，将它们直接发送到浏览器，最后将静态标记“混合”为客户端上完全交互的应用程序。

#### sfc
通常我们开发Vue.js都会借助webpack构建，然后通过.vue单文件的编写组件。

这个目录下的代码逻辑会把.vue文件内容解析成一个JS对象。

#### shared
Vue.js会定义一些工具方法，这里定义的工具方法都是会被浏览器端的Vue.js和服务端的Vue.js所共享的。

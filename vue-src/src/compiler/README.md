## 编译器原理(大概)[参考](https://juejin.cn/post/6959019076983209992)
> 执行入口`new Vue().$mount('xxx')`, 在[`src\platforms\web\entry-runtime-with-compiler.js`](../platforms/web/entry-runtime-with-compiler.js)中
主要步骤概览[<sup>[0]</sup>](./index.js):
0. 如果存在`render`函数, 则直接进入`$mount`步骤, 否则获取到`template`, 继而执行`compileToFunctions`, [入口](../platforms/web/entry-runtime-with-compiler.js)
1. 检查是否有csp限制, 检查是否有编译缓存, 有则返回[<sup>[1]</sup>](./to-function.js)
2. 构造平台编译选项[<sup>[2]</sup>](./create-compiler.js)
3. 根据平台编译选项, 把`template`解析成ast树[<sup>[3]</sup>](./parser/index.js#parse), 其中包括解析HTML方法[<sup>[3.1]</sup>](./parser/html-parser.js), 解析text方法[<sup>[3.2]</sup>](./parser/text-parser.js)
4. 根据ast树, 生成`render`函数, 参见[render函数](https://cn.vuejs.org/v2/api/#render)[<sup>[4]</sup>](./codegen/index.js)
5. 最后执行[`$mount`](../platforms/web/runtime/index.js)操作, 在执行mount操作时, 会新建一个渲染`watcher`, 从而实现模板数据的响应式.

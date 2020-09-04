http://hackflow.com/blog/2015/03/08/boiling-react-down-to-few-lines-in-jquery/
https://calendar.perfplanet.com/2013/diff/
https://www.jianshu.com/p/b461657e49c0
https://segmentfault.com/a/1190000009017324
http://www.qiutianaimeili.com/html/page/2018/05/iadkijfuaic.html
https://www.jb51.net/article/112811.htm

https://github.com/snabbdom/snabbdom


script.js     25行
snabbdom.js  300行

https://github.com/livoras/simple-virtual-dom

深度剖析：如何实现一个 Virtual DOM 算法 #13
https://github.com/livoras/blog/issues/13

https://github.com/fastCreator/MVVM


一套代码小程序&Web&Native运行的探索05——snabbdom
https://www.colabug.com/4802704.html

http://web.jobbole.com/84631/


https://github.com/Matt-Esch/virtual-dom


虚拟dom 原理是 用js创建html 并且创建好了，解析成真实的dom直接给root层减少dom操作。更新的时候也是创建虚拟dom，并且通过diff 算法 比较两个虚拟dom有什么不同，获取两个不同的dom之后，再更新不同dom的数据，原来dom节点数据保持不变。

diff 算法 其实就是 深度优先搜索，就是递归子节点，并且记录比较两个节点不同之处

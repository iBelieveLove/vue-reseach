# util
> 提供常用方法合集

### debug.js


### env.js
用于判断是否在浏览器以及什么浏览器, 判断是否server服务
`isNative` 方法用于判断是否原生代码

### error.js


### lang.js
`parsePath` 方法提供递归获取obj中的值的方法
```js
parser = parsePath('data.group.name')
parser({"data": {
		"group": {
			"Nickname": "妄想魔神李安平",
			"avatar": "https://xfile2.a.88cdn.com/file/k/682305298/avatar/AZjUcw.jpg/300x300",
			"class": 1,
			"id": 247807234,
			"name": "妄想魔神李安平",
			"portrait_url": "https://xfile2.a.88cdn.com/file/k/682305298/avatar/AZjUcw.jpg/300x300"
		}}})
```

`def` 方法提供定义对象字段的方法, 调用的是`Object.defineProperty`


## next-tick.js
> 用的比较多的一个函数, Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。
nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象

* `callbacks` 用来存储所有需要执行的回调函数
* `pending` 用来标志是否正在执行回调函数
* `flushCallbacks` 定义函数用于依次执行`callbacks`中的回调函数, 并将`pending`置为false
* `timerFunc` 根据环境, 定义需要执行的延迟函数, 在chrome中为Promise.then, 在延迟执行的函数中执行flushCallbacks方法.
* `nextTick` 调用nextTick时, 会将传入的callback函数推进`callbacks`中, 并且判断pending是否为false, 如果为false, 则将pending置为true并执行timeFunc方法, 如果没有传入callback时, 返回一个promise对象

### options.js
前置知识:
1. `Reflect.ownKeys` 这个静态方法返回所有符号属性的key值，包括`Object.defineProperty`设置的key值, 与`Object.keys`的区别在于Object.keys不会返回defineProperty定义的字段
2. 

* `strats` 定义一个空对象
* `strats.data` 返回`mergeDataOrFn` 函数的返回值
* `strats.watch` 将childVal中的每一项都加到parentVal中
* `strats.props = strats.methods = strats.inject =` 合并parentVal和childVal, 如果重复则使用childVal覆盖
* `mergeData` 递归合并object, 但是, 不会覆盖目标对象中的值, 不会合并__ob__
* `mergeDataOrFn` 返回一个function, 如果没有传入vm参数时, 使用this代替, 如果传入的前两个参数为function, 则此时使用call方法, 传入vm执行, 得到返回值后再执行合并
* `dedupeHooks` 返回去重的数组
* `mergeHook` 合并两个数组并去重
* `mergeAssets` 
* `defaultStrat` 如果存在childVal则返回child, 否则返回parentVal
* `checkComponents` 校验component的名字是否ascii码并且非内置类型, 校验合法性
* `camelize` 函数使用正则表达式的方法将字符串转换为驼峰字符串, 如`message-tips` 转换为`messageTips`
* `normalizeProps` 将options.props的数据转换一下, 修改为合法object, 如果是`String[]` 类型, 则转换为`{string: {type: null}}`形式, 如果是Object类型, 则将key值转换为驼峰字符串, 并且如果val值是Object则正常赋值, 否则转换为`{type: val}` 类型
* `normalizeInject` 
* `normalizeDirectives` 将val值转换为`{bind: def, update: def}`类型
* `mergeOptions` 将两个options合并成一个, 在合并时会调用normalizeProps等方法
* `resolveAsset` 从options中取出type对应的assets, 并且使用camelize等方法取出对应的asset(猜测是用于style scope)


## props.js
* `validateProp` 校验prop合法性, 总入口, 如果传入了空字符串, 并且type中存在Boolean, 则此时将prop的值转换为false
* `getPropDefaultValue` 获取prop的默认值, 如果没有设置默认值时, 返回undefined, 如果默认值是Function, 则此时先执行一次call(vm)
* `assertProp` 校验prop值, 如果设置了require又没有传入值则报错, 如果传入的值类型不一致, 报错, 如果传入了自定义validator校验失败, 报错
* `assertType` prop类型校验, 在assertProp中调用
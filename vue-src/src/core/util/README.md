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

`def` 方法提供定义对象字段的方法


## next-tick.js


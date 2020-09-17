# [util.js](./util.js)
```js
/**
 * Create a cached version of a pure function.
 * 创建对象, 将fn计算值存放在对象中, 如果下一次传入的还是同样的key, 则直接返回
 */
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```

* polyfillBind 方法, 提供一个简单的绑定方法
* looseEqual 方法, 比对对象, 如果是一个对象, 则他们的key值转化的string必须保持一致, 数组则需要完全一致
* looseIndexOf 方法, 比对数组

# [constants.js](./constants.js)
### 定义常量
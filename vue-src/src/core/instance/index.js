import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/**
 * new Vue的入口
 */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 定义 Vue.prototype._init 方法
initMixin(Vue)
/**
 * 定义：
 *   Vue.prototype.$data
 *   Vue.prototype.$props
 *   Vue.prototype.$set
 *   Vue.prototype.$delete
 *   Vue.prototype.$watch
 */
 stateMixin(Vue)
 /**
  * 定义 事件相关的 方法：
  *   Vue.prototype.$on
  *   Vue.prototype.$once
  *   Vue.prototype.$off
  *   Vue.prototype.$emit
  */
 eventsMixin(Vue)
 /**
  * 定义：
  *   Vue.prototype._update
  *   Vue.prototype.$forceUpdate
  *   Vue.prototype.$destroy
  */
 lifecycleMixin(Vue)
 /**
  * 执行 installRenderHelpers，在 Vue.prototype 对象上安装运行时便利程序
  * 
  * 定义：
  *   Vue.prototype.$nextTick
  *   Vue.prototype._render
  */
 renderMixin(Vue)

export default Vue

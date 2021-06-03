/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
/**
 * 在这之前做的所有的事情，只有一个目的，就是为了构建平台特有的编译选项（options），比如 web 平台
 * 
 * 1、将 html 模版解析成 ast
 * 2、对 ast 树进行静态标记
 * 3、将 ast 生成渲染函数
 *    静态渲染函数放到  code.staticRenderFns 数组中
 *    code.render 为动态渲染函数
 *    在将来渲染时执行渲染函数得到 vnode
 */
export const createCompiler = createCompilerCreator(
  
  function baseCompile (
    template: string,
    options: CompilerOptions
  ): CompiledResult {
    // 将模版解析为 AST，每个节点的 ast 对象上都设置了元素的所有信息，比如，标签信息、属性信息、插槽信息、父节点、子节点等。
    // 具体有那些属性，查看 start 和 end 这两个处理开始和结束标签的方法
    /**
     * ast 解析出来的结构
     * {
     *   attrsList: [ name: string, value: string, start: number, end: number ], 这里的name包括`@click`事件和`v-show`(不包含v-if)
     *   attrsMap: {  }, 这里包含:class和'@click'这样的属性, 也包含v-show,v-if
     *   classBinding: xxx, 这里是class绑定的表达式
     *   end: numer,
     *   start: number,
     *   tag: string,
     *   directives: [ {name: string(如show), rawName: string(如v-show), value: string, arg: string, start: number, end: number }], 指令, 包含v-show
     *   events: { [eventname: string]: { value: "functionname", dynamic: boolean, end: number, start: number } }, 这里保存各种响应事件
     *   hasBindings: boolean, 是否有绑定
     *   rawAttrsMap: { [propname: string]: { name: string, value: string, start: number, end: string } }, 这里保存的是所有绑定内容, 例如:class和'@click', 也包括v-if和v-show
     *   children: [ **** ],
     *   if: string, v-if的表达式
     *   ifConditions: [],
     *   type: number, 1表示为tag, 2表示带表达式的text, 3表示纯text
     * }
     */
    /**
     * 传入的options大概是:
     * {
     *  comments: undefined
     *  delimiters: undefined
     *  outputSourceRange: true
     *  shouldDecodeNewlines: false
     *  shouldDecodeNewlinesForHref: false,
     *  warn: func() // 开发环境
     * }
     */
    const ast = parse(template.trim(), options)
    // 优化，遍历 AST，为每个节点做静态标记
    // 标记每个节点是否为静态节点，然后进一步标记出静态根节点
    // 这样在后续更新中就可以跳过这些静态节点了
    // 标记静态根，用于生成渲染函数阶段，生成静态根节点的渲染函数
    if (options.optimize !== false) {
      optimize(ast, options)
    }
    // 根据 AST 生成渲染函数，生成像这样的代码，比如：code.render = "_c('div',{attrs:{"id":"app"}},_l((arr),function(item){return _c('div',{key:item},[_v(_s(item))])}),0)"
    const code = generate(ast, options)
    return {
      ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    }
  }
)

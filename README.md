# 项目介绍

基于[mini-vue](https://github.com/cuixiaorui/mini-vue)开源项目学习，实现最简 vue3 模型，用于深入学习 vue3

# 项目初始化

1. `git init`

2. `yarn init -y`

3. 初始化 ts 环境：

`yarn add typescript --dev`

`npx tsc --init` 初始化 tsconfig.json

4. 解决使用 jest 方法报错

`yarn add jest @types/jest --dev`

tsconfig 配置文件中添加对应的类型

```javascript
// tsconfig.json
{
  "types": ["jest"],
}
```

5. 添加测试命令

```javascript
// package.json
{
  "scripts": {
    "test": "jest",
  },
}
```

`npm run test` 测试编写的第一个测试用例是否可以正常执行

6. 关闭参数不写类型时 ts 的隐藏 any 类型错误

```javascript
// tsconfig.json
{
  "noImplicitAny": false,
}
```

7. jest 环境

jest 运行时是使用的 nodejs 环境，默认的模块规范是 commonjs 规范，使用 esm 规范的代码会报错，需要转换一下

使用 babel 转换。

`yarn add babel-jest @babel/core @babel/preset-env --dev`

创建 babel.config.js

```javascript
// babel.config.js
module.exports = {
  // 已当前node版本为基础进行转换
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

让 babel 支持 typescript

`yarn add @babel/preset-typescript --dev`

```javascript
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
};
```

8. 添加 es 语法支持在 ts 中

```javascript
{
  // 将代码转成es6，输出成较低的es，在调试时降级代码太多不方便查看
  "target": "es6",
  // 制定目标运行时的环境
  "lib": ["DOM", "ESNext"]
}
```

TDD: 先写测试代码，然后让测试用例通过，最后在重构优化代码。

rollup 打包：

`"build": "rollup -c rollup.config.js"`

`-c` 指定其配置文件

package.json

```javascript
{
  "name": "mini-vue",
  "version": "1.0.0",
  // cjs -> main.js
  // esm -> module
  "main": "lib/guide-mini-vue.cjs.js",
  "module": "lib/guide-mini-vue.esm.js",
}
```

扩展：

```javascript
/**
 * dom的节点类
 *
 * 1.document -> Document 节点 nodeType = 9
 *    -> HTMLDocument
 *    -> Document
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * 2.document.documentElement -> html
 *    -> HTMLHtmlElement
 *    -> HTMLElement
 *    -> Element
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * 3.document.body
 *    -> HTMLBodyElement
 *    -> HTMLElement
 *    -> Element
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * 4.div
 *    -> HTMLDivElement
 *    -> HTMLElement
 *    -> Element
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * 5.span
 *    -> HTMLSpanElement
 *    -> HTMLElement
 *    -> Element
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * 6.img
 *    -> HTMLImageElement
 *    -> HTMLElement
 *    -> Element
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * ------------------- 以上为元素节点 nodeType = 1
 *
 * 7.注释节点 Comment -> document.createComment('xxx') -> nodeType = 8
 *    -> Comment
 *    -> CharacterData
 *    -> Node
 *    -> EventTarget
 *    -> Object
 *
 * 8.文本节点 -> Element或者Attr中实际的文字
 *   document.createTextNode('xxx') -> nodeType = 3
 *
 *    -> Text
 *    -> CharacterData
 *    -> Node
 *    -> EventTarget
 *    -> Object
 */
```

删除提交到的 git 的 lib 文件夹

`git rm -r --cached lib`

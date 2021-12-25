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

```json
// tsconfig.json
{
  "types": ["jest"]
}
```

5. 添加测试命令

```json
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

`npm run test` 测试编写的第一个测试用例是否可以正常执行

6. 关闭参数不写类型时 ts 的隐藏 any 类型错误

```json
// tsconfig.json
{
  "noImplicitAny": false
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

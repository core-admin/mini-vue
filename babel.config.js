module.exports = {
  // 已当前node版本为基础进行转换
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
};

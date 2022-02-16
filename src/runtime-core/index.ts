export { createApp } from './createApp';
export { h } from './h';

/*
  vnode:

  const vnode = {
    // 组件 App | dom string -> div,span
    type,
    // props attribute -> object
    props,
    // children -> string | array
    children,
    挂载的dom节点对象
    el: null
  };
*/

/*
  instance:

  const component = {
    vnode,
    type: vnode.type,
    render: -> Component (instance.type) .render,
    setupState: -> Component.setup(),
  };
*/

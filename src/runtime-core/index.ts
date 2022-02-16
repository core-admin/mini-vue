export { createApp } from './createApp';
export { h } from './h';

/*
  instance:

  const component = {
    vnode,
    type: vnode.type,
    render: -> Component (instance.type) .render
    setupState: -> Component.setup()
  };
*/

/*
  vnode:

  const vnode = {
    // 组件 App | dom string -> div,span
    type,
    // props attribute -> object
    props,
    // children -> string | array
    children,
  };
*/

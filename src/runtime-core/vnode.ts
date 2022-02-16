export function createVNode(type, props?, children?) {
  const vnode = {
    // 组件 App | dom string -> div,span
    type,
    // props attribute -> object
    props,
    // children -> string | array
    children,
    // 挂载的dom节点对象
    el: null,
  };
  return vnode;
}

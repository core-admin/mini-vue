export function createVNode(type, props?, children?) {
  const vnode = {
    // 组件 App | dom string -> div,span
    type,
    // props attribute -> object
    props,
    // children -> string | array
    children,
  };
  return vnode;
}

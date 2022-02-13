import { createVNode } from './vnode';
import { render } from './renderer';

export function createApp(rootComponent) {
  return {
    mount(rootContainer: HTMLElement) {
      // vue 会先把所有的东西转成虚拟节点 后续的所有逻辑操作 都会基于vnode做处理
      // component -> vnode

      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}

import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
  // 调用 patch 方法 方便后期递归处理
  patch(vnode, container);
}

function patch(vnode, container) {
  // 去处理组件

  // 判断vnode是否是element 如果是 处理element，不是 那就是component类型

  processComponent(vnode, container);
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  // vnode
  const subTree = instance.render();

  // 当返回subTree后再次它里面的虚拟节点 需要调用 patch
  // vnode -> element -> mount
  // patch(subTree, container);
}

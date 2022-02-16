import { createComponentInstance, setupComponent } from './component';
import { isObject } from '../shared';

export function render(vnode, container) {
  // 调用 patch 方法 方便后期递归处理
  patch(vnode, container);
}

function patch(vnode, container) {
  // 去处理组件

  // 判断vnode是否是element 如果是 处理element，不是 那就是component类型

  if (typeof vnode.type === 'string') {
    // element
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    // vnode
    processComponent(vnode, container);
  }
}

function processElement(vnode, container) {
  // init | update
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const { type, props, children } = vnode;
  // 存储挂载节点
  const el = (vnode.el = document.createElement(type) as HTMLElement);

  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    // children -> [vnode, ] 此处在vue中处理了很多类型
    // 比如支持 数组嵌套的写法 数组中可以存在基本值 boolean/null/undefined 将被转成注释节点

    mountChildren(vnode, el);
  }

  // props
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  (container as HTMLElement).append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container);
  });
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

// 初始化component
function mountComponent(initialVNode, container) {
  const instance = createComponentInstance(initialVNode);

  setupComponent(instance);

  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;
  // vnode
  const subTree = instance.render.call(proxy);

  // 当返回subTree后再次它里面的虚拟节点 需要调用 patch
  // vnode -> element -> mount
  patch(subTree, container);

  // element类型 mount后
  // 可以确定所有的element已被处理完成
  // el的获取需要等待element都初始化完成后才有
  initialVNode.el = subTree.el;
}

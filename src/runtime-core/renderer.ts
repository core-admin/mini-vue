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
  const el = document.createElement(type) as HTMLElement;

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
function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const { proxy } = instance;
  // vnode
  const subTree = instance.render.call(proxy);
  console.log(subTree);

  // 当返回subTree后再次它里面的虚拟节点 需要调用 patch
  // vnode -> element -> mount
  patch(subTree, container);
}

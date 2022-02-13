import { isObject } from '../shared';

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };

  return component;
}

export function setupComponent(instance) {
  // initProps
  // initSlots

  // 处理调用setup之后的返回值 初始化一个有状态的组件（有状态的和函数式组件）
  setupStatefulComponent(instance);
}

// 调用 setup 拿到其返回值
function setupStatefulComponent(instance) {
  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    // setup 可以返回一个 object（需要注入到组件的上下文中） 或者 一个 fn（render函数）
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult) {
  // function or object

  // TODO: function

  // object
  if (isObject(setupResult)) {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance) {
  const Component = instance.type;

  if (!Component.render) {
    instance.render = Component.render;
  }
}

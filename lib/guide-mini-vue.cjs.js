'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === '[object Object]';

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
    };
    return component;
}
function setupComponent(instance) {
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
    instance.render = Component.render;
    // if (Component.render) {
    //   instance.render = Component.render;
    // }
}

function render(vnode, container) {
    // 调用 patch 方法 方便后期递归处理
    patch(vnode);
}
function patch(vnode, container) {
    // 去处理组件
    // 判断vnode是否是element 如果是 处理element，不是 那就是component类型
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    // vnode
    instance.render();
    // 当返回subTree后再次它里面的虚拟节点 需要调用 patch
    // vnode -> element -> mount
    // patch(subTree, container);
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // vue 会先把所有的东西转成虚拟节点 后续的所有逻辑操作 都会基于vnode做处理
            // component -> vnode
            const vnode = createVNode(rootComponent);
            render(vnode);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;

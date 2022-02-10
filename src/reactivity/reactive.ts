import { mutableHandles, readonlyHandles } from './baseHandlers';

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles);
}

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function isReactive(value) {
  // 取值时触发 reactive的get方法
  // 当访问一个被reactive包装过的对象身上不存在的属性时 get将不会被调用
  return !!value[ReactiveFlags.IS_REACTIVE];
}

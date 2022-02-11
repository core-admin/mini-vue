import { mutableHandles, readonlyHandles, shallowReadonlyHandles } from './baseHandlers';

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles);
}

export function isReactive(value) {
  // 取值时触发 reactive的get方法
  // 当访问一个被reactive包装过的对象身上不存在的属性时 get将不会被调用
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function shallowReadonly(value) {
  return createActiveObject(value, shallowReadonlyHandles);
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

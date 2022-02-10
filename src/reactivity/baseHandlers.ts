import { track, trigger } from './effect';
import { ReactiveFlags } from './reactive';

function createGetter(isReadonly?: boolean) {
  return function get(target, key) {
    const res = Reflect.get(target, key);

    // 处理isReactive调用
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }

    if (!isReadonly) {
      // 依赖收集
      track(target, key);
    }

    return res;
  };
}

// 此函数虽然没有抽离的必要，但是从程序设计上来说 这种是保持程序的一致性
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);

    // 触发依赖
    trigger(target, key);

    return res;
  };
}

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

// 当调用reactive时，没有必要每次都重新创建一次 get 与 set
export const mutableHandles = {
  get,
  set,
};

export const readonlyHandles = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`key: ${key} 修改失败，因为 target 是不可变的`, target);
    return true;
  },
};

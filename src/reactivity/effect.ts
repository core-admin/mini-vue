import { extend } from '../shared';

let activeEffect;
let shouldTrack;

type Fn<T = any> = () => T;

class ReactiveEffect {
  // effect 的回调函数 由用户传递进来
  private _fn: Fn;

  // deps = new Set<any>();
  deps: any[] = [];
  active = true;
  onStop?: () => void;

  constructor(_fn: Fn, public scheduler?: Fn) {
    this._fn = _fn;
  }

  run() {
    // active = false 执行了stop方法
    if (!this.active) {
      // 当stop后 直接调用runner让fn执行，也不会打开shouldTrack，重新收集依赖 只是让fn执行而已
      return this._fn();
    }

    shouldTrack = true;

    // 当存在多个effect函数调用时，activeEffect的值重新赋值为this，可以防止在effect回调函数多次执行track收集的函数始终是正确的
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }

  stop() {
    // 多次调用stop时只清空一次即可
    if (this.active) {
      // stop 即：将收集的deps清空
      clearupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function clearupEffect(effect) {
  // 删除收集到的dep中存储的effect函数（effect -> fn）delete 删除指定项 此处并不是清空dep中的Size对象中的数据，如果清空就相当于多个effect函数执行了stop，就不符合stop针对单个effect函数了
  // 需要先找到对应的dep
  effect.deps.forEach(dep => dep.delete(effect));

  // 把 effect.deps 清空
  effect.deps.length = 0;
}

// 存储依赖的容器 target -> key -> dep
const targetMaps = new Map();

function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export function track(target, key) {
  if (!isTracking()) {
    return;
  }

  // target -> key -> dep
  let targetMapValue = targetMaps.get(target);
  // 初始化时是不存在的 需要创建
  if (!targetMapValue) {
    targetMapValue = new Map();
    // 没有创建一个Map作为值
    targetMaps.set(target, targetMapValue);
  }

  let dep = targetMapValue.get(key);

  if (!dep) {
    dep = new Set();
    targetMapValue.set(key, dep);
  }

  if (dep.has(activeEffect)) {
    return;
  }

  // dep对应Set 而Set身上存储的是ReactiveEffect的实例
  dep.add(activeEffect);
  activeEffect && activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  let targetMapValue = targetMaps.get(target);
  let dep = targetMapValue.get(key);

  // effect -> ReactiveEffect
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

// stop的调用，就是将收集的effect函数删除掉
export function stop(runner) {
  runner.effect.stop();
}

export function effect(fn: () => void, options: any = {}) {
  // 存储effect回调函数的容器类
  const _effect = new ReactiveEffect(fn, options.scheduler);

  // options
  extend(_effect, options);

  _effect.run();

  const runner: any = _effect.run.bind(_effect);

  // 将_effect挂载到runner函数上，以供stop调用时能拿到当前的effect实例
  runner.effect = _effect;

  return runner;
}

/*
export function effect(fn: () => void, options: any = {}) {
  // 存储effect回调函数的容器类
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.onStop = options.onStop;

  _effect.run();

  const runner: any = _effect.run.bind(_effect);

  // 将_effect挂载到runner函数上，以供stop调用时能拿到当前的effect实例
  runner.effect = _effect;

  return runner;
}
*/

/*
  target = { count: 1 }

  targetMaps -> Map 对象

  对应的结构：

  targetMaps = {
    {
      Object -> Map()
      key: { count: 1 } // target数据
      value: Map()
      | ---- | {
                  string -> Set()
                  key: 'count'
                  value: Set()
               }
    }
    // ...
    // ...
  }

  obj -> key -> dep -> Set(fn1, fn2, fn3...)

  stop 执行 应该先取到对应的dep中的Set对象，然后删除Set中存储的dep
*/

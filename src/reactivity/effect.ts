let activeEffect;

class ReactiveEffect {
  // effect 的回调函数 由用户传递进来
  private _fn: () => void;

  constructor(_fn: () => void) {
    this._fn = _fn;
  }

  run() {
    // 当存在多个effect函数调用时，activeEffect的值重新赋值为this，可以防止在effect回调函数多次执行track收集的函数始终是正确的
    activeEffect = this;
    return this._fn();
  }
}

// 存储依赖的容器 target -> key -> dep
const targetMaps = new Map();

// getter 访问值时 收集依赖
export function track(target, key) {
  // target -> key -> dep
  let targetMapValue = targetMaps.get(target);
  // 初始化时是不存在的 需要创建
  if (!targetMapValue) {
    targetMapValue = new Map();
    // 没有创建一个Map作为值
    targetMaps.set(target, targetMapValue);
  }

  let dep = targetMapValue.get(key);
  // 初始化时也没有
  if (!dep) {
    // 没有就需要初始化
    // dep的值为一个set的目的是防止在一个effect回调函数中 访问变量造成多次收集依赖时存储多个相同的effect回调函数
    dep = new Set();
    targetMapValue.set(key, dep);
  }

  dep.add(activeEffect);
}

// setter 修改值时 触发依赖
export function trigger(target, key) {
  let targetMapValue = targetMaps.get(target);
  let dep = targetMapValue.get(key);
  for (const effectCbFn of dep) {
    effectCbFn.run();
  }
}

export function effect(fn: () => void) {
  // 存储effect回调函数的容器类
  const _effect = new ReactiveEffect(fn);

  _effect.run();

  return _effect.run.bind(_effect);
}

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
*/

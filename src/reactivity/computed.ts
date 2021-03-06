import { ReactiveEffect } from './effect';

class ComputedRefImpl {
  // private _getter: any;
  private _dirty = true;
  private _value: any;
  private _effect: any;
  constructor(getter) {
    // this._getter = getter;
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    // 多次调用get时 _getter不在被重复执行
    // if (this._dirty) {
    //   this._dirty = false;
    //   this._value = this._getter();
    // }

    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;

    // 当依赖的响应式对象的值发生改变的时候 _dirty -> true
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}

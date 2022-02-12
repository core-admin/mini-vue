import { reactive } from './reactive';
import { trackEffects, triggerEffects, isTracking } from './effect';
import { hasChanged, isObject } from '../shared';

/**
 * 说明：ref
 *
 * ref针对的每个属性值是一个值类型 1 true "1"
 *
 * 而当ref传入的值是一个引用数据类型值 需要通过 reactive进行包裹 使其变为一个代理对象
 * proxy -> object
 */

// Impl 表示一个接口的缩写
class RefImpl {
  private _value: any;
  private _rawValue: any;
  public __v_isRef = true;

  // 因为只有一个值 value 所以只需要存储一个dep即可
  // key（value） -> dep -> Set(fn1, fn2, fn3...)

  public dep = new Set<any>();
  constructor(value) {
    /**
     * 如果ref的值是一个对象类型，需要做转换，转成reactive
     * value -> reactive
     * 需要看一下value是否是一个对象
     */
    // this._value = value;
    this._value = convert(value);
    this._rawValue = value;
  }

  get value() {
    trackRefValue(this);
    // 二次修改成相同的值时 trigger 不应该被触发
    return this._value;
  }

  set value(newValue) {
    // if (hasChanged(this._value, newValue)) {
    //    一定得先修改值 然后再去通知
    //   this._value = newValue;
    //   triggerEffects(this.dep);
    // }

    /**
     * newVlaue 与 this._value 对比时 可能是一个reactive包裹过的proxy对象
     *  也就是说 上一次的newValue当是一个对象是 现在的 this._value 是一个reactive包裹过的proxy对象
     *
     * 对比是对比没有处理过后的值 _rawValue
     */

    if (hasChanged(this._rawValue, newValue)) {
      //  一定得先修改值 然后再去通知
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

// RefImpl -> { value } -> get set

function trackRefValue(ref) {
  if (isTracking()) {
    // 需要做依赖收集
    trackEffects(ref.dep);
  }
}

function convert(value) {
  return isObject(value) || Array.isArray(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref?.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

/**
 * es6 Class get set 拓展说明
 *
 * 当你在声明一个类的时候，有些属性，是不希望别人可以随意的对它进行更改的，也就是把它定义为 私有属性，在ES5的时候基本不可能做到，但是在ES6的时候是可以办到的，而这个就是通过get来实现。
 *
 * 当修改值时 会调用属性的set方法，本质上并不是直接改变属性的值，而是通过修改另一个值间接改变 get会返回那个被改变后的间接的值
 *
 * https://www.jianshu.com/p/cdc88509fb90
 */

import { computed } from '../computed';
import { reactive } from '../reactive';

describe('computed', () => {
  it('happy path', () => {
    // ref .value 缓存
    const user = reactive({
      age: 1,
    });
    const age = computed(() => user.age);
    expect(age.value).toBe(1);
  });

  // 测试计算属性的缓存功能
  it('should compute lazily', () => {
    const value = reactive({
      foo: 1,
    });
    const getter = jest.fn(() => {
      return value.foo;
    });
    const cValue = computed(getter);

    // lazy
    // 没有调用 cValue.value 时 getter函数不应被调用
    expect(getter).not.toHaveBeenCalled();

    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    // 不应再被计算
    cValue.value; // get
    expect(getter).toHaveBeenCalledTimes(1);

    value.foo = 2; // set -> trigger
    // 当我们修改computed依赖的proxy属性值时getter也不应该被重新调用
    // 而使用当再次访问get时 才会被调用
    expect(getter).toHaveBeenCalledTimes(1);
    expect(cValue.value).toBe(2);
  });
});

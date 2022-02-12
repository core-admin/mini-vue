import { effect } from '../effect';
import { reactive } from '../reactive';
import { ref, isRef, unRef } from '../ref';

describe('ref', () => {
  // it.only 只先执行当前测试用例
  // it.skip 跳过当前测试用例

  it('happy path', () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });

  it('should be reactive', () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });

    expect(calls).toBe(1);
    expect(dummy).toBe(1);

    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);

    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });

  // ref可以将一个对象变为响应式
  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = a.value.count;
    });

    expect(dummy).toBe(1);

    a.value.count = 2;
    // 如果ref传递的是一个对象类型的值 还需要转成reactive
    expect(dummy).toBe(2);
  });

  it('isRef', () => {
    const a = ref(1);
    const user = reactive({
      age: 1,
    });
    expect(isRef(a)).toBe(true);
    expect(isRef(1)).toBe(false);
    expect(isRef(true)).toBe(false);
    expect(isRef(user)).toBe(false);
  });

  it('unRef', () => {
    const a = ref(1);
    expect(unRef(a)).toBe(1);
    expect(unRef(1)).toBe(1);
  });
});

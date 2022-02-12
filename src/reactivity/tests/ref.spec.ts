import { effect } from '../effect';
import { reactive } from '../reactive';
import { ref, isRef, unRef, proxyRefs } from '../ref';

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

  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'xx1',
    };
    const proxyUser = proxyRefs(user);

    expect(user.age.value).toBe(10);
    // 经过proxyRefs包装过的值 在访问里面存在ref类型值时 可以直接取到 不需要.value的形式去取
    expect(proxyUser.age).toBe(10);
    expect(proxyUser.name).toBe('xx1');

    // 使用场景为在template里 使用为ref变量类型的值时 是不需要.value 进行调用读取的 -> proxyRefs

    // age -> ref ? 返回.value : 返回本身值

    // --------- 以上为 get test --------------

    // --------- 以下为 set test --------------

    proxyUser.age = 20;
    expect(proxyUser.age).toBe(20);
    expect(user.age.value).toBe(20);

    proxyUser.age = ref(30);
    expect(proxyUser.age).toBe(30);
    expect(user.age.value).toBe(30);

    // set -> ref -> .value
  });
});

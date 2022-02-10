import { readonly } from '../reactive';

describe('readonly', () => {
  // 程序主逻辑
  it('happy path', () => {
    // readonly 不可以被 set

    const original = {
      foo: 1,
      bar: {
        baz: 2,
      },
    };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
  });
});

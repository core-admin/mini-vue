import { reactive, isReactive } from '../reactive';

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });

  it('isReactive', () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);
  });

  // reactive 嵌套
  it('nested reactive', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ foo: 2 }],
    };
    const observed = reactive(original);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});

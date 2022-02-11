import { isReadonly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
  it('should not make non-reactive properties reactive', () => {
    // 创建出来的只读对象只针对外层的对象是只读的，内层的对象属性值并不是只读的
    const props = shallowReadonly({
      n: { foo: 1 },
    });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });

  it('warn then call set', () => {
    console.warn = jest.fn();

    const user = shallowReadonly({
      age: 20,
    });
    user.age = 21;
    expect(console.warn).toBeCalled();
  });
});

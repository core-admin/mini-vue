import { readonly, isReadonly } from '../reactive';

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

  // 修改readonly创建的属性值值提示警告信息
  it('warn then call set', () => {
    // console.warn('xxx');
    // mock 构建一个假的警告方法
    // jest.fn() 会创建一个函数
    console.warn = jest.fn();

    const user = readonly({
      age: 20,
    });
    user.age = 21;
    // 验证其警告函数是否被调用
    // toBeCalled 验证其调用次数 >= 1
    expect(console.warn).toBeCalled();
  });

  it('isReadonly', () => {
    const original = { foo: 1 };
    const wrapped = readonly(original);
    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);
  });
});

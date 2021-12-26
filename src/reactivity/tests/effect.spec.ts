import { reactive } from '../reactive';
import { effect } from '../effect';

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;

    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    // update
    user.age++;

    expect(nextAge).toBe(12);
  });

  it('', () => {
    // effect(fn) 执行 会返回一个函数 runner => {}
    // 当调用 runner这个方法时 会再次执行传递给effect的fn
    // 当调用runner执行fn时，它会把fn的执行结构return出去
    // 也就是说 当调用runner时，可以拿到fn的返回值

    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo';
    });
    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe('foo');
  });
});

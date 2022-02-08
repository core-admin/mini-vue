import { reactive } from '../reactive';
import { effect } from '../effect';

describe('effect', () => {
  it('1.effect回调函数中的响应式变量应该能在外部修改时重新执行', () => {
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

  it('2.实现effect返回runner函数', () => {
    /**
     * effect 函数指定应该有一个返回值 返回值是一个函数 runner
     * 当调用runner函数时，effect的参数fn函数应该被执行
     * runner的执行结果应该是 fn的返回值
     */

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

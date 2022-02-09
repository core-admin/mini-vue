import { reactive } from '../reactive';
import { effect, stop } from '../effect';

describe('effect', () => {
  it('1.effect回调函数中的响应式变量应该能在外部修改时重新执行', () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;

    effect(() => {
      nextAge = user.age + 1;
    });

    // effect 会一上来就执行一次换入的fn函数
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

  it('scheduler', () => {
    /**
     * 1.通过effect的第二个参数给定的一个scheduler的fn
     * 2.当effect第一次执行的时候，fn执行
     * 3.当响应式对象 set 更新的时候 fn就不会在执行了 而是执行scheduler
     * 4.如果说当执行runner的时候，会再次执行fn
     */

    let dummy;
    let run;

    const scheduler = jest.fn(() => {
      run = runner;
    });

    const obj = reactive({
      foo: 1,
    });

    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler },
    );

    // scheduler 不会被调用（调用0次，也就是不会调用）
    expect(scheduler).not.toHaveBeenCalled();

    // = 1 意味着 effect的第一个参数fn会被调用
    expect(dummy).toBe(1);

    // ++后 正常effect的第一个参数fn应该被调用
    obj.foo++;

    // 但是 我们验证 我们传入的scheduler被调用了一次 toHaveBeenCalledTimes 调用了几次
    expect(scheduler).toHaveBeenCalledTimes(1);

    // 为 1，说明 fn并没被调用
    // 此断言说明 当响应式对应发生改变，调用的是scheduler，而并非fn
    expect(dummy).toBe(1);

    run();

    // 执行run后，dummy === 2，说明了fn被调用了
    expect(dummy).toBe(2);

    expect(scheduler).toHaveBeenCalledTimes(1);
  });

  it('stop', () => {
    let dummy;
    const obj = reactive({
      prop: 1,
    });
    const runner = effect(() => {
      dummy = obj.prop;
    });

    obj.prop = 2;
    expect(dummy).toBe(2);

    // 调用stop功能后，当再次修改obj里的值，effect函数将不会在更新
    stop(runner);

    obj.prop = 3;
    expect(dummy).toBe(2);

    runner();
    expect(dummy).toBe(3);
  });

  // 测试stop函数的执行是否影响到了其他effect函数
  it('stop2', () => {
    let dummy;
    let dummy2;
    const obj = reactive({
      prop: 1,
    });
    const runner = effect(() => {
      dummy = obj.prop;
    });

    effect(() => {
      dummy2 = obj.prop;
    });

    obj.prop = 2;
    expect(dummy).toBe(2);
    expect(dummy2).toBe(2);

    // 调用stop功能后，当再次修改obj里的值，effect函数将不会在更新
    stop(runner);

    obj.prop = 3;
    expect(dummy).toBe(2);
    expect(dummy2).toBe(3);

    runner();
    expect(dummy).toBe(3);
  });

  it('stop3 测试deps重复）', () => {
    // 反向收集dep时（在track时往ReactiveEffect的实例属性deps上收集dep）使用数组的方式存在多次收集相当的dep
    let dummy;
    const obj = reactive({
      prop: 1,
    });
    effect(() => {
      dummy = obj.prop;
    });

    obj.prop++;
    obj.prop++;
    obj.prop++;
    obj.prop++;
    obj.prop++;
    expect(dummy).toBe(6);
  });

  // 调用stop的回调函数
  it('onStop', () => {
    const obj = reactive({
      foo: 1,
    });
    const onStop = jest.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        onStop,
      },
    );

    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});

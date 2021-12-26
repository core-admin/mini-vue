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

    // const obj = reactive({ count: 1 });
    // let step = 0;
    // let step2 = 1;
    // const obj2 = reactive({ count: 10 });

    // effect(() => {
    //   step = obj.count;
    //   step = obj2.count;
    //   console.log(1);
    // });

    // effect(() => {
    //   obj2.count = 2;
    //   console.log(2);
    // });
    // console.log('step', step);
  });
});

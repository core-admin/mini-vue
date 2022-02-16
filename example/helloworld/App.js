import { h } from '../../lib/guide-mini-vue.esm.js';

export const App = {
  setup() {
    return {
      msg: 'mini-vue',
      msg2: '哈哈',
    };
  },
  render() {
    return h(
      'h1',
      {
        id: 'root',
        class: ['a1', 'a2'],
      },
      `hei ~~~ ${this.msg} ${this.msg2}`,
    );

    // return h(
    //   'h1',
    //   {
    //     id: 'root',
    //     class: ['a1', 'a2'],
    //   },
    //   [
    //     h(
    //       'p',
    //       {
    //         class: 'p-box',
    //       },
    //       ' -- ppp -- ',
    //     ),
    //     h(
    //       'span',
    //       {
    //         class: 'span-box',
    //       },
    //       ' -- span -- ',
    //     ),
    //     h(
    //       'style',
    //       {},
    //       `
    //       body {
    //         background-color: pink;
    //       }
    //     `,
    //     ),
    //   ],
    // );
  },
};

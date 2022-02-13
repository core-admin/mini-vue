export const App = {
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
  render() {
    return h('h1', 'hei ~~~ ' + this.msg);
  },
};

const publicPropertiesMap = {
  $el: _ => _.vnode.el,
};

export const publicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState } = instance;

    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }

    // 先只实现从setupState中获取值
    if (key in setupState) {
      return setupState[key];
    }
  },
};

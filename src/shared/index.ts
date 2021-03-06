export const extend = Object.assign;

const toString = Object.prototype.toString;

export const isObject = (val: any): val is object => toString.call(val) === '[object Object]';

export const hasChanged = (a, b) => !Object.is(a, b);

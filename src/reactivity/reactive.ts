import { mutableHandles, readonlyHandles } from './baseHandlers';

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles);
}

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

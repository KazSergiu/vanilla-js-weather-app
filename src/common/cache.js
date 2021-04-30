// Cache

export const CACHE = new Map();

export function cacheSet(keyName, data) {
  return CACHE.set(`key${keyName}`, data);
}
export function cacheGet(keyName) {
  return CACHE.get(keyName);
}

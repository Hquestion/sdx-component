export default class Cache {
    static _cache = {};

    static set(key, item) {
        Cache._cache[key] = Object.freeze(item);
    }

    static get(key) {
        return Cache._cache[key];
    }
}

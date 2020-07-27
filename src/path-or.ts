function _pathOr(defaultValue: any, obj: Object, ...keys: any) {
    return keys.reduce((acc: any, key: string) => (acc || {})[key], obj) || defaultValue;
};

module.exports = (defaultValue: any, paths: Array<string>, body: Object) =>
    _pathOr(defaultValue, body, ...paths);
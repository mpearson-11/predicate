const { unflatten } = require('flat');

// Interfaces
interface Rule {
  pathTo: string;
  pathFor: string;
  selectorFn?(params: any): any;
  fallback?: Object
};

interface Acc {
  [key: string]: Object;
};

const clone = (cloneThisItem: any) => {
  if (Array.isArray(cloneThisItem)) return [...cloneThisItem];
  if (typeof cloneThisItem === 'object') return JSON.parse(JSON.stringify(cloneThisItem));
  return cloneThisItem;
};

const generatePath = (defaultValue: any, obj: Object, ...keys: any) =>
  keys.reduce((acc: Acc, key: string) => (acc || {})[key], obj) || defaultValue;

const pathOr = (defaultValue: any, paths: Array<string>, body: Object) =>
  generatePath(defaultValue, body, ...paths);

const extract = (_path: String, body: Object) => pathOr(null, _path.split('.'), body);
const execute = (body: Object, acc: Acc, item: Rule) => {
  const {
    pathTo,
    pathFor,
    fallback = null,
    selectorFn = (s: any) => s,
  } = item;

  const selectedItem = extract(pathTo, body) || fallback;
  acc[pathFor] = selectorFn(clone(selectedItem));
  return acc;
};

const executeRules = (rules: Array<Rule>, data: Object) => {
  if (Array.isArray(rules) && typeof data === 'object') return rules.reduce((acc, item) => execute(data, acc, item), {});
  return {};
};

module.exports = (data: Object, rules: Array<Rule>) => unflatten(executeRules(rules, data));

const { unflatten } = require('flat');
const pathOr = require('./path-or');

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

const extract = (_path: String, body: Object) => pathOr(null, _path.split('.'), body);
const execute = (body: Object, acc: Acc, item: Rule) => {
  const {
    pathTo,
    pathFor,
    fallback = null,
    selectorFn = (s: any) => s,
  } = item;

  acc[pathFor] = selectorFn(extract(pathTo, body) || fallback);
  return acc;
};

const executeRules = (rules: Array<Rule>, data: Object) =>
  rules.reduce((acc, item) => execute(data, acc, item), {});

module.exports = (data: Object, rules: Array<Rule>) => unflatten(executeRules(rules, data));

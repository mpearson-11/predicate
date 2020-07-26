const { pathOr } = require('ramda');
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

const extract = (_path: String, body: Object) => pathOr(null, _path.split('.'), body);

const defaultSelector = (selected: Object) => selected;

const execute = (body: Object, acc: Acc, item: Rule) => {
  const {
    pathTo,
    pathFor,
    fallback = null,
    selectorFn = defaultSelector,
  } = item;

  acc[pathFor] = selectorFn(extract(pathTo, body) || fallback);
  return acc;
};

const executeRules = (rules: Array<Rule>, data: Object) =>
  rules.reduce((acc, item) => execute(data, acc, item), {});

module.exports = (data: Object, rules: Array<Rule>) => unflatten(executeRules(rules, data));

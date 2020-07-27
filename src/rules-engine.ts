const { unflatten } = require('flat');

const extract = require('./extract-rules');

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

const execute = (body: Object, acc: Acc, item: Rule) => {
  const {
    pathTo,
    pathFor,
    fallback = null,
    selectorFn = (s: Object) => s,
  } = item;

  acc[pathFor] = selectorFn(extract(pathTo, body) || fallback);
  return acc;
};

const executeRules = (rules: Array<Rule>, data: Object) =>
  rules.reduce((acc, item) => execute(data, acc, item), {});

module.exports = (data: Object, rules: Array<Rule>) => unflatten(executeRules(rules, data));

const { pathOr } = require('ramda');
const { unflatten } = require('flat');

const extract = (_path, body) => pathOr(null, _path.split('.'), body);

const execute = (body, acc, item) => {
  const {
    pathTo,
    pathFor,
    fallback = null,
    selectorFn = ((a) => a),
  } = item;

  acc[pathFor] = selectorFn(extract(pathTo, body) || fallback);
  return acc;
};

const executeRules = (rules, data) =>
  rules.reduce((acc, item) => execute(data, acc, item), {});

module.exports = (data, rules) => unflatten(executeRules(rules, data));

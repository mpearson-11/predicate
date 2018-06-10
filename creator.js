const R = require('ramda');
const { unflatten } = require('flat');

const executeRuleFor = (body, acc, item) => {
  const { pathTo, pathFor, fall = null } = item;
  const data = R.pathOr(null, pathTo.split('.'), body);
  if (data) acc[pathFor] = data;
  else acc[pathFor] = fall;
  return acc;
};

const executeRules = (rules, data) => {
  return rules.reduce((acc, item) => {
    return executeRuleFor(data, acc, item)
  }, {});
};

module.exports = (data, rules) => {
  return unflatten(executeRules(rules, data));
};
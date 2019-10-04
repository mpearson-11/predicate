import * as R from 'ramda';
import { unflatten } from 'flat';

const extract = (_path, body) => R.pathOr(null, _path.split('.'), body);

const execute = (body, acc, item) => {
  const {
    pathTo,
    pathFor,
    fallback = null
  } = item;

  acc[pathFor] = extract(pathTo, body) || fallback;
  return acc;
};

const executeRules = (rules, data) =>
  rules.reduce((acc, item) => execute(data, acc, item), {});

export default (data, rules) => unflatten(executeRules(rules, data));
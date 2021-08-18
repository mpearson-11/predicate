const { unflatten } = require('flat');

/**
 * Rule type definition
 * @typedef {Object} Rule
 * @property {string} pathTo
 * @property {string} pathFor
 * @property {any} fallback
 * @property {function} selectorFun
*/
const Rule = {};

/**
 * Clone Object or Array function
 * @function clone
 * @param {any} cloneThisItem
 * @returns {any}
*/
const clone = (cloneThisItem) => {
  if (Array.isArray(cloneThisItem)) return [...cloneThisItem];
  if (typeof cloneThisItem === 'object') return JSON.parse(JSON.stringify(cloneThisItem));
  return cloneThisItem;
};

/**
 * Generate Path function
 * @function
 * @name generatePath
 * @param {Object|Array} defaultValue
 * @property {Object} obj
 * @property {Array<string>} keys
 * @returns {any}
*/
const generatePath = (defaultValue, obj, ...keys) =>
  keys.reduce((acc, key) => (acc || {})[key], obj) || defaultValue;

/** Mimic pathOr by ramda function
 * @function
 * @name pathOr
 * @param {Object|Array} defaultValue
 * @param {Array<string>} paths
 * @param {Array<string>} paths
 * @returns {any}
*/
const pathOr = (defaultValue, paths, body) => generatePath(defaultValue, body, ...paths);

/** Extract data from given path function
 * @function
 * @name extract
 * @param {string} extractPath
 * @param {any} body
 * @returns {any}
*/
const extract = (extractPath, body) => pathOr(null, extractPath.split('.'), body);

/** Execute Rule function
 * @function
 * @name execute
 * @param {any} body
 * @param {Object} acc
 * @param {Rule} rule
 * @returns {Object}
*/
const execute = (body, acc, rule) => {
  const {
    pathTo,
    pathFor,
    fallback = null,
    selectorFn = (s) => s,
  } = rule;

  const selectedItem = extract(pathTo, body) || fallback;
  acc[pathFor] = selectorFn(clone(selectedItem));
  return acc;
};

/** Execute Rules function
 * @function
 * @name executeRules
 * @param {Array<Rule>} rules
 * @param {any} data
 * @returns {Object}
 * */
const executeRules = (rules, data) => {
  if (Array.isArray(rules) && typeof data === 'object') return rules.reduce((acc, item) => execute(data, acc, item), {});
  return {};
};

/** 
 * Execute Rules Engine function
 * @function
 * @name executeRulesEngine
 * @param {Object} data
 * @param {Array<Rule>} rules
 * @returns {Object}
 * */
const executeRulesEngine = (data, rules) => unflatten(executeRules(rules, data));

module.exports = executeRulesEngine;

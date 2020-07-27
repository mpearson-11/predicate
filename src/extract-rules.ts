const { pathOr } = require('ramda');

module.exports = (_path: String, body: Object) => {
    return pathOr(null, _path.split('.'), body);
};

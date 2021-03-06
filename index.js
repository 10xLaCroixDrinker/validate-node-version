'use strict';

var semver = require('semver'),
    pkg = require('../../package.json');

var validate = function (version) {
  var node = {};

  try {
    node.expected = version ? semver.validRange(version) : semver.validRange(pkg.engines.node);
  } catch (err) {
    node.message = node.error = 'You must define a node verision in your project\'s `package.json` file.\nhttps://npmjs.org/doc/json.html#engines';
    return node;
  }

  node.actual = semver.valid(process.version),
  node.satisfies = semver.satisfies(node.actual, node.expected);

  if (node.satisfies === true) {
    node.message = 'Using node v' + node.actual + ' (Project requires ' + node.expected + ')';
  } else {
    node.message = 'Expected node ' + node.expected + ', but found v' + node.actual;
  }

  return node;
}

module.exports = validate;

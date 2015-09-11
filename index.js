'use strict';

var semver = require('semver'),
    Promise = require('bluebird'),
    pkg = require('../../package.json');

var validate = function (version) {
  return new Promise(function (resolve, reject) {
    var node = {};

    try {
      node.expected = version ? semver.validRange(version) : semver.validRange(pkg.engines.node);
    } catch (err) {
      reject({message: 'You must define a node verision in your project\'s `package.json` file.\nhttps://npmjs.org/doc/json.html#engines'});
    }

    node.actual = semver.valid(process.version),
    node.satisfies = semver.satisfies(node.actual, node.expected);

    if (node.satisfies === true) {
      node.message = 'Using node v' + node.actual + ' (Project requires ' + node.expected + ')';
      resolve(node);
    } else {
      node.message = 'Expected node ' + node.expected + ', but found v' + node.actual;
      reject(node);
    }
  });
}

module.exports = validate;

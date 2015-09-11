# validate-node-version

A module that checks your current node version against a projects package.json

### Installation:

```
npm install --savevalidate-node-version
```

### Usage:

```js
var validatenv = require('validate-node-version');

validatenv().then(function (data) {
  // handle good node version
}).catch(function (err) {
  // handle bad node version
});
```

This module returns a promise with data with the structure below:

```js
{
  message: String, // a message about whether this failed or passed and why
  actual: String, // the current version of node being used
  expected: String, // the expected range for node version
  satisfies: Boolean, // does the actual version satisfy the expected version
}
```

#### Example Gulp integration

```js
var gulp = require('gulp'),
    validatenv = require('validate-node-version');

gulp.task('validatenv', function () {
  validatenv().catch(function (err) {
    console.error(err.message);
    process.exit(1);
  });
});
```

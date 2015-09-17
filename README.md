# validate-node-version

A module that checks your current node version against a projects package.json

### Installation:

```
npm install --save validate-node-version
```

### Usage:

```js
var validatenv = require('validate-node-version')();

if (validatenv.error) {
  // handle bad node version
} else {
  // handle good node version
}
```

You can pass a version to the module that overrides the version in the projects `package.json`:

```js
require('validate-node-version')('4.0.x');
```

This module returns a an object with the structure below:

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
    validatenv = require('validate-node-version')();

gulp.task('validatenv', function () {
  if (!validatenv.satisfies) {
    console.error(validatenv.message);
    process.exit(1);
  }
});
```

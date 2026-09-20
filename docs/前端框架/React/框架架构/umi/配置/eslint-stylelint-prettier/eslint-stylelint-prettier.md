# eslint/stylelint/prettier

1. 安装

   yarn add @umijs/fabric

   yarn add prettier(umi自带，无需安装)
2. 文件 &#x20;

   .eslintrc.js

```javascript 
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'eslint:recommended'],
  globals: {
    // ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    // page: true,
    // REACT_APP_ENV: true,
  },
  rules: {
    eqeqeq: 'off',
    'no-alert': 'warn',
    'no-console': 'warn',
    'comma-spacing': 'warn',
    'no-implicit-coercion': 'warn',
    // camelcase: 'off',
    'no-shadow': 'warn',
    // 'spaced-comment': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'no-var': 'error',
    'no-use-before-define': 'off',
    'init-declarations': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'prefer-const': 'error',
    'no-script-url': 'error',
    'no-restricted-globals': 'error',
    'no-useless-return': 'off',
    'no-extra-label': 'error',
    'object-shorthand': 'error',
    yoda: 'error',
    'no-plusplus': 'off',
    'no-template-curly-in-string': 'error',
    'global-require': 'off',
    'no-empty': 'off',
    'no-param-reassign': 'off',
  },
};


```


.prettierrc.js

```javascript 
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
};


```


.stylelintrc.js

```javascript 
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
};


```


.eslintignore

```javascript 
/lambda/
/scripts
/config
/tests
.history
public
dist
.umi
mock
!.eslintrc.js
!.prettierrc.js
!.stylelintrc.js
sensorsdata.es6.min.js

```


.prettierignore

```javascript 
**/*.md
**/*.svg
**/*.ejs
**/*.html
package.json
.umi
.umi-production
.umi-test

```

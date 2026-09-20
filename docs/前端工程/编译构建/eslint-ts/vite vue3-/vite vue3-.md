# vite vue3&#x20;

## 目录

- [vite vue3 ](#vite-vue3-)

# vite vue3&#x20;

[vue3 + vite + JS 配置eslint自动验证 \_（Always）的博客-CSDN博客 vue3 + vite + JS 配置eslint自动验证 <https://blog.csdn.net/weixin_39481659/article/details/127222890>](https://blog.csdn.net/weixin_39481659/article/details/127222890 " vue3 + vite + JS 配置eslint自动验证_（Always）的博客-CSDN博客 vue3 + vite + JS 配置eslint自动验证 https://blog.csdn.net/weixin_39481659/article/details/127222890")

```typescript 
{
  "name": "vue-element-plus-admin",
  "version": "1.6.4",
  "description": "一套基于vue3、element-plus、typesScript、vite3的后台集成方案。",
  "author": "Archer <502431556@qq.com>",
  "private": false,
  "scripts": {
    "i": "pnpm install",
    "dev": "vite --mode base",
    "ts:check": "vue-tsc --noEmit",
    "build:pro": "vite build --mode pro",
    "build:gitee": "vite build --mode gitee",
    "build:dev": "npm run ts:check && vite build --mode dev",
    "build:test": "npm run ts:check && vite build --mode test",
    "serve:pro": "vite preview --mode pro",
    "serve:dev": "vite preview --mode dev",
    "serve:test": "vite preview --mode test",
    "npm:check": "npx npm-check-updates",
    "clean": "npx rimraf node_modules",
    "clean:cache": "npx rimraf node_modules/.cache",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:format": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,vue,html,md}\"",
    "lint:style": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
    "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
    "prepare": "husky install",
    "p": "plop"
  },
  "dependencies": {
    "@iconify/iconify": "^3.0.0",
    "@vueuse/core": "^9.2.0",
    "@wangeditor/editor": "^5.1.18",
    "@wangeditor/editor-for-vue": "^5.1.10",
    "@zxcvbn-ts/core": "^2.0.5",
    "animate.css": "^4.1.1",
    "axios": "^0.27.2",
    "echarts": "^5.3.3",
    "echarts-wordcloud": "^2.0.0",
    "element-plus": "2.2.17",
    "intro.js": "^6.0.0",
    "lodash-es": "^4.17.21",
    "mitt": "^3.0.0",
    "mockjs": "^1.1.0",
    "nprogress": "^0.2.0",
    "pinia": "^2.0.22",
    "pinia-plugin-persist": "^1.0.0",
    "qrcode": "^1.5.1",
    "qs": "^6.11.0",
    "url": "^0.11.0",
    "vue": "3.2.39",
    "vue-i18n": "9.2.2",
    "vue-router": "^4.1.5",
    "vue-types": "^4.2.1",
    "web-storage-cache": "^1.1.1"
  },
  "devDependencies": {
    "@commitlint/cli": "^17.1.2",
    "@commitlint/config-conventional": "^17.1.0",
    "@iconify/json": "^2.1.110",
    "@intlify/vite-plugin-vue-i18n": "^6.0.1",
    "@purge-icons/generated": "^0.9.0",
    "@types/intro.js": "^5.1.0",
    "@types/lodash-es": "^4.17.6",
    "@types/node": "^18.7.18",
    "@types/nprogress": "^0.2.0",
    "@types/qrcode": "^1.5.0",
    "@types/qs": "^6.9.7",
    "@typescript-eslint/eslint-plugin": "^5.38.0",
    "@typescript-eslint/parser": "^5.38.0",
    "@vitejs/plugin-vue": "^3.1.0",
    "@vitejs/plugin-vue-jsx": "^2.0.1",
    "autoprefixer": "^10.4.12",
    "eslint": "^8.23.1",
    "eslint-config-prettier": "^8.5.0",
    "eslint-define-config": "^1.7.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-vue": "^9.5.1",
    "husky": "^8.0.1",
    "less": "^4.1.3",
    "lint-staged": "^13.0.3",
    "plop": "^3.1.1",
    "postcss": "^8.4.16",
    "postcss-html": "^1.5.0",
    "postcss-less": "^6.0.0",
    "prettier": "^2.7.1",
    "rimraf": "^3.0.2",
    "rollup": "^2.79.0",
    "stylelint": "^14.12.0",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-recommended": "^9.0.0",
    "stylelint-config-standard": "^28.0.0",
    "stylelint-order": "^5.0.0",
    "typescript": "4.8.3",
    "unplugin-vue-macros": "^0.11.2",
    "vite": "3.1.3",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-mock": "^2.9.6",
    "vite-plugin-purge-icons": "^0.9.1",
    "vite-plugin-style-import": "2.0.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-windicss": "^1.8.8",
    "vue-tsc": "^0.40.13",
    "windicss": "^3.5.6",
    "windicss-analysis": "^0.3.5"
  },
  "engines": {
    "node": ">= 14.18.0"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/kailong321200875/vue-element-plus-admin.git"
  },
  "bugs": {
    "url": "https://github.com/kailong321200875/vue-element-plus-admin/issues"
  },
  "homepage": "https://github.com/kailong321200875/vue-element-plus-admin"
}

```


.eslintrc.js

```typescript 
// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'vue/no-reserved-component-names': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    "no-console": "off",
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off'
  }
})

```

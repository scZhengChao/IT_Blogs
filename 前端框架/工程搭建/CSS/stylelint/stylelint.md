# stylelint

## 目录

- [Unexpected unknown property "" ](#Unexpected-unknown-property--)

# Unexpected unknown property ""&#x20;

忽略 my- 开头的less 属性

```sass (sass)  
 rules: {
    'property-no-unknown': [true, { ignoreProperties: [/^my-/] }],
  },

```

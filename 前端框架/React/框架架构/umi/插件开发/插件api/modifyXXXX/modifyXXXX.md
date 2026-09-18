# modifyXXXX

&#x20;       以 `modify` 开头的 Api 大多数是为了修改某个东西，如果你理解了上面的 `add` 开头的 Api ，那 `modify` 开头的 Api 作用类似。最大的差别是以 `modify` 开头的 Api 大多数**会传入一个原始对象**，你**修改完之后**，需要 `return` 回来。

比如，修改配置信息 `modifyConfig`，我最喜欢的用法，就是把 `Umi` 配置的一些默认值，改成我想要的。

```javascript 
  const configDefaults = {
    history: { type: 'hash' },
    targets: {
      ie: 9,
    },
    hash: true,
    model: {},
    request: {},
    displayName: 'alita-demo',
    ...api.userConfig,
  };
  api.modifyConfig((memo: any) => {
    Object.keys(configDefaults).forEach((key) => {
      memo[key] = configDefaults[key];
    });
    return memo;
  });

```


需要特别关注的点是传入 `memo` 和 return `memo`。

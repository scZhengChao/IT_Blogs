# 错误处理

```javascript 
error Incorrect integrity when fetching from the cache for "xxxxxx". 
Cache has "sha512-95rVk6HKnBTDr/CWQf4LwHeXn/UqN8FcKDOtClkZ0E3ajiarujRDDx3ejH38TUkBewO55Q31ULGdRzW2cQzMKw== sha1-+4bAQUR5PTMHSjyCk9KMw8UQuY4=" 
and remote has "sha512-bXpDY0k2hi6Fr+0iwhBxgOXEuOe5zsRUeIgejK1dIQfUfxywlYxtXfH1SMjaUlMfbN/2UgNoRO6guLH4VaxyBg==". 
Run `yarn cache clean` to fix the problem

```


解决方案

```javascript 
yarn cache clean
yarn --update-checksums
yarn install

```

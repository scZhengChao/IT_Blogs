# optional

## 目录

- [介绍 :](#介绍-)

# 介绍 :

可能**包含或不包含非空值的容器对象**。 如果一个值存在， `isPresent`()将返回`true`和`get`()将返回值
&#x20;      简单理解 : 使用`Optional`\*\*可以简化非空判断操作
\*\*​

`Optional`类常用的功能

- `public static <T> Optional<T> of(T value) `: 通过非null值构建一个Optional容器,注意**value不能不为null否则抛出异常**
- `public static <T> Optional<T> ofNullable(T value)` : 通过指定值构建一个Optional容器,如果值为null则返回Optional.empty
- `public T orElse(T other)` : 返回值如果存在，否则返回 other 。&#x20;
- `public boolean isPresent() `: 如果存在值，则返回 true ，否则为 false
- `public T get()` : 如果 `Optional`中存在值，则返回值，否则抛出 NoSuchElementException&#x20;

![](./assets/image/image_ym_ofqMBVE.png)

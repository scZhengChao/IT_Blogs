# Label（标签）

## 目录

- [Label Selector（标签选择器）](#Label-Selector标签选择器)

`Label`是`Kubernetes`系统中的**一个核心概念**。
`Label`以`key/value`**键值对的形式附加到各种对象**上，如`Pod`、`Service`、`RC`、`Node`等。
Label**定义了这些对象的可识别属性**，用来**对它们进行管理和选择**。`Label`可以在创建时附加到对象上，也可以在对象创建后通过API进行管理。

![](./image/image_ENrtd7yZOA.png)

### Label Selector（标签选择器）

在为对象定义好`Label`后，**其他对象**就可以使用`Label Selector（`选择器）来**定义其作用的**对象了。

`Label Selector的`定义由多个逗号分隔的条件组成。

```yaml 
“labels”: {
  “key1”: “value1”,
  “key2”: “value2”
}
```


当前有两种`Label Selector`：

**基于等式的（Equality-based）**和**基于集合的（Set-based）**，在使用时可以将多个`Label`进行组合来选择。

1、基于等式的Label Selector使用等式类的表达式来进行选择：

- name = redis-slave: 选择所有包含Label中key="name"且value="redis-slave"的对象；
- env != production: 选择所有包括Label中的key="env"且value不等于"production"的对象。

2、基于集合的`Label Selector`使用集合操作的表达式来进行选择：

- name in (redis-master, redis-slave): 选择所有包含Label中的key="name"且value="redis-master"或"redis-slave"的对象；
- name not in (php-frontend): 选择所有包含Label中的key="name"且value不等于"php-frontend"的对象。

ps：在某些对象需要对另一些对象进行选择时，可以将多个Label Selector进行组合，使用逗号","进行分隔即可。
**基于等式**的`LabelSelector`和**基于集合**的Label Selector可以任意组合。
例如：

- name=redis-slave,env!=production
- name not in (php-frontend),env!=production

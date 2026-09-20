# **通配符**

## 目录

- [上界通配符](#上界通配符)
- [super通配符](#super通配符)
- [案例](#案例)

# **上界通配符**

使用类似`<? extends Number>`通配符作为方法参数时表示：

- **方法内部可以调用获取**\*\*`Number`****引用的方法，例如：****`Number n = obj.getFirst();`；\*\*​
- **方法内部无法调用传入**\*\*`Number`****引用的方法（****`null`****除外），例如：****`obj.setFirst(Number n);`。\*\*​

即一句话总结：**使用**\*\*`extends`\*\***通配符表示可以读，不能写。**

使用类似`<T extends Number>`定义泛型类时表示：

- 泛型类型限定为`Number`以及`Number`的子类。

# `super`通配符

使用类似`<? super Integer>`通配符作为方法参数时表示：

- 方法内部可以调用传入`Integer`引用的方法，例如：`obj.setFirst(Integer n);`；
- 方法内部无法调用获取`Integer`引用的方法（`Object`除外），例如：`Integer n = obj.getFirst();`。

即使用`super`通配符表示只能写不能读。

使用`extends`和`super`通配符要遵循PECS原则。

无限定通配符`<?>`很少使用，可以用`<T>`替换，同时它是所有`<T>`类型的超类。

# 案例

[extends通配符（ 上界通配符 ）（子类）](<./extends通配符（ 上界通配符 ）（子类）/index.md> "extends通配符（ 上界通配符 ）（子类）")

[super通配符](./super通配符/index.md "super通配符")

[无限定通配符](./无限定通配符/index.md "无限定通配符")

[对比](./对比/index.md "对比")

[案例](./案例/index.md "案例")

[PECS原则](./PECS原则/index.md "PECS原则")

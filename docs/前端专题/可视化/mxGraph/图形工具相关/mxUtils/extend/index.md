# extend

## 目录

- [1. 函数定义与作用](#1-函数定义与作用)
- [2. 代码示例](#2-代码示例)
  - [基础继承](#基础继承)
  - [在 mxGraph 中的应用](#在-mxGraph-中的应用)
- [3. 实现原理](#3-实现原理)
- [4. 与 ES6extends的对比](#4-与-ES6extends的对比)
- [5. 使用场景](#5-使用场景)
- [6. 注意事项](#6-注意事项)

`mxUtils.extend`是**mxGraph 库**中用于实现 JavaScript 继承的工具函数，其作用类似于 ES6 的`class`和`extends`语法，但专为 mxGraph 的类继承设计。以下是它的核心用法和原理：

### **1. 函数定义与作用**

- **功能** &#x20;

  创建一个子类（Subclass）继承父类（Superclass）的原型链，实现原型继承。
- **语法**

```javascript 
mxUtils.extend(ChildClass, ParentClass);
```


### **2. 代码示例**

#### **基础继承**

```javascript 
// 父类
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(this.name + " makes a noise.");
};

// 子类 Dog 继承 Animal
function Dog(name) {
    Animal.call(this, name); // 调用父类构造函数
}
mxUtils.extend(Dog, Animal); // 继承原型

// 重写方法
Dog.prototype.speak = function() {
    console.log(this.name + " barks.");
};

// 使用
const dog = new Dog("Buddy");
dog.speak(); // 输出 "Buddy barks."
```


#### **在 mxGraph 中的应用**

```javascript 

// 自定义圆柱体形状，继承 mxCylinder
function CustomCylinder() {
    mxCylinder.call(this); // 调用父类构造函数
}
mxUtils.extend(CustomCylinder, mxCylinder); // 继承原型

// 重写绘制路径方法
CustomCylinder.prototype.redrawPath = function(path, x, y, w, h) {
    // 自定义绘制逻辑
    path.moveTo(x, y);
    path.ellipse(x + w/2, y, w/2, h/4, 0, 0, 2 * Math.PI);
    path.close();
};

// 注册自定义形状
mxCellRenderer.registerShape("customCylinder", CustomCylinder);

// 使用
const style = graph.getStylesheet().getDefaultVertexStyle();
style[mxConstants.STYLE_SHAPE] = "customCylinder";

```


### **3. 实现原理**

`mxUtils.extend`的核心逻辑类似于以下代码：

```javascript 
mxUtils.extend = function(Child, Parent) {
    // 创建一个中间构造函数，避免直接修改 Parent.prototype
    function Temp() {
        this.constructor = Child;
    }
    Temp.prototype = Parent.prototype;
    Child.prototype = new Temp();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype; // 提供父类引用
};
```


**关键点**：

1. **原型链继承** &#x20;

   子类`Child`的原型指向父类`Parent`的原型实例，形成继承链。
2. **构造函数修正** &#x20;

   确保子类实例的构造函数正确指向`Child`。
3. **父类引用** &#x20;

   通过`Child.superclass`可访问父类原型（类似`super`的作用）。

### **4. 与 ES6**\*\*`extends`\*\***的对比**

| **特性**​     | \`mxUtils.extend\`            | ES6\`extends\`       |
| ----------- | ----------------------------- | -------------------- |
| **语法兼容性**​  | 兼容旧浏览器（ES5）                   | 需 Babel 转译（ES6+）     |
| **构造函数调用**​ | 需手动调用\`Parent.call(this)\`    | 自动通过\`super()\`调用    |
| **父类方法调用**​ | 通过\`Parent.prototype.method\` | 通过\`super.method()\` |
| **静态方法继承**​ | 不支持                           | 支持                   |

***

### **5. 使用场景**

-

继承`mxShape`或其子类（如`mxCylinder`），重写`redrawPath`方法。

- **扩展功能** &#x20;

  为 mxGraph 的组件（如`mxGraphModel`、`mxEditor`）添加新功能。
- **代码复用** &#x20;

  复用父类逻辑，避免重复代码。

### **6. 注意事项**

1. **构造函数调用** &#x20;

   子类构造函数中需手动调用`Parent.call(this)`，否则父类属性无法初始化。

```javascript 
function Child() {
    Parent.call(this); // 必须显式调用
    // 子类初始化...
}
```


1. **方法重写**
   若需调用父类方法，需通过原型链直接访问：

```javascript 
Child.prototype.method = function() {
    Parent.prototype.method.call(this); // 调用父类方法
    // 子类扩展逻辑...
};
```


1. **静态属性**`mxUtils.extend`不继承父类的静态属性，需手动复制：

```javascript 
Child.staticMethod = Parent.staticMethod;
```


但需注意：mxGraph 内部大量使用 ES5 风格的原型链，混用 ES6 类可能引发兼容性问题。

***

通过`mxUtils.extend`，mxGraph 提供了一种兼容性良好的继承机制，适合在旧版浏览器或传统项目中扩展图形功能。

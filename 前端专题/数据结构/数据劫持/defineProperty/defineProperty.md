# defineProperty

## 目录

- [9.Object.defineProperty](#9ObjectdefineProperty)
  - [9.1 简介](#91-简介)
  - [9.2 属性的特性以及内部属性](#92-属性的特性以及内部属性)
  - [9.3 属性描述符](#93-属性描述符)
    - [    9.3.1 数据描述符](#--931-数据描述符)
    - [   9.3.2 存取描述符 ](#-932存取描述符-)
    - [   9.3.3   数据描述符和存取描述均具有以下描述符](#-933-数据描述符和存取描述均具有以下描述符)
    - [   9.3.4  注意：configrable 和 writable 的区别： ](#-934-注意configrable和writable的区别)
  - [9.4   对象常量](#94-对象常量)
  - [9.5    禁止扩展](#95--禁止扩展)
  - [9.6  密封](#96-密封)
  - [9.7 冻结](#97-冻结)
  - [9.8 示例](#98-示例)

# 9.Object.defineProperty

## 9.1 简介

      Object.defineProperty()的作用就**是直接在一个对象上定义一个新属性，或者修改一个已经存在的属**性 &#x20;

```javascript 
 obj.a=b or obj[a] = b
```


\*\* Object.defineProperty(obj, prop, desc)\*\* ​

1\. obj 需要定义属性的当前对象

2\. prop 当前需要定义的**属性名**

**3. desc 属性描述符**

一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，但是通过Object.defineProperty()定义属性，通过**描述符的设置可以进行更精准的控制对象属性**。

## 9.2 属性的特性以及内部属性

javacript 有三种类型的属性

1\. **命名数据属性**：拥有一个确定的值的属性。这也是最常见的属性

2.**命名访问器属性：通过getter和setter进行读取和赋值的属性**

3\. **内部属性**：由JavaScript引擎内部使用的属性，**不能通过JavaScript代码直接访问到**，不过可以通过一些方法间接的读取和设置。比如，每个对象都有一个内部属性\[\[Prototype]]，你不能直接访问这个属性，但可以通过Object.getPrototypeOf()方法间接的读取到它的值。

**虽然内部属性通常用一个双吕括号包围的名称来表示**，但实际上这并不是它们的名字，它们**是一种抽象操作，是不可见的，根本没有上面两种属性有的那种字符串类型的属**性

## 9.3 属性描述符

    有两种形式，**且不能混合使用**，分别为**数据描述符，存取描述符**，下面分别描述下两者的区别：

###     9.3.1 数据描述符

- value: 'jack',
- writable: true // 是否可以改变

### \*\* \*\*  9.3.2 存取描述符&#x20;

\--是由一对 getter、setter 函数功能来描述的属性

- get：一个给属性提供getter的方法，如果没有getter则为undefined。**该方法返回值被用作属性值**。默认为undefined。
- set：一个给属性提供setter的方法，如果没有setter则为undefined **。该方法将接受唯一参数，并将该参数的新值分配给该属性**。默认值为undefined。

###    9.3.3   数据描述符和存取描述均具有以下描述符

        1. \*\*configrable \*\*描述属性是否配置，以及可否删除 porp不能被重新定义和删除

        2. \*\*enumerable \*\*描述属性是否会出现在for in 或者 Object.keys()的遍历中

###    9.3.4  注意：configrable 和 writable 的区别： 

        1.configurable: false 时，*不能删除当前属性，且不能重新配置当前属性的描述符*(**有一个小小的意外：可以把writable的状态由true改为false,但是无法由false改为true**),但是在writable: true的情况下，可以改变value的值

        2.configurable: true时，*可以删除当前属性，可以配置当前属性所有描述符。*

## 9.4   对象常量

        结合writable: false 和 configurable: false 就可以创建一个真正的常量属性（不可修改，不可重新定义或者删除）

## 9.5    禁止扩展

        如果你想禁止一个**对象添加新属性并且保留已有属性**，就可以使用`Object`.`preventExtensions`(...)

## 9.6  密封

Object.seal()会创建一个密封的对象，这个方法*实际上会在一个现有对象上调用object.preventExtensions(...);并把所有现有属性标记为configurable:false。*

## 9.7 冻结

        Object.freeze()会创建一个冻结对象，

        这个方法实际上会在一个现有对象上调用Object.seal(),

        并把所有现有属性**标记为writable: false,这样**就无法修改它们的值。**这个方法是你可以应用在对象上级别最高的不可变性**，它会禁止对于对象本身及其任意直接属性的修改（但是这个对象**引用的其他对象是不受影响**的）

        你可以**深度冻结一个对**象，具体方法为，首**先这个对象上调用Object.freeze()然后遍历它引用的所有对象，并在这些对象上调用Object.freeze()**

。但是一定要小心，因为这么做有可能会无意中冻结其他共享对象。

## 9.8 示例

```javascript 
 
object.defineProperty(data,key,{
    configurable:true , //configrable 描述属性是否配置，以及可否删除 他本身就是一个配置项
    enumerable:true, //属性是否会出现在for in 或者Object。keys（） 的遍历中，
    writable: false
    get:function getter(){ //参考computed 中的get
        if(Dep.target){
            dep.addSub(Dep.target)
        }
        return val
    },
    set:function setter(newVal){
        if(newVal === val){
            return
        }
        val = newVal
        dep.notify()
    }
})
```

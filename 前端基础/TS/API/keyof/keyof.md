# keyof

## 目录

- [映射类型 key 值的交集与并集](#映射类型-key-值的交集与并集)
- [keyof（索引查询）](#keyof索引查询)
  - [keyof 和泛型](#keyof-和泛型)
  - [使用keyof映射其它类型](#使用keyof映射其它类型)
  - [keyof 索引是公有属性 key 的联合](#keyof-索引是公有属性-key-的联合)
  - [通过extends keyof T进行遍历](#通过extends-keyof-T进行遍历)

# 映射类型 key 值的交集与并集

```typescript 
type foo = {
  name: string;
  age: string;
}
type coo = {
  age: number;
  sex: string
}
type TestUnion = keyof foo | keyof coo; // 'name' | 'age' | 'sex'
type TestBoth = keyof (foo | coo);  // 'age'

```


# keyof（索引查询）

`keyof` 操作符可以用于**获取某种类型的所有键，其返回类型是联合类型。**

```javascript 
interface IPerson {
  name: string;
  age: number;
}

type Test = keyof IPerson; // 'name' | 'age'

```


## keyof 和泛型

```javascript 
function getProperty<T, K extends keyof T>(obj: T, key: K)：T[K] {
 return obj[key];
}
```


看起来有点复杂，让我们解释一下，

- 第一个参数**T**, 就是传入参数的类型，可以是任何类型
- 第二个参数 *K* extends keyof *T* ，其中keyof返回了包含T类型中所有属性名中的联合类型。**extends** **关键字**在这里是用**来限制传入类型，而不是继承**。
- 最后返回类型是\_T\_ \[*K*] 也就是我们的 *obj* \[*key*]

```javascript 
function getProperty<T, K extends keyof T>(obj： T, key: K): T[K]
  return obj [key];
}
type Person 二 {
  name string;
  age: number;
};
const person: Person
  name: "George'，
  age: 30,
};
const personName getProperty(person,'name")；
const personAge = getProperty(person,' age"）;
const personother 二 getProperty(person, "other'）; //类型错误

```


我们先定义了一个Person类型，调用函数时**T**就是**Person**，它有两个属性，**age**, **name**， 所以第二个参数传入这两个字符串是没有问题的，而传入其他参数就会报错，比如最后一行的**other**。这就说明，参数已经被 **keyof Person**限制了，也就是我们上面定义的 *K* extends keyof *T*

## **使用keyof映射其它类型**

继续请看例子：

```javascript 
type PersonAction = {
  walk: ()=>void;
  talk: ()=>void;
};
type BooleanFieldsProps<T> = {
   [Property in keyof T]: boolean; 
};
type PersonProps = BooleanFieldsProps<PersonAction>;
/*
type PersonProps = {
  walk: boolean;
  talk: booLean;
} */
```


我们开始定义了一个\_PersonAction\_ 的类型，它定义了Person的行为，walk, talk, 他们都是函数，接下来，我们定义了\_BooleanFieldsProps\_<*T*> ，它的意思是，把所有T类型的属性，全部变成**Boolean**类型，从而产生一个新类型。这就是\_PersonProps\_ 的定义，可以看到，经过转化后，我们得到了一个含有Person所有属性名，但类型为**Boolean**的新类型：

以上就是keyof最基本的用法，当您在 TypeScript 中与其他工具一起在正确的位置使用它时，您可以构造简洁且受良好约束的类型，以提高代码中的类型安全性。

## keyof 索引是公有属性 key 的联合

keyof 索引查询 

对应任何类型 T, keyof T 的结果为该类型上**所有公有属性 key 的联合**：

```typescript 
interface Eg1 {
  name: string,
  readonly age: number,
}
// T1的类型实则是name | age
type T1 = keyof Eg1
class Eg2 {
  private name: string;
  public readonly age: number;
  protected home: string;
}
// T2实则被约束为 age
//  而name和home不是公有属性，所以不能被keyof获取到 
type T2 = keyof Eg2 
```


## 通过extends keyof T进行遍历

映射类型

```typescript 
type ObjectEntries<T extends Record<string, any>, K = keyof T> = K extends keyof T ? [K, T[K]]: [];
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> 
// ['name', string] | ['age', number] | ['locations', string[] | null];

```

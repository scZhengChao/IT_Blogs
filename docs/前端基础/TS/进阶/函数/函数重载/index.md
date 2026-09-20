# 函数重载

## 目录

- [什么是函数重载(overload)](#什么是函数重载overload)
- [重载签名](#重载签名)
- [实现签名](#实现签名)
- [额外知识](#额外知识)
- [重载写法](#重载写法)
  - [函数重载](#函数重载)
  - [构造函数重载](#构造函数重载)
- [案例](#案例)

**解决 每次都用as 断言的问题**

# 什么是函数重载(overload)

&#x20;        在引出**函数重载**之前我们需要了解一个前提知识，在 JS 里**同一个函数是可以被声明多次**的，结果是会优先**采用最后一次的函数体**。什么意思呢？如下图，这是一个 `.js` 文件，**JS 不仅不会报错，并且还可以正常执行**。

![](./assets/image/image_QaR8-DfhfU.png)

&#x20;         然而在 TS 里这种方式是会引发类型报错的。虽然 TS\*\* 只是会提醒类型错误，不影响这个文件的最终运行\*\*。但是明眼人都可以看出哪种开发模式更加适合团队合作。很明显 `TS` 更加符合我们的直觉，不允许变量在同一作用域下多次赋值。

![](./assets/image/image_WULr1R4H_F.png)

&#x20;           所以\*\* JS 是没有重载签名这个概念\*\*的，这是 `TS` 所给你带来的优势。关于函数重载更加深刻的实现原理，由于使用的不多我暂时无法给你深入讲解原理，在这里我仅谈一谈目前我个人理解，可能有些大白话，但是应该可以帮你先浅浅的了解这个名词。

# 重载签名

1. 我们先说重载签名，我们知道函数基本上是由四部分组成：**一个函数名，一个函数参数，一个函数体，一个返回值。**

![](./assets/image/image_4z7EnpBYiu.png)

1. `TS` 可以帮你分别约束 **参数类型**和**返回值类型**，也就是下面这两个。

![](./assets/image/image_wFYbYvyuKM.png)

1. 而**重载签名**的意思就是**只需要你提供**一个函数的**参数类型**和**返回值类型**，**不需要你提供函数体**。什么意思呢？这里我们还拿刚刚获取用户信息 `getData` 举例子。

![](./assets/image/image_Pf5Urq8pS7.png)

1. 我们就可以声明**一个同名函数**。`getData` 按照上面刚刚讲到的，我们**只约束**它的**参数类型**和**返回值类型**。我们发现，`TS` 竟然没有报错。

![](./assets/image/image_R_1Z6oTu5X.png)

1. 按照同样的思路，我们再声明一个通过 `ID数组` 获取多个用户信息的函数。

![](./assets/image/image_mfq0XpJAGz.png)

1. 如果你留心的话，到现在我们其实已经实现了函数重载。你会发现我们现在已经不需要 `as` 去告诉 `TS` 类型了，它已经帮我们完成了推导。

![](./assets/image/image_C8F3iDsDok.png)

1. 我们换一下参数类型，我们把参数类型换成一个字符串看看是什么结果。你会发现，`TS` 非常聪明的推断出，你想要的结果是一个用户的数据，并不是多个用户的数据，所以提示你参数错误。

![](./assets/image/image_TvPBXIvlHH.png)

1. 我们改一下 `userData` 的类型来确认一下我们的猜想是否正确。

![](./assets/image/image_CiQtQPiOJF.png)

`TS` 没有报错，果然是我们所想的那样。

# 实现签名

1. 聪明的你可能已经猜到了，实现前面其实就是**一个带有函数体的同名函数**。并且这个函数的**参数类型**要**完全包含 函数签名**的**所有类型**。

![](./assets/image/image_DE3N51SHby.png)

1. 什么意思呢？我们删除了 `string数组` 的参数类型。你会发现第二个函数签名飘红报错了。

![](./assets/image/image_4IUV9KuXuZ.png)

错误信息如下：

![](./assets/image/image_7OwqG6cA-m.png)

1. 实现签名的返回值同理，不再过多赘述。
2. 最重要的一点来了，你需要在实现签名内非常明确的判断出不同类型的参数所对应的返回值。才能让 `TS` 去实现精确的类型推导。

![](./assets/image/image_UkutChmSdz.png)

1. 至此你已经完成了标题的功能---- **函数重载**。

# 额外知识

1. 函数重载可以**有多个重载签名**，但是**只允许有一个实现签名**。说白了就是一个函数名只能有一个函数体。

![](./assets/image/image_VqNRciAjHs.png)

1. 函数重载不仅仅只能约束参数类型，还能根据参数的数量去返回不同的类型的返回值。（`arguments`：别忘了函数内还有我这个对象。T.T）
2. **Class** 类也可以实现 `constructor` 的重载。
3. 也许你早就遇到过 `TS` 给你抛出的这个错误，但是你之前可能不知道是什么引起的。心里默念（overload+1）到底是什么鬼啊！

![](./assets/image/image_Fvg1IJLmKM.png)

# 重载写法

### 函数重载

```typescript 
function getMessage(value: number): Message; //重载签名1
function getMessage(value: MessageType, count: number): Message[]; //重载签名2
//实现签名↓
//参数类型也可以定义为： any 或 unknown（和any一样都是顶级类型）
function getMessage(value: number | MessageType, count: number = 1) {
  //count: number = 1 必须要加这个默认值，因为签名1没有这个参数，函数体中却有，会报错
  if (typeof value === "number") {
    return messages.find((msg) => {
      return value === msg.id;
    });
  } else {
    //过滤后得到多条，在splice确定返回条数
    return messages.filter((msg) => value === msg.type).splice(0, count);
  }
}

const detail = getMessage(1);
const list = getMessage("pay", 2); //签名定义了必须2个参数
console.log("1:", detail.msg); //这样直接点即可操作，不需要在(<>)转换了

list.forEach((item) => {
  console.log("2:", item.msg);
});
```


### 构造函数重载

```typescript 
type people = {
  name: string;
  age: number;
  sex?: string;
};
const san: people = {
  name: "山姆",
  age: 18,
  sex: "男",
};
console.log("type类型：", typeof san); //object

class Love {
  public name: string;
  public age: number;
  public sex: string;

  constructor(name_: string, age_: number);
  constructor(param: people);
  //由于构造函数本身不返回任何值，默认this且隐藏，所以重载和实现签名都不返回
  constructor(nameOrParam: any, age_: number = 0) {
    if (typeof nameOrParam === "object") {
      this.name = nameOrParam.name;
      this.age = nameOrParam.age;
      this.sex = nameOrParam.sex;
    } else {
      this.name = nameOrParam;
      this.age = age_;
      this.sex = "未知";
    }
  }

  public show(): string {
    let str = `这是一位${this.age}的${this.sex},名叫${this.name}`;
    console.log(str);
    return str;
  }
}

const a = new Love("小丽", 18);
const b = new Love(san);
a.show(); //这是一位18的未知,名叫小丽
b.show(); //这是一位18的男,名叫山姆

export {};

```


# 案例

```react tsx 
function getSingleDictionary(): Partial<AllDictionaryValues>
function getSingleDictionary(type: DictionaryTypesEnum,filterStatus?: boolean): DictionaryValuesModel[]
function getSingleDictionary(
  type?: DictionaryTypesEnum,
  filterStatus: boolean = true,
){
  if (type) {
    const options = allDictionaryValues?.[type] || [];
    return filterStatus
      ? options.map((item) => {
          return { ...item, disabled: item.status === DictionaryStatusEnum.已停用 };
        })
      : options;
  }
  return allDictionaryValues;
};
```

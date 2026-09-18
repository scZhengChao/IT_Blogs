# 初探javascript设计模式-访问者模式

## 目录

- [一、什么是访问者模式](#一什么是访问者模式)
- [二、场景模拟](#二场景模拟)
- [三、访问者模式实现](#三访问者模式实现)
- [四、总结](#四总结)
  - [使用场景](#使用场景)
  - [优点](#优点)
  - [缺点](#缺点)

### 一、什么是访问者模式

定义：使用一个访问者类，改变元素类的执行算法。通过这种方式，元素的执行算法可以随着访问者改变而改变。

目的：将数据结构与数据操作分离。

### 二、场景模拟

比如老师家访学生，不同科目的老师就是访问者，通过学生的描述，老师对同一个学生做出一个判断

### 三、访问者模式实现

```typescript 
// 元素类
class Student {
    constructor(name, chinese, math, english) {
        this.name = name
        this.chinese = chinese
        this.math = math
        this.english = english
    }

    accept(visitor) {
        visitor.visit(this)
    }
}

// 访问者类
class ChineseTeacher {
    visit(student) {
        console.log(`语文${student.chinese}`)
    }
}

class MathTeacher {
    visit(student) {
        console.log(`数学${student.math}`)
    }
}

class EnglishTeacher {
    visit(student) {
        console.log(`英语${student.english}`)
    }
}

// 实例化元素类
const student = new Student('张三', 90, 80, 60)
// 实例化访问者类
const chineseTeacher = new ChineseTeacher()
const mathTeacher = new MathTeacher()
const englishTeacher = new EnglishTeacher()
// 接受访问
student.accept(chineseTeacher)
student.accept(mathTeacher)
student.accept(englishTeacher)

```


### 四、总结

#### 使用场景

访问者使用的条件较为苛刻，结构也很复杂，所以实际应用使用的频率不高。**当你系统中存在一个比较复杂的对象结构**，并且存在着**不同的访问者并对其访问的操作也不同的时候，可以使用访问者模式。**

#### 优点

- 各角色的职责相互隔离，符合单一职责原则。
- 扩展性好，添加新的访问者不需要修改原代码。

#### 缺点

- 不能解决添加一个元素类的问题，一旦添加一个元素类，就要修改所有相关的访问者。
- 可能破坏元素类的封装性，因为该模式需要访问者对象去调用元素对象的具体操作，所以可能需要元素对象暴露自己一些内部状态，来配合访问者对象一起完成操作。

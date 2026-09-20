# this

## 目录

- [链式调用](#链式调用)
- [灵活调用子类父类方法](#灵活调用子类父类方法)

## 链式调用

类的成员方法可以直接返回一个 `this`，这样就可以很方便地实现链式调用。

```javascript 
class StudyStep {
  step1() {
    console.log('listen')
    return this
  }
  step2() {
    console.log('write')
    return this
  }
}

const s = new StudyStep()

s.step1().step2()    // 链式调用

```


## 灵活调用子类父类方法

在继承的时候，this 可以表示父类型，也可以表示子类型

```javascript 
class StudyStep {
  step1() {
    console.log('listen')
    return this
  }
  step2() {
    console.log('write')
    return this
  }
}

class MyStudyStep extends StudyStep {
  next() {
    console.log('before done, study next!')
    return this   
  }
}

const m = new MyStudyStep()

m.step1().next().step2().next()   // 父类型和子类型上的方法都可随意调用
```

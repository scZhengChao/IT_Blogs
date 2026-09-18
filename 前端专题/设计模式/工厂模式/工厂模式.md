# 工厂模式

## 目录

- [es5](#es5)
  - [实现一](#实现一)
  - [实现二](#实现二)
- [es6](#es6)

定义：**不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，这个函数被视为一个工厂**

分类：简单工厂，工厂方法，抽象工厂

区别：简单工厂是将**创建对象的步骤放在父类进行**，**工厂方法是延迟到子类中**进行，它们两者都可以总结为：“根据传入的字符串来选择对应的类”，而抽象工厂则是：“用第一个字符串选择父类，再用第二个字符串选择子类”。可以将`对象的创建和使用分离`，使得系统更加灵活。

# es5

## 实现一

```typescript 
var UserFactory = function (role) {
    function Admin() {
        this.name =  "管理员" ,
        this.viewPage = [ '首页' ,  '查询' ,  '权限管理' ]
    }
    function User() {
        this.name =  '普通用户' ,
        this.viewPage = [ '首页' ,  '查询' ]
    }
    switch (role) {
        case  'admin' :
            return new Admin();
            break;
        case  'user' :
            return new User();
            break;
        default:
            throw new  Error ( '参数错误, 可选参数: admin、user' );
    }
}
var admin = UserFactory( 'admin' );
var user = UserFactory( 'user' );
```


## 实现二

```typescript 
//安全模式创建的工厂方法函数
 var UserFactory = function (role) {
    if (this instanceof UserFactory) {
        var s = new this[role]();
        return s;
    } else {
        return new UserFactory(role);
    }
}
 //工厂方法函数的原型中设置所有对象的构造函数
 UserFactory.prototype = {
    Admin: function () {
        this.name =  "管理员" ,
        this.viewPage = [ '首页' ,  '查询' ,  '权限管理' ]
    },
    User: function () {
        this.name =  '用户' ,
        this.viewPage = [ '首页' ,  '查询' ]
    }
}
 //调用
 var admin = UserFactory( 'Admin' );
var user = UserFactory( 'User' );
```


**推荐二**

# es6

```javascript 
// 定义一个抽象类
class Animal {
  speak() {
    throw new Error('This method must be implemented.');
  }
}

// 实现具体的类
class Dog extends Animal {
  speak() {
    return 'Woof!';
  }
}

class Cat extends Animal {
  speak() {
    return 'Meow!';
  }
}

// 实现工厂方法
class AnimalFactory {
  createAnimal(animalType) {
      switch(animalType) {
        case 'dog':
          return new Dog();
        case 'cat':
          return new Cat();
        default:
          throw new Error(`Invalid animal type: ${animalType}`);
      }
  }
}

// 使用工厂方法创建对象
const animalFactory = new AnimalFactory();
const dog = animalFactory.createAnimal('dog');
console.log(dog.speak()); // Output: Woof!
const cat = animalFactory.createAnimal('cat');
console.log(cat.speak()); // Output: Meow!


```

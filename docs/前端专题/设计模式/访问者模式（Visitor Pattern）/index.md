# 访问者模式（Visitor Pattern）

## 目录

- [访问者模式的实例](#访问者模式的实例)
- [访问者模式的优势](#访问者模式的优势)

即根据访问者不同，所展示的行为也不同。

# 访问者模式的实例

首先我们定义一组设备

```java 
class Keyboard {
    accept(computerPartVisitor) {
       computerPartVisitor.visit(this);
    }
}
class Monitor {
    accept(computerPartVisitor) {
       computerPartVisitor.visit(this);
    }
}
class Mouse {
    accept(computerPartVisitor) {
       computerPartVisitor.visit(this);
    }
}
```


定义电脑为一种设备，同时集成了其它设备

```javascript 
class Computer {
    constructor(){
       this.parts = [new Mouse(), new Keyboard(), new Monitor()];      
    } 
    accept(computerPartVisitor) {
       for (let i = 0; i < this.parts.length; i++) {
        this.parts[i].accept(computerPartVisitor);
       }
       computerPartVisitor.visit(this);
    }
}
```


定义访问者接口

```javascript 

class ComputerPartDisplayVisitor{
    visit(device) {
        console.log(`Displaying ${device.constructor.name}.`);
    }
}
```


在使用的时候都**只需要用设备接受新的访问者即可实现对应访问者的功能**

```typescript 
const computer = new Computer();
computer.accept(new ComputerPartDisplayVisitor());
/**
 * output:
 * Displaying Mouse.
 * Displaying Keyboard.
 * Displaying Monitor.
 * Displaying Computer.
 */
```


# 访问者模式的优势

如上**类似设备这个东西是一个相对稳定的结构，而访问者要实现的功能又是非常不确定的**，那么针对不同访问者，都可以对相同的设备进行不同的输出。其次只需要暴露特定接口，而相对稳定的设备不需要考虑接口中实现的内容。

[理解](IT/前端专题/设计模式/访问者模式（Visitor%20Pattern）/理解/理解.md "理解")

[【设计模式27】访问者模式+源码分析：Eclipse JDT AST中浏览者模式](<./【设计模式27】访问者模式+源码分析：Eclipse JDT/【设计模式27】访问者模式+源码分析：Eclipse JDT AST中浏览者模式.md> "【设计模式27】访问者模式+源码分析：Eclipse JDT AST中浏览者模式")

[初探javascript设计模式-访问者模式](./初探javascript设计模式-访问者模式/index.md "初探javascript设计模式-访问者模式")

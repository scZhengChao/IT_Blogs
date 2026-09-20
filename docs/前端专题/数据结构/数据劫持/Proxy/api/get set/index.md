# get set

## 目录

- [get  set ](#get-set)
- [getter/setter 也可以动态设置吗？](#gettersetter-也可以动态设置吗)

# get  set\*\* \*\*

```javascript 
 //koa 里有用到 原理
const obj = {
    info:{name:'zc'},
    get name(){
        return this.info.name
    },
    set name(value){
        console.log('new name is '+ value)
        this.info.name = value
    }
}
console.log(obj.name)
obj.name ='jhahahha'
console.log(obj.name)

//输出
zc
new name is jhahahha
jhahahha
```


# `getter/setter` 也可以动态设置吗？

```javascript 
class Hello {
  _name = 'lucy';
 
  getName() {
    return this._name;
  }
  
  // 静态的getter
  get id() {
    return 1;
  }
}

const hel = new Hello();

hel.name;       // undefined
hel.getName();  // lucy

// 动态的getter
Hello.prototype.__defineGetter__('name', function() {
  return this._name;
});

Hello.prototype.__defineSetter__('name', function(value) {
  this._name = value;
});

hel.name;       // lucy
hel.getName();  // lucy

hel.name = 'jimi';
hel.name;       // jimi
hel.getName();  // jimi

```

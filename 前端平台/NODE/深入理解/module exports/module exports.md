# module exports

在每个模块中， module 的自由变量是对表示当前模块的对象的引用。 为方便起见，还可以通过全局模块的 exports 访问 module.exports。 module 实际上不是全局的，而是每个模块本地的。   &#x20;

- \*\*exports \*\***变量是在模块的文件级作用域内可用的，且在模块执行之前赋值给 module.exports。**
- **它允许使用快捷方式，因此 module.exports.f = ... 可以更简洁地写成 exports.f = ...。**
  - **但是，就像任何变量一样，如果为 exports赋予了新值，则它将不再绑定到 module.exports：**
- &#x20; 最终执行到处工作的是 module.exports
- \*\* ****​模块导入会缓存，写了多次导入，只会导一****次。即使导入的路径不一样。它缓存是指实际文件名，并不会因为传入的路径形式不一样而认会是不同的文\*\*件
- **NodeJs开发者建****议导出对象用module.exports****,导出多个方法和变量用export**s
- **​exports仅仅是module.exports的一个地址引用。nodejs只会导出module.exports的指向**，如果exports指向变了，那就仅仅是exports不在指向module.exports，于是不会再被导出

```typescript 
example 1:

    exports.seOutputVal = seOutputVal;
    exports.setIncrement = setIncrement;
    module.exports.printNextCount = printNextCount;
let {seOutputVal,setIncrement ,printNextCount} = require('./')  

example 2:
var counter  = 0;
exports.temp  = function(){
    counter += 10;
    this.printNextCount = function()
    {
        console.log(counter);
    }
}
var isEq = (exports === module.exports);
console.log(exports); //{fun}
console.log(module.exports); // {fun}
console.log(isEq); // true


example 3:
var counter  = 0;
module.exports = function(){
    counter += 10;
    this.printNextCount = function()
    {
        console.log(counter);
    }
}
var isEq = (exports === module.exports);
console.log(exports); // {}
 console.log(typeof module.exports); // function 
 console.log(isEq); // false
```

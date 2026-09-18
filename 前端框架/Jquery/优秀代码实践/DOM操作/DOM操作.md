# DOM操作

- 1、始终先detach现有DOM元素后进行操作，随后将其attach到DOM中。

```javascript 
var $myList = $("#list-container > ul").detach();
//...针对$myList的许多DOM操作
$myList.appendTo("#list-container");
```


- 2、使用字符串连接或者array.join()而不是.append()方法。

```javascript 
// BAD
var $myList = $("#list");
for(var i = 0; i < 10000; i++){
    $myList.append("<li>"+i+"</li>");
}

// GOOD
var $myList = $("#list");
var list = "";
for(var i = 0; i < 10000; i++){
    list += "<li>"+i+"</li>";
}
$myList.html(list);

// EVEN FASTER
var array = []; 
for(var i = 0; i < 10000; i++){
    array[i] = "<li>"+i+"</li>"; 
}
$myList.html(array.join(''));

```


- 3、不操作未知元素。

```javascript 
// BAD: 这个函数内部要先执行3个函数，才发现选择器选择到的可能是空内容
$("#nosuchthing").slideUp();

// GOOD
var $mySelection = $("#nosuchthing");
if ($mySelection.length) {
    $mySelection.slideUp();
}
```

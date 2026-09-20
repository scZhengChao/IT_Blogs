# 导航

```html 
<a href='page/pageA.html' target='iframeName'></a>


<iframe id='iframeName' src='page/pageB.html'></iframe>
```


或者

```javascript 
let a = document.createElement('a');
a.href = '../page/pageA.html';
a.target='iframeName';
a.click()
```

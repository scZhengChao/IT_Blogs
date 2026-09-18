# 简易autoComponent功能

实现内容如下：

1、准备 input#search 以及 ul#suggest-list 的 HTML 与 CSS

2、在 input#search 输入文字时，**等待 100 毫秒后若无输入，就发送 HTTP Request**

3、当 Response 还没回来时，使用者又输入了下一哥文字就舍弃前一次的，并再发送一次新的 Request

4、接受到 Response 之后显示下拉选项

5、鼠标左键选中对应的下拉响，取代 input#search 的文字

```javascript 
import { fromEvent } from "rxjs";
import { map, debounceTime, switchMap } from "rxjs/operators";

const url = 'https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&origin=*';

const getSuggestList = (keyword) => fetch(url + '&search=' + keyword, { method: 'GET', mode: 'cors' })
                                    .then(res => res.json())

const searchInput = document.getElementById('search');
const suggestList = document.getElementById('suggest-list');

const keyword = fromEvent(searchInput, 'input');
const selectItem = fromEvent(suggestList, 'click');

const render = (suggestArr = []) => suggestList.innerHTML = suggestArr.map(item => '<li>'+ item +'</li>').join('')

keyword.pipe(
   debounceTime(100),
  switchMap(
    (e: any) => getSuggestList(e.target.value),
    (e, res) => res[1]
   )
).subscribe(list => render(list))
  
 

selectItem.pipe(
  map(e => e.target.innerText)
).subscribe(text => { 
      searchInput.value = text;
      render();
  })
```


在线预览：[stackblitz.com/edit/rxjs-x…](https://link.juejin.cn/?target=https://stackblitz.com/edit/rxjs-xmjfaz?devtoolsheight=60\&file=index.ts "stackblitz.com/edit/rxjs-x…")

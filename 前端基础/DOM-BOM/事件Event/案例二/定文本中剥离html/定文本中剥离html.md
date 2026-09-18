# 定文本中剥离html

## 目录

- [定文本中剥离html](#定文本中剥离html)

### 定文本中剥离html

当你需要在某个文本中将里面的标签全部过滤掉

```typescript 
const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
const str = stripHtml('<div>test</div> <span>asgfasgas</span>') // 'test'
console.log(str)  // test asgfasgas

```

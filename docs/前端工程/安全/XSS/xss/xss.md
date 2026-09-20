# xss

## 目录

- [如何防御](#如何防御)
  - [1) CSP](#1-CSP)
  - [2) 转义字符](#2-转义字符)
  - [3) HttpOnly Cookie。](#3-HttpOnly-Cookie)

*XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。*

**XSS 的原理是恶意攻击者****往 Web 页面里插入恶意可执行网页脚本代码，当用户浏览该页之时，嵌入其中 Web 里面的脚本代码会被执行****，从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的**。

- 非持久型 XSS 漏洞，一般是通过给别人发送带有恶意脚本代码参数的 URL，当 URL 地址被打开时，特有的恶意代码参数被 HTML 解析、执行。
- 持久型 XSS 漏洞，一般存在于 **Form 表单提交等交互功能，如文章留言，提交文本信**息等，黑客利用的 XSS 漏洞，将**内容经正常功能提交进入数据库持久保存，当前端页面获得后端从数据库中读出的注入代码时，恰好将其渲染执行。**

### 如何防御

#### 1) CSP

限制加载其他域下的资源文件、禁止向第三方提交数据;

**CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。**

**我们只需要配置规则，如何拦截是由浏览器自己实现的**。

```typescript 
Content-Security-Policy: default-src 'self'
```


#### 2) 转义字符

用户的输入永远不可信任的，最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义

```typescript 
 function escape(str) { 
   str = str.replace(/&/g, '&amp;') 
   str = str.replace(/</g, '&lt;') 
   str = str.replace(/>/g, '&gt;') 
   str = str.replace(/"/g, '&quto;') 
   str = str.replace(/'/g, '&#39;') 
   str = str.replace(/`/g, '&#96;') 
   str = str.replace(/\//g, '&#x2F;') 
   return str
 }
 输入过滤(优先)
export function htmlEncode(str) {
  var arrEntities = { '<': '&lt;', '>': '&gt;', ' ': '&nbsp;', '&': '&amp;', '"': '&quot;', '\'': '&#39;' }
  return str.replace(/(<|>| |&|"|')/ig,function(all,t){
    return arrEntities[t]
  })
}
export function htmlDecode(str) {
  var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '#39': '\'' };
  return str.replace(/&(lt|gt|nbsp|quot|#39);/ig,function(all,t){
    return arrEntities[t];
  })
}
或者
// var HtmlUtil = {
//     /*1.用正则表达式实现html转码*/
//     htmlEncodeByRegExp:function (str){  
//          var s = "";
//         if(str.length == 0) return "";
//          s = str.replace(/&/g,"&amp;");
//          s = s.replace(/</g,"&lt;");
//          s = s.replace(/>/g,"&gt;");
//          s = s.replace(/ /g,"&nbsp;");
//          s = s.replace(/\'/g,"&#39;");
//         s = s.replace(/\"/g,"&quot;");
//          return s;  
//    },
//      /*2.用正则表达式实现html解码*/
//   htmlDecodeByRegExp:function (str){  
//         var s = "";
//         if(str.length == 0) return "";
//          s = str.replace(/&amp;/g,"&");
//          s = s.replace(/&lt;/g,"<");
//          s = s.replace(/&gt;/g,">");
//          s = s.replace(/&nbsp;/g," ");
//          s = s.replace(/&#39;/g,"\'");
//          s = s.replace(/&quot;/g,"\"");
//         return s;  
//    }
// };

```


但是对于**显示富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。**

对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。

#### **3) HttpOnly Cookie。**

这是预防XSS攻击窃取用户cookie最有效的防御手段。

Web应用程序在设置cookie时，**将其属性设为HttpOnly**，就可以避免该网页的**cookie被客户端恶意JavaScript窃取，保护用户cookie信息。**

![  ](189f1263228150d82a55d7b43e94b94a_FP8j_koPtv.jpeg "  ")

![  ](8c35ad146ef9d6ed7efb9b3c99f5e5c2_3B-4tQru-t.jpeg "  ")

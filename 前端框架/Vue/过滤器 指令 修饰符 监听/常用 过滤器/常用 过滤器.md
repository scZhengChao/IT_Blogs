# 常用 过滤器

```纯文本 
 1.注册过滤器 
      import * as filters from '@/filter'; 
      Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })
```


```纯文本 
 3.过滤时间    
 正则表达式y+ 
     export function dateFormat (value,fmt){ 
         if(!value) return 
         const getDate = new Date(value) 
         var o = { 
             "M+" :this.getMonth()+1,//月份 
             "d+" :this.getDate(),//日 
             "h+" :this.getHours(),//小时 
             "m+" :this.getMinutes(),//分 
             "s+" :this.getSeconds(),//秒 
             "q+" :Math.floor((this.getMonth()+3)/3),//季度 
             "S" :this.getMilliseconds() //毫秒 
         }; 
         if(/(y+)/.test(fmt)) {    //匹配年份  RegExp.$1匹配以()为标志的正则 
             fmt=fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
         } 
         for(var k in o) {   //判断o中的 k值 是否匹配到 
             if(new RegExp("("+ k +")").test(fmt)) 
             // 补零操作 
             fmt = fmt.replace(RegExp.$1,(RegExp.$1.length==1) (o[k]) :(("00"+ o[k]).substr((""+ o[k]).length))); 
         } 
     return fmt; 
     }
```


```纯文本 
 4.防xss代码注入 
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
```

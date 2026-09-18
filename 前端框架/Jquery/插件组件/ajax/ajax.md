# ajax

```javascript 
jQuery.support.cors = true;      ie8     jq.1.11.3 发送ajax 之前要加,否则发不出去 
//            $.ajax({
//                url:"http://localhost/1809/jq-ajax/data/data.php",
                  type：'post',
                  async:true,
                  dataType:'json',
                  timeout:6,
                  beforeSend:function(xhr){
                      xhr.setRequestHeader('token','str')  
                  },
//                success:function(res,status,xhr){
                     var tokenid2 = xhr.getResponseHeader("tokenId")
                     if (tokenid2 != null) {
                        tokenid = tokeid2;
                     }
//                },
                  error:function(err){
                  },
//                data:{
//                    user:"admin",
//                    pass:"123456"
//                }
//            })
            
//            $.ajax({
//                url:"http://localhost/1809/jq-ajax/data/da123132ta.php",
//                success:function(a,b,c){
////                    console.log(a)
////                    console.log(b)
////                    console.log(c)
//                    console.log(a)
//                },
//                data:{
//                    user:"admin",
//                    pass:"123456"
//                },
////                async:true,
////                beforeSend:function(){
////                    alert("准备开始发送了")
////                },
////                dataType:"json",
//                error:function(a,b,c){
//                    console.log(a)
//                    console.log(b)
//                    console.log(c)
//                },
////                global:true,
////                jsonp:"cd",
////                timeout:500,
//                type:"get"
//            })
            
//            最简化的ajax功能
//            $.ajax({
//                url:"http://localhost/1809/jq-ajax/data/data.php",
//                success:function(a){
//                    console.log(a)
//                }
//            })


//            跨域功能
//            $.ajax({
//                url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
//                success:function(a){
//                    console.log(a)
//                },
//                data:{
//                    wd:"io"
//                },
//                dataType:"jsonp",
//                jsonp:"cb"
//            })
           
        
```

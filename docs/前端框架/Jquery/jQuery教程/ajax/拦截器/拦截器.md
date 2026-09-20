# 拦截器

## 目录

- [一](#一)
- [二](#二)
- [三](#三)
- [ajaxSend](#ajaxSend)

# 一

```javascript 
// 请求发送之前的拦截器
$(document).ajaxSend(function (event, xhr, settings) {
  // 修改请求参数
  var requestData = settings.data;
  var modifiedRequestData = modifyRequestData(requestData);
  settings.data = modifiedRequestData;
});
// 响应成功后的拦截器
$(document).ajaxSuccess(function (event, xhr, settings, data) {
  // 修改响应数据
  var responseData = data;
  var modifiedResponseData = modifyResponseData(responseData);
  return modifiedResponseData;
});
// 请求失败后的拦截器
$(document).ajaxError(function (event, xhr, settings, error) {
  // 处理请求错误
});
// 修改请求数据的函数
function modifyRequestData(requestData) {
  // 在这里对请求数据进行修改
  var modifiedData = requestData;
  return modifiedData;
}
// 修改响应数据的函数
function modifyResponseData(responseData) {
  // 在这里对响应数据进行修改
  var modifiedData = responseData;
  return modifiedData;
}
```


在上述示例中，`ajaxSend`事件会在每个Ajax请求发送之前触发，可以通过修改`settings.data`来修改请求数据。`ajaxSuccess`事件会在每个Ajax请求成功响应后触发，可以通过返回修改后的响应数据来修改响应结果。你还可以添加`ajaxError`事件来处理请求失败的情况。 &#x20;

在`modifyRequestData`和`modifyResponseData`函数中，你可以根据需求对请求数据和响应数据进行相应的修改。请根据具体情况进行适当的修改。

# 二

```javascript 
//全局的ajax访问，处理ajax清求时异常
$.ajaxSetup({
   contentType:"application/x-www-form-urlencoded;charset=utf-8",
   complete:function(XMLHttpRequest,textStatus){
      //通过XMLHttpRequest取得响应结果
      var res = XMLHttpRequest.responseText;
      try{
        var jsonData = JSON.parse(res);
        if(jsonData.state == -1){
          //如果超时就处理 ，指定要跳转的页面(比如登陆页)
          alert(jsonData.msg);
          window.location.replace("/login/index.php");
        }else if(jsonData.state == 0){
          //其他的异常情况,给个提示。
          alert(jsonData.msg);
        }else{
          //正常情况就不统一处理了
        }
      }catch(e){
      }
    }
 });
 
//获取数据
function getContent() {
  $.get("content.php", function (data){
      var jsonData = JSON.parse(data);
      //只处理正常的情况
      if(jsonData.state == 1){
        alert(jsonData.data);
      }
   });
}
```


```javascript 
$.ajaxSetup({
   contentType:"application/x-www-form-urlencoded;charset=utf-8",
   complete:function(XMLHttpRequest,textStatus){
   },
   statusCode: {
     404: function() {
         alert('数据获取/输入失败，没有此服务。404');
     },
     504: function() {
         alert('数据获取/输入失败，服务器没有响应。504');
     },
     500: function() {
         alert('服务器有误。500');
     }
   }
});
```


```javascript 
function reg(){
            var username = $("#username").val();
            var password = $("#password").val();
        //     $.ajax({
        //         url:"/supermarket/do_reg",
        //         data:{"username":username,'password':password},
        //         type:"POST",
        //         dataType:"json",
        //         success:function(obj){
        //             alert(obj.mes);
        //         },
        //         //前置操作
        //         beforeSend:function(){
        //             //将按钮设置失效
        //             $("#sub").attr({disabled:"disabled"})
        //         },
        //         //后置操作
        //         complete:function(){
        //             //设置按钮生效
        //             $("#sub").removeAttr("disabled");
        //         }
        //     })
        //  }
```


# 三

项目中经常会遇到需要统一设置 [ajax](https://so.csdn.net/so/search?q=ajax\&spm=1001.2101.3001.7020 "ajax")请求的预处理 和 需要统一处理ajax返回的需求

比如登录时需要 在头部添加token（X-Auth-Token）

请求完需要判断code为已退出token失效（3001）和权限不足（3002）的情况

之前习惯使用 jQuery.ajaxSetup() 统一设置ajax参数，但是官方不建议使用，而且这种方式确实不够灵活

**后来看到 ajax的全局事件的支持，发现这个比较适合**&#x20;

> [http://api.jquery.com/category/ajax/global-ajax-event-handlers/](http://api.jquery.com/category/ajax/global-ajax-event-handlers/ "http://api.jquery.com/category/ajax/global-ajax-event-handlers/")

```javascript 
if(window.jQuery){
    // ajax预处理
    jQuery(document).bind("ajaxSend", function(event, request, settings){
        var token = getUserToken();
        //config_contextPath 为需要设置token的 全局host,严格判断防止 token发送到其他站点被盗取
        if(token && config_contextPath && settings.url && settings.url.indexOf(config_contextPath) === 0){
            var headers = settings.headers || {};
            headers["X-Auth-Token"] = token;
            request.setRequestHeader("X-Auth-Token", token);
            settings.headers = headers;
        }
    })
    // 后置处理
    .bind("ajaxComplete", function(event, xhr, settings){
        if(config_contextPath && settings.url && settings.url.indexOf(config_contextPath) === 0 && (settings.dataType === 'JSON' || settings.dataType === 'json')){
            if(xhr.status == 200 && xhr.responseText){
                try{
                    var reObj = JSON.parse(xhr.responseText);
                    //特殊code 没有权限 和token失效
                    if(reObj && (reObj.code==3001 || reObj.code==3002 )){
                        window.setTimeout(function () {
                            if($(".layui-layer-dialog.layui-layer-msg:visible").length < 1){
                                layer.alert(reObj.message, {icon: 2}, function () {
                                    if(reObj.code==3001){
                                        var topWindow = parent ? (parent.parent ? (parent.parent.parent ? parent.parent.parent : parent.parent) : parent) : window;
                                        topWindow.location.href='/login.html';
                                    }
                                });
                            }
                        }, 500);
                    }
                }catch (e){console.error(e)}
            }
        }
    });
}
```


# ajaxSend

> \$("#msg").ajaxSend(function(evt,request,settings){});

AJAX请求发送前执行[函数](https://marketing.csdn.net/p/3127db09a98e0723b83b2914d9256174?pId=2782\&utm_source=glcblog\&spm=1001.2101.3001.7020 "函数")。Ajax事件。

XMLHttpRequest对象和设置作为参数传递给回调函数

\$("#msg").ajaxSend(function(evt,request,settings){})是全局事件,也就是说,

只要该页面定义了这个函数,那么,在**每个ajax请求前都会执行该函数,这既与该函数前面的选择器#msg无关,**

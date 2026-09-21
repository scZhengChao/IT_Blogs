# jquery 生成二维码 条形码

## 目录

- [一、jquery.qrcode.min.js 生成二维码](#一jqueryqrcodeminjs-生成二维码)
  - [1、使用步骤](#1使用步骤)
  - [2、中文编码问题](#2中文编码问题)
  - [3、generateQRCode 函数优化](#3generateQRCode-函数优化)
- [二、jquery-barcode生成条形码](#二jquery-barcode生成条形码)
- [引用](#引用)
- [六位验证码](#六位验证码)
- [例子](#例子)

# 一、jquery.qrcode.min.js 生成二维码

### 1、使用步骤

```javascript 

（1）引入文件：
<script src="jquery-2.1.0.js" type="text/javascript"></script><script type="text/javascript" src="jquery.qrcode.min.js"></script>

（2）在页面放一个二维码容器：
<body onLoad="init()">
   <div id="qrcode"></div>
</body>

（3）使用 qrcode 方法生成二维码：
function generateQRCode(rendermethod, picwidth, picheight, url) {
    $("#qrcode").qrcode({
       render: rendermethod, // 渲染方式有table方式和canvas方式
       width: picwidth, //宽度
       height:picheight, //高度
       text: utf16to8(url), //内容
       typeNumber:-1,//计算模式
       correctLevel:2,//二维码纠错级别
       background:"#ffffff",//背景颜色
       foreground:"#000000"  //二维码颜色    });
}
function init() {
    generateQRCode("table",200, 200, "test");
}

qrcode 方法中 render 参数表示渲染方式，有 table 方式和 canvas 方式， canvas 方式如下：

$(function(){
        var qrcode = $('#qrcode').qrcode({
            render: "canvas",
            width: 120,
            height: 120,
            text: "SYDO1806090725140426"
        }).hide();
        //将生成的二维码转换成图片格式
        var canvas = qrcode.find('canvas').get(0);
        $('#qrcodeImg').attr('src', canvas.toDataURL('image/jpg'));
    });


```


其中将二维码转成图片形式，是方便转发，也可以不用，不用的话，qrcode 方法之后就不用用 hide() 方法了。canvas 方式生成的二维码如下，利用之前上一篇的扫一扫，可以扫出生成二维码时候的参数（即 qrcode 方法里的 text 参数）：

### 2、中文编码问题

```javascript 
jquery-qrcode 是采用 charCodeAt() 方式进行编码转换的。而这个方法默认会获取它的Unicode编码，所以如果 text 参数带有中文，在生成二维码前就要把字符串转换成UTF-8，然后再生成二维码。
可以通过下面函数来转换中文字符串 ：

//中文编码格式转换
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c > 0x0001 || c == 0x0001) && (c < 0x007F || c == 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
```


### 3、generateQRCode 函数优化

```javascript 
将2说的中文问题加进 generateQRCode 函数：

function generateQRCode(rendermethod, picwidth, picheight, url) {
    $("#qrcode").qrcode({
        render: rendermethod, // 渲染方式有table方式（IE兼容）和canvas方式
        width: picwidth, //宽度
        height:picheight, //高度
        text: utf16to8(url), //内容
        typeNumber:-1,//计算模式
        correctLevel:2,//二维码纠错级别
        background:"#ffffff",//背景颜色
        foreground:"#000000"  //二维码颜色
    });
}

```


# 二、jquery-barcode生成条形码

```html title="直接贴例子：
"

<html><head>
    <meta charset="UTF-8">
    <title>生成条形码</title>
    <script type="text/javascript" src="jquery-2.1.0.js"></script>
    <script type="text/javascript" src="jquery-barcode.js"></script>
    <script type="text/javascript">
        $(function(){
            $("#bcTarget").barcode("123456789", "codabar",{barWidth:2, barHeight:30});
            $("#bcTarget2").barcode("1234567890128", "ean13",{barWidth:2, barHeight:30});  // SYDO180609            $("#genid").click(function(){
                var code = $("#orgcode").val();
                $("#mycode").barcode(code, "code93",{barWidth:2, barHeight:30});  // SYDO480408
               // $("#mycode").barcode(code, "code128",{barWidth:2, barHeight:30});  // SYDO431808            });
        });
    </script></head><body>
1、条形码 codabar  

<div id="bcTarget"></div>

2、条形码 ean13  

<div id="bcTarget2"></div>

3、输入要生成条形码的数字(code93/code128):
<input type="text" id ="orgcode">&nbsp;&nbsp;<input type="button"  value="生成条形码" id="genid"/>

<div id="mycode"></div>

</body></html>
```


# 引用

```纯文本 
 https://www.cnblogs.com/lyr1213/p/9172287.html             ---详细:条形码,二维码 
 https://www.cnblogs.com/luisliu/p/4112242.html 
 https://blog.csdn.net/arrowzz/article/details/80656510 
 http://www.cnblogs.com/songdongdong/p/9038021.html   --项目里 
 
 https://github.com/lindell/JsBarcode        -------条形码github  JsBarcode 
 https://github.com/lindell/JsBarcode/wiki/Options    ------------- 条形码配置 
 
 https://github.com/jeromeetienne/jquery-qrcode/tree/master/examples    -----jq的二维码github 
 https://www.cnblogs.com/gygang/p/9116140.html    -----二维码中间带logo 详细   但是手机扫不出来 
 https://blog.csdn.net/qq_34357835/article/details/75096430     -----修改过的jquery.qrcode 中间带logo  手机可以扫出来 
 https://www.jb51.net/article/101893.htm          -------如何改装jquery.qrcode 带logo, 原理
```


# 六位验证码

[6为验证码.html](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/6._mDffqrezIF.html "6为验证码.html")

```javascript 
 如何修改别忘了在引入之前还要引入 qrcode.js 
      修改jquery.qrcode.js，createCanvas函数 
 var createCanvas  = function(){ 
       // create the qrcode itself 
       var qrcode = new QRCode(options.typeNumber, options.correctLevel); 
       qrcode.addData(options.text); 
       qrcode.make(); 
       // create canvas element 
       var canvas = document.createElement('canvas'); 
       canvas.width  = options.width; 
       canvas.height  = options.height; 
       var ctx   = canvas.getContext('2d'); 
       //增加以下代码，把图片画出来 
       if( options.src ) {//传进来的图片地址 
         //图片大小 
         options.imgWidth = options.imgWidth || options.width / 4.7; 
         options.imgHeight = options.imgHeight || options.height / 4.7; 
         var img = new Image(); 
         img.src = options.src; 
         //不放在onload里，图片出不来 
         img.onload = function () { 
           ctx.drawImage(img, (options.width - options.imgWidth) / 2, (options.height - options.imgHeight) / 2, options.imgWidth, options.imgHeight); 
         } 
       } 
       // compute tileW/tileH based on options.width/options.height 
       var tileW  = options.width / qrcode.getModuleCount(); 
       var tileH  = options.height / qrcode.getModuleCount(); 
       // draw in the canvas 
       for( var row = 0; row < qrcode.getModuleCount(); row++ ){ 
         for( var col = 0; col < qrcode.getModuleCount(); col++ ){ 
           ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background; 
           var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW)); 
           var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW)); 
           ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h); 
         } 
       } 
       // return just built canvas 
       return canvas; 
     }; 
 修改jquery.qrcode.js，createTable函数（不支持canvas用table画二维码） 
 var createTable = function(){ 
       // create the qrcode itself 
       var qrcode = new QRCode(options.typeNumber, options.correctLevel); 
       qrcode.addData(options.text); 
       qrcode.make(); 
       // create table element 
       var $table  = $('<table></table>') 
         .css("width", options.width+"px") 
         .css("height", options.height+"px") 
         .css("border", "0px") 
         .css("border-collapse", "collapse") 
         .css('background-color', options.background); 
       // compute tileS percentage 
       var tileW  = options.width / qrcode.getModuleCount(); 
       var tileH  = options.height / qrcode.getModuleCount(); 
       // draw in the table 
       for(var row = 0; row < qrcode.getModuleCount(); row++ ){ 
         var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table); 
         for(var col = 0; col < qrcode.getModuleCount(); col++ ){ 
           $('<td></td>') 
             .css('width', tileW+"px") 
             .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background) 
             .appendTo($row); 
         } 
       } 
       //主要思想，把table，和img标签放在同一个div下，div relative定位，然后使得图片absolute定位在table中间 
       if( options.src ) { 
         options.imgWidth = options.imgWidth || options.width / 4.7; 
         options.imgHeight = options.imgHeight || options.height / 4.7; 
         var $img = $('<img>').attr("src", options.src) 
           .css("width", options.imgWidth) 
           .css("height", options.imgHeight) 
           .css("position", "absolute") 
           .css("left", (options.width - options.imgWidth) / 2) 
           .css("top", (options.height - options.imgHeight) / 2); 
         $table = $('<div style="position:relative;"></div>') 
           .append($table) 
           .append($img); 
       } 
       // return just built canvas 
       return $table; 
     }; 
 对IE做特殊判断，大家懂的 
 //判断是否IE, IE8以下，用 table，否则用 canvas 
     var isIE = function() { 
       var b = document.createElement('b'); 
       b.innerHTML = '<!--[if IE]><i></i><![endif]-->'; 
       return b.getElementsByTagName('i').length === 1; 
     }; 
     options.render = options.render || 
       (isIE(6) || isIE(7) || isIE(8))? "table": "canvas"; 
 
 改装后的改过后的jquery.qrcode.js如下： 
 
 (function( $ ){ 
   $.fn.qrcode = function(options) { 
     // if options is string, 
     if( typeof options === 'string' ){ 
       options = { text: options }; 
     } 
     //判断是否IE, IE8以下，用 table，否则用 canvas 
     var isIE = function() { 
       var b = document.createElement('b'); 
       b.innerHTML = '<!--[if IE]><i></i><![endif]-->'; 
       return b.getElementsByTagName('i').length === 1; 
     }; 
     options.render = options.render || 
       (isIE(6) || isIE(7) || isIE(8))? "table": "canvas"; 
     // set default values 
     // typeNumber < 1 for automatic calculation 
     options = $.extend( {}, { 
       // render    : "canvas", 
       width    : 256, 
       height   : 256, 
       typeNumber : -1, 
       correctLevel  : QRErrorCorrectLevel.H, 
             background   : "#ffffff", 
             foreground   : "#000000" 
     }, options); 
     var createCanvas  = function(){ 
       // create the qrcode itself 
       var qrcode = new QRCode(options.typeNumber, options.correctLevel); 
       qrcode.addData(options.text); 
       qrcode.make(); 
       // create canvas element 
       var canvas = document.createElement('canvas'); 
       canvas.width  = options.width; 
       canvas.height  = options.height; 
       var ctx   = canvas.getContext('2d'); 
       //在中间画logo 
       if( options.src ) { 
         options.imgWidth = options.imgWidth || options.width / 4.7; 
         options.imgHeight = options.imgHeight || options.height / 4.7; 
         var img = new Image(); 
         img.src = options.src; 
         img.onload = function () { 
           ctx.drawImage(img, (options.width - options.imgWidth) / 2, (options.height - options.imgHeight) / 2, options.imgWidth, options.imgHeight); 
         } 
       } 
       // compute tileW/tileH based on options.width/options.height 
       var tileW  = options.width / qrcode.getModuleCount(); 
       var tileH  = options.height / qrcode.getModuleCount(); 
       // draw in the canvas 
       for( var row = 0; row < qrcode.getModuleCount(); row++ ){ 
         for( var col = 0; col < qrcode.getModuleCount(); col++ ){ 
           ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background; 
           var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW)); 
           var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW)); 
           ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h); 
         } 
       } 
       // return just built canvas 
       return canvas; 
     }; 
     // from Jon-Carlos Rivera (https://github.com/imbcmdth) 
     var createTable = function(){ 
       // create the qrcode itself 
       var qrcode = new QRCode(options.typeNumber, options.correctLevel); 
       qrcode.addData(options.text); 
       qrcode.make(); 
       // create table element 
       var $table  = $('<table></table>') 
         .css("width", options.width+"px") 
         .css("height", options.height+"px") 
         .css("border", "0px") 
         .css("border-collapse", "collapse") 
         .css('background-color', options.background); 
       // compute tileS percentage 
       var tileW  = options.width / qrcode.getModuleCount(); 
       var tileH  = options.height / qrcode.getModuleCount(); 
       // draw in the table 
       for(var row = 0; row < qrcode.getModuleCount(); row++ ){ 
         var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table); 
         for(var col = 0; col < qrcode.getModuleCount(); col++ ){ 
           $('<td></td>') 
             .css('width', tileW+"px") 
             .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background) 
             .appendTo($row); 
         } 
       } 
       //生成logo 
       if( options.src ) { 
         options.imgWidth = options.imgWidth || options.width / 4.7; 
         options.imgHeight = options.imgHeight || options.height / 4.7; 
         var $img = $('<img>').attr("src", options.src) 
           .css("width", options.imgWidth) 
           .css("height", options.imgHeight) 
           .css("position", "absolute") 
           .css("left", (options.width - options.imgWidth) / 2) 
           .css("top", (options.height - options.imgHeight) / 2); 
         $table = $('<div style="position:relative;"></div>') 
           .append($table) 
           .append($img); 
       } 
       // return just built canvas 
       return $table; 
     }; 
     return this.each(function(){ 
       var element = options.render == "canvas" ? createCanvas() : createTable(); 
       $(element).appendTo(this); 
     }); 
   }; 
 })( jQuery ); 

```


# 例子

```纯文本 
 jquery.qrcode.min  也可以使用但只是canvas时支持logo,当不支持canvas时, 也可以使用绝对定位把图片定位到表面中央  ,也可以同样扫出来,但是要考虑jquery的版本支持ie低版本, jquery-qrcode这个插件有问题且不支持utf16to8 
 
 jquery.qrcode 相当强大,自动识别ie还是谷歌然后选着table还canvas , 中间带logo 但是必须有一个低版本的jquery支持,他就能支持ie6+, 且能够扫出来,不用使用绝对定位,其实也只能是内部的封装img绝对定位,他给封装到内部 
 
 但是条形码是 jquery-barcode 支持度更高,前提是jquery要支持低版本的 

```


[erweima.rar](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/erweima_AOYlTfX8tk.rar "erweima.rar")

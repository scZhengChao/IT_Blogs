# 飘带效果

## 目录

- [第六种效果](#第六种效果)

[ 纯CSS3精美样式的飘带特效 | HTML5资源教程  https://www.html5tricks.com/css3-ribbon-text.html](https://www.html5tricks.com/css3-ribbon-text.html " 纯CSS3精美样式的飘带特效 | HTML5资源教程  https://www.html5tricks.com/css3-ribbon-text.html")

[css3-ribbon-text.zip](./assets/file/css3-ribbon-text_X30IILv5VT.zip " css3-ribbon-text.zip")

![](./assets/image/image_UEQwKPmwBY.png)

# 第六种效果

![](./assets/image/image_tlK8CoXWn1.png)

```javascript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .zzsc-container{
            margin: 0 auto;
            overflow: hidden;
        }
        section{
            display:block;
            margin:0 auto;
            max-width: 660px;
            padding: 0 20px;
        }
        .ribbon {
            /*display: inline-block;*/
            width: 48%;
            height: 188px;
            position: relative;
            background: url(./snow-road.jpg);
            background-size: cover;
            text-transform: uppercase;
            color: white;
        }
        .wrap {
            width: 100%;
            height: 188px;
            position: absolute;
            top: -8px;
            left: 8px;
            overflow: hidden;
        }
        .wrap:before {
            content: "";
            display: block;
            border-radius: 8px 8px 0px 0px;
            width: 40px;
            height: 8px;
            position: absolute;
            right: 100px;
            background: #4D6530;
        }
        .wrap:after {
            content: "";
            display: block;
            border-radius: 0px 8px 8px 0px;
            width: 8px;
            height: 40px;
            position: absolute;
            right: 0px;
            top: 100px;
            background: #4D6530;
        }
        .ribbon6 {
            display: inline-block;
            text-align: center;
            width: 200px;
            height: 40px;
            line-height: 40px;
            position: absolute;
            top: 30px;
            right: -50px;
            z-index: 2;
            overflow: hidden;
            transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            border: 1px dashed;
            box-shadow:0 0 0 3px #57DD43,  0px 21px 5px -18px rgba(0,0,0,0.6);
            background: #57DD43;
        }
    </style>
</head>
<body>
<div class="zzsc-container">
    <section>
        <div class="ribbon">
            <p>ss1</p>
            <p>ss2</p>
            <p>ss3</p>
            <p>ss4</p>
            <p>ss5</p>
            <div class="wrap"><span class="ribbon6">丝带效果6</span></div>
        </div>

    </section>
</div>
</body>
</html>
```

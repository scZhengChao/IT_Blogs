# 斜边异形

![](./image/image_7ykVl6q3Co.png)

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
        .bd{
            width: 1180px;
            margin: 50px auto;
        }
        .tabbd{
            height: 284px;
            border: 1px solid #abe3ff;
            box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
            border-radius: 0 10px 10px 10px;
        }
        .tabs{
            position: relative;
            display: flex;
        }
        .tab{
            width: 167px;
            height: 36px;
            line-height: 36px;
            position: relative;
            color: #4b6375;
            font-size: 15px;
            margin-right: 2px;
            border-bottom: 1px solid #fff;
            text-align: center;
        }
        .tab::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 167px;
            height: 100%;
            background-color: #cfe6f1;
            border-radius: 8px 8px 0 0;
            transform: skewX(15deg);
            z-index: -1;
        }

        .active{
            color: #0096e0;
        }
        .active::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 167px;
            height: 100%;
            background-color: #c8eeff;
        }
        .tab1::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 150px;
            height: 100%;
            background-color: #cfe6f1;
            z-index: -2;
            border-radius: 10px 0 0 0;
        }
        .tab1::after{
            width: 157px;
            left: 10px;
        }
        .tab1.active::before{
            background-color: #c8eeff;
        }
        .tab.active{
            border-bottom: 0 !important;
            height: 36px;
            z-index: 2;
        }
        .tab.active::before{
            height: 100%;
            border-left: 1px solid #abe3ff;
        }
        .tab.active::after{
            height: 100%;
            border: 1px solid #abe3ff;
            border-width: 1px 1px 0 0;
        }
    </style>

</head>
<body>

<div class="bd">
    <div class="tabs">
        <div class="tab tab1 active">运价服务</div>
        <div class="tab tab2 ">操作服务</div>
        <div class="tab tab3 ">资讯与推介</div>
    </div>

    <div class="tabbd">
sss
    </div>
</div>


</body>


<script>

</script>
</html>
```

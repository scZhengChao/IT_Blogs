# 高低梯形圆角

![](./image/image_MlvEv2wiu4.png)

![](./image/image_4AtVsDS-as.png)

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
        * {
            margin: 0;
            padding: 0;
        }
        .stage{
            margin: 100px auto;
            width: 300px;
        }
        .tabs-fillet-corner {
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            background: white;
            border-top-left-radius: 17px;
        }
        .tabs-fillet-corner-item-wrap {
            flex: 1;
            padding: 0 12px;
        }
        .tabs-fillet-corner-item-wrap:first-child{
            border-top-left-radius: 17px!important;
        }
        .tabs-fillet-corner-item-wrap:first-child:not(.tabs-fillet-corner-item-active) .tabs-fillet-corner-item::before  {
            transform: skew(0deg);
            left: -12px;
            border-bottom-left-radius: 0;
            border-top-left-radius:17px;
        }

        .tabs-fillet-corner-item-wrap:first-child .tabs-fillet-corner-item {
            border-top-left-radius: 17px;
        }
        .tabs-fillet-corner-item-wrap:first-child .tabs-fillet-corner-item-active {
            border-top-left-radius: 0;
        }
        .tabs-fillet-corner-item-wrap:first-child .tabs-fillet-corner-item::before {
            left: 38px;
        }
        .tabs-fillet-corner-item-wrap:first-child .tabs-fillet-corner-item-active::before {
            border-radius: 0;
            transform: skew(0deg);
            left: -17px;
        }
        .tabs-fillet-corner-item-wrap:last-child{
            border-top-right-radius: 17px;
        }

        .tabs-fillet-corner-item-wrap:last-child .tabs-fillet-corner-item-active {
            border-top-right-radius: 0;
        }
        .tabs-fillet-corner-item-wrap:last-child  .tabs-fillet-corner-item:not(.tabs-fillet-corner-item-active)::after {
            right: -11.5px;
            transform: skew(0deg);
            border-top-right-radius: 17px;
            border-bottom-right-radius: 0;;
        }
        .tabs-fillet-corner-item-wrap:last-child .tabs-fillet-corner-item-active::after {
            transform: skew(0deg);
            right: -12px!important;
            border-top-right-radius: 17px;
            border-top-left-radius: 0;
        }





        .tabs-fillet-corner-item {
            border-radius: 8px 8px 0 0;
            width: 100%;
            height: 100%;
            position: relative;
            background-color: gray;
        }


        .tabs-fillet-corner-item::before, .tabs-fillet-corner-item::after {
            content: '';
            position: absolute;
            top: 0;
            width: 30px;
            height: 100%;
            z-index: 9;
            background-color: gray;
        }
        .tabs-fillet-corner-item::before {
            border-bottom-left-radius: 6px;
            transform: skew(17deg);
            left: -18px;
        }
        .tabs-fillet-corner-item::after {
            border-bottom-right-radius: 6px;
            transform: skew(-17deg);
            right: -18px;
        }

        .tabs-fillet-corner-item-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
            font-size: 13px;
            line-height: 39px;
            color: black;
            text-align: center;
            position: relative;
            cursor: pointer;
            z-index: 99;
        }

        .tabs-fillet-corner-item-active {
            background: #f5b6d7;
            z-index: 2;
            height: 45px;
        }
        .tabs-fillet-corner-item-active::before, .tabs-fillet-corner-item-active::after {
            content: '';
            position: absolute;
            top: 0;
            width: 17px;
            height: 100%;
            background: #f5b6d7;
            border-radius: 17px 17px 0 0;
        }
        .tabs-fillet-corner-item-active::before {
            transform: skew(-17deg);
            left: -6.5px;
            box-shadow: -5px 15px 0 #f5b6d7;
        }
        .tabs-fillet-corner-item-active::after {
            transform: skew(17deg);
            right: -6.5px;
            box-shadow: 5px 15px 0 0 #f5b6d7;
        }



        .content{
            height: 100px;
            background-color: red;
        }
    </style>

</head>
<body>
<div class="stage">
    <div class="tabs-fillet-corner">
        <div class="tabs-fillet-corner-item-wrap ">
            <div class="tabs-fillet-corner-item ">
                <p class="tabs-fillet-corner-item-text">唱</p>
            </div>
        </div>
        <div class="tabs-fillet-corner-item-wrap active-wrapper">
            <div class="tabs-fillet-corner-item tabs-fillet-corner-item-active">
                <p class="tabs-fillet-corner-item-text">跳</p>
            </div>
        </div>
    </div>
    <div class="content">

    </div>
</div>



</body>


<script>


    // 获取tab容器元素
    const tabContainer = document.querySelector('.tabs-fillet-corner');

    // 通过事件代理给tab添加点击事件
    tabContainer.addEventListener('click', function (event) {
        const target = event.target;
        console.log(target)
        // 判断点击的是否为tab元素或其子元素
        if (
            target.classList.contains('tabs-fillet-corner-item') ||
            target.closest('.tabs-fillet-corner-item')
        ) {
            // 获取当前被点击的tab元素
            const tab = target.closest('.tabs-fillet-corner-item') || target;

            // 判断点击的是否为当前激活的tab元素
            if (!tab.classList.contains('tabs-fillet-corner-item-active')) {
                // 移除当前激活的tab和内容
                const activeTab = tabContainer.querySelector(
                    '.tabs-fillet-corner-item-active'
                );
                activeTab.classList.remove('tabs-fillet-corner-item-active');

                // 添加新的激活的tab和内容
                tab.classList.add('tabs-fillet-corner-item-active');
            }
        }
    });
</script>
</html>
```

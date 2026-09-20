# css3实现圆角边框渐变

```html 

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .border{
            position: relative;
            border: 4px solid transparent;
            border-radius: 16px;
            background: linear-gradient(orange, violet);
            background-clip: padding-box;
            padding: 10px;
            /* just to show box-shadow still works fine */
            box-shadow: 0 3px 9px black, inset 0 0 9px white;
        }
        .border::after{
            position: absolute;
            top: -4px; bottom: -4px;
            left: -4px; right: -4px;
            background: linear-gradient(red, blue);
            content: '';
            z-index: -1;
            border-radius: 16px;
        }
    </style>
</head>
<body>

<button class="border">112233</button>
</body>
</html>

```


![](./image/image_7T_42btlYc.png)

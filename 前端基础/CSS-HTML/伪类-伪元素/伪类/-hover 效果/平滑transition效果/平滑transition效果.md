# 平滑transition效果

由于hover伪类添加的动画效果，仅当鼠标放在元素上时会被触发，而当鼠标离开时，效果会中断，会显得很生硬。 &#x20;
大多数人的想法都是使用js的onmouseover和onmouseleave事件来实现动画效果。其实不必这么麻烦，CSS3便可以帮你解决这些问题。

```javascript 
 <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>离开时效果生硬</title>
        <style type="text/css">
            div{
                width: 100px;
                height: 100px;
                border:1px solid;
    
                margin:0px auto;
                margin-top: 200px;
            }
            div:hover{
                transform: scale(2);
                transition: all 1s linear;
            }
        </style>
    </head>
    <body>
        <div></div>
    </body>
    </html>

```


由于div元素只有在:hover伪类触发的时候，效果才能加到div元素上。

当鼠标离开div元素的时候，:hover伪类将不再生效，瞬间丢掉hover里写的动画效果。

此时，我们应当在原本元素上再写一个一模一样的transition效果，将离开断掉的动画效果续接上。

```javascript 

<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>简单解决</title>
        <style type="text/css">
            div{
                width: 100px;
                height: 100px;
                border:1px solid;
    
                margin:0px auto;
                margin-top: 200px;
    
                 /* 在此处留一个transition就够了 */
                transition: all 1s linear;
             }
            div:hover{
                 transform: scale(2);
                 /* 去掉这个tansition */
                /* transition:  all 1s linear; */
             }
        </style>
    </head>
    <body>
        <div></div>
    </body>
    </html>
```

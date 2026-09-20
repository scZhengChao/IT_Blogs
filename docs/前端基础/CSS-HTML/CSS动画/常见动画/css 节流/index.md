# css 节流

## 目录

- [或者](#或者)

CSS 实现和 JS 的思维不同，需要从另一个角度去看待这个问题。

比如这里的需要对点击事件进行限制，也就是禁用点击事件，想想有什么方式可以禁用事件，没错，就是`pointer-events`;

- [ ] 但是空格键 和 tab 或者enter 键 不受限制

还需要有触发时机，这里是点击行为，所以必然和伪类`:active`有关联

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
        body {
            display: grid;
            place-content: center;
            height: 100vh;
            margin: 0;
            gap: 15px;
            background: #f1f1f1;
            user-select: none;
        }
        button {
            user-select: none;
        }
        .throttle {
            animation: throttle 2s step-end forwards;
        }
        .throttle:active {
            animation: none;
        }
        @keyframes throttle {
            from {
                pointer-events: none;
                opacity: .5;
            }
            to {
                pointer-events: all;
                opacity: 1;
            }
        }


    </style>
</head>
<body>


<h4>打开控制台查看</h4>
<button onclick="console.log('保存1')">我是“普通”保存</button>
<button class="throttle" onclick="console.log('保存2')">我是“节流”保存</button>
</body>
<script>

</script>
</html>

```


# 或者

```css 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body{
            display: grid;
            place-content: center;
            height: 100vh;
            margin: 0;
            gap: 15px;
            background: #f1f1f1;
        }
        button{
            user-select: none;
        }
        .throttle{
            opacity: .99;
            transition: opacity 2s;
        }
        .throttle:not(:disabled):active{
            opacity: 1;
            transition: 0s;
        }


    </style>
</head>
<body>

<button onclick="console.log('保存1')">我是“普通”保存</button>
<button class="throttle" onclick="console.log('保存2')">我是“节流”保存</button>

</body>
<script>
    document.addEventListener('transitionstart', function(ev){
        ev.target.disabled = true
    })
    document.addEventListener('transitionend', function(ev){
        ev.target.disabled = false
    })
</script>
</html>

```


&#x20;不过，这种实现方式还是比较有局限的，仅限于点击行为，像很多时候，节流可能会用在滚动事件或者键盘事件上，像这些场景就用传统方式实现就行了。

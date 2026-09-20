# 开关

## 目录

- [css3伪元素实现自定义复选框](#css3伪元素实现自定义复选框)
  - [我们来实现自定义开关](#我们来实现自定义开关)

# css3伪元素实现自定义复选框

![  ](./image/a3e45e8e919880a1385f86f493dcb4e6_UdLZ9m4WFB.png "  ")

```typescript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>Document</title>
    <style>
        .check-wrap{
              text-align: center;
        }
        .checkbox{
              position: absolute;
              clip: rect(0,0,0,0);
        }
        .checkbox[type="checkbox"]:focus + label::before{
              box-shadow: 0 0 .6em #06c;
        }
        .checkbox[type="checkbox"] + label::before{
              content: '\a0'; /* 不换行空格 */
              display: inline-block;
              margin-right: .3em;
              width: 2em;
              height: 2em;
              border-radius: .3em;
              vertical-align: middle;
              line-height: 2em; /* 关键 */
              font-size: 20px;
              text-align: center;
              color: #fff;
              background: gray;
        }
        .checkbox[type="checkbox"]:checked + label::before{
              content: '\2713';
              background: black;
        }
        label{
              margin-right: 40px;
              font-size: 20px;
        }
    </style>
    </style>
</head>
<body>
<div class="check-wrap">

      <input type="checkbox" class="checkbox" id="check-1" />

      <label for="check-1">生男孩</label>

      <input type="checkbox" class="checkbox" id="check-2" />

      <label for="check-2">生女孩</label>

</div>

</body>
<script>

</script>
</html>

```


这里为了隐藏原生的checkbox控件，我们用了clip: rect(0,0,0,0)进行截取，然后使用checkbox的伪类:checked来实现交互。

## 我们来实现自定义开关

![  ](./image/0ff2e7f53cd6f29030aecbdca3fab1d7_DVEdV7iX87.png "  ")

```typescript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>Document</title>
    <style>
        .check-wrap {
            margin-bottom: 20px;
            text-align: center;
        }

        label {
            margin-right: 40px;
            font-size: 14px;
        }

        .switch-an {
            position: absolute;
            clip: rect(0, 0, 0, 0);
        }

        .switch-an[type="checkbox"] + label {
            position: relative;
            display: inline-block;
            width: 5em;
            height: 2em;
            border-radius: 1em;
            color: #fff;
            background: #06c;
            text-align: left;
            line-height: 2em;
        }

        .switch-an[type="checkbox"] + label::before {
            content: '';
            width: 2em;
            height: 2em;
            position: absolute;
            left: 0;
            border-radius: 100%;
            vertical-align: middle;
            background-color: #fff;
            transition: left .3s;
        }

        .switch-an[type="checkbox"] + label::after {
            content: 'OFF';
            margin-left: 2.6em;
        }

        .switch-an[type="checkbox"]:checked + label::before {
            transition: left .3s;
            left: 3em;
        }

        .switch-an[type="checkbox"]:checked + label::after {
            content: 'NO';
            margin-left: .6em;
        }
    </style>
</head>
<body>

<div class="check-wrap">
    <input type="checkbox" class="switch-an" id="switch-an-1"/>
    <label for="switch-an-1" class="switch"></label>

</div>

</body>
<script>

</script>
</html>

```

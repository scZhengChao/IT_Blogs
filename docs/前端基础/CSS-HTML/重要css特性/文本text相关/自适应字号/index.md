# 容器宽高固定，字数不定，请问如何使字体大小自适应容器大小

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Font Size Auto Fit</title>
    <style type="text/css">
    .container {width:100%;height:2em;line-height:2em;font-size:24px;border:2px solid black;overflow:hidden;}
    .container .text {display:inline-block;line-height:2em;white-space:nowrap;background-color:#FCC;transform-origin:left center;}

    input[name="text"] {display:block;margin:1em 0;width:100%;height:2em;line-height:2em;font-size:24px;box-sizing:border-box;}
    </style>
    <script>
    document.addEventListener('DOMContentLoaded', function(){
        let domContainer = document.querySelector('.container');
        let domText      = domContainer.querySelector('.text');

        function update_text()
        {
            if(domText.clientWidth <= domContainer.clientWidth)
            {
                domText.style.transform = 'none';
            }
            else
            {
                let r = domContainer.clientWidth/domText.clientWidth;
                domText.style.transform = 'scale('+r+')';
            }
        }

        document.querySelector('input[name="btnUpdate"]').addEventListener('click', function(){
            domText.innerHTML = document.querySelector('input[name="text"]').value;
            update_text();
        });

        update_text();
    });
    </script>
</head>
<body>
<div class="container">
    <div class="text">如何使字体大小自适应容器大小？如何使字体大小自适应容器大小？</div>
</div>
<div>
    <input type="text" name="text" value="如何使字体大小自适应容器大小？" placeholder="input text line"/>
    <input type="button" name="btnUpdate" value="更新文字"/>
</div>
</body>
</html>
```

# 点击其他地方关闭遮罩层

## 目录

- [点击其他地方关闭遮罩层](#点击其他地方关闭遮罩层)

# **点击其他地方关闭遮罩层**

**或者失去光标关闭遮罩层**

[https://www.cnblogs.com/toggle/p/9375679.html](https://www.cnblogs.com/toggle/p/9375679.html "https://www.cnblogs.com/toggle/p/9375679.html")

    ---点击其他地方关闭遮罩层

```javascript 
 document.addEventListener('click',(ev)=>{
            var target = ev.target || ev.srcElement
            if(this.$refs.prompt.contains(target)) return
            //取消遮罩层
        })
或者addeventListener('blur',function)
```

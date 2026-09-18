# 一键置灰

## 目录

- [grayscale](#grayscale)
- [svg](#svg)

### grayscale

国内但凡遇上一些社会性的天灾人祸，影响比较大的，很多网站都会将页面置灰，表示哀悼。那时候有很多人在分析 "网页置灰" 这个功能该如何实现，其实用 filter 的 `grayscale` 实现是最简单快速的了

```javascript 
html {
    filter: grayscale(.95);
    -webkit-filter: grayscale(.95);
}

```


```javascript 
const setGrayHtml=()=>{
        const html:HTMLHtmlElement =  document.querySelector('html')
        if(!grief){
            html.style.filter =  'grayscale(1)'
            html.style['-webkit-filter']='grayscale(1)'
        }else{
            html.style.filter =  'none'
            html.style['-webkit-filter'] = 'none'
        }
        setGrief(grief=>!grief)
    }
    
```


# svg

又或者，使用 SVG 滤镜，也可以快速实现网站的置灰：

```javascript 
<div>
// ...
</div>

<svg xmlns="https://www.w3.org/2000/svg">
  <filter id="grayscale">
    <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
    </filter>
</svg>

html {
    filter: url(#grayscale);
}
```

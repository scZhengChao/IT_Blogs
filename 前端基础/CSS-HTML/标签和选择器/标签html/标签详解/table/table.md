# table

- **border-collapse:collapse 合并单元格边框;  separate;  注意：collapse 和border-radius 不兼容  ；border 并不会包容caption**
- **border-spacing:0;边框距离为0;**
- **empty-cells:hide; 表格无内容隐藏;**
- **table-layout:auto/fixed 宽度自适应还是固定**

\*\*table里 <colgroup span='2' class='red'></colgroup>  \*\*​

**根据rules分组,组的样式class='red'**；**rules='groups/rows/cols/all' 写在table里**

**区别于 colspan='6' rowspan='2' 合并列和行更复杂的 HTML 表格也可能包括 caption、col、colgroup、thead、tfoot 以及 tbody 元素。**

**col 标签是放在 colgroup 标签里的**

**<****`colgroup`****> 标签用于对表格中的列进行组合，以便对其进行格式化。 （其实用处不大；有待开发）**

**通过使用 \<colgroup> 标签****，可以向整个列应用样式，而不需要重复为每个单元格或每一行设置样式。** ​

**注释：只能在 \<table> 元素之内，在任何一个 \<caption> 元素之后，在任何一个 \<thead>、\<tbody>、\<tfoot>、\<tr> 元素之前使用 \<colgroup> 标签。**

```纯文本 
<colgroup span="4" class="async">
  <col style="background-color:yellow">
  <col span="2" style="background-color:red">
</colgroup>
.tab0 caption { background:#0F0;height:40px ;line-height:40px; caption-side:bottom;}
```


举例一：

```javascript 
 <table class="tab8" rules="all">
    <colgroup class="red"></colgroup>
    <colgroup span="2" class="yellow"></colgroup>
    <colgroup span="3" class="green"></colgroup>
    <colgroup span="2" class="blue"></colgroup>
    <colgroup class="red"></colgroup>
    <tr>
        <th>姓名</th>
        <th>电话</th>
        <th>传真</th>
        <th>姓名</th>
        <th>电话</th>
        <th>传真</th>
        <th>姓名</th>
        <th>电话</th>
        <th>传真</th>
    </tr>
    <tr>
        <td>张三</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>张三</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>张三</td>
        <td>4365346</td>
        <td>34673457</td>
    </tr>
    <tr>
        <td>李四</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>李四</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>李四</td>
        <td>4365346</td>
        <td>34673457</td>
    </tr>
    <tr>
        <td>王二麻子</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>王二麻子</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>王二麻子</td>
        <td>4365346</td>
        <td>34673457</td>
    </tr>
    <tr>
        <td>张三</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>张三</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>张三</td>
        <td>4365346</td>
        <td>34673457</td>
    </tr>
    <tr>
        <td>李四</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>李四</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>李四</td>
        <td>4365346</td>
        <td>34673457</td>
    </tr>
    <tr>
        <td>王二麻子</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>王二麻子</td>
        <td>4365346</td>
        <td>34673457</td>
        <td>王二麻子</td>
        <td>4365346</td>
        <td>34673457</td>
    </tr>
</table>


举例二：
<table class="tab">
    <caption>2007全国非邮发报刊征订目录</caption>
    <thead>
        <tr>
            <th>代号</th>
            <th>刊名</th>
            <th>刊期</th>
            <th>出版地</th>
            <th>年定价</th>
            <th>CN号</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th colspan="6">A马列主义毛泽东思想</th>
        </tr>
        <tr>
            <td>0001</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0002</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0003</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0004</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <th colspan="6">B美学哲学心理学</th>
        </tr>
        <tr>
            <td>0001</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0002</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0003</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0004</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <th colspan="6">C军事战争</th>
        </tr>
        <tr>
            <td>0001</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0002</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0003</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
        <tr>
            <td>0004</td>
            <td>马克思主义研究</td>
            <td>月刊</td>
            <td>北京</td>
            <td>144.0</td>
            <td>325346</td>
        </tr>
    </tbody>
</table>

```


[table-vue.html](table-vue_nRe6GA2vce.html "table-vue.html")

# Range/Section

## 目录

- [1.理解Range对象](#1理解Range对象)
  - [什么是Selection对象？](#什么是Selection对象)
  - [Selection对象与Range对象的区别是？](#Selection对象与Range对象的区别是)
  - [如何获取Selection对象中的某个Range对象呢？](#如何获取Selection对象中的某个Range对象呢)
  - [如何判断用户是否选取了内容？](#如何判断用户是否选取了内容)
  - [1-2 Range对象的属性有哪些？](#1-2-Range对象的属性有哪些)
  - [2 Range对象的方法  ](#2-Range对象的方法-)

推荐这个人的博客、

[ 龙恩0707 - 博客园  https://www.cnblogs.com/tugenhua0707/](https://www.cnblogs.com/tugenhua0707/ " 龙恩0707 - 博客园  https://www.cnblogs.com/tugenhua0707/")

# 1.理解Range对象

在HTML5中，一个Range对象代表页面上的一段连续区域。可以通过如下语句创建一个空的Range对象。如下代码：

```javascript 
var range = document.createRange();
```


## **什么是Selection对象？**

在HTML5中，每一个浏览器窗口都有一个Selection对象，代表用户鼠标在页面中所选取的区域。可以通过如下代码得到一个Selection对象：

```javascript 
var selection = window.getSelection();
或 
var selection = document.getSelection();

```


## **Selection对象与Range对象的区别是****？** ​

每一个Selection对象都有一个或多个Range对象，每一个Range对象代表用户用鼠标所选取范围内的一段连续区域。

**Firefox 与 chrome，safari对Selection的区别？**   在Firefox浏览器中，用户可以通过按住 ctrl键来选取页面上的多个区域，因此一个Selection对象可能有多个Range对象。   在chrome或safari浏览器中，用户每次只能选取一段区域，所以一个Selection对象中只能有一个Range对象。

## **如何获取Selection对象中的某个Range对象呢？**

可以通过Selection对象的getRangeAt方法来获取。代码如下：

```html 
var range = document.getSelection().getRangeAt(rangeIndex);

```


rangeIndex 代表Range对象的序号，在chrome或safari中，用户每次只能选取一段区域，因此该值只能为0；

## **如何判断用户是否选取了内容？**

可以通过Selection对象的 rangeCount 属性来判断； &#x20;

1\. 用户没有按下鼠标该属性值为0； &#x20;

2\. 用户按下鼠标之后该属性值为1； &#x20;

3\. 用户用鼠标加ctrl键选取了一个或多个区域时，该属性值代表用户通过鼠标选取的区域的数量，当用户取消该区域的选取之后，该属性值为1.

下面是一个demo；页面上显示一段文字和一个按钮，当用户单击按钮时弹出的提示框中显示用户用鼠标加ctrl键共选取了多少个区域及每一段区域中的内容。代码如下：

```html 
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
      <title>标题</title>
    </head>
    <body>
      <h3>Selection对象与Range对象使用demo</h3>
      <input type="button" value="选中我然后点击" onClick="rangeTest()" />
      <div id="showRange"></div>
      <script>
        function rangeTest() {
          var html,
            showRangeDiv=document.getElementById('showRange'),
            selection=document.getSelection();
          if(selection.rangeCount > 0) {
            html = "您选取了"+ selection.rangeCount + "段内容<br/>";
            for(var i = 0; i < selection.rangeCount; i++) {
              var range = selection.getRangeAt(i);
              html += "第"+ (i+1) + "段内容为：" + range + "<br/>"; 
            }
            showRangeDiv.innerHTML = html;
          }
        }
      </script>
    </body>
  </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/rangeCount.html "查看效果")

## **1-2 Range对象的属性有哪些？**

我们在页面上创建的代码如下：

```javascript 
var rangeObj = document.createRange();
console.log(rangeObj);

```


打印后看到有如下属性：

```text 
collapsed: (Boolean) 用于判断Range对象所代表的区域的开始点和结束点是否位于相同的位置，如果相同该属性值为true。
commonAncestorContainer: (node) 返回Range对象所代表的区域位于什么节点之中。
endContainer: (node) 用于返回Range对象所代表的区域的终点位于什么节点之中。
endOffset（int） 用于返回Range对象所代表区域的终点与包含该终点的节点起点之间的距离。
startContainer: (node) 用于返回Range对象所代表区域的起点位于什么节点之中。
startOffset (int) 用于返回Range对象所代表的区域的起点与包含该起点节点的起点之间的距离。


```


## **2 Range对象的方法** &#x20;

 2-1 理解使用 **selectNode**, **selectNodeContents**, 与 **deleteContents**方法

**selectNode**

Range对象的selectNode 方法用于将Range对象的起点指定为某个节点的起点，将Range对象的终点指定为该节点的终点。Range对象所代表的区域包含该节点。使用方法如下：

**rangeObj.selectNode(node);**

**demo举例理解**：

假如页面上有一个div，该div包含内容，如果使用 rangeObj.selectNode("div"); 的含义是，选择该div内的所有内容，包括该div标签本身。

**selectNodeContents**

该方法用于将Range对象的起点指定为某个节点中的所有内容的起点，将Range对象的终点指定为该节点所有内容的终点，也就是说使Range对象所代表的区域包含该节点的所有内容，**但是不包括该节点标签本身。**

使用方法如下：

**rangeObj.selectNodeContents(node);**

demo举例理解：

还是上面的div元素，该元素包含内容，如果使用 rangeObj.selectNodeContents('div');的话，的含义是，选择该div内的所有内容，但是不包括该div本身。

**deleteContents**

**deleteContents:** 该方法用于将Range对象中所包含的内容从页面中删除。

使用方法如下：

**rangeObj.deleteContents();**

下面是使用一个demo来理解上面的三个方法的具体含义，页面中有一个div元素，一个删除内容的按钮，和一个删除元素的按钮，div元素中显示一些文字，当用户单击 "删除内容"按钮时，会将div元素中的文字从页面中删除，单击 “删除元素” 按钮时，会将整个div元素从页面中删除。

```javascript 
<!DOCTYPE html>
     <html>
        <head>
          <meta charset="utf-8">
          <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
          <title>标题</title>
        </head>
        <body>
          <h3>Selection对象与Range对象使用demo</h3>
          <div id="div" style="background-color: #e0a0b0; width:300px; height: 50px;">aaaaadsadsdasadsbbgg</div>
          <button onclick="deleteRangeContents(true);">删除内容</button>
          <button onclick="deleteRangeContents(false);">删除元素</button>

          <script>
              function deleteRangeContents(flag) {
                var div = document.getElementById("div");
                var rangeObj = document.createRange();
                if (flag) {
                  rangeObj.selectNodeContents(div);
                } else {
                  rangeObj.selectNode(div);
                }
                rangeObj.deleteContents();
              }
          </script>
        </body>
    </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/selectNode.html "查看效果")

**2-2 理解使用** **setStart方法，setEnd方法，setStartBefore方法，setStartAfter方法，setEndBefore方法与setEndAfter方法**；

 

**setStart:** 该方法用于将某个节点中的某个位置指定为Range对象所代表区域的起点位置。

使用方法如下：  **rangeObj.setStart(node, num);** &#x20;

num的含义是：首先它是一个整型数值，有两种含义取决于node节点；   

1. 当第一个参数node所代表的节点是一个内容为一段文字的时候，那么该参数值用于指定将第几个文字结束位置作为Range对象所代表区域的起点位置(num是从0开始)   &#x20;
2. 当第一个参数node所代表的节点包括其他子节点时，该参数用于指定将第几个子节点的结束位置作为Range对象所代表区域的起点位置。

**setEnd:** 该方法用于将某个节点中的某处位置指定为Range对象所代表区域的结束位置。

使用方法如下：   **rangeObj.setEnd(node, num);**   

num的含义： 首先是一个整型数值；     &#x20;

1. 当第一个参数node所代表的节点是一个内容为一段文字的时候，该参数指定将第几个文字结束位置作为Range对象所代表区域的结束位置。    &#x20;
2. &#x20;当第一个参数node所代表的节点包括其他子节点时，该参数值用于指定将第几个子节点的结束位置作为Range对象所代表区域的结束位置。

下面是一个简单的demo来理解上面的 setStart和setEnd方法的使用，页面上有一个div元素和一个删除文字的按钮，div元素中有一些文字，当用户点击 删除文字按钮时，div元素中的第三个文字到第十个文字将被删除。

代码如下：

```javascript 
<!DOCTYPE html>
     <html>
        <head>
          <meta charset="utf-8">
          <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
          <title>标题</title>
        </head>
        <body>
          <div id="myDiv" style="color: red">这段文字中第三个文字到第十个文字将被删除</div>
          <button onclick="deleteChar()">删除文字</button>
          <script>
            function deleteChar() {
              var div = document.getElementById("myDiv");
              var textNode = div.firstChild;
              var rangeObj = document.createRange();
              rangeObj.setStart(textNode, 2);
              rangeObj.setEnd(textNode, 10);
              rangeObj.deleteContents();
            }
          </script>
        </body>
    </html>
```


查看效果

setStartBefore: 该方法用于将某个节点的起始位置指定为Range对象所代表区域的起点位置。使用方法如下：rangeObj.setStartBefore(node);

**setStartAfter:** 该方法用于将某个节点的终点位置指定为Range对象所代表区域的起点位置。使用方法如下：**rangeObj.setStartAfter(node);**

**setEndBefore:** 该方法用于将某个节点的起始位置指定为Range对象所代表区域的终点位置，使用方法如下：**rangeObj.setEndBefore(node);**

**setEndAfter:** 该方法用于将某个节点的终点位置指定为Range对象所代表区域的终点位置。使用方法如下：**rangeObj.setEndAfter(node);**

看上面的四个方法容易混淆，我们来做一个demo，使用一下 setStartBefore 和 setEndAfter方法。 页面上有一个表格和一个按钮，用户单击按钮时，通过Range对象的setStartBefore 和 setEndAfter方法 使Range对象代表的区域包含表格的第一行，然后删除该行。

```javascript 
<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <title>标题</title>
      </head>
      <body>
        <table id="myTable" border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td>第一行第一列</td>
            <td>第一行第二列</td>
          </tr>
          <tr>
            <td>第二行第一列</td>
            <td>第二行第二列</td>
          </tr>
        </table>
        <button onclick="deleteFirstRow()">删除第一行</button>
        <script>
          function deleteFirstRow() {
            var myTable = document.getElementById('myTable');
            if (myTable.rows.length > 0) {
              var row = myTable.rows[0];
              var rangeObj = document.createRange();
              rangeObj.setStartBefore(row);
              rangeObj.setEndAfter(row);
              rangeObj.deleteContents();
            }
          }
        </script>
      </body>
    </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/setStartBefore.html "查看效果")

**2-3 理解使用 cloneRange方法，cloneContents方法，extractContents方法**

**cloneRange:** 该方法用于对当前的Range对象进行复制，该方法返回复制的Range对象。使用方法如下： &#x20;

**var rangeClone = rangeObj.cloneRange();** &#x20;

下面可以看一个demo来理解一下，页面上显示一个 "克隆Range对象" 按钮，用户单击该按钮时，创建一个Range对象，该对象包含页面中的所有内容，然后使用cloneRange方法复制Range对象，然后在弹窗显示该Range对象中的内容。 &#x20;

代码如下：

```javascript 
<!DOCTYPE html>
   <html>
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <title>标题</title>
      </head>
      <body>
        <button onclick="cloneRange()">克隆Range对象</button>
        <script>
          function cloneRange() {
            var rangeObj = document.createRange();
            rangeObj.selectNodeContents(document.body);
            var rangeClone = rangeObj.cloneRange();
            console.log(rangeClone);
            alert(rangeClone.toString());
          }
        </script>
      </body>
  </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/cloneRange.html "查看效果")

**cloneContents:**该方法用于在页面上追加一段HTML代码，使用方法如下：**var docFragment = rangeObj.cloneContents();** 该方法返回的是 一个 DocumentFragment对象，该对象为一个容器元素，当需要追加，修改，删除或查找页面上的元素时，该方法非常有用。下面是一个demo，页面上显示一个div元素，div元素中包含一些文字和一个按钮，用户点击按钮时将在该div元素底部克隆出相同的文字和按钮。

```javascript 
<!DOCTYPE html>
   <html>
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <title>标题</title>
      </head>
      <body>
        <div id="div">
          <span>aaaaaa</span>
          <button onclick="cloneDivContent()">克隆</button>
        </div>
        <script>
          function cloneDivContent() {
            var div = document.getElementById('div');
            var rangeObj = document.createRange();
            rangeObj.selectNodeContents(div);
            var documentFragment = rangeObj.cloneContents();
            div.appendChild(documentFragment);
          }
        </script>
      </body>
  </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/cloneContents.html "查看效果")

**extraContents:** 该方法用于将Range对象所代表区域的HTML代码克隆到一个 DocumentFragment中，然后从页面中删除这段HTML代码；

使用方法如下：**var documentFragment = rangeObj.extraContents();**

下面是一个demo， 页面上有2个div元素和一个按钮，其中第一个div元素包含一些文字，用户单击该按钮时，把文字移动到第二个div中。

```javascript 
<!DOCTYPE html>
   <html>
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <title>标题</title>
      </head>
      <body>
        <div id="srcDiv" style="background-color: red; width: 300px; height:50px">adsddasdssdsdsdsads</div>
        <div id="distDiv" style="background-color: blue; width: 300px; height: 50px;"></div>
        <button onclick="moveContent()">移动元素内容</button>

        <script>
          function moveContent() {
            var srcDiv = document.getElementById('srcDiv');
            var distDiv = document.getElementById("distDiv");
            var rangeObj = document.createRange();
            rangeObj.selectNodeContents(srcDiv);
            var documentFragment = rangeObj.extractContents();
            distDiv.appendChild(documentFragment);
          }
        </script>
      </body>
  </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/extraContents.html "查看效果")

**2-4 insertNode方法**该方法用于将指定的节点插入到某个Range对象所代表的区域中，插入位置为Range对象所代表区域的起点位置，如果该节点已经存在于页面之中，那么该节点将被移动到Range对象所代表区域的起点处。使用方法如下：**rangeObj.insertNode(node)**

下面是一个demo，页面中有一个div元素和一个按钮，div元素有一些文字，在div元素中按下鼠标左键时，该按钮将被移动到按下鼠标左键的位置。

```javascript 
<!DOCTYPE html>
   <html>
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <title>标题</title>
      </head>
      <body>
        <div onmouseup="moveButton()" style="width: 400px; background-color: red;">adssdasddsdasszczxccxzcx</div>
        <button id="button">按钮</button>

        <script>
          function moveButton() {
            var button = document.getElementById("button");
            var selection = document.getSelection();
            if (selection.rangeCount > 0) {
              var range = selection.getRangeAt(0);
              range.insertNode(button);
            }
          }
        </script>
      </body>
  </html>
```


查看效果

**2-5 理解collapse方法 和 detach方法**

该方法用于将Range对象所代表的区域的终点移动到该区域的起点处，或将Range对象所代表的区域的起点移动到终点处，使Range对象所代表的区域内不包含任何内容。**使用方法如下：**

**RangeObj.collapse(toStart);** 参数toStart，是一个Boolean型，如果为false的话，表示将Range对象所代表的区域的起点移动到终点处，当为true的话，表示将Range对象所代表的区域的终点移动到该区域的起点处。

下面是一个demo，可以来理解下 collapse方法的使用；

页面上有一个div元素，里面包含一些文字，一个 选择元素的 按钮，一个 取消选择元素的按钮，和一个 显示Range内容的按钮，用户单击 选择元素 按钮时该Range对象中将包含页面中的div元素，然后单击 显示Range内容按钮 就弹出 该div元素的内容，再单击 取消选择按钮 将使用Range对象的collapse方法清空Range对象的内容。再次单击 显示Range内容，将显示空字符串。

代码如下：

```javascript 
<!DOCTYPE html>
       <html>
          <head>
            <meta charset="utf-8">
            <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
            <title>标题</title>
          </head>
          <body>
            <div id="div" style="background-color: red; width:300px; height: 50px;">元素中的内容</div>
            <button onclick="selectRangeContents()">选择元素</button>
            <button onclick="unselect()">取消选择</button>
            <button onclick="showRange()">显示Range内容</button>
            <script>
              var rangeObj = document.createRange();
              function selectRangeContents() {
                var div = document.getElementById('div');
                rangeObj.selectNode(div);
              }
              function unselect() {
                rangeObj.collapse(false);
              } 
              function showRange() {
                alert(rangeObj.toString());
              }
            </script>
          </body>
      </html>
```


[查看效果](https://tugenhua0707.github.io/RangeAndSelection/collapse.html "查看效果")

**detach方法：** 该方法用于从浏览器中释放Range对象，释放之后将不能再访问该Range对象，否则将抛出脚本错误，使用方法如下：**RangeObj.detach();**

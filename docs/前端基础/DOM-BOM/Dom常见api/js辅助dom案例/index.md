# js辅助dom案例

**一：双击可编辑**

```纯文本 
 关键代码 
    function ShowElement(element) { 
         // 过滤下可点击元素 
         if(e.target.className.indexOf('list-group-item') == -1) return 
         var oldhtml = element.innerHTML; 
         //创建新的input元素 
         var newobj = document.createElement('input'); 
         //为新增元素添加类型 
         newobj.type = 'text'; 
         //为新增元素添加value值 
         newobj.value = oldhtml; 
         // 限制长度 
         newobj.maxLength = 5 
         //为新增元素添加光标离开事件 
         newobj.onblur = function() { 
             //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
             element.innerHTML = this.value == '' ? oldhtml : this.value; 
             //当触发时设置父节点的双击事件为ShowElement 
             element.setAttribute("ondblclick", "ShowElement(this);"); 
         } 
         //设置该标签的子节点为空 
         element.innerHTML = ''; 
         //添加该标签的子节点，input对象 
         element.appendChild(newobj); 
         //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置） 
         newobj.setSelectionRange(0, oldhtml.length); 
         //设置获得光标 
         newobj.focus(); 
 
 
         //设置父节点的双击事件为空 
         newobj.parentNode.setAttribute("ondblclick", ""); 
     }
```


[editor\_dbclick.html](./assets/file/editor_dbclick_1XMPTQ7UK-.html "editor_dbclick.html")

[tabs-edit.html](./assets/file/tabs-edit_kL7bDMZkAQ.html "tabs-edit.html")

**二：div模拟输入框（**

**range+selection）**

```纯文本 
 子组件 
 <template> 
     <div class="edit-div" 
         v-html="innerText" 
         :contenteditable="canEdit" 
         @focus="isLocked = true" 
         @blur="isLocked = false" 
         @input="changeText"> 
     </div> 
 </template> 
 <style scoped> 
 .edit-div { 
     width: 100%; 
     height: 100%; 
     overflow: auto; 
     word-break: break-all; 
     outline: none; 
     user-select: text; 
     white-space: pre-wrap; 
     text-align: left; 
     * user-modify: read-write-plaintext-only; */ 
 } 
 .edit-div:empty:before { 
     content: 'placeholder'; 
     display: block; 
     color: #ccc; 
 } 
 </style> 
 
 
 <script > 
 export default{ 
     name: 'editDiv', 
     props: { 
         value: { 
             type: String, 
             default: '' 
         }, 
         canEdit: { 
             type: Boolean, 
             default: true 
         } 
     }, 
     data(){ 
         return { 
             innerText: this.value, 
             isLocked: false 
         } 
     }, 
     watch: { 
         'value'(){ 
             if (!this.isLocked || !this.innerText) { 
                 this.innerText = this.value; 
             } 
         } 
     }, 
     methods: { 
         changeText(){ 
             this.$emit('input', this.$el.innerHTML); 
         } 
     } 
 } 
 </script> 
 <style lang="scss" rel="stylesheet/scss"> 
 </style>
```


```纯文本 
 父组件使用 
 <template> 
     <div> 
         <common :canEdit='true' v-model='str' @input='change' class="input" @mouseup.native="select"></common> 
     </div> 
 </template> 
 <style scoped> 
 .input{ 
     width: 300px; 
     height: 300px; 
     border:1px solid black; 
 } 
 .input a{ 
     text-decoration: underline; 
     color:#399; 
     -moz-user-select:none;/*火狐*/ 
     webkit-user-select:none;/*webkit浏览器*/ 
     -ms-user-select:none;/*IE10*/ 
     -khtml-user-select:none;/*早期浏览器*/ 
     user-select:none; 
 } 
 </style> 
 <script> 
 import {common } from './components'; 
 export default { 
     name:'selectContenteditable', 
     data(){return { 
         str:'' 
     }}, 
     components:{common}, 
     mounted(){ 
     }, 
     methods:{ 
         change(data){ 
             this.str = data 
         }, 
         select(ev){ 
             if(ev.target.nodeName =='A') return 
             var getSelectedText = function() { 
                 if (window.getSelection) { 
                     return window.getSelection(); 
                 } else if (document.getSelection) { 
                     return document.getSelection(); 
                 }else{ 
                     return ""; 
                 } 
             } 
             let text = getSelectedText().toString() 
             if(text.length>0){ 
                 let rangobject = getSelectedText().getRangeAt(0) 
                 rangobject.deleteContents(); 
                 let box = document.createElement('a') 
                 box.setAttribute('href',' https://www.baidu.com/ ') 
                 box.setAttribute('contenteditable',false) 
                 box.setAttribute('target','_black') 
                 box.innerHTML = text 
                 rangobject.insertNode(box) 
             } 
         } 
     } 
 } 
 </script>
```


```纯文本 
 <h2> Shoppping List(Content Editable) </h2> 
 <ul class="content-editable" contenteditable="true"> 
      <li> 1. Milk </li> 
      <li> 2. Bread </li> 
      <li> 3. Honey </li> 
 </ul> 
 注意：按下回车键的时候，会自动创建一个li标签，非常神奇
```


**三：元素跟随鼠标**

```纯文本 
 var box = document.getElementById("d_box"); 
     var drop = document.getElementById("drop"); 
     startDrop(drop,box);  // 鼠标放到  drop    但是移动 是 box 
     function startDrop(current,move) { 
         current.onmousedown = function(event) { 
             var event = event || window.event; 
             var x = event.clientX - move.offsetLeft - 205;   // 记录当前盒子的x 位置 
             var y = event.clientY - move.offsetTop - 155;  //  // 记录当前盒子的y位置 
             document.onmousemove = function(event) { 
                 var event = event || window.event; 
                 move.style.left = event.clientX - x + "px"; 
                 move.style.top = event.clientY - y + "px"; 
                 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
             } 
         } 
         document.onmouseup = function() {  // 鼠标弹起之后， 鼠标继续移动不应该操作 
             document.onmousemove = null; 
         } 
     } 

```


[drag1.html](./assets/file/drag1_AMYxFvb2KE.html "drag1.html")

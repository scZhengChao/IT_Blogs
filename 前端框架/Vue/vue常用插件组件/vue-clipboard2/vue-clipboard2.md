# &#x20;vue-clipboard2

## 目录

- [使用](#使用)
  - [指令](#指令)
  - [方法](#方法)

```javascript 
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

```


## 使用

### 指令

```javascript 
<el-button
  v-clipboard:copy="copyUri"
  v-clipboard:success="onCopy"
  v-clipboard:error="onError"
  size="mini"
  type="primary"
>
  copy
</el-button>
```


### 方法

```javascript 
<button @click="seccendCopy">第二种方式复制</button>


seccendCopy() {
      this.$copyText(this.value).then(
        function(e) {
          console.log("copy arguments e:", e);
          alert("复制成功!");
        },
        function(e) {
          console.log("copy arguments e:", e);
          alert("复制失败!");
        }
      );
}

```

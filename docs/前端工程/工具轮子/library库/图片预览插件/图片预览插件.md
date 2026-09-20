# 图片预览插件

## 目录

- [vue-photo-preview](#vue-photo-preview)

# vue-photo-preview

```typescript 
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

//在img标签添加preview属性 preview值相同即表示为同一组
<img src="xxx.jpg" preview="0" preview-text="描述文字">
//分组
<img src="xxx.jpg" preview="1" preview-text="描述文字">
<img src="xxx.jpg" preview="1" preview-text="描述文字">
<img src="xxx.jpg" preview="2" preview-text="描述文字">
 <img src="xxx.jpg" preview="2" preview-text="描述文字">

let options = {
  fullscreenEl: false
};

Vue.use(preview,options)

```


**如果数据是异步获取回来的，会出现不管你怎么点击，都不会出现效果。这就需要在你成功获取数据回来之后，加上 ****`this.$previewRefresh()`**** ，刷新重置一下。**

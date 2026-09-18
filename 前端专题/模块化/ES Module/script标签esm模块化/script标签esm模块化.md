# script标签esm模块化

通过将文件上传到你自己的服务器，或是使用一个已存在的CDN，three.js 便可以**不借助任何构建系统来进行使用**。由于 t\*\*hree.js 依赖于ES module，**因此任何引用它**的script标签必须使用type="module"。\*\*如下所示：

```javascript 
<script type="importmap">
  {
  "imports": {
    "three": "https://unpkg.com/three@<version>/ build/three.module.js" 
  }
  }
</script>

<script type="module">

  import * as THREE from 'three';

  const scene = new THREE.Scene();

</script>
```

# 模块化引入

模块化引入可以参考[pokemon-diagram](https://link.segmentfault.com/?enc=VrkyKLfBzupjcQb7XoL+yg==.G/2QPlojL48n2RkwGH86j+egcA5X2vPv7jRka2bj4QdktT858IgyMDFz1GLyzrFO "pokemon-diagram")的这个文件[static/mxgraph/index.js](https://link.segmentfault.com/?enc=yuIeI1Jt/2CGREvRki5i5A==.drqXQkYblai4InLwVgMwDRUVUxuAc3bsJRVlHPLNB+cv53R25xaQ/O5KH+SLftp99gmrdtcJqlzrLqLZXtJ07KXnXSX8vc9MQc/vShSCVRI= "static/mxgraph/index.js")

```javascript 
/*** 引入 mxgraph ***/
// src/graph/index.js
import mx from 'mxgraph';

const mxgraph = mx({
  mxBasePath: '/static/mxgraph',
});

//fix BUG https://github.com/jgraph/mxgraph/issues/49
window['mxGraph'] = mxgraph.mxGraph;
window['mxGraphModel'] = mxgraph.mxGraphModel;
window['mxEditor'] = mxgraph.mxEditor;
window['mxGeometry'] = mxgraph.mxGeometry;
window['mxDefaultKeyHandler'] = mxgraph.mxDefaultKeyHandler;
window['mxDefaultPopupMenu'] = mxgraph.mxDefaultPopupMenu;
window['mxStylesheet'] = mxgraph.mxStylesheet;
window['mxDefaultToolbar'] = mxgraph.mxDefaultToolbar;

export default mxgraph;


/*** 在其他模块中使用 ***/
// src/graph/Graph.js
import mxgraph from './index';

const {
  mxGraph,
  mxVertexHandler,
  mxConstants,
  mxCellState,
  /*......*/
} = mxgraph;
```


这里有两点需要注意的

- `mx`方法传入的配置项`mxBasePath`指向的路径一定要是一个可以通过 url 访问的静态资源目录。举个例子，pokemon-diagram 的[static 目录](https://link.segmentfault.com/?enc=tDrk0ecjiitzevBU//DH2Q==.ssikFH/3sMeGE3PhkWQFFEKJDJry6B0+gmkK3nCN8JC2Lj0kA8E4+8Vb+nlI5aphYp9ILq7FHG6XVvU/+Xz4kw== "static 目录")是个静态资源目录，该目录下有`mxgraph/css/common.css`这么个资源，通过`http://localhost:7777`可以访问 pokemon-diagram 应用，那么通过`http://localhost:7777/static/mxgraph/css/common.css`也应该是可以访问`common.css`才对
- 如果你是通过 script 标签引入 mxGraph，是不需要绑定全局变量那段代码的。模块化引入要使用这段代码是因为，mxGraph 这个框架有些代码是通过 window\.mxXXX 对以上属性进行访问的，如果不做全局绑定使用起来会有点问题。这是官方一个未修复的 BUG，详情可以查阅上面代码注释的 issue

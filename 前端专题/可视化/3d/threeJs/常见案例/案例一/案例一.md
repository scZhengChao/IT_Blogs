# 案例一

## 目录

- [init.js](#initjs)
- [index.js](#indexjs)

[ VR全景看房｜一次给你3种前端实现方案，拿走不谢！ 前言事情是这样的，前几天我接到一个 外包工头的新需求，某品牌要搭建一个在线VR展厅，用户可以在手机上通过陀螺仪或者拖动来360度全景参观展厅，这个VR展厅里会有一些信息点，点击之后可以呈现更多信息（视频，图… https://zhuanlan.zhihu.com/p/395541250](https://zhuanlan.zhihu.com/p/395541250 " VR全景看房｜一次给你3种前端实现方案，拿走不谢！ 前言事情是这样的，前几天我接到一个 外包工头的新需求，某品牌要搭建一个在线VR展厅，用户可以在手机上通过陀螺仪或者拖动来360度全景参观展厅，这个VR展厅里会有一些信息点，点击之后可以呈现更多信息（视频，图… https://zhuanlan.zhihu.com/p/395541250")

#### init.js

```javascript 
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
class Init {
   scene;
   camera;
   renderer;
   defaultOptions = {}
  options;
  poiObjects=[];
  controls
  constructor(options) {
    this.options = Object.assign({},this.defaultOptions,options ?? {})
    this.poiObjects = []
    this.init()
    this.initEvent()
  }
  onClick=(event)=>{
    event.preventDefault();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = ( event.clientX / document.body.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / document.body.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, this.camera );
    const intersects = raycaster.intersectObjects( this.poiObjects );
    if(intersects.length>0){
      alert("点击了热点"+intersects[0].object.detail.title);
    }
  }
  initEvent = ()=>{
    this.options.container.addEventListener("click",this.onClick);
  }
  init = ()=>{
    this.scene = new THREE.Scene();
    //镜头
    this.camera = new THREE.PerspectiveCamera(90, document.body.clientWidth / document.body.clientHeight, 0.1, 100);
    this.camera.position.set(0, 0, 0.01);
    //渲染器
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.options.container.appendChild(this.renderer.domElement);
    //镜头控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.createHouse()
    // this.createSphere()
    this.loop()
  }
  loop = ()=>{
    requestAnimationFrame(this.loop);
    this.renderer.render(this.scene, this.camera);
  }
  createHouse = ()=>{
    const materials = [];
    //根据左右上下前后的顺序构建六个面的材质集
    const texture_left = new THREE.TextureLoader().load( 'images/scene_left.png');
    materials.push( new THREE.MeshBasicMaterial( { map: texture_left} ) );

    const texture_right = new THREE.TextureLoader().load( 'images/scene_right.png' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_right} ) );

    const texture_top = new THREE.TextureLoader().load( 'images/scene_top.png' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_top} ) );

    const texture_bottom = new THREE.TextureLoader().load( 'images/scene_bottom.png' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_bottom} ) );

    const texture_front = new THREE.TextureLoader().load( 'images/scene_front.png' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_front} ) );

    const texture_back = new THREE.TextureLoader().load( 'images/scene_back.png' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_back} ) );

    const box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
    box.geometry.scale( 1, 1, -1 );
    this.scene.add(box);
    this.addPoint()

  }
  createSphere = ()=>{
    const sphereGeometry = new THREE.SphereGeometry(/*半径*/1, /*垂直节点数量*/50, /*水平节点数量*/50);//节点数量越大，需要计算的三角形就越多，影响性能
    const texture = new THREE.TextureLoader().load('images/scene.png');
    const sphereMaterial = new THREE.MeshBasicMaterial({map: texture});
    const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphereGeometry.scale(1, 1, -1);
    this.scene.add(sphere);
    this.addPoint()
  }
  addPoint=()=>{
    const hotPoints=[
      {
        position:{
          x:0,
          y:0,
          z:-0.2
        },
        detail:{
          "title":"信息点1"
        }
      },
      {
        position:{
          x:-0.2,
          y:-0.05,
          z:0.2
        },
        detail:{
          "title":"信息点2"
        }
      }
    ];
    const pointTexture = new THREE.TextureLoader().load('images/hot.png');
    const material = new THREE.SpriteMaterial( { map: pointTexture} );
    for(let i=0;i<hotPoints.length;i++){
      const sprite = new THREE.Sprite( material );
      sprite.scale.set( 0.05, 0.05, 0.05 );
      sprite.position.set( hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z );
      sprite.detail = hotPoints[i].detail;
      this.poiObjects.push(sprite);
      this.scene.add( sprite );
    }
  }

}

export default Init

```


#### index.js

```javascript 
import React , { memo,useRef } from 'react';
import Init from "./init";
import { useMount } from 'ahooks'
const ThreeDemo = memo((props) => {
  const containerRef = useRef()
  useMount(()=>{
    const vrInstance = new Init({
      container: containerRef.current
    })
  })

  return <div ref={containerRef} style={{width:'100%',height:'100%'}}></div>
});
ThreeDemo.displayName = 'ThreeDemo';

export default ThreeDemo;

```

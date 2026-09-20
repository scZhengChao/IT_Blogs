# library库

[https://lbs.amap.com/api/javascript-api/guide/abc/prepare](https://lbs.amap.com/api/javascript-api/guide/abc/prepare "https://lbs.amap.com/api/javascript-api/guide/abc/prepare")

    官方文档 写的很详细很清楚

![  ](./assets/image/e68fd1e679e3639f167e4e91f946659a_GEzW_9bsF4.png "  ")

![  ](./assets/image/76f7e9b8050865db5c309032a54ffe39_gzCYirnihR.png "  ")

\*\*一：插件： \*\*​

**.plugin('AMap.Geolocation') 利用浏览器和ip能力进行高精度定位**

```纯文本 
 <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=6462f563f32fdb84215d27b83fc6fef6"></script> 
 
 AMap.Geolocation 定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位sdk辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能。用户可以通过两种当时获得定位的成败和结果，一种是在 getCurrentPosition的时候传入回调函数来处理定位结果，一种是通过事件监听来取得定位结果。Geolocation定位常见问题说明 
 注：默认情况下，PC 端优先使用精确 IP 定位，解决多数浏览器无法完成定位的现状，IP定位失败后使用浏览器定位；手机端优先使用浏览器定位，失败后使用IP定位；对于安卓 WebView 页面的开发者，可以结合定位 sdk 进行辅助定位，详细说明见useNative参数。精确IP定位时不返回accuracy字段值。 
 
 
 <template> 
 <div  id="map-container"> 
 
 
 </div> 
 </template> 
 
 
 <script> 
 export default { 
     name:'my-map', 
     data(){return{ 
         map:null, 
         geo:null 
     }}, 
     mounted() { 
         var that = this 
         this.map = new AMap.Map('map-container',{ 
             zoom:11,//级别 
             center: [116.397428, 39.90923],//中心点坐标 
             viewMode:'3D',//使用3D视图, 
             resizeEnable: true, 
             position:[116.39, 39.9],//位置 
             icon: new AMap.Icon({             
                 size: new AMap.Size(40, 50),  //图标的大小 
                 image: "https://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png", 
                 imageOffset: new AMap.Pixel(0, -60) 
             })         
         }); 
         // AMap.Geolocation 插件 高德 
         this.map.plugin('AMap.Geolocation', function () { 
             that.geo  = new AMap.Geolocation({ 
                 enableHighAccuracy: true,//是否使用高精度定位，默认:true 
                 timeout: 3000,          //超过10秒后停止定位，默认：无穷大 
                 maximumAge: 0,           //定位结果缓存0毫秒，默认：0 
                 convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true 
                 showButton: true,        //显示定位按钮，默认：true 
                 buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角 
                 buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20) 
                 showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true 
                 showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true 
                 panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true 
                 zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false 
             }); 
           
             that.map.addControl(that.geo); 
             that.geo.getCurrentPosition(); 
             AMap.event.addListener(that.geo, 'complete', that.onComplete);//返回定位信息 
             AMap.event.addListener(that.geo, 'error', that.onError);      //返回定位出错信息 
         }); 
     }, 
     methods:{ 
         onComplete(position){ 
             console.log(position,'------position--------') 
         }, 
         onError(err){ 
             console.log(err,'-------------err-----------') 
         } 
     }, 
     beforeDestroy() { 
          
     }, 
 } 
 </script> 
 <style lang='scss' scoped> 
    #map-container{ 
        height: 100px; 
        width: 500px; 
    } 
 </style> 
 
 
 
 
 

```


**二：地址转换 AMap.convertFrom**

为坐标转换类，支持将**其他坐标系的坐标点转换为高德坐标系**。

坐标转换方法

| 方法                                                                                                                                                                                                                                                                                                                                                                                   | 返回值 | 说明                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | -------------------------------------------------------------------------------------------------------------------- |
| AMap.convertFrom(lnglat:[LngLat](https://lbs.amap.com/api/javascript-api/reference/core/#LngLat "LngLat")\|Array.<[LngLat](https://lbs.amap.com/api/javascript-api/reference/core/#LngLat "LngLat")>, type:String,&#xA;function(status:String,result:info/[ConvertorResult](https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#ConvertorResult "ConvertorResult"))) |     | 将其他地图服务商的坐标批量转换成高德地图经纬度坐标。最多支持40对坐标。&#xA;type用于说明是哪个服务商的坐标,可选值有：&#xA;gps:GPS原始坐标；&#xA;baidu：百度经纬度；&#xA;mapbar：图吧经纬度； |

[ConvertorResult 对象](https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address "ConvertorResult 对象")

| 属性        | 类型                                                                                        | 说明       |
| --------- | ----------------------------------------------------------------------------------------- | -------- |
| info      | String                                                                                    | 成功状态文字描述 |
| locations | Array.<[LngLat](https://lbs.amap.com/api/javascript-api/reference/core/#LngLat "LngLat")> | 返回高德坐标集合 |

```纯文本 
 var gps = [longitude,latitude] 
 AMap.convertFron(gps,'gps',function(status,result){ 
              
 })
```


\*\*三： \*\*

**地理编码与逆地理编码类**

**AMap.Geocoder**

AMap.Geocoder地理编码与逆地理编码类，用于地址描述与坐标之间的转换。用户可以通过自定义回调函数取回并显示

[查询结果](https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_GeocoderResult "查询结果")

。若服务请求失败，系统将返回

[错误信息](https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_ErrorStatus "错误信息")

。

[相关示例](https://lbs.amap.com/api/javascript-api/example/geocoder/geocoding/ "相关示例")

[https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m\_AMap.Geocoder](https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_AMap.Geocoder "https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_AMap.Geocoder")

```纯文本 
 地址 ==》经纬度   地理编码 
   var map = new AMap.Map("container", { 
         resizeEnable: true 
     }); 
      
     var geocoder = new AMap.Geocoder({ 
         city: "010", //城市设为北京，默认：“全国” 
     }); 
      
     var marker = new AMap.Marker(); 
      
     function geoCode() { 
         var address  = document.getElementById('address').value; 
          geocoder.getLocation(address, function(status, result) { 
             if (status === 'complete'&&result.geocodes.length) { 
                 var lnglat = result.geocodes[0].location 
                 document.getElementById('lnglat').value = lnglat; 
                 marker.setPosition(lnglat); 
                 map.add(marker); 
                 map.setFitView(marker); 
             }else{ 
                 log.error('根据地址查询位置失败'); 
             } 
         }); 
     } 
     document.getElementById("geo").onclick = geoCode; 
     document.getElementById('address').onkeydown = function(e) { 
         if (e.keyCode === 13) { 
             geoCode(); 
             return false; 
         } 
         return true; 
     }; 
 
 
 
 
 经纬度 ==》 地址  逆地理编码 
 <script type="text/javascript"> 
     var map = new AMap.Map("container", { 
         resizeEnable: true 
     }); 
      
     var geocoder = new AMap.Geocoder({ 
         city: "010", //城市设为北京，默认：“全国” 
         radius: 1000 //范围，默认：500 
     }); 
     var marker = new AMap.Marker();; 
     function regeoCode() { 
          
         var lnglat  = document.getElementById('lnglat').value.split(','); 
         map.add(marker); 
         marker.setPosition(lnglat); 
          
          geocoder.getAddress(lnglat, function(status, result) { 
             if (status === 'complete'&&result.regeocode) { 
                 var address = result.regeocode.formattedAddress; 
                 document.getElementById('address').value = address; 
             }else{ 
                 log.error('根据经纬度查询地址失败') 
             } 
         }); 
     } 
      
     map.on('click',function(e){ 
         document.getE
```


[拖拽拉伸](./拖拽拉伸/index.md "拖拽拉伸")

[图片预览插件](./图片预览插件/index.md "图片预览插件")

[加密解密](./加密解密/index.md "加密解密")

[cookie](IT/前端工程/工具轮子/library库/cookie/cookie.md "cookie")

[进度条](./进度条/index.md "进度条")

[压缩js](./压缩js/index.md "压缩js")

[代码高亮](IT/前端工程/工具轮子/library库/代码高亮/代码高亮.md "代码高亮")

[复制黏贴](./复制黏贴/index.md "复制黏贴")

[时间处理](./时间处理/index.md "时间处理")

[Url 处理](<./Url 处理/index.md> "Url 处理")

[裁切图片](./裁切图片/index.md "裁切图片")

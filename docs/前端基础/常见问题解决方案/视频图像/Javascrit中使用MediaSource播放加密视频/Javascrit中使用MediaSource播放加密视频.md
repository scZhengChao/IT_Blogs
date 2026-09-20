# Javascrit中使用MediaSource播放加密视频

[https://blog.csdn.net/camike/article/details/82797768](https://blog.csdn.net/camike/article/details/82797768 "https://blog.csdn.net/camike/article/details/82797768")

```纯文本 
 MediaSource 
 
        MediaSource是一个表示媒体资源HTMLMediaElement对象的接口。 MediaSource对象可以附着在HTMLMediaElement在客户端进行视频播放。区别于传统的直接在video标签中写上 src="//server/media/demo.mp4" 的用法，MediaSource的使用要稍微复杂一点。 
 
 var video = document.querySelector('video'); 
 var mediaSource = new MediaSource(); 
 video.src = URL.createObjectURL(mediaSource);
```


```纯文本 
      MediaSource对象上有三个主要事件，  sourceopen、sourceended、sourceclose。 其中， sourceopen事件是在给video.src赋值之后触发；sourceended事件是在用户主动调用终止或者视频数据解析、播放错误时被触发；sourceclose事件是在SourceBuffer和MediaElement中无可用数据(一般是播放到视频末尾)时被触发。 我们一般需要在给video.src赋值之后， 监听sourceopen事件， 以确保MediaSource和HTMLMediaElement已经完成绑定，并在此之后才开始进入数据处理流程。 
      
 
         数据处理的过程，主要是围绕着SourceBuffer对象展开的。首先， 媒体服务器把一个比较长的mp4视频文件，拆分成video（只包含图像，不含声音）和audio（只包含声音，不含图像）两个独立的文件，然后分别把两个文件分片，切成一段一段彼此大小相差不多的二进制数据片段（一般后缀名为.ts） 。JavaScript创建两个SourceBuffer对象，并输入对应的MimeType类型'video/mp4'、'audio/mp4'(一个SourceBuffer对象只能接受一种格式的数据 ，所以这里需要为视频和音频数据分别创建一个SourceBuffer)。然后创建XMLHTTPRequest， 以一定的顺序序列从媒体服务器上请求video和audio的资源片段，将其append到对应的SourceBuffer中。
```


```纯文本 
 var video = document.querySelector('video'); 
 var videoCodec = 'video/mp4; codecs="avc1.42E01E"'; 
 var audioCodec = 'audio/mp4; codecs="mp4a.40.2"'; 
 var mediaSource = new MediaSource(); 
 video.src = URL.createObjectURL(mediaSource); 
 mediaSource.addEventListener('sourceopen', sourceOpen); 
 function sourceOpen(){ 
     var mediaSource = this; 
     var videoBuffer = mediaSource.addSourceBuffer(videoCodec); 
     var audioBuffer = mediaSource.addSourceBuffer(audioCodec); 
     /* 
     * buffer数据处理（append、remove等）完成时会触发 updateend 事件 
     * 这里省略对audioBuffer的 updateended 事件等待 
     */ 
     videoBuffer.addEventListener('updateend', function(){ 
         mediaSource.endOfStream(); 
         video.play(); 
     }); 
     /* 
     *  这里省略网络数据请求的过程，且假设音视频都只有一个片段文件。 
     */ 
     videoBuffer.appendBuffer(vbuf); 
     audioBuffer.appendBuffer(abuf); 
 } 

```


```纯文本 
   此处省略了两个部分，一是多个SourceBuffer的 updateend 事件的等待，需要使用Promise来进行异步处理；二是网络数据请求及把数据输入到SourceBuffer的过程。 对于网络请求，我们重点需要关注的内容是，请求的序列化。当前大多数网站使用的是清单文件的方式，里面包含一段视频的所有相关信息，包括总时长、音视频编码、加密方式、片段文件URI，最重要的是音视频的分片时间戳及对应的片段文件名（常见的有.xml、.mpd、.menifest等格式清单）。JavaScript加载该文件并解析得到所有音视频文件路径后，就可以批量下载数据了。下载完成的数据片段（单以video数据为例），可以不分先后顺序，调用appendBuffer方法输入到SourceBuffer里，浏览器内部会根据数据中的时间戳来进行排序。但此处不推荐这样做，因为这样会浪费一些内存空间。 

```


```纯文本 
 服务器音视频分片 
 
 
        熟悉代码的过程中，需要服务器支持。媒体片段资源的生成及加密可以使用shaka-packager或者bento4工具。以下是bento4工具命令的一个简单例子： 
 mp4split.exe h265fragment.mp4 --video --media-segment segment-%llu.m4s --pattern-parameters N 
 mp4split.exe h265fragment.mp4 --audio --media-segment segment-%llu.m4s --pattern-parameters N 
        这两条命令会把video和audio数据切分成片段，并以segment-0.m4s、segment-1.m4s......序列生成文件名。bento4是一个工具集，要切分视频不止这一种命令，详情需参阅官方文档。另外，不管服务器应用类型是iis、apache、nginx等其中哪一种，需要注意音视频切片文件后缀名需要有相应的MimeType类型与其对应，以免出现客户端下载出现错误404的情况 

```


```纯文本 
 <html> 
   <head> 
     <title>MSE Demo</title> 
     <style> 
       video { 
         max-width: 100%; 
       } 
     </style> 
     <script type="text/javascript"> 
     var audioFragments = [ 
       "media/audio/init.mp4", 
       "media/audio/seg-1.mp4", 
       "media/audio/seg-2.mp4", 
       "media/audio/seg-3.mp4", 
       "media/audio/seg-4.mp4", 
       "media/audio/seg-5.mp4", 
       "media/audio/seg-6.mp4", 
       "media/audio/seg-7.mp4", 
     ]; 
     var videoFragments = [ 
       "media/video/init.mp4", 
       "media/video/seg-1.mp4", 
       "media/video/seg-2.mp4", 
       "media/video/seg-3.mp4", 
       "media/video/seg-4.mp4", 
       "media/video/seg-5.mp4", 
       "media/video/seg-6.mp4", 
       "media/video/seg-7.mp4", 
     ]; 
     function MSELoadTrack(fragments, type, mediaSource, name) { 
        return new Promise(function(resolve, reject) { 
           var sourceBuffer; 
           var curFragment = 0; 
           function addNextFragment() { 
               if (mediaSource.readyState == "closed") { 
                 return; 
               } 
               if (curFragment >= fragments.length) { 
                 resolve(); 
                 return; 
               } 
               var fragmentFile = fragments[curFragment++]; 
               var req = new XMLHttpRequest(); 
               req.open("GET", fragmentFile); 
               req.responseType = "arraybuffer"; 
               req.addEventListener("load", function() { 
                   sourceBuffer.appendBuffer(new Uint8Array(req.response)); 
               }); 
               req.addEventListener("error", function(){reject();}); 
               req.addEventListener("abort", function(){reject();}); 
               req.send(null); 
           } 
           sourceBuffer = mediaSource.addSourceBuffer(type); 
           sourceBuffer.addEventListener("updateend", addNextFragment); 
           addNextFragment(); 
       }); 
     } 
     </script> 
   </head> 
   <body> 
     <h1>Media Source Extensions Demo</h1> 
     <video id="v" controls preload="auto"></video> 
     <script> 
       function Load() { 
         var video = document.getElementById("v"); 
         const audioContentType = 'audio/mp4; codecs="mp4a.40.2"'; // AAC-LC 
         const videoContentType = 'video/mp4; codecs="avc1.64001F"'; // High profile level 3.1 
         var ms = new MediaSource(); 
         video.src = URL.createObjectURL(ms); 
         var SourceOpen = function () { 
           ms.removeEventListener("sourceopen", SourceOpen); 
           Promise.all([MSELoadTrack(videoFragments, videoContentType, ms, "video"), MSELoadTrack(audioFragments, audioContentType, ms, "audio")]).then(function(){ms.endOfStream();}); 
         } 
         ms.addEventListener("sourceopen", SourceOpen); 
         video.addEventListener("canplay", function(){video.play();}); 
       } 
       Load(); 
     </script> 
   </body> 
 </html> 

```


```纯文本 
 Encypted Media Extensions（EME） 
 
 
        EME是HTMLMediaElement对象的一套用于播放加密音视频的扩展API。相关的数据类型主要有Navigator、MediaKeys、MediaKeySystemAccess、MediaKeySession等。目前主流的媒体内容加密标准可以在MPEG-DASH网站查阅，这里我们只介绍较为常用的clearkey、widevine和playready。通俗地来说，整个播放过程可以分为以下几个部分： 
 
 
 1， 服务器媒体资源加密、分片（加密时生成对应的kid和key值） 
 2， 客户端走MSE流程，请求加密内容，并将数据传输给HTMLMediaElement进行播放 
 3， HTMLMediaElement解析处理数据的过程中，发现数据header中"IsEncrypted"字段为1（假设的字段名），向JavaScript抛出 encrypted 事件 
 4， JavaScript调用EME相关API同CDM（Content Decryption Module）底层交互，并发起网络请求，从License服务器获取相应的密钥，传递给CDM 
 5， CDM拿到密钥对数据进行解密，然后转交给HTMLMediaElement底层继续播放 
 
 
 clearkey加密内容的安全级别较低，一般可以把kid、key值明文写在javascript代码中。而playready和widevine配合硬件设施，安全级别很高，key值只能通过底层CDM协助，播放时从License服务器获取，且无法被复用。这里我们说的kid，是媒体内容加密时所用密钥的唯一标识，通过它，我们可以从License服务器获取与其对应的key（加解密密钥）。在内容加密的过程中，它被写在文件片段的header中，与 "IsEncrypted" 字段一起作为文件头信息的一部分，在客户端解析媒体数据时，它会被取出。 
 下图是EME相关原理图（图片引自W3C）： 

```


```纯文本 
 <html> 
 <head> 
     <title>MSE EME Demo</title> 
     <style> 
         video { 
             max-width: 100%; 
         } 
     </style> 
     <script type="text/javascript"> 
         // "keyid" : "key" 
         var keys = { 
             "2fef8ad812df429783e9bf6e5e493e53": "7f412f0575f44f718259beef56ec7771", 
             "7eaa636ee7d142fd945d1f764877d8db": "624db3d757bb496fb93e51f341d11716", 
         }; 
         var audioFragments = [ 
             "media/audio/init.mp4", 
             "media/audio/seg-1.mp4", 
             "media/audio/seg-2.mp4", 
             "media/audio/seg-3.mp4", 
             "media/audio/seg-4.mp4", 
             "media/audio/seg-5.mp4", 
             "media/audio/seg-6.mp4", 
             "media/audio/seg-7.mp4", 
         ]; 
         var videoFragments = [ 
             "media/video/init.mp4", 
             "media/video/seg-1.mp4", 
             "media/video/seg-2.mp4", 
             "media/video/seg-3.mp4", 
             "media/video/seg-4.mp4", 
             "media/video/seg-5.mp4", 
             "media/video/seg-6.mp4", 
             "media/video/seg-7.mp4", 
         ]; 
         // mediasource extension ======================================================== 
         function MSELoadTrack(fragments, type, mediaSource, name) { 
             return new Promise(function (resolve, reject) { 
                 var sourceBuffer; 
                 var curFragment = 0; 
                 function addNextFragment() { 
                     if (mediaSource.readyState == "closed") { 
                         return; 
                     } 
                     if (curFragment >= fragments.length) { 
                         resolve(); 
                         return; 
                     } 
                     var fragmentFile = fragments[curFragment++]; 
                     var req = new XMLHttpRequest(); 
                     req.open("GET", fragmentFile); 
                     req.responseType = "arraybuffer"; 
                     req.addEventListener("load", function () { 
                         sourceBuffer.appendBuffer(new Uint8Array(req.response)); 
                     }); 
                     req.addEventListener("error", function () { 
                         reject(); 
                     }); 
                     req.addEventListener("abort", function () { 
                         reject(); 
                     }); 
                     req.send(null); 
                 } 
                 sourceBuffer = mediaSource.addSourceBuffer(type); 
                 sourceBuffer.addEventListener("updateend", addNextFragment); 
                 addNextFragment(); 
             }); 
         } 
         // encrypted media extension ======================================================== 
         function bail(message) { 
             return function (err) { 
                 console.error(message + (err ? " " + err : "")); 
             } 
         } 
         function ArrayBufferToString(arr) { 
             var str = ''; 
             var view = new Uint8Array(arr); 
             for (var i = 0; i < view.length; i++) { 
                 str += String.fromCharCode(view[i]); 
             } 
             return str; 
         } 
         function StringToArrayBuffer(str) { 
             var arr = new ArrayBuffer(str.length); 
             var view = new Uint8Array(arr); 
             for (var i = 0; i < str.length; i++) { 
                 view[i] = str.charCodeAt(i); 
             } 
             return arr; 
         } 
         function Base64ToHex(str) { 
             var bin = window.atob(str.replace(/-/g, "+").replace(/_/g, "/")); 
             var res = ""; 
             for (var i = 0; i < bin.length; i++) { 
                 res += ("0" + bin.charCodeAt(i).toString(16)).substr(-2); 
             } 
             return res; 
         } 
         function HexToBase64(hex) { 
             var bin = ""; 
             for (var i = 0; i < hex.length; i += 2) { 
                 bin += String.fromCharCode(parseInt(hex.substr(i, 2), 16)); 
             } 
             return window.btoa(bin).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"); 
         } 
         /* 
         *  clearkey的kid、key是写在代码里的，没有向服务器发起请求 
         */ 
         function UpdateSessionFunc(name, keys) { 
             return function (ev) { 
                 var msgStr = ArrayBufferToString(ev.message); 
                 var msg = JSON.parse(msgStr); 
                 var outKeys = []; 
                 for (var i = 0; i < msg.kids.length; i++) { 
                     var id64 = msg.kids[i]; 
                     var idHex = Base64ToHex(msg.kids[i]).toLowerCase(); 
                     var key = keys[idHex]; 
                     if (key) { 
                         outKeys.push({ 
                             "kty": "oct", 
                             "alg": "A128KW", 
                             "kid": id64, 
                             "k": HexToBase64(key) 
                         }); 
                     } else { 
                         bail(name + " couldn't find key for key id " + idHex); 
                     } 
                 } 
                 var update = JSON.stringify({ 
                     "keys": outKeys, 
                     "type": msg.type 
                 }); 
                 /* 
                 *  调用session的update方法，传入license数据(包含key),license数据格式与initdatatype相关 
                 */ 
                 ev.target.update(StringToArrayBuffer(update)).then(function () { 
                     console.log(name + " MediaKeySession update ok!"); 
                 }, bail(name + " MediaKeySession update failed")); 
             } 
         } 
         function KeysChange(event) { 
             var session = event.target; 
             console.log("keystatuseschange event on session" + session.sessionId); 
             var map = session.keyStatuses; 
             for (var entry of map.entries()) { 
                 var keyId = entry[0]; 
                 var status = entry[1]; 
                 var base64KeyId = Base64ToHex(window.btoa(ArrayBufferToString(keyId))); 
                 console.log("SessionId=" + session.sessionId + " keyId=" + base64KeyId + " status=" + status); 
             } 
         } 
         var ensurePromise; 
         function EnsureMediaKeysCreated(video, keySystem, options, encryptedEvent) { 
             // We may already have a MediaKeys object if we initialized EME for a 
             // different MSE SourceBuffer's "encrypted" event, or the initialization 
             // may still be in progress. 
             if (ensurePromise) { 
                 return ensurePromise; 
             } 
             /* 
             *  通过navigator.requestMediaKeySystemAccess 获取 mediaKeySystemAccess 
             *  通过mediaKeySystemAccess.createMediaKeys 获取 mediaKeys 
             *  设置mediaKeys和HTMLMediaElement对象绑定 
             */ 
             ensurePromise = navigator.requestMediaKeySystemAccess(keySystem, options) 
                 .then(function (keySystemAccess) { 
                     return keySystemAccess.createMediaKeys(); 
                 }, bail(name + " Failed to request key system access.")) 
             .then(function (mediaKeys) { 
                 return video.setMediaKeys(mediaKeys); 
             }, bail(name + " failed to create MediaKeys object")) 
             return ensurePromise; 
         } 
         function SetupEME(video, keySystem, name, keys, options) { 
             video.sessions = []; 
             /* 
             *   监听到 video 的 encrypted事件后，开始同底层CDM交互，并获取密钥 
             */ 
             video.addEventListener("encrypted", function (ev) { 
                 EnsureMediaKeysCreated(video, keySystem, options, ev) 
                     .then(function () { 
                         /* 
                         * 通过video.mediaKeys.createSession 获取一个MediaKeySession session对象 
                         * 调用session.generateRequest 通知底层CDM发起一条获取key的请求，传入参数来自于音视频片段文件头，其中包含kid 
                         * 监听CDM发送的 message 通知(message消息通知中返回的参数 用来js向License服务器请求key信息) 
                         * 监听CDM发送的 keystatuseschange 通知 
                         */ 
                         var session = video.mediaKeys.createSession(); 
                         video.sessions.push(session); 
                         session.addEventListener("message", UpdateSessionFunc(name, keys)); 
                         session.addEventListener("keystatuseschange", KeysChange); 
                         return session.generateRequest(ev.initDataType, ev.initData); 
                     }, bail(name + " failed to ensure MediaKeys on HTMLMediaElement")) 
                 .then(function () { 
                     console.log(name + " generated request"); 
                 }, bail(name + " Failed to generate request.")); 
             }); 
         } 
     </script> 
 </head> 
 <body> 
     <h1>Media Source Extensions + ClearKey Encrypted Media Extension Demo</h1> 
     <video id="v" controls preload="auto"></video> 
     <script> 
         function Load() { 
             const KEYSYSTEM_TYPE = "org.w3.clearkey"; //com.widevine.alpha, com.micorsoft.playready 
             var video = document.getElementById("v"); 
             var options = []; 
             const audioContentType = 'audio/mp4; codecs="mp4a.40.2"'; // AAC-LC 
             const videoContentType = 'video/mp4; codecs="avc1.64001F"'; // High profile level 3.1 
             if (typeof (MediaKeySystemAccess.prototype.getConfiguration) == "undefined") { 
                 console.log("Detected obsolete navigator.requestMediaKeySystem options style."); 
                 options = [{ 
                     initDataType: "cenc", 
                     videoType: videoContentType, 
                     audioType: audioContentType, 
                 }]; 
             } else { 
                 options = [{ 
                     /* 
                     * initDataType主要有三个值， cenc， kids, webm 
                     */ 
                     initDataTypes: ["cenc"], 
                     videoCapabilities: [{ 
                         contentType: videoContentType 
                     }], 
                     audioCapabilities: [{ 
                         contentType: audioContentType 
                     }], 
                 }]; 
             } 
             SetupEME(video, KEYSYSTEM_TYPE, "video", keys, options); 
             var ms = new MediaSource(); 
             video.src = URL.createObjectURL(ms); 
             var SourceOpen = function () { 
                 ms.removeEventListener("sourceopen", SourceOpen); 
                 Promise.all([MSELoadTrack(videoFragments, videoContentType, ms, "video"), MSELoadTrack(audioFragments, audioContentType, ms, "audio")]).then(function () { 
                     ms.endOfStream(); 
                 }); 
             } 
             ms.addEventListener("sourceopen", SourceOpen); 
             video.addEventListener("canplay", function () { 
                 video.play(); 
             }); 
         } 
         Load(); 
     </script> 
 </body> 
 </html> 

```

# server常用模块

## 目录

- [支持 router  history模式](#支持-routerhistory模式)
- [启用 gzip 压缩](#启用-gzip-压缩)
- [jwt](#jwt)
- [爬虫](#爬虫)
- [http-proxy-middleware 代理](#http-proxy-middleware代理)
- [node-forge 前端rsa](#node-forge前端rsa)

# **支持 router  history模式**

```bash 
npm install --save connect-history-api-fallback

var history = require('connect-history-api-fallback');
var express = require('express'); 
var app = express(); 
app.use(history());
```


# **启用 gzip 压缩**

```bash 
npm i compression@1.6.1 --save  

未启用Gzip前，网络加载大小为93.7kb和23.4kb。
在启用Gzip之后，两个文件分别大小为32.9kb和8.8kb。

1. var compression = require('compression');  
2. app.use(compression());  
```


# jwt

```bash 
jsonwebtoken
加密
后台生成token并存入数据库里 并返回给前端
router.post('/api/admin/signIn',(req, res)=>{
    db.User.find({ name: req.body.name,password: req.body.password},(err, docs)=>{
        if (err) {
            res.send(err);
            return
        }
        if(docs.length>0){
            let content ={name:req.body.name}; // 要生成token的主题信息
            let secretOrPrivateKey="suiyi" // 这是加密的key（密钥）
            let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 60*60*1  // 1小时过期
                });
            docs[0].token = token    //token写入数据库
            db.User(docs[0]).save(function (err) {
                if (err) {
                res.status(500).send()
                return
                }
                res.send({'status':1,'msg':'登陆成功','token':token,'user_name':req.body.name})     //反给前台
            })
        }else{
            res.send({'status':0,'msg':'登录失败'});
        }
    })
})
解密  
后台检测token
router.post('/api/admin/checkUser',(req, res)=>{
    db.User.find({ name: req.body.user_name,token: req.body.token},(err, docs)=>{
        if (err) {
            res.send(err);
            return
        }
        if(docs.length>0){
            let token = req.body.token; // 从body中获取token
            let secretOrPrivateKey="suiyi"; // 这是加密的key（密钥）
            jwt.verify(token, secretOrPrivateKey, function (err, decode) {
                if (err) {  //  时间失效的时候/ 伪造的token          
                    res.send({'status':0});            
                } else {
                    res.send({'status':1});
                }
            })
        }else{
            res.send({'status':0});            
        }
    })
})
前台每次调用checkUser来检测登录就可以了，也可以每个接口都传token，后台验证；


```


# **爬虫**

```typescript 
const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");  //解码  可以看node 的深入浅出；

function request(url, callback) {
    const options = {
        url: url,
        encoding: null
    };
    originRequest(url, options, callback);
}

for (let i = 100553; i < 100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url, function (err, res, body) {
        const html = iconv.decode(body, "gb2312");
        const $ = cheerio.load(html);  // 服务端的jquery
        console.log($(".title_all h1").text());
    });
}
```


# **http-proxy-middleware 代理**

```typescript 
7. http-proxy-middleware 代理

https://github.com/chimurai/http-proxy-middleware
```


# \*\*node-forge \*\*​**前端rsa**

**安全传输 前端rsa**

```typescript 
 rsa小知识 
      *  加密解密用的key是成对的，分别称为私钥和公钥，私钥必须存放在服务器等别人无法获取到的地方，公钥可以公开，谁都可以获取。 
      *  不能把公钥当私钥，私钥当公钥使用，因为私钥可以提取出公钥。 
      *  公钥加密的内容，只有私钥能解密，连公钥都不能解密自己加密的内容。 
      * 私钥加密的过程称为签名(sign)，因为公钥是公开的，谁都能解密，所以无法保密信息，只能用于验证签名者是私钥持有人。 
 
 
 前端代码 
 // 他们github有提供 forge.min.js ， 不用webpack的项目也可以直接引用 
 import forge from 'node-forge' 
 
 const message = '要加密我了' // 原文长度有限制，而且中文还要url编码，所以不能加密太长的字符串。一般也只用来加密密码。 
 const publicKey = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqM+l9ZWy1Frt6felFFLmfZNls\nVbU1dKpF8Rx83FtKCsztO5k/iV5N9BbfHFUg9Y40b/EK2j/BPc1xlLYAHMXn6563\nXCwZ4IuCxvfOwz9qT9gkKBxkI5b0rnikkSWTGlJEk2PdZ7Plc73Fa+bx3PvuKvMd\ncKWvd80+vt9+b/7hrwIDAQAB\n-----END PUBLIC KEY-----' 
 const publicK = forge.pki.publicKeyFromPem(publicKey) 
 const encrypted = publicK.encrypt(encodeURIComponent(message), 'RSA-OAEP') // 经过url编码，后端解密后需要url解码 
 console.log('密文：', encrypted) // 虽然乱码，但可以直接发给后端解密 
 const base64 = window.btoa(unescape(encodeURIComponent(encrypted))) 
 console.log('密文base64：', base64) // 一般会把它转为base64传给后端 
 ps. 以上代码建议使用try，因为加密中如果出现问题，会throw Error 
 
 nodejs端代码 
 const forge = require('node-forge') 
 const privateKey = '-----BEGIN PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKoz6X1lbLUWu3p9\n6UUUuZ9k2WxVtTV0qkXxHHzcW0oKzO07mT+JXk30Ft8cVSD1jjRv8QraP8E9zXGU\ntgAcxefrnrdcLBngi4LG987DP2pP2CQoHGQjlvSueKSRJZMaUkSTY91ns+VzvcVr\n5vHc++4q8x1wpa93zT6+335v/uGvAgMBAAECgYArxUnou6qnL39rUvIol9ncyfy4\nRZpicuxPLGCdI7Y+ZmSpJciVdGhSN9Gh8xFZdozpo1gj6Fi5A4HQEeR0RvIF9Rgh\nERblj1rRWqxPcsIddOO9VaknQPICWKqEW9+E1bEcyNUblCHA4LGyQwmuEFUb/Tkj\nxAghIHuEBCe0GFiVwQJBAN5i5QSoOIpdFHA0c981E4VhHc/muXwjx1HfE1pcuuFb\nTy3OwEoZdFp3LIjBnBkPRneLTNjo5WTIwrmfsy6VDF8CQQDD7c6d/nKiJwIESlr+\n/idqXAPNR/iS1YX3Nqtk9jgrgf5zULHr2nbk7MDas5S9Z9XPdUmxtnP44dhoGvDk\nzyyxAkB7XBxyQuZqSkvGGjKUhJq5iC/DXddSd35fegEARSQdUktPu7qK4Cfc7vKz\nQcLXW9PZCFqukDJ/f6YU1fPNSTy9AkADQ78hms/GK+g4shR6EzoM56OYlA5sQ+qL\nh/mrIP8mmm/m8/1C9MzuW5OLEVr1HPnPDyE/OM8N4pV8hpZk+Z7BAkEAzaFstazA\nxLzZOBWhvOzzo722glZ7HVezhMocLu7Y3EOXP/nbx09JpU3U7Egp5UVp0aiknh/Q\nez4Cc4ksMedxdA==\n-----END PRIVATE KEY-----\n' 
 const privateK = forge.pki.privateKeyFromPem(privateKey) 
 const encrypted = Buffer.from(base64, 'base64').toString() // base64 为前端传过来的密文base64 
 const decrypted = privateK.decrypt(encrypted, 'RSA-OAEP') 
 console.log('原文：', decodeURIComponent(decrypted)) // decrypted 为原文 
 
 
 生成密钥公钥对 
 const forge = require('node-forge') 
 const { rsa, publicKeyToRSAPublicKeyPem, privateKeyToPem } = forge.pki 
 rsa.generateKeyPair({ bits: 2048, workers: 2 }, function (err, keypair) { 
   if (err) { 
     return 
   } 
   // 这里就生成了字符串的公钥和密钥了，可以把生成结果保存起来 
   console.log({ 
     publicKey: publicKeyToRSAPublicKeyPem(keypair.publicKey, 72).replace(/\r/g, ''), 
     privateKey: privateKeyToPem(keypair.privateKey, 72).replace(/\r/g, '') 
   }) 
 })
```

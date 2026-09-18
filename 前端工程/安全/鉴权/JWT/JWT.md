# JWT

## 目录

- [JWT 原理](#JWT-原理)
- [问题答疑](#问题答疑)
  - [签名时使用了 secret，为什么是明文？](#签名时使用了-secret为什么是明文)
  - [数据会不会被篡改？](#数据会不会被篡改)
- [Node.js 示例演示](#Nodejs-示例演示)
- [总结](#总结)
- [案例](#案例)
  - [node](#node)
  - [html](#html)

一天 “小张” 接到一个需求 “一旦用户登陆认证成功之后，后续的请求可以携带一个令牌，无需再次身份认证”。

这时 “小张” 咨询了资深搬砖工程师 “小李”，凭借多年的搬砖经验，同事 “小李” 说到：**HTTP 协议是无状态的，在第一次登陆认证成功后，下一次请求时，服务器也不知道请求者的身份信息**。通常有两种实现方式：

- **一种传统的做法是在服务器上存储用户 session 信息，每次请求时携带 sessionID 进行验证**，这种方式缺点是会占用服务器内存，当用户越来越多会增加服务器的内存开销、由于存储在内存还会带来扩展性问题。
- **第二种方法是采用 JWT 技术，它是一种无状态的身份验证**。只做校验，将用户状态分散到了客户端，服务器端不会进行信息存储。

“小张” 听完后，连忙说到第二种听着不错哦，搜索了一些相关文章介绍之后就开始了愉快的代码编写。完成之后提交了代码给同事 “小李” 做 code review，做为资深搬砖工程师的 “小李”，一眼看出了问题：“怎么能在 JWT 生成的 token 里放用户密码呢！**JWT 默认是明文的，不能存储隐私信息”**。

“小张” 不解，反问道：怎么会是明文呢，加密之后的数据我看了的，是一堆乱码啊，下面是打印的 token 信息。

```javascript 
// jwt 签名后生成的 token
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsInBhc3N3b3JkIjoxMjM0NTYsImlhdCI6MTY2MTg2OTQxMX0.3-60HUf_cKIo44hWUviNzqdUoUGngGQfrqffg0A6uqM"
```


“小李” 通过一段 Node.js 代码展示了如何解密出 JWT 签名后的 token 数据。

![](image_7AXESukj6w.png)

```javascript 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsInBhc3N3b3JkIjoxMjM0NTYsImlhdCI6MTY2MTg2OTQxMX0.3-60HUf_cKIo44hWUviNzqdUoUGngGQfrqffg0A6uqM"
const json  = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString())
console.log(json)
```


此时的 “小张” 陷入了沉思，顿时心里产生了两个疑问🤔️：

- **签名时使用了 secret 了，生成的 token 看着就是一串乱码的字符啊，为什么是明文呢？**
- **按照上面这样解析 token 中签名的数据，数据会不会被篡改呢？**

带着这两个疑问，下一步让我们一块了解下 JWT 的原理。

## JWT 原理

JWT 全称 JSON Web Token，是一种基于 JSON 的数据对象，**通过技术手段将数据对象签名为一个可以被验证和信任的令牌（Token）在客户端和服务端之间进行安全的传输。**

JWT Token 由三部分组成：

- **header（**头信息**）**
- **payload（消息体）**
- **signature（签名）**

之间用 `.` 链接，构成如下所示：

![](image_pCw4Wy3Rtq.png)

\*\*Header 部分由 JSON 对象 \*\*​**`{ typ, alg }`** 两部分构成，使用 `base64url(header)` 算法转为字符串：

- typ：表示令牌类型，JWT 令牌统一写为 `JWT`
- alg：签名算法，默认为 `HS256`，支持的算法为 `['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none']`

**Payload 部分为消息体，用来存储需要传输的数据**，同样也是一个 JSON 对象使用`base64url(payload)` 算法转为字符串，JWT 提供了 7 个可选字段供选择，也可以自定义字段：

- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号

**Signature 是对 Header、Payload 两部分数据按照指定的算法做了一个签名，防止数据被篡改。** 需要指定一个 sceret，产生签名的公式如下：

```javascript 
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)

```


生成签名后，将 `header.payload.signature` 三部分链接在一起，形成一个令牌（token）返回给客户端。

## 问题答疑

这就是 JWT 的原理，了解之后并没有那么神秘，回答上面的几个问题。

### 签名时使用了 secret，为什么是明文？

**header、payload 部分是使用 base64 算法进行的编码，并没有被加密，自然也可以被解码**。但注意这里的 base64 算法有点不一样的地方在于，token 可能会被放在 url query 中传输，URL 里面有三个特殊字符会被替换。下面是 **JWT 中 base64url 的实现方式**：

```javascript 
// https://github1s.com/auth0/node-jws/blob/HEAD/lib/sign-stream.js#L9-L16
function base64url(string, encoding) {
  return Buffer
    .from(string, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

```


还需要注意 payload 对象放置的内容越多，base64 之后的字符串就越大，同理签名后的 token 也一样。

### 数据会不会被篡改？

数据一旦被篡改，到服务端也会认证失败的，服务端在生成签名时有一个重要的参数是 secret，**只要保证这个密钥不被泄漏，就没问题，就算篡改也是无效的。**

## Node.js 示例演示

在 Node.js 中使用

在 Node.js 中使用 JWT 需要用到 jsonwebtoken 这个库，API 很简单，主要用到两个方法：

- sign()：生成签名
- verify()：验证签名

```javascript 
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');

const secret = crypto.createHmac('sha256', 'abcdefg')
  .update('')
  .digest('hex');

const payload = {
  "username": "张三",
  "password": 123456,
  iat: 1516239022
};
const token = jwt.sign(payload, secret)
const result = jwt.verify(token, secret)


//jsonwebtoken
const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const opt = {
  secret: 'jwt_secret',
  key: 'user'
}
const user = {
  username: 'abc',
  password: '111111'
}


const token = jsonwebtoken.sign({
  data: user,
  // 设置 token 过期时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secret)


jsonwebtoken.verify(token, secret, opt)

```


## 总结

**JWT ****由服务端生成****可以****存储在客户端****，****对服务端来说是无状态的****，可扩展性好**。

上文我们也讲了 \*\*JWT 中传输数据的 payload 默认是使用 base64 算法进行的编码，看似一串乱码，\*\***实则是没有加密，因此不要将涉及到安全、用户隐私的数据存放在 payload 中，如果要存放也请先自己进行加密**。

一旦 token 泄漏，任何人都可以使用，为了减少 token 被盗用，**尽可能的使用 HTTPS 协议传输，token 的过期时间也要设置的尽可能短**。

**防止数据被篡改，服务端密钥（secret）很重要**\*\*，一定要保管好\*\*。

# 案例

1. Bearer Token包含三个组成部分：令牌头、payload、哈希 （注意前两部分令牌头；和 payload是可以用base64解出来的；别放重要信息）
2. &#x20;**签名：默认使用base64对**令牌头、\*\*payload编码，使用hs256算法对令牌头、payload和密钥进行签名生成哈希(防篡改） \*\*
3. \*\* 验证：默认使用hs256算法对hs256算法对令牌中数据签名并将结果和令牌中哈希比对\*\*​

base64 只是压缩并没有加密；没有秘钥；且可逆

## node

```javascript 
const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");

const secret = "it's a secret";
app.use(bodyParser())
app.use(static(__dirname + '/'));

router.post("/login-token", async ctx => {
  const { body } = ctx.request;
  //登录逻辑，略
  //设置session
  const userinfo = body.username;
  ctx.body = {
    message: "登录成功",
    user: userinfo,
    // 生成 token 返回给客户端
    token: jwt.sign(
      {
        data: userinfo,
        // 设置 token 过期时间，一小时后，秒为单位
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    )
  };
});

router.get(
  "/getUser-token",
  jwtAuth({   //这里是一个中间件
    secret
  }),
  async ctx => {
    // 验证通过，state.user
    console.log(ctx.state.user);
    
    //获取session
    ctx.body = {
      message: "获取数据成功",
      userinfo: ctx.state.user.data
    };
  }
)
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000)
```


## html

```html 
    
 < html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>

  <body>
    <div id="app">
      <div>
        <input v-model="username" />
        <input v-model="password" />
      </div>
      <div>
        <button v-on:click="login">Login</button>
        <button v-on:click="logout">Logout</button>
        <button v-on:click="getUser">GetUser</button>
      </div>
      <div>
        <button @click="logs=[]">Clear Log</button>
      </div>
      <!-- 日志 -->
      <ul>
        <li v-for="(log,idx) in logs" :key="idx">
          {{ log }}
        </li>
      </ul>
    </div>
    <script>
      axios.interceptors.request.use(
        config => {
          const token = window.localStorage.getItem("token");
          if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            // Bearer是JWT的认证头部信息
            config.headers.common["Authorization"] = "Bearer " + token;
          }
          return config;
        },
        err => {
          return Promise.reject(err);
        }
      );

      axios.interceptors.response.use(
        response => {
          app.logs.push(JSON.stringify(response.data));
          return response;
        },
        err => {
          app.logs.push(JSON.stringify(response.data));
          return Promise.reject(err);
        }
      );
      var app = new Vue({
        el: "#app",
        data: {
          username: "test",
          password: "test",
          logs: []
        },
        methods: {
          async login() {
            const res = await axios.post("/login-token", {
              username: this.username,
              password: this.password
            });
            localStorage.setItem("token", res.data.token);
          },
          async logout() {
            localStorage.removeItem("token");
          },
          async getUser() {
            await axios.get("/getUser-token");
          }
        }
      });
    </script>
  </body>
</html>
```

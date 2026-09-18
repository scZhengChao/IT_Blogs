# 微信公众号开发配置和本地调试

## 目录

- [一、JS域名验证](#一JS域名验证)
- [二、开发信息配置](#二开发信息配置)
- [三、服务器配置](#三服务器配置)
- [四、调试微信消息推送](#四调试微信消息推送)

这篇文章可以帮你打通微信公众号开发任督二脉。

# 一、JS域名验证

入口在公众号后台：设置与开发 - 公众号设置 - 功能设置 - JS接口安全域名

界面会提示需把一个校验文件上传到域名目录下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/395057563a8446d78bf74ff2208e512a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

实际场景中，我们可能有很多个公众号和很多个服务，所以我们可以把文件统一放到一个目录下，如：/data/wechat\_verify

我使用了宝塔，可视化界面操作，上传完成

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fda29dfd38d46ab804c8e21623a903d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

然后修改nginx配置，比如我想要通过 [helloai.wiki/MP\_verify\_x…](https://link.juejin.cn/?target=https://helloai.wiki/MP_verify_xxxxxxx.txt "helloai.wiki/MP_verify_x…") 访问这个校验文件，我就需要在原有的配置下添加这个文件的路径配置

```bash 
server {
    listen 443 ssl http2;
    server_name helloai.wiki;
    ……

    # nginx是就近原则，匹配到即执行，所以这个配置要写在txt后缀配置前面才可以
    location = /MP_verify_xxxxxxxxxxxxxx.txt {
        root /data/wechat_verify;
    }

    # 如果你把校验文件放到下面这个配置的路径，那就不用加上面的配置了
    # 至于我为什么不放在这里，因为我怕public被我更新了
    location ~* \.(txt|xml)$ {
        root /data/xxxxx/public;
    }
    ……
}

```


修改完nginx配置，重启一下才会生效

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cf43a9c64e34703a9d2d8279f13dc3f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在公众号后台，把【JS接口安全域名】、【业务域名】和【网页授权域名】都配置上

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4195b2cc5a94d628007a9eeb3f7f668~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

# 二、开发信息配置

入口在公众号后台：设置与开发 - 基本配置 - 公众号开发信息

复制appid、appsecret并妥善保存；设置IP白名单，就是我们要部署服务的那台服务器的IP

# 三、服务器配置

在实际业务开发中，我们可能需要接受微信的消息推送（如：用户关注、用户取消关注等），这就需要我们配置自己服务器、并且提供对应接口给微信。入口在公众号后台：设置与开发 - 基本配置 - 服务器配置。

这一步一定要写好接口部署后再提交配置，否则微信调我们服务出现错误，就会当作校验错误了。

为了以防万一，我们需要用测试账号在本地调试。测试账号入口：设置与开发 - 开发者工具 - 公众平台测试账号。

根据微信开放文档：我们知道验证服务器需要先给微信提供一个 Get 接口，直接上代码

第一步：写一个 Get 接口

```javascript 
// 这是midwayjs框架的代码

@Get('/verify_server')
  async verifyServer(@Query() query: any) {
    // 微信调用时会传入以下几个参数
    const signature = query.signature;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const echostr = query.echostr;
    const apiToken = this.WX_API_TOKEN; // 你将在测试账号页面填写的Token

    // 解密信息
    if (checkSignature(signature, timestamp, nonce, apiToken)) {
      // 如果签名正确，原样返回echostr参数内容
      return echostr;
    } else {
      // 如果签名错误，返回错误信息
      throw new Error('');
    }
  }

```


第二步：解密方法

```javascript 
const crypto = require('crypto');

export function checkSignature(signature: string, timestamp, nonce, token) {
  // 将token、timestamp、nonce三个参数按照字典序排序
  const arr = [token, timestamp, nonce].sort();
  // 将排序后的参数拼接起来
  const str = arr.join('');
  // 对拼接后的字符串进行sha1加密
  const sha1 = crypto.createHash('sha1');
  sha1.update(str);
  const result = sha1.digest('hex');
  return result === signature;
}

```


接口准备好了之后，就可以去填写配置了。但是，现在是在本地开发，我们得想办法让微信调用到本地的服务，这时候就需要内网穿透工具来帮助我们了。

我使用的穿透工具是localtunnel，使用方法很简单：

```javascript 
# 全局安装：
npm install –g localtunnel

# 启动服务，3000替换成你的服务的端口，
lt --port 3000

```


代理成功后就会看到代理的url，这就是我们要使用的服务器地址了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87e9dd56b01341cb8753ff5314fd7e26~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

*注1：如果输入命令没有反应，那么就是需要科学上网注2：这是一个临时url，如果发现无法使用了，重新执行启动命令，获取一个新的url就可以*

有了接口和穿透，现在配置一下 URL 和 Token，就能成功了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6bdd4fd50b44516b13ee4a5d9409278~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

这样就说明我们本地服务和微信测试账号打通了，可以开始开发业务接口了。

*注：本地打通后，把代码更新到服务器上，再按相同的步骤去配置公众号后台正式环境的信息就可以。如果公众号后台正式环境无法配置成功，问题肯定不在你的服务代码中，请排查nginx、服务器等环境。*

# 四、调试微信消息推送

上一步我们写一个 Get 接口，后台也配置了一个 URL，但是根据文档，我们可以知道，微信消息推送也是往我们配置的 URL 发送，但是是 Post 方法，所以我们只需要提供一个同名的 Post 方法来接收就可以了。

```javascript 
// utils/xml2json.ts
// 服务器和微信交互的信息要用xml格式，这可不是JSer的菜，所以我们先来写一下xml和json的转换方法

import { parseString, Builder } from 'xml2js';

export function xml2json(xml: string): any {
  let result: any;
  parseString(xml, { mergeAttrs: true }, (err, res) => {
    console.log(xml, res);
    result = res.xml;
  });
  return result;
}

export function json2xml(json: any): any {
  const builder = new Builder();
  const xml = builder.buildObject({ xml: json });
  return xml;
}

```


```javascript 
@Post('/verify_server')
  async wxMessage(@Body() body: any) {
    try {
      const json = await xml2json(body);
      const gzhId = json.ToUserName[0];
      const wxOpenId = json.FromUserName[0];
      // const time = json.CreateTime[0]; // 10位时间戳
      // const msgId = json.MsgId[0];

      const msgType = json.MsgType[0];
      let replyMessage = {};

      console.log(json, gzhId, wxOpenId, msgType);

      // 可以根据推送事件类型去做处理，下面代码只演示文字消息
      if (msgType === 'text') {
        replyMessage = {
            FromUserName: gzhId,
            ToUserName: wxOpenId,
            MsgType: 'text',
            Content: '你好，测试账号回复成功了',
            CreateTime: new Date().valueOf(),
        };
      }
      const xmlMessage = await json2xml(replyMessage);
      return xmlMessage;
    } catch (e) {
      console.log(e);
    }
}

```


拿起你的手机，关注配置页的测试账号

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/022b36cefe13410fafa87213ab17a99d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

然后给账号发一条消息，就可以收到代码里写的回复了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59b415b228bb41f3bcab2160da5a66c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

至此配置和本地调试打通，可以开始开发正式的业务逻辑了。

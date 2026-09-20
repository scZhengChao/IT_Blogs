# mock假数据

## 目录

- [免费api](#免费api)
  - [猫：](#猫)
  - [狗](#狗)
  - [名言警句](#名言警句)
  - [用户信息](#用户信息)
  - [讲个笑话](#讲个笑话)
- [faker.js](#fakerjs)
- [构建mock服务](#构建mock服务)
  - [vite](#vite)
    - [开发环境](#开发环境)
    - [生产（线上）环境使用](#生产线上环境使用)
    - [viteMockServe配置项介绍](#viteMockServe配置项介绍)

# 免费api

### 猫：

[https://api.thecatapi.com/v1/images/search?size=full](https://api.thecatapi.com/v1/images/search?size=full "https://api.thecatapi.com/v1/images/search?size=full")

每次点击 **运行** 都会获取一张喵星人照片

在浏览器中输入 [**api.thecatapi.com/v1/images/s…**](https://link.juejin.cn/?target=https://api.thecatapi.com/v1/images/search?size=full "api.thecatapi.com/v1/images/s…") 查看返回结果，包括图片 id、url、宽、高这些信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ef83bce06ac412ba0ec038e28733c76~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 狗

每次点击 **运行** 都会获取一张汪星人照片

在浏览器中输入 [**api.thedogapi.com/v1/images/s…**](https://link.juejin.cn/?target=https://api.thedogapi.com/v1/images/search?size=full "api.thedogapi.com/v1/images/s…") 查看返回结果，包括图片 id、url、宽、高这些信息

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44e4f5b9c79c4823a85f71698f9131c1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 名言警句

中文名言警句 API 也有：[**api.xygeng.cn/one**](https://link.juejin.cn/?target=https://api.xygeng.cn/one "api.xygeng.cn/one")返回：

```typescript 
{  
    "code":200,  
    "data":**{  
        "id":800,  
        "tag":"动画",  
        "name":"佚名",  
        "origin":"《罪恶王冠》",  
        "content":"温柔解救不了这个世界",  
        "created_at":"2019-01-23T07:58:03+00:00",  
        "updated_at":"2022-03-09T08:42:10+00:00"  
    },  
    "updateTime":1670569646019  
}

```


## 用户信息

示例：[**randomuser.me/api/**](https://link.juejin.cn/?target=https://randomuser.me/api/ "randomuser.me/api/")

返回：

```typescript 
{  
    "results":**[  
        **{  
            "gender":"male",  
            "name":**{  
                "title":"Mr",  
                "first":"Liam",  
                "last":"Shelton"  
            },  
            "location":**{  
                "street":**{  
                    "number":2481,  
                    "name":"The Drive"  
                },  
                "city":"Tipperary",  
                "state":"Offaly",  
                "country":"Ireland",  
                "postcode":37431,  
                "coordinates":**{  
                    "latitude":"3.2413",  
                    "longitude":"-168.0368"  
                },  
                "timezone":**{  
                    "offset":"+4:30",  
                    "description":"Kabul"  
                }  
            },  
            "email":"liam.shelton@example.com",  
            "login":**{  
                "uuid":"ada3deb4-99bf-42c4-acb8-c4653145f3e7",  
                "username":"redlion786",  
                "password":"sentnece",  
                "salt":"JKR7kVq4",  
                "md5":"efe8e8d3c78863c910625418fd6b212b",  
                "sha1":"22aabc3bccc7891ae62815164dcc5f020cc67b24",  
                "sha256":"0ef108e6a758db207f73ddc190189dac2e5a849206ad47dca7842d3d2f927c05"  
            },  
            "dob":**{  
                "date":"1962-05-03T23:20:34.105Z",  
                "age":60  
            },  
            "registered":**{  
                "date":"2010-07-10T14:38:40.859Z",  
                "age":12  
            },  
            "phone":"021-123-9294",  
            "cell":"081-143-0111",  
            "id":**{  
                "name":"PPS",  
                "value":"4570229T"  
            },  
            "picture":**{  
                "large":"<https://randomuser.me/api/portraits/men/33.jpg>",  
                "medium":"<https://randomuser.me/api/portraits/med/men/33.jpg>",  
                "thumbnail":"<https://randomuser.me/api/portraits/thumb/men/33.jpg>"  
            },  
            "nat":"IE"  
        }  
    ],  
    "info":**{  
        "seed":"eee03283804d179d",  
        "results":1,  
        "page":1,  
        "version":"1.4"  
    }  
}
```


## 讲个笑话

中文笑话 API : [**api.vvhan.com/api/joke**](https://link.juejin.cn?target=https://api.vvhan.com/api/joke "api.vvhan.com/api/joke")

返回：

> 劫匪成功劫持一辆押运车。回去后，一新来劫匪说：“老大我们数一下抢了多少钱。”那老大说：“没经验吧！这么多要数到啥时候，看看新闻不就知道了吗？”打开电视一看，傻眼了：“今日发生一起劫匪劫持高考试卷事件！”

# faker.js

非常实用的工具包，用于在浏览器及 Node.js 中生成大量假数据。&#x20;

[npm: faker Generate massive amounts of fake contextual data. Latest version: 6.6.6, last published: a month ago. Start using faker in your project by running \`npm i faker\`. There are 2490 other projects in the n https://www.npmjs.com/package/faker](https://www.npmjs.com/package/faker "npm: faker Generate massive amounts of fake contextual data. Latest version: 6.6.6, last published: a month ago. Start using faker in your project by running `npm i faker`. There are 2490 other projects in the n https://www.npmjs.com/package/faker")

```javascript 
import faker from "faker"

function generateCustomers () {
  const customers = []

  for (let id = 0; id < 50; id++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.firstName()
    const phoneNumber = faker.phone.phoneNumberFormat()
    const zipCode = faker.address.zipCode()
    const date = faker.date.recent()

    customers.push({
      id,
      firstName,
      lastName ,
      phoneNumber ,
      zipCode,
      date
    })
  }

  return { customers }
```


# 构建mock服务

[ 在vite(vue)中使用mock，vite-plugin-mock生产（线上）环境和开发环境配置\_苦夏木禾的博客-CSDN博客\_生产环境使用mock 在vite(vue)中使用mock，生产（线上）环境和开发环境配置 https://blog.csdn.net/lhkuxia/article/details/125271405](https://blog.csdn.net/lhkuxia/article/details/125271405 " 在vite(vue)中使用mock，vite-plugin-mock生产（线上）环境和开发环境配置_苦夏木禾的博客-CSDN博客_生产环境使用mock 在vite(vue)中使用mock，生产（线上）环境和开发环境配置 https://blog.csdn.net/lhkuxia/article/details/125271405")

## vite

```typescript 
npm i mockjs vite-plugin-mock

```


### 开发环境

1. 根目录新建mock文件夹，内部创建index.js，写入以下内容 &#x20;

   mock规则可参考[mockjs介绍总结](https://blog.csdn.net/lhkuxia/article/details/110521371 "mockjs介绍总结")

```typescript 
export default [
    {
        url: "/api/yujing/sisetu",
        method: "get",
        response: () => {
            return {
                code: 0,
                message: "ok",
                'data|12': [{
                    warnBl: 0,// 预警占比
                    'warnLevel|0-3': 0,// 预警等级
                    'warnNum|0-100': 0,// 预警数量
                    'warnTotal|0-100': 0,// 报警数量
                }]
            }
        }
    }
]

```


1. 修改`vite.config.js`，如下：

```typescript 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
     vue(),
     viteMockServe({// 更多配置见最下方
       supportTs: true,
       logger: false,
       mockPath: "./mock/" // 文件位置
     })
   ]
 })
// vite.config.js 

```


1. 然后就可以使用了 &#x20;

   别忘了装axios

```typescript 
import axios from 'axios'
axios.get("/api/yujing/sisetu").then((res) => {
  console.log(res);
});


```


1. 请求成功 &#x20;

![](https://img-blog.csdnimg.cn/8a916697631442a285b33da3974d59b4.png)

### 生产（线上）环境使用

如果不配置，请求都会变成404

1. 在src中新建文件`mockProdServer.js`，写入以下内容

```typescript 
//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.js文件
// 如果使用vite.mock.config.js，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import index from '../mock/index'
export function setupProdMockServer() {
  createProdMockServer([...index])
}

```


2.修改`vite.config.js`，如下：

```typescript 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
     vue(),
     viteMockServe({// 更多配置见最下方
       mockPath: "./mock/", //mock文件地址 
       localEnabled: false, // 开发打包开关 
       prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内 
       injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `, 
       logger: false, //是否在控制台显示请求日志 
       supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件 
     })
   ]
 })

```


### viteMockServe配置项介绍

```typescript 
{
    mockPath?: string;
    supportTs?: boolean;
    ignore?: RegExp | ((fileName: string) => boolean);
    watchFiles?: boolean;
    localEnabled?: boolean;
    ignoreFiles?: string[];
    configPath?: string;
    prodEnabled?: boolean;
    injectFile?: string;
    injectCode?: string;
    logger?:boolean;
}

```


mockPath

```text 
type: string
default: mock
设置模拟.ts 文件的存储文件夹
如果watchFiles：true，将监视文件夹中的文件更改。 并实时同步到请求结果
如果 configPath 具有值，则无效

```


**supportTs**

```纯文本 
type: boolean
default: true
打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。

```


ignore

```纯文本 
type: RegExp | ((fileName: string) => boolean);
default: undefined
自动读取模拟.ts 文件时，请忽略指定格式的文件

```


watchFiles

```纯文本 
type: boolean
default: true
设置是否监视mockPath对应的文件夹内文件中的更改

```


localEnabled

```纯文本 
type: boolean
default: command === 'serve'
设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能

```


prodEnabled

```纯文本 
type: boolean
default: command !== 'serve'
设置打包是否启用 mock 功能

```


injectCode

```纯文本 
type: string
default: ''
如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。
如果代码直接写在main.ts内，则不管有没有开启,最终的打包都会包含mock.js

```


injectFile

```纯文本 
type: string
default: path.resolve(process.cwd(), 'src/main.{ts,js}')
injectCode代码注入的文件,默认为项目根目录下src/main.{ts,js}


```


configPath

```纯文本 
type: string
default: vite.mock.config.ts
设置模拟读取的数据条目。 当文件存在并且位于项目根目录中时，将首先读取并使用该文件。 配置文件返回一个数组

```


logger

```纯文本 
type: boolean
default: true
是否在控制台显示请求日志

```


[mockjs](./mockjs/index.md "mockjs")

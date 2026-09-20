# publish

## 目录

- [npm version patch - git working directory not clean](#npm-version-patch---git-working-directory-not-clean)
- [用脚本发布](#用脚本发布)

 发布模块：

1. 注册账号     [npmjs.com](http://npmjs.com/ "npmjs.com")
2. 登录:
   1. \*\*npm login  \*\*
   2. \*\*npm whoami \*\*

\*\*          输入 user/password/email\*\*​

\*\*        创建包目录->npm init -y -> 创建入口index.js -> 编写，输出-> npm publish发布\*\*​

1. **发布：npm publish**
2. \*\*删除：npm unpublish  \*\*
   1. **npm unpublish的推荐替代命令：**

      **npm deprecate \<pkg>\[@\<version>] \<message>**

                例如：npm deprecate penghuwanapp '这个包我已经不再维护了哟～'

1. **跟新  使用命令：**

   &#x20; **npm version \<update\_type>.  进行修改 最后在 npm publish**

&#x20;         **update\_type 有三个参数，第一个是patch,  第二个是minor,第三个是 major，**

                      patch：这个是补丁的意思，补丁最合适；

                      minor：这个是小修小改；

                      major：这个是大改咯；

        发布操作长时间没有做，邮箱需要确认，收取激活邮件  发布的时候镜像用npm 或者 cnpm 其他的可能报错

        **403 名字重复**

\*\*        401 npm whoami  看看你是否登陆\*\*​

# npm version patch - git working directory not clean

原因：

因为 [README.md](http://README.md "README.md") 文件和 [package](https://so.csdn.net/so/search?q=package\&spm=1001.2101.3001.7020 "package").json 以及构建的文件需要在发布之前提交

&#x20;解决办法：

```typescript 
git add .
git commit -m "publish to npm"
npm version patch
```


# 用脚本发布

```纯文本 
 zc-cli 一个脚手架已经发布npm  全局安装  详细见 npm link
```


publish.sh

```typescript 
#!/usr/bin/env bash
npm config get registry # 检查仓库镜像库
npm config set registry=http://registry.npmjs.org
echo '请进行登录相关操作：'
npm login # 登陆
echo "-------publishing-------"
npm publish # 发布
npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
echo "发布完成"
exit
```


![  ](./assets/image/89a558f941a8056da5f8c93316bd4c7a_MnHX66s1ro.png "  ")

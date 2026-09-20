# this.cliEngine is not a constructor

[ TypeError: this.cliEngineCtor is not a constructor，webstorm和eslint的版本纠结-CSDN博客 文章浏览阅读4.9k次，点赞14次，收藏11次。在webstorm里使用eslint的时候，会提示 TypeError: this.cliEngineCtor is not a constructor ，这样的一个错误，知道应该是版本的错误，但具体版本怎么区别，eslint的版本和webstorm的版本如何对应，需要注意。eslint 6.x如果使用的是eslint 6.x的版本，要保证webst https://blog.csdn.net/liming1016/article/details/124544409](https://blog.csdn.net/liming1016/article/details/124544409 " TypeError: this.cliEngineCtor is not a constructor，webstorm和eslint的版本纠结-CSDN博客 文章浏览阅读4.9k次，点赞14次，收藏11次。在webstorm里使用eslint的时候，会提示 TypeError: this.cliEngineCtor is not a constructor ，这样的一个错误，知道应该是版本的错误，但具体版本怎么区别，eslint的版本和webstorm的版本如何对应，需要注意。eslint 6.x如果使用的是eslint 6.x的版本，要保证webst https://blog.csdn.net/liming1016/article/details/124544409")

在**webstorm**里使用**eslint**的时候，会提示 TypeError: this.cliEngineCtor is not a constructor ，这样的一个错误，知道应该是版本的错误，但具体版本怎么区别，[eslint](https://so.csdn.net/so/search?q=eslint\&spm=1001.2101.3001.7020 "eslint")的版本和webstorm的版本如何对应，需要注意。

![](https://img-blog.csdnimg.cn/1ac7f95e36e74b70a03ccc4ff1b5beed.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA4pGl4pGh,size_20,color_FFFFFF,t_70,g_se,x_16)

**eslint 6.x**
如果使用的是**eslint 6.x**的版本，要保证**webstorm**的版本在**2019.1.3** 或更高的版本。如果你暂时不想使用更高的工具版本，就需要将eslint降级到 **eslint 5.x**。

如果你不想降级eslint，也暂时不想升级开发工具，那么也可以使用修改webstorm的插件源码，点击右上角提示信息的Details，可以在控制台看到输出的错误信息

```typescript 
// 将你看到下面的这行代码改成下面的一行代码
this.cliEngine = require(this.basicPath + "lib/cli-engine");
// 替换成
this.cliEngine = require(this.basicPath + "lib/cli-engine").CLIEngine;
```


**eslint 8.x**
如果你是在使用 **eslint 8.x** 的时候出现的问题，那么就需要将 webstorm 升级到 **2021.2.2** 版本以上才可以，或是将eslint降级到**7.x**或**6.x**。

如果你不想升级开发工具，也不想降级 eslint ，那么也可以修改上面同样的插件源码。

```typescript 
// 可以将你看到的下面的这行代码，替换成下面的一行代码 
this.cliEngineCtor = requireInContext(eslintPackagePath + "lib/api", state.packageJsonPath).CLIEngine;
 
// 替换成这行代码
this.cliEngineCtor = requireInContext(eslintPackagePath + "lib/cli-engine").CLIEngine;
```


到此，就基本上解决了相关的错误提示问题，如果还是不行，还是升级版本或降级版本吧。

# npm-run-all&#x20;

## 目录

- [使用](#使用)
- [npm-run-all](#npm-run-all)
  - [串行执行多个命令](#串行执行多个命令)
  - [用通配符简化命令](#用通配符简化命令)
  - [多个命令并行执行](#多个命令并行执行)
  - [多命令并行时一个命令执行失败](#多命令并行时一个命令执行失败)

[ npm-run-all 使用实践-CSDN博客 文章浏览阅读1k次，点赞30次，收藏17次。参考: npm-run-all在前端开发中，你是否存在以下烦恼:如果你也有类似烦恼，相信这篇文章对你有用。使用 包提供了3个命令：, ,  。最主要的命令是 ，我们可以使用该命令创建复杂的命令计划。 和  是简写命令， 用于串行任务， 用于并行任务。创建一个文件夹，并通过  将该文件夹初始化为一个项目。在该项目下创建4个脚本文件:build-css.sh https://blog.csdn.net/wlym123/article/details/142929842](https://blog.csdn.net/wlym123/article/details/142929842 " npm-run-all 使用实践-CSDN博客 文章浏览阅读1k次，点赞30次，收藏17次。参考: npm-run-all在前端开发中，你是否存在以下烦恼:如果你也有类似烦恼，相信这篇文章对你有用。使用 包提供了3个命令：, ,  。最主要的命令是 ，我们可以使用该命令创建复杂的命令计划。 和  是简写命令， 用于串行任务， 用于并行任务。创建一个文件夹，并通过  将该文件夹初始化为一个项目。在该项目下创建4个脚本文件:build-css.sh https://blog.csdn.net/wlym123/article/details/142929842")

```markdown 
# npm 安装
$ npm install npm-run-all --save-dev
# yarn 安装
$ yarn add npm-run-all --dev
# pnpm 安装
$ pnpm add -D npm-run-all

```


### 使用

`npm-run-all` 包提供了3个命令：`npm-run-all`, `run-s`, `run-p` 。

最[主要的](https://so.csdn.net/so/search?q=主要的\&spm=1001.2101.3001.7020 "主要的")命令是 `npm-run-all`，我们可以使用该命令创建复杂的命令计划。`run-s` 和 `run-p` 是简写命令，`run-s` 用于串行任务，`run-p` 用于并行任务。

### npm-run-all

#### 串行执行多个命令

为 package.json 添加脚本命令:

```json 
{
  "scripts": {
    "clean": "./clean.sh",
    "build:css": "./build-css.sh",
    "build:html": "./build-html.sh",
    "build:js": "./build-js.sh",
    "build": "npm-run-all clean build:css build:js build:html"
  }
}

```


#### 用通配符简化命令

将 `build` 命令修改为 `npm-run-all clean build:*`，执行 `pnpm build` 结果为:

可以看到 `clean`, `build:css`, `build:html`, `build:js` 串行执行了。执行 `build:*` 时，执行顺序按命令定义的先后顺序进行。

#### 多个命令并行执行

将 `build` 命令修改为 `npm-run-all --parallel clean build:*`，执行结果为:

可以看到4个命令已经并行执行了。上面 `build` 命令在 linux 可以写成 `npm run clean & npm run build:css & npm run build:js & npm run build:html`，执行结果为:

也有并行执行的效果，不过问题在于 Windows 下的 cmd.exe 并不能识别 `&`，跨平台存在问题。

另外，因为 & 表示命令后台运行，因此并不是在 build 执行完以后才退出命令行。因为最后一条命令 npm run build:html 不是后台执行，因此命令行退出时间取决于该命令的执行时间，该命令延时1s，而执行时间最长的 npm run build:js 延时3s，因此在命令行退出时，npm run build:js 并没有执行完毕，会导致在 pnpm build 命令结束2s后才在终端输出 2024年10月14日 星期一 19时21分17秒 CST: build:js finished! 的问题。

#### 多命令并行时一个命令执行失败

并行执行时，如果某个命令执行的退出码不是0，则正在执行的命令将被杀死。例如，我们将 `build-html.sh` 修改为:

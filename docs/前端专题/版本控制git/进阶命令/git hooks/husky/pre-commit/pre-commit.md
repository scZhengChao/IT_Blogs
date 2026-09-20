# pre-commit

## 目录

- [一](#一)
  - [注意事项](#注意事项)
  - [husky、lint-staged和prettier](#huskylint-staged和prettier)
    - [.prettierrc文件](#prettierrc文件)
- [hint: The ‘.husky/pre-commit‘ hook was ignored because it‘s not set as executable.](#hint-The-huskypre-commit-hook-was-ignored-because-its-not-set-as-executable)

[ Lint | vue-element-plus-admin 一套基于vue3、element-plus、typesScript4、vite3的后台集成方案 https://element-plus-admin-doc.cn/dep/lint.html#husky](https://element-plus-admin-doc.cn/dep/lint.html#husky " Lint | vue-element-plus-admin 一套基于vue3、element-plus、typesScript4、vite3的后台集成方案 https://element-plus-admin-doc.cn/dep/lint.html#husky")

项目要使用git进行代码提交时，**使用叫pre-commit的git钩子，在调用git commit 命令时自动执行某些脚本检测代码**，若检测出错，则阻止[commit](https://so.csdn.net/so/search?q=commit\&spm=1001.2101.3001.7020 "commit")代码，也就无法push，保证了出错代码只在我们本地，不会把问题提交到远程仓库

# 一

- pre-commit是客户端hooks之一，也是接下来要介绍的钩子。**pre-commit在git add提交之后，然后执行git commit时执行，脚本执行没报错就继续提交，反之就驳回提交的操作**。
- 这个钩子中可以实现：对将要提交的**代码进行检查、优化代码格式、或者对提交的图片进行压缩等等任务**。下面是用shell编写的具体代码：

```typescript 
STAGE_FILES=$(git diff --cached --name-only --diff-filter=ACM -- '*.vue' '*.js')
if test ${#STAGE_FILES} -gt 0
then
    echo '开始eslint检查'

    which eslint &> /dev/null
    if [[ "$?" == 1 ]]; then
        echo '没安装eslint'
        exit 1
    fi

    PASS=true

    for FILE in $STAGE_FILES
    do
        eslint $FILE
        if [[ "$?" == 1 ]]; then
      PASS=false
    fi
  done

  if ! $PASS; then
      echo "eslint检查没通过！"
      exit 1
  else
      echo "eslint检查完毕"
  fi

else
    echo '没有js文件需要检查'
fi

exit 0
```


- 稍微解释下：首先用`git diff`获取到提交到暂存区的文件，我这里添加了过滤即只获取.vue和.js文件。
- 然后判断eslint是否已安装，接着再对获取到的文件依次检查，当某个文件检查不通过时不会中断进程，会继续遍历所有文件，这样最后在控制台可以显示出所有检查不通过的文件信息
- exit即表示退出当前脚本进程、后面接上状态码，0表示正常，会继续执行`git commit`的操作，其他情况表示出错，不会继续commit。
- 将上面的代码保存为`pre-commit`，然后存放在.git/hooks中，然后每次执行`git commit`时就会使用eslint进行代码检查了。 &#x20;

  ![](//upload-images.jianshu.io/upload_images/6383319-872bc0e9b59bcc3a.png?imageMogr2/auto-orient/strip|imageView2/2/w/587/format/webp)

#### 注意事项

- 另外除了`eslint`，还可以使用其他更多的工具来检查代码，比如prettier来格式化代码，一些类名检查器来检查css代码等等，上述这些都可以写在pre-commit钩子里面。
- `eslint`最好全局安装，必须要保证执行hooks的git目录下能够直接执行。
- `.git`里面的文件，无法提交到git项目上去，所以最好在git目录最外层新建一个同名的`hooks`文件夹，把写好的脚步放里面。新clone该项目时，在根目录执行一下`cp hooks/* .git/hooks/`把脚本文件复制到.git里去。
- 有时候也会遇到脚本文件没有执行权限的情况，这时hooks就无法生效，需要用到`chomd`指令给脚本文件加上执行权限。

## husky、lint-staged和prettier

安装
【1】安装husky

```typescript 
npm i husky -save-dev

```


【2】安装list-staged

```typescript 
npm i lint-staged husky -save-dev

```


配置package.json
将下面的代码追加到 package.json文件中：

```typescript 
  {
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,vue}": [
      "prettier --write",
      "vue-cli-service lint",
      "git add"
    ]
  }
}

```


> 上面示例中`lint-staged`下的选项是vue项目中常用的配置，你可以根据你项目的技术栈配置相应的代码检查。
>
> \*   `prettier --write`会自动美化你的代码格式
> \*   `vue-cli-service lint`是vue项目中语法检查
> \*   `git add`将更改后到文件添加到暂存区

### .prettierrc文件

新建一个`.prettierrc`文件，将以下内容复制进去：

```typescript 
{
  "trailingComma": "es5", // 尾随逗号
  "tabWidth": 4, // 缩进
  "semi": true, // 句尾分号
  "singleQuote": true, // 单引号
  "end-of-line": "lf" // 换行符
}

```


这样，当在终端输入 `git commit`命令提交代码的时候，Lint 程序便会自动检查本次提交所修改的文件是否符合本项目的代码规范。如果代码不符合规范，便会拒绝提交代码。

如果想要跳过 Lint 程序，可以使用 `git commit -no-verify` 进行提交。

[ 使用 Husky + Commitlint + Lint-staged 约束每一次 Git 提交 - Wise.Wrong - 博客园 每一名开发人员都有自己独特的代码风格。但对于多人协作项目，保持统一的风格有利于项目维护。 我们可以在项目中引入 ESLint、Prettier 来规范代码，但这无法约束 Git commit mess https://www.cnblogs.com/wisewrong/p/16070968.html](https://www.cnblogs.com/wisewrong/p/16070968.html " 使用 Husky + Commitlint + Lint-staged 约束每一次 Git 提交 - Wise.Wrong - 博客园 每一名开发人员都有自己独特的代码风格。但对于多人协作项目，保持统一的风格有利于项目维护。 我们可以在项目中引入 ESLint、Prettier 来规范代码，但这无法约束 Git commit mess https://www.cnblogs.com/wisewrong/p/16070968.html")

# hint: The ‘.husky/pre-commit‘ hook was ignored because it‘s not set as executable.

[ hint: The ‘.husky/pre-commit‘ hook was ignored because it‘s not set as executable.\_前端kk的博客-CSDN博客 husky 的 hook 在 mac 上不生效的问题:设置成 executable:这个文件默认是不可执行的，执行以下操作即可控制台运行：  再提交就可以了 https://blog.csdn.net/qq\_40963664/article/details/125188321](https://blog.csdn.net/qq_40963664/article/details/125188321 " hint: The ‘.husky/pre-commit‘ hook was ignored because it‘s not set as executable._前端kk的博客-CSDN博客 husky 的 hook 在 mac 上不生效的问题:设置成 executable:这个文件默认是不可执行的，执行以下操作即可控制台运行：  再提交就可以了 https://blog.csdn.net/qq_40963664/article/details/125188321")

```typescript 
chmod 777 .husky/*
```

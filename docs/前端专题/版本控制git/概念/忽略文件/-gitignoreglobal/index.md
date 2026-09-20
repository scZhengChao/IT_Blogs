# .gitignoreglobal

## 目录

- [.gitignoreglobal全局忽略文件](#gitignoreglobal全局忽略文件)

## .gitignoreglobal全局忽略文件

1. 另外 git 提供了一个全局的 .gitignore，你可以在你\*\*的用户目录下创建 \*\*`~/.gitignoreglobal` 文件，以同样的规则来划定哪些文件是不需要版本控制的。
   1. 需要执行 **git config --global core.excludesfile \~/.gitignoreglobal来使得它生效。**
2. 其他的一些过滤条件

- ?:   代表任意的一个字符
- \*： 代表任意数目的字符
- {!ab}：    必须不是此类型
- {ab,bb,cx}：    代表ab,bb,cx中任一类型即可
- &#x20;\[abc]：    代表a,b,c中任一字符即可
- \[ ^abc]：    代表必须不是a,b,c中任一字符

1. 注意事项：   &#x20;
   1. 还有一种情况，就是已经commit了，再加入gitignore是无效的，所以**需要删除下缓存**
   ```typescript 
     git rm -r --cached ignore_file
   ```

2. .gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。

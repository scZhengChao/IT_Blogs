# shell脚本

## 目录

- [执行shell脚本三种方法的区别：（sh、exec、source）](#执行shell脚本三种方法的区别shexecsource)
  - [sh 方式  ](#sh-方式-)
  - [source方式  ](#source方式-)
  - [exec方式 ](#exec方式-)

# 执行shell脚本三种方法的区别：（sh、exec、source）

一、概念对比 &#x20;

## sh 方式 &#x20;

          使用\$ sh script.sh执行脚本时，当前shell是父进程，生成一个子shell进程，在子shell中执行脚本。脚本执行完毕，退出子shell，回到当前shell。

./script.sh与 sh script.sh等效。

## source方式 &#x20;

       使用\$ source script.sh方式，在当前上下文中执行脚本，不会生成新的进程。脚本执行完毕，回到当前shell。  source方式也叫点命令。

. script.sh与 source script.sh等效。

## exec方式&#x20;

       使用exec command方式，会用command进程替换当前shell进程，并且保持PID不变。执行完毕，直接退出，不回到之前的shell环境。

[常用脚本](常用脚本.md "常用脚本")

[判断类](判断类.md "判断类")

[逻辑类](逻辑类.md "逻辑类")

[循环类](循环类.md "循环类")

[数据交互](数据交互.md "数据交互")

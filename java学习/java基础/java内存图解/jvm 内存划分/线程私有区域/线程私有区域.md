# 线程私有区域

## 目录

- [(1) 虚拟机栈 (JVM Stack)](#1-虚拟机栈-JVM-Stack)
- [(2) 本地方法栈 (Native Method Stack)](#2-本地方法栈-Native-Method-Stack)
- [(3) 程序计数器 (PC Register)](#3-程序计数器-PC-Register)

| 区域                          | 功能说明                          | 异常类型                      |
| --------------------------- | ----------------------------- | ------------------------- |
| 程序计数器（PC Register）          | 记录线程执行位置（Native方法时为undefined） | 无                         |
| 虚拟机栈（JVM Stacks）            | 存储栈帧（局部变量表/操作数栈等）             | StackOverflow/OutOfMemory |
| 本地方法栈（Native Method Stacks） | 服务于Native方法                   | 同虚拟机栈                     |

#### (1) 虚拟机栈 (JVM Stack)

- **存储内容**：
  - 栈帧(局部变量表/操作数栈/动态链接/方法出口)
  - 每个方法对应一个栈帧
- **特点**：
  - **后进先出(LIFO)结构**
  - 可能出现`StackOverflowError`/`OutOfMemoryError`

#### (2) 本地方法栈 (Native Method Stack)

- **功能**：**为Native方法服务**
- **特点**：
  - 类似虚拟机栈
  - 由JVM实现决定是否合并到虚拟机栈

#### (3) 程序计数器 (PC Register)

- **功能**：
  - 记录当前线程执行的位置
  - `Native`方法时值为`undefined`
- **特点**：
  - 唯一不会`OOM`的区域
  - 线程私有

[栈](IT/服务端/java学习/java基础/java内存图解/jvm%20内存划分/线程私有区域/栈/栈.md "栈")

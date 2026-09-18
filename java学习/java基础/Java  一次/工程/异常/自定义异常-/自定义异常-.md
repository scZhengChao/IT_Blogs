自定义异常

## 目录

- [1 自定义异常概述  ](#1-自定义异常概述)
- [2 实现步骤：  ](#2-实现步骤)

1 自定义异常概述

当`JDK`中的异常类型，不满足实际的业务需要时。就可以自己定义异常。例如，学生的年龄数据，如果是负数或者数据  超过了150认为是不合法的，就需要抛出异常。JDK中就没有表示年龄的异常，就需要自己定义异常了。

\*\*自定义异常存在的意义：就是为了让控制台的报错信息****更加的见名之意。****\*\*

2 实现步骤：

1. 定义异常类
2. 写继承关系
3. 空参构造
4. 带参构造

```java 
public class AgeOutOfBoundsException extends RuntimeException{      
  public AgeOutOfBoundsException() {    
  
  }    
  public AgeOutOfBoundsException(String message) {   
           super(message);    
  }
}

```


> 注意 :&#x20;
> &#x20;如果要自**定义编译时异常，就继承Exception。
> \*\* 如果要**自定义运行时异常，就继承RuntimeException \*\*

# Junit单元测试

## 目录

- [3.1 Junit4单元测试概述](#31-Junit4单元测试概述)
- [3.2 Junit的基本使用](#32-Junit的基本使用)
  - [生成Junit测试框架](#生成Junit测试框架)
  - [限时测试](#限时测试)
  - [测试方法：](#测试方法)
- [3.3 断言](#33-断言)
  - [ 概述](#-概述)
  - [使用](#使用)
  - [小结 : 如何进行断言](#小结--如何进行断言)

### 3.1 Junit4单元测试概述

- 单元测试就是编写测试代码，可以准确、快速地保证程序的**正确性**，Junit是Java单元测试的框架。
- JUnit4可以**通过注解的方式来标记方法** , 让方法存某种意义 ，常见的注解有：
  - @BeforeClass 全局只会执行一次，而且是第一个运行（标记的方法需要是一个**静态无参无返回值**方法）
  - @Before 在测试方法运行之前运行（**非静态无参无返回值**方法）
  - **@Test 测试方法（此方法必须是非静态无参无返回值方法）, 主要用于测试的方法**
  - @After 在测试方法运行之后运行（**非静态无参无返回值**方法）
  - @AfterClass 全局只会执行一次，而且是最后一个运行（标记的方法需要是一个**静态无参无返回值**方法）
  - @Ignore 忽略此方法

### 3.2 Junit的基本使用

- 已知存在需要测试的类Calculator ，这是一个能够简单实现加减乘除、平方、开方的计算器类，然后对这些功能进行单元测试。

```java 
// 计算器类
public class Calculator {
    // 静态变量，用于存储运行结果
    private static int result; // 20

    // 加法运算
    public void add(int n) {
        result = result + n;
    }

    // 减法运算
    public void subtract(int n) {
        // Bug: 正确的应该是 result = result - n
        result = result - 1;  
    }

    // 乘法运算
    public void multiply(int n) {
        // 此方法尚未写好
    }         

    // 除法运算
    public void divide(int n) {
        result = result / n;
    }

    // 平方运算
    public void square(int n) {
        result = n * n;
    }

    // 平方根运算
    public void squareRoot(int n) {
        // Bug : 死循环
        for (; ;) ;            
    }

    // 将结果清零
    public void clear() {     
        result = 0;
    }

    // 返回运算结果
    public int getResult(){
        return result;
    }
}

```


**引入Junit4的jar包到模块中**

- 第一步 : 在模块中新建文件夹lib，拷贝今天资料中junit4的jar包到模块中 &#x20;
- 第二步 : 选中jar文件 , 右键选择 Add as Library

##### 生成Junit测试框架

- 使用IDEA能够直接给需要测试的类生成测试框架，如下：
- 选中本类任何位置右键选择 Generate（Alt+Insert）/ go to 选项 , 选择Test...
- 选择需要进行测试的方法
- 在上一步OK后系统会自动生成一个新类CalculatorTest，里面包含一些空的测试用例。

  你只需要将这些测试用例稍作修改即可使用，完整的CalculatorTest代码如下：

##### 限时测试

对于那些逻辑很复杂，循环嵌套比较深的程序，很有可能出现死循环，因此一定要采取一些预防措施。限时测试是一个很好的解决方案。我们给这些测试函数设定一个执行时间，超过了这个时间，他们就会被系统强行终止，并且系统还会向你汇报该函数结束的原因是因为超时，这样你就可以发现这些Bug了。要实现这一功能，只需要给@Test标注加一个参数即可，代码如下：

被测方法：

```java 
public void squareRoot(int n) {
    //Bug : 死循环
    for (; ; ) ;            
}

```


##### 测试方法：

```java 
@Test(timeout = 1000)
// Timeout参数表明了你要设定的时间，单位为毫秒，因此1000就代表1秒。
public void squareRoot() {
    calculator.squareRoot(4);
    assertEquals(2 , calculator.getResult());
}

```


### 3.3 断言

##### &#x20;概述

预先判断某个条件一定成立，如果条件不成立，则直接报错。

##### 使用

```java 
//第一个参数表示期望值
//第二个参数表示实际值
// 如果实际值和期望值相同，说明结果正确就测试通过,如果不相同，说明结果是错误的,就会报错
Assert.assertEquals( 期望值, 实际值);
Assert.assertEquals("异常原因"， 期望值, 实际值);

//例如：
int result = add(100,200);
Assert.assertEquals(300, result);

```


##### 小结 : 如何进行断言

```java 
Assert.assertEquals(期望值,实际值)
```

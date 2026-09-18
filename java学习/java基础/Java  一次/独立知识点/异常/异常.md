# 异常

## 目录

- [什么是异常](#什么是异常)
- [解决了什么问题](#解决了什么问题)
- [怎么使用](#怎么使用)
  - [声明](#声明)
  - [捕获](#捕获)
- [自定义异常](#自定义异常)

# 什么是异常

> 程序再**运行过程中发生了一些不反常**的情况 ；造成程序的中断

# 解决了什么问题

> 在程序发生异常后；确保程序不能中断；执行后续的代码

# 怎么使用

## 声明

```java title="编译时异常"
public void method() throws 异常类 {
   
}  
```


## 捕获

```java 
try{


}catch(Exception e){

}

//  最后一个必须是异常父类 

try{

}catch(异常子类){

}catch(异常子类){

 }catch(异常父类){  

}
```


# 自定义异常

```markdown 
public class 自定义异常类 extends RuntimeException {
   public  自定义异常类(){
   
   }
   public 自定义异常类(String message){
       super(message); 
   }
}

if(参数 == null){
   throw new 自定义异常类("异常消息")
}



```

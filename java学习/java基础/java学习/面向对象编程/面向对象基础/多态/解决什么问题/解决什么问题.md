# 解决什么问题

- **复用性**
- **扩展性**

1. 创建对象

```java 
Father f = new Son()
```


2.作为参数

```java 
public void method(Father f){
  f.method()
}
```


1. 作为返回值

```text 
pilbic Animal getInstance(){
  return new Cat()
}


```


```c# 
父类型 对象 = new 子类（） 
大类型包含小类型；int a = 10; long b = a;
```


**注意；接口被实现的时候；就是相当于子类的父类型**;父接口；

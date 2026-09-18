# 【设计模式27】访问者模式+源码分析：Eclipse JDT AST中浏览者模式

## 目录

- [1. 简介](#1-简介)
  - [1.1 定义](#11-定义)
  - [1.2 结构模式](#12-结构模式)
  - [1.3 模式分析](#13-模式分析)
- [2. 访问者模式实例](#2-访问者模式实例)

## 1. 简介

### 1.1 定义

访问者模式(Visitor Pattern)定义：表示一个作用于某对象结构中的各元素的操作，它 使我们可以在不改变各元素的类的前提下定义作用于这些元素的新操作。访问者模式是一 种对象行为型模式。

### 1.2 结构模式

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e25c2449b5e4301acef2764f9640466~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 1.3 模式分析

想象一个使用场景，有一张药单，里面包含药品、数量、价格等不同类型的集合。对于护士而言看到药品和数量信息就是去取并进行相关医疗工作，而对于缴费工作人员看到药品、数量、价格就是去核对。 这是一个

- 背景：多种类型的物品继承同一个公共祖先，并且在一个集合中。
- 需求：有多种类型的visitor会根据不同的实际类型，需要作出不同决策。

## 2. 访问者模式实例

顾客在超市中将选择的商品，如苹果、图书等放在购物车中,然后到收银员处付款。在购物过程中，顾客需要对这些商品进行访问，以便确认这些商品的质量，之后收银员计算价格时也需要访问购物车内顾客所选择的商品。此时，购物车作为一个 ObjeetStructure(对象结构)用于存储各种类型的商品，而顾客和收银员作为访问这些商品的访问者，他们需要对商品进行检查和计价。不同类型的商品其访问形式也可能不同，如苹果需要过秤之后再计价，而图书不需要。使用访问者模式来设计该购物过程。&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c40b70c3ead34d10bded20d39a64b804~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```typescript 
public abstract class Visitor
{
  protected String name;

  public void setName(String name){
      this. name = name;
    }

  public abstract void visit(Apple apple);

  public abstract void visit(Book book);
}

```


```typescript 
public class Customer extends Visitor {
  public void visit(Apple apple) {
    System. out. println("顾客"+ name + "选苹果。"）；    
    }
                             
  public void visit(Book book) {
      System. out. println("顾客"+ name + "买书。”）；
    }
}


```


```typescript 
public class Saler extends Visitor {
  public void visit(Apple apple) {
    System. out. println("收银员"+ name+"给苹果过秤，然后计算其价格。");      
    }
    
    public void visit(Apple apple) {
    System. out. print 1n("收银员"+ name +"直接计算书的价格。”）；    
    }

}


```


```typescript 
public interface Product {
  void accept(Visitor visitor)；
}

```


```typescript 
public class Apple implements Product {
  public void accept (Visitor visitor) {
      visitor. visit(this)；
    }
}

```


```typescript 
public class Book implements Product {
  public void accept (Visitor visitor) {
      visitor. visit(this);
    }
}

```


```typescript 
import java. util.*

public class BuyBasket {
  private ArrayList list = new ArrayList();

    public void accept(Visitor visitor) {
        Iterator i= list. iterator()；

        while(i.hasNext()) {
            ((Product)i.next()).accept(visitor);
        } 

    }
    
    public void addProduct (Product product) {
      1ist.add(product)；
    }
    
    public void removeProduct (Product product) {
      list.remove(product);
    }

}

```


```typescript 
public class Client {
  public static void main(String a[]) {
      Product b1 = new Book();
        Product b2 = new Book();
        
        Producr a1 = new Apple();
        
        BuyBasket basket = new BuyBasket();
    basket.addProduct(b1)；
    basket.addProduct(b2);
    basket.addProduct(a1);
        
        Visitor customer = new Customer();
        basket.accept(visitor);
        
    }
}

```

# 工厂设计模式

## 目录

- [6.1 概述](#61-概述)
- [6.2 作用](#62-作用)
- [6.3案例实践](#63案例实践)
- [知识小结](#知识小结)
- [配置文件](#配置文件)

#### 6.1 概述

- 工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。之前我们创建类对象时, 都是使用 new 对象的形式创建, 除new 对象方式以外, 工厂模式也可以创建对象.

#### 6.2 作用

- 解**决类与类之间的耦合问题**

#### 6.3案例实践

- 需求：定义**汽车工厂类，生产各种品牌的车**
- 实现步骤
  - 编写一个Car接口, 提供run方法
  - 编写一个Falali类实现Car接口,重写run方法
  - 编写一个Benchi类实现Car接口,重写run方法
  - 提供一个CarFactory(汽车工厂),用于生产汽车对象
  - 定义CarFactoryTest测试汽车工厂

**实现代码**

```java 
package com.itheima.factorydesign_demo;

/*
  - 需求：定义汽车工厂类，生产各种品牌的车

  - 实现步骤
      - 编写一个Car接口, 提供run方法
      - 编写一个Falali类实现Car接口,重写run方法
      - 编写一个Benchi类实现Car接口
      =============================================
      - 提供一个CarFactory(汽车工厂),用于生产汽车对象
      - 定义CarFactoryTest测试汽车工厂
 */
public class CarTest {
    public static void main(String[] args) {
        Car benchi = CarFactory.getInstance(Brand.BENCHI);
        System.out.println(benchi);
    }
}

// 汽车接口
interface Car {
    public abstract void run();
}

// 编写一个Falali类实现Car接口,重写run方法
class Falali implements Car {
    public Falali() {
    }

    @Override
    public void run() {
        System.out.println("法拉利破百需要3秒...");
    }
}

// 编写一个Benchi类实现Car接口
class Benchi implements Car {
    @Override
    public void run() {
        System.out.println("奔驰破百需要5秒...");
    }
}

// 汽车品牌枚举
enum Brand {
    BENCHI, FALALI, BAOMA, BINLI, AODI;
}

// 提供一个CarFactory(汽车工厂),用于生产汽车对象
class CarFactory {
    private CarFactory() {
    }

    public static Car getInstance(Brand brand) {
        switch (brand) {
            case FALALI:
                return new Falali();
            case BENCHI:
                return new Benchi();
            default:
                return null;
        }
    }
}

//// 提供一个CarFactory(汽车工厂),用于生产汽车对象
//class CarFactory{
//    private CarFactory(){}
//
//    public static Car getInstance(String brand) {
//        if(brand.equals("Falali")){
//            return new Falali(10);
//        }else if(brand.equals("Benchi")) {
//            return new Benchi();
//        }else {
//            return null;
//        }
//    }
//}

```


#### 知识小结

- 工厂模式的存在可以改变创建对象的方式,**降低类与类之间的耦合问题.**

# 配置文件

![](./image/image_AejVzEphqZ.png)

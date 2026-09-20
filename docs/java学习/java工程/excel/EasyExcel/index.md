# EasyExcel

## 目录

- [1、EasyExcel介绍](#1EasyExcel介绍)
  - [1.1 官网介绍](#11-官网介绍)
  - [1.2 Excel相关结构说明](#12-Excel相关结构说明)
- [2、EasyExcel导出数据快速入门](#2EasyExcel导出数据快速入门)
  - [2.1 构建测试实体类](#21-构建测试实体类)
  - [2.2 数据导出到excel](#22-数据导出到excel)
  - [2.3 自定义表头](#23-自定义表头)
- [3、EasyExcel导出数据高级设置](#3EasyExcel导出数据高级设置)
  - [3.1 自定义日期格式](#31-自定义日期格式)
  - [3.2 合并表头](#32-合并表头)
  - [3.3 忽略指定表头信息](#33-忽略指定表头信息)
  - [3.4 设置单元格大小](#34-设置单元格大小)
- [4、EasyExcel导入数据](#4EasyExcel导入数据)

[ 读Excel | Easy Excel 官网 快速使用easyexcel的来完成excel的读取 https://easyexcel.opensource.alibaba.com/docs/current/quickstart/read](https://easyexcel.opensource.alibaba.com/docs/current/quickstart/read " 读Excel | Easy Excel 官网 快速使用easyexcel的来完成excel的读取 https://easyexcel.opensource.alibaba.com/docs/current/quickstart/read")

## 1、EasyExcel介绍

### 1.1 官网介绍

传统操作Excel大多都是利用Apach POI进行操作的，但是POI框架并不完善，使用过程非常繁琐且有较多的缺陷：

- 动态操作Excel非常繁琐,对于新手来说，很难在短时间内上手;
- 读写时需要占用较大的内存，当数据量大时容易发生内存溢出问题（OOM）;

基于上述原因，阿里开源出一款易于上手，且比较节省内存的Excel框架：EasyExcel

> **注意：easyExcel底层也是使用POI实现的；**

官网地址：[https://www.yuque.com/easyexcel/doc/easyexcel](https://www.yuque.com/easyexcel/doc/easyexcel "https://www.yuque.com/easyexcel/doc/easyexcel")

![](./assets/image/image_2OoV8ss1mw.png)

依赖资源：

```xml 
<!--引入easyexcel-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.0.4</version>
</dependency>
```


> **注意：目前版本与JDK8较为契合，高版本的JDK可能会出现兼容性问题;**

### 1.2 Excel相关结构说明

![](./assets/image/image_m_DLbLA1Al.png)

## 2、EasyExcel导出数据快速入门

### 2.1 构建测试实体类

```java 
package com.itheima.stock.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author by itheima
 * @Date 2021/12/19
 * @Description
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {
    private String userName;
    private Integer age;
    private String address;
    private Date birthday;
}
```


### 2.2 数据导出到excel

```java 
package com.itheima.stock;

import com.alibaba.excel.EasyExcel;
import com.itheima.stock.pojo.User;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author by itheima
 * @Date 2021/12/31
 * @Description
 */
public class TestEasyExcel {

    public List<User> init(){
        //组装数据
        ArrayList<User> users = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            User user = new User();
            user.setAddress("上海"+i);
            user.setUserName("张三"+i);
            user.setBirthday(new Date());
            user.setAge(10+i);
            users.add(user);
        }
        return users;
    }
    /**
     * 直接导出后，表头名称默认是实体类中的属性名称
     */
    @Test
    public void test02(){
        List<User> users = init();
        //不做任何注解处理时，表头名称与实体类属性名称一致
        EasyExcel.write("C:\\Users\\46035\\Desktop\\ex\\用户.xls",User.class).sheet("用户信息").doWrite(users);
    }
}
```


![](./assets/image/image_V_vkAddcDs.png)

### 2.3 自定义表头

修改User实体类,设置表头数据和排序规则：

```java 
package com.itheima.stock.pojo;

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Date;

/**
 * @author by itheima
 * @Date 2021/12/19
 * @Description
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
/**
  * 通过注解自定义表头名称 注解添加排序规则，值越大 越靠近右边
*/
public class User implements Serializable {
    @ExcelProperty(value = {"用户名"},index = 1)
    private String userName;
    @ExcelProperty(value = {"年龄"},index = 2)
    private Integer age;
    @ExcelProperty(value = {"地址"} ,index = 4)
    private String address;
    @ExcelProperty(value = {"生日"},index = 3)
    private Date birthday;
}
```


![](./assets/image/image_n-K5AIsw-N.png)

## 3、EasyExcel导出数据高级设置

### 3.1 自定义日期格式

```java 
package com.itheima.stock.pojo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.format.DateTimeFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author by itheima
 * @Date 2021/12/19
 * @Description
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {
    @ExcelProperty(value = {"用户名"},index = 1)
    private String userName;
    @ExcelProperty(value = {"年龄"},index = 2)
    private Integer age;
    @ExcelProperty(value = {"地址"} ,index = 4)
    private String address;
    @ExcelProperty(value = {"生日"},index = 3)
    //注意：日期格式注解由alibaba.excel提供
    @DateTimeFormat("yyyy/MM/dd HH:mm")
    private Date birthday;
}
```


![](./assets/image/image_Iyp0TjhXIz.png)

### 3.2 合并表头

添加合并表头信息：

```java 
package com.itheima.stock.pojo;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.format.DateTimeFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author by itheima
 * @Date 2021/12/19
 * @Description
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {
    @ExcelProperty(value = {"用户基本信息","用户名"},index = 1)
    private String userName;
    @ExcelProperty(value = {"用户基本信息","年龄"},index = 2)
    private Integer age;
    @ExcelProperty(value = {"用户基本信息","地址"} ,index = 4)
    private String address;
    @ExcelProperty(value = {"用户基本信息","生日"},index = 3)
    //注意：日期格式注解由alibaba.excel提供
    @DateTimeFormat("yyyy/MM/dd HH:mm")
    private Date birthday;
}
```


效果：

![](./assets/image/image_x1wmHyxDYl.png)

### 3.3 忽略指定表头信息

```java 
/**
 * @author by itheima
 * @Date 2021/12/19
 * @Description
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {
    @ExcelProperty(value = {"用户基本信息","用户名"},index = 1)
    @ExcelIgnore
    private String userName;
    @ExcelProperty(value = {"用户基本信息","年龄"},index = 2)
    private Integer age;
    @ExcelProperty(value = {"用户基本信息","地址"} ,index = 4)
    private String address;
    @ExcelProperty(value = {"用户基本信息","生日"},index = 3)
    //注意：日期格式注解由alibaba.excel提供
    @DateTimeFormat("yyyy/MM/dd HH:mm")
    private Date birthday;
}
```


效果：

![](./assets/image/image_ksjYaB3Ksv.png)

### 3.4 设置单元格大小

```java 
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@HeadRowHeight(value = 35) // 表头行高
@ContentRowHeight(value = 25) // 内容行高
@ColumnWidth(value = 50) // 列宽
public class User implements Serializable {
    @ExcelProperty(value = {"用户基本信息","用户名"},index = 1)
    @ExcelIgnore
    private String userName;
    @ExcelProperty(value = {"用户基本信息","年龄"},index = 2)
    private Integer age;
    @ExcelProperty(value = {"用户基本信息","地址"} ,index = 4)
    private String address;
    @ExcelProperty(value = {"用户基本信息","生日"},index = 3)
    //注意：日期格式注解由alibaba.excel提供
    @DateTimeFormat("yyyy/MM/dd HH:mm")
    private Date birthday;
}
```


效果：

![](./assets/image/image_t_HtR3O-2P.png)

## 4、EasyExcel导入数据

```java 
    /**
     * excel数据格式必须与实体类定义一致，否则数据读取不到
     */
    @Test
    public void readExcel(){
        ArrayList<User> users = new ArrayList<>();
        //读取数据
        EasyExcel.read("C:\\Users\\46035\\Desktop\\ex\\用户.xls", User.class, new AnalysisEventListener<User>() {
            @Override
            public void invoke(User o, AnalysisContext analysisContext) {
                System.out.println(o);
                users.add(o);
            }
            @Override
            public void doAfterAllAnalysed(AnalysisContext analysisContext) {
                System.out.println("完成。。。。");
            }
        }).sheet().doRead();
        System.out.println(users);
    }
```

# ArrayList

## 目录

- [新增](#新增)
- [设置](#设置)
- [获取](#获取)
- [移除](#移除)
- [包含](#包含)
- [集合转换为数组](#集合转换为数组)

* **查询块；增删慢**
* 实现了List

# 新增

```typescript 
bookList.add("b");
bookList.add(1,"c");  // 返回 boolean 是否新增成功



```


# 设置

```javascript 
bookList.set(2,"222"); // 替换；返回替换的值；
bookList.set(bookList.size()-1,"替换最后一个数据");


```


# 获取

```javascript 
bookList.get(1); // 获取；返回获取的值；

```


# 移除

```java 
boolean gg = bookList.remove("22"); // 移除；返回 boolean；是否移除成功
String item = bookList.remove(0); // 移除；返回 移除的item；
int num = bookList.size(); // 计数
bookList.remove(bookList.size()-1);
```


# 包含

```java 
Collection coll = new ArrayList();
        coll.add("jav");
        coll.add("assfs");
        
        if(coll.contains("jav")){
            coll.remove("jav")
        }
```


# 集合转换为数组

```java 
Object[] arr = coll.toArray();
System.out.println(Arrays.toString(arr));
```

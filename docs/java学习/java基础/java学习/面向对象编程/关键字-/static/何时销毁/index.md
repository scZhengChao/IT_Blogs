# 何时销毁

## 目录

- [静态成员；/ 类属性](#静态成员-类属性)

#### 静态成员；/ 类属性

![](./assets/image/image_jul4BzwqSu.png)

- 无论这个类 **实例化出来多少对象**；共用 &#x20;
- 操作的是 内存当中的同一块空间；&#x20;
- **静态空间；须等到所有的对象销毁以后才会被释放；**
- 静态方法**不允许重写**；（@Overiride）不加Ovaerride 是可以的

![](./assets/image/image_vGCr7njlOT.png)

# 装饰器

## 目录

- [装饰者设计模式：](#装饰者设计模式)
- [装饰者模式的套路：](#装饰者模式的套路)
- [案例](#案例)

# 装饰者设计模式：

- 不改变原类, **不使用继承的基础上**，**动态地扩展一个对象的功能（功能增强）**

# 装饰者模式的套路：

1. 装饰类和被装饰类需要有共同的父类型
2. 装饰类**的构造要接收被装饰类的对象**
3. 在装饰类中把要**增强扩展的功能进行扩展**
4. 对于不要**增强的功能直接调用**

# 案例

```java 
//字符输入缓冲流: BufferedReader      特点：提高读的效率

// 情况：在使用FileReader类时，发现读的效率低，希望提高效率

//不能修改FileReader类、不能继承FileReader类 ，要对read(char[] cbuf)方法进行增强

//使用装饰者模式解决：
    装饰类：  BufferedReader
    被装饰类： FileReader

//装饰类      具有相同的父类型
public class BufferedReader extends Reader{
    //被装饰类
    private FileReader fileReader;

    //构造方法
    public BufferedReader(){}
    public BufferedReader(FileReader fileReader){//接收被装饰类的对象
        this.fileReader = fileReader;
    }
    public BufferedReader(FileReader fileReader , int size){
        this.fileReader = fileReader;
        this.size = size;
    }

    //成员变量
    private int size = 1024*8;

    //缓冲区对象
    char[] cbuf = new char[size];

    //重写read()方法
    public int read(){
        ....

        read(cbuf);

    }
    //重写read(char[] cbuf)方法
    public int read(char[] cbuf){
        .......
    }

    //重写相关方法
    public void close(){
        fileReader.close();//调用原有功能
    }
}
```

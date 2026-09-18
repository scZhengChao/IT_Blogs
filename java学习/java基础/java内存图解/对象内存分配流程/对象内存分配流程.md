# 对象内存分配流程

```java 
public class Demo {
    public static void main(String[] args) {
        // 1. 类加载：Demo类被加载到方法区
        // 2. 内存分配：
        //    - args变量存入虚拟机栈
        //    - new的对象存入堆内存
        Object obj = new Object();
        
        // 3. 执行引擎：
        //    - 解释器逐行执行
        //    - JIT可能优化热点代码
        System.out.println(obj);
    }
}
```


```mermaid 
graph TD
    A[新对象创建] --> B{Eden区空间足够?}
    B -->|是| C[在Eden分配]
    B -->|否| D[触发Minor GC]
    D --> E{GC后空间足够?}
    E -->|是| C
    E -->|否| F[直接进入老年代]
    C --> G{对象年龄>阈值?}
    G -->|是| H[晋升到老年代]
    G -->|否| I[留在Survivor区]
```

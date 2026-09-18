# 省略模式

## 目录

- [省略模式](#省略模式)

# 省略模式

省略规则：

- 参数类型可以省略，但是有多个参数的情况下，不能只省略一个 （要**么不省略；要么都省略**）
- 如果参数有且仅有一个，那么小括号可以省略
- 如果代码块的语句只有一条，可以省略大括号和分号，甚至是return

```java title="和js差不多"
package com.lamda.demo1;

import java.util.ArrayList;
import java.util.Collections;

public class ListDemo {
    public static void main(String[] args) {
        ArrayList<Integer> arr = new ArrayList<>();
        Collections.addAll(arr,1,2,4,5,65);
        Collections.sort(arr,(Integer a,Integer b)->b-a);
        System.out.println(arr.toString()); 
    }
}

```

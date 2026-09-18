# 冒泡排序

- 两两比较
- 中间变量
- 交换数据

```java 
package com.suanfa;

import java.util.Arrays;

public class Maopao {
    public static void main(String[] args) {
        int[] arr = {1,34,6,2,56,6,1};
        for (int i = 0 ; i<arr.length-1;i++){
            for(int j = i+1 ;j<arr.length-1-i;j++){
                 if(arr[j]>arr[i]){
                     int temp = arr[j];
                     arr[j]=arr[i];
                     arr[i]=temp;
                 }
            }
        }
        System.out.println(Arrays.toString(arr));
    }
}

```

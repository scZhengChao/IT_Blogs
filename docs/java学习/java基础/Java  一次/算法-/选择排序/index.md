# 选择排序

![](./image/image_lbdqfV0-Zj.png)

- **最小放开头**
- **下一轮比上一轮少一个**
- **知道全部比完**

```java 
        int[] arr = {1,34,6,2,56,6,1};
        for (int i = 0 ; i < arr.length ; i++){
            for (int j=i+1; j < arr.length ; j++){
                if(arr[i]>arr[j]){
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                 }
            }
        }
        System.out.println(Arrays.toString(arr)
```

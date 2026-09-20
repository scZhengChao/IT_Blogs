# Arrays

![](./image/image_DRaAzZneTC.png)

```java 
public static void main(String[] args) {
        int[] arr = new int[10];
        Random r= new Random();
        for (int i = 0; i < arr.length; i++) {
            arr[i] = r.nextInt( 101);
        }
        System.out.println(Arrays.toString(arr));
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));
        String str = Arrays.toString(arr);
         str = str.substring(1, str.length()-1);
         str = str.replaceAll(","," ");
    }
```

# SimpleDateFormat

```javascript 
package com.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateDemo {
    public static void main(String[] args) throws ParseException {
        Date d1= new Date();
        System.out.println(d1);

        Date d2= new Date(1000*1000*60);
        System.out.println(d2);

        SimpleDateFormat sp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String s = sp.format(d1);  // date --> string
        System.out.println(s); // 2024/8/4 下午3:11 默认格式

        String dateStr = "2024-10-12 11:11:11"; // 必须匹配；否则解析不成功的
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date2 = sdf.parse(dateStr); // string --> date
        System.out.println(date2);

    }
}
package com.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateDemo {
    public static void main(String[] args) throws ParseException {
        Date d1= new Date();
        System.out.println(d1);

        Date d2= new Date(1000*1000*60);
        System.out.println(d2);

        SimpleDateFormat sp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String s = sp.format(d1);  // date --> string
        System.out.println(s); // 2024/8/4 下午3:11 默认格式

        String dateStr = "2024-10-12 11:11:11"; // 必须匹配；否则解析不成功的
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date2 = sdf.parse(dateStr); // string --> date
        System.out.println(date2);

    }
}


```


![](image_3YIImb6n9T.png)

![](image_XeNY3i3Uml.png)

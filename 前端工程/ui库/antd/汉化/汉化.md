# 汉化

[ antd的datepicker之不能汉化解决方案笔记\_weixin\_34026484的博客-CSDN博客 之前没太注意，今天偶然发现。。。import React from 'react';import {DatePicker} from 'antd';const { RangePicker } = DatePicker;export default function Fuck (props){    return (\&lt;RangePicker/\&gt;)}复制代码这样，默认都是英... https://blog.csdn.net/weixin\_34026484/article/details/93176264](https://blog.csdn.net/weixin_34026484/article/details/93176264 " antd的datepicker之不能汉化解决方案笔记_weixin_34026484的博客-CSDN博客 之前没太注意，今天偶然发现。。。import React from 'react';import {DatePicker} from 'antd';const { RangePicker } = DatePicker;export default function Fuck (props){    return (\&lt;RangePicker/\&gt;)}复制代码这样，默认都是英... https://blog.csdn.net/weixin_34026484/article/details/93176264")

```react tsx 
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
 
<RangePicker locale={locale}/>

```

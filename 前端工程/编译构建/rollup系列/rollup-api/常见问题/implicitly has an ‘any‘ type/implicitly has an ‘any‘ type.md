# implicitly has an ‘any‘ type

是你定义的[数据](https://so.csdn.net/so/search?q=数据\&spm=1001.2101.3001.7020 "数据")没有定义类型 ,隐式具有“[any](https://marketing.csdn.net/p/3127db09a98e0723b83b2914d9256174?pId=2782\&utm_source=glcblog\&spm=1001.2101.3001.7020 "any")”[类型](https://so.csdn.net/so/search?q=类型\&spm=1001.2101.3001.7020 "类型"),只要显示的定义就行了,或者配置下面参数

> tsconfig.json添加"noImplicitAny": false，

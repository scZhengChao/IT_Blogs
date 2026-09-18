# 工具函数

```typescript 
/** 枚举转换为下拉选项 */
export const enumToOptions = (obj: any, indexList?: number[]) => {
  const keys = Object.keys(obj);
  if (!indexList) {
    return keys.reduce((p: { value: string; label: string }[], n) => {
      return [...p, { label: n, value: obj[n] }];
    }, []);
  } else {
    return indexList.map((index) => {
      return {
        value: obj[keys[index]],
        label: keys[index],
      };
    });
  }
};

export const enumToOptionsReverse = (obj: any) => {
  return Object.keys(obj).map((key) => {
    return {
      label: obj[key],
      value: key,
    };
  });
};

/**字符串枚举生成反向映射*/
export const getEnumLabelByKey = (key: string | number, obj: any) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v == key) {
      return k;
    }
  }
};

export const getEnumKeyByEnumValue = (myEnum: any, enumValue: string) => {
  const keys = Object.keys(myEnum).filter((v) => myEnum[v] == enumValue);
  return keys.length > 0 ? keys[0] : null;
};

```

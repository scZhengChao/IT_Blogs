# cascader

## 目录

- [labelInValue](#labelInValue)
- [数据类型](#数据类型)

# labelInValue

```typescript 

import React, { useEffect, useState, useRef } from 'react';
import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
const { SHOW_CHILD } = Cascader;
import { OrganResponseModel } from '@estate/common/types/models/common.model';
import type { OptionItem } from '@estate/common/types/models/common.model';
import { safeStringify, safeParse } from '@estate/common/utils/common.util';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
export interface ManagementCascaderProps {
  onChange?: (data: OrganResponseModel[]) => void;
  value?: OrganResponseModel[];
  placeholder?: string;
  multiple?: boolean;
  organList?: OrganResponseModel[];
  organOptions?: OptionItem[];
}
type IdKey = keyof OrganResponseModel;
/**
 * 注意 该组件 只是  管理单位 和 使用单位 的组件
 * 第一层是 假数据 zsyh； 第二层； 是真实数据
 * 只能选择第二层
 * @param props
 * @constructor
 */
const ManagementCascader: React.FC<ManagementCascaderProps> = (props) => {
  const {
    organList = [],
    organOptions = [],
    value,
    onChange,
    placeholder,
    multiple = false,
    ...rest
  } = props;
  const [cascaderValue, setCascaderValue] = useState<string[][]>([]);
  const currentValue = useRef<OrganResponseModel[]>();
  useEffect(() => {
    if (value && Array.isArray(value)) {
      if (value === currentValue.current) {
        // console.log('一致的；不用遍历----')
        return;
      }
      const valueData: OrganResponseModel[] = [];
      const data = value
        .map((item) => {
          // 唯一值 做key  优化 originOrgId
          const idKeyArr: IdKey[] = ['originPathId', 'originOrgId'];
          const idkey = idKeyArr.find((key) => item[key]);
          if (idkey) {
            const info = organList.find((v) => v?.[idkey] === item[idkey]);
            if (info) {
              valueData.push(info);
              return ['zsyh', safeStringify(info)];
            }
          }
          return null;
        })
        .filter(Boolean);
      currentValue.current = valueData;
      setCascaderValue(data);
      onChange?.(valueData);
    } else {
      if (value !== undefined && !isEqual(value, [])) {
        onChange?.([]);
      }
    }
  }, [value]);
  const onCascaderChange = (_: any, selectedOptions: OptionItem[][]) => {
    if (multiple) {
      const currentValueData: string[][] = [];
      const multipleValues: OrganResponseModel[] = selectedOptions
        .map((arr) => {
          const stringValue: string = arr?.[1]?.value;
          currentValueData.push(['zsyh', stringValue]);
          return safeParse(stringValue);
        })
        .filter(Boolean);
      currentValue.current = multipleValues;
      if (isEmpty(multipleValues)) {
        setCascaderValue([]);
      } else {
        setCascaderValue(currentValueData);
      }
      onChange?.(multipleValues);
    } else {
      const data = (selectedOptions as unknown as OptionItem[])?.[1]?.value;
      const singleValues = [safeParse(data)].filter(Boolean);
      currentValue.current = singleValues;
      if (isEmpty(singleValues)) {
        setCascaderValue([]);
      } else {
        setCascaderValue([['zsyh', data]]);
      }
      onChange?.(singleValues);
    }
  };
  const displayRender = (labels: string[], selectedOptions: DefaultOptionType[]) => {
    return labels?.map((label, i) => {
      const option = selectedOptions?.[i];
      if (i === labels.length - 1) {
        return <span key={option?.value || i}>{label}</span>;
      }
      return null;
    });
  };

  return (
    <Cascader
      {...rest}
      value={cascaderValue}
      // @ts-ignore
      onChange={onCascaderChange}
      placeholder={placeholder}
      displayRender={displayRender}
      options={organOptions}
      showCheckedStrategy={SHOW_CHILD}
      multiple={multiple}
      showSearch={true}
    />
  );
};
export default ManagementCascader;



```


# 数据类型

```typescript 
// 原数据
[
  {
    orgName: "a"
    originOrgId: "100003"
    originPathId: "100001/100003"
    parentId: "100001"
    pathName: "a/b"
  },
   {
    orgName: "c"
    originOrgId: "100004"
    originPathId: "100001/100003/100004"
    parentId: "100003"
    pat hName: "d/e/f"
  }
]


// options 数据
[
    {
        "label": "a",
        "value": "a",
        "children": [
            {
                "label": "a",
                "value": "{\"originOrgId\":\"100003\",\"pathName\":\"a/b\",\"originPathId\":\"100001/100003\",\"orgName\":\"f\",\"parentId\":\"100001\"}",
                "children": []
            },
            {
                "label": "c",
                "value": "{\"originOrgId\":\"100004\",\"pathName\":\"c/d/e\",\"originPathId\":\"100001/100003/100004\",\"orgName\":\"f\",\"parentId\":\"100003\"}",
                "children": []
            }   
       
        ]
    }
]

```

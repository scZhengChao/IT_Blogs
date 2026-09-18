# CascaderValueType&#x20;

```react tsx 
import React, { useEffect, useState } from 'react';
import { Cascader } from 'antd';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import type { CascaderProps } from 'antd/lib/cascader';
const { SHOW_CHILD } = Cascader;

type CustomCascaderProps<T> = CascaderProps<T> & {
  onChange?: (data: T[] | T[][]) => void;
  value?: T[] | T[][];
  options?: T[];
};

/**
 * 通用的cascader 支持lableinValue
 * 目前自测支持二级;理论可以支持n级
 * label;value;children字段是必须
 * value 保证是唯一；且是字符串或者数字;最好是字符串
 * @param props
 * @constructor
 */

type CascaderValueType = string[] | string[][] | number[] | number[][];
const CustomCascader = function <T extends { label: string; value: string; children?: T[] }>(
  props: CustomCascaderProps<T>,
) {
  const { value, onChange, placeholder, options, multiple = false, ...rest } = props;
  const [cascaderValue, setCascaderValue] = useState<CascaderValueType>();
  const patchValueType = (data: any) => {
    return isNumber(data) || isString(data);
  };

  const transfromValue = function (data: T[] | T[][]): CascaderValueType {
    const values = data.map((item) => {
      if (Array.isArray(item)) {
        return transfromValue(item);
      }
      if (patchValueType(item)) {
        return item;
      }
      return item?.value;
    });
    return values as CascaderValueType;
  };
  const findFullOptions = (values: CascaderValueType): T[] | T[][] => {
    let findOptions: T[];
    const data = values
      .map((item) => {
        if (Array.isArray(item)) {
          return findFullOptions(item);
        }
        if (patchValueType(item)) {
          const option: T = (findOptions || options)?.find((v) => v.value === item);
          if (option) {
            findOptions = option.children || [];
            return option;
          }
          return null;
        }
      })
      .filter(Boolean);
    return data as T[] | T[][];
  };
  useEffect(() => {
    if (!isEmpty(value) && Array.isArray(value)) {
      const displayValues = transfromValue(value);
      setCascaderValue(displayValues);

      const fullOptions = findFullOptions(displayValues);
      if (!isEqual(value, fullOptions)) {
        onChange(fullOptions);
      }
    } else {
      if (value !== undefined && !isEqual(value, [])) {
        onChange?.([]);
      }
      setCascaderValue([]);
    }
  }, [value, options]);
  const onCascaderChange = (_: string[], selectedOptions: T[] | T[][]) => {
    onChange?.(selectedOptions);
  };

  return (
    <Cascader
      value={cascaderValue}
      // @ts-ignore
      onChange={onCascaderChange}
      placeholder={placeholder}
      options={options}
      showCheckedStrategy={SHOW_CHILD}
      multiple={multiple}
      {...rest}
    />
  );
};
export default CustomCascader;

```

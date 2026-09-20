# CustomTreeSelect&#x20;

```react tsx 
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd/lib/tree-select';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import differenceBy from 'lodash/differenceBy';

export interface CustomTreeSelectProps<T> extends Omit<TreeSelectProps, 'onChange'> {
  treeData: T[];
  onChange?: (data: Omit<T, 'children'>[]) => void;
  flatList?: Omit<T, 'children'>[];
}
interface TreeValue {
  label: string;
  value: string;
}
const CustomTreeSelect = function <T extends { label?: string; value?: string; children?: T[] }>(
  props: CustomTreeSelectProps<T>,
) {
  const {
    flatList,
    onChange,
    value,
    treeData,
    treeCheckStrictly = false,
    multiple = false,
    dropdownStyle = { maxHeight: 600, overflow: 'auto' },
    dropdownMatchSelectWidth = 400,
    showSearch = true,
    allowClear = true,
    treeDefaultExpandAll = true,
    ...rest
  } = props;
  const [treeSelectValue, setTreeSelectValue] = useState<TreeValue[]>();
  // 平铺以便于查找
  const dataList = useRef<Omit<T, 'children'>[]>([]);
  const generateList = (data: T[], containerArr: Omit<T, 'children'>[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { children, ...item } = node;
      containerArr.push({ ...item });
      if (node.children) {
        generateList(node.children, containerArr);
      }
    }
    return containerArr;
  };
  useEffect(() => {
    dataList.current = flatList || generateList(treeData, []);
  }, [treeData, flatList]);

  const transfromValue = function (data: T[]): string[] {
    return (
      data?.map((item) => {
        if (isString(item)) {
          return item;
        } else {
          return item.value;
        }
      }) || []
    );
  };
  const findFullOptions = (data: string[]) => {
    const valueList: Omit<T, 'children'>[] = dataList.current.filter((item) =>
      data.includes(item.value),
    );
    return valueList;
  };
  const convetArr = (data: any): string[] => {
    if (isString(data)) {
      return [data];
    }
    if (isArray(data)) {
      return transfromValue(data);
    }
  };
  const onTreeSelectChange: TreeSelectProps['onChange'] = (newValue) => {
    const valueArr = convetArr(newValue);
    const valueList = findFullOptions(valueArr);
    onChange?.(valueList);
  };

  useEffect(() => {
    if (!isEmpty(value) && Array.isArray(value)) {
      const displayValues = transfromValue(value);
      const fullOptions = findFullOptions(displayValues);
      const treeValue: TreeValue[] = fullOptions.map((item) => ({
        value: item.value,
        label: item.label,
      }));
      setTreeSelectValue(treeValue);

      if (!isEqual(value, fullOptions)) {
        onChange(fullOptions);
      }
    } else {
      if (value !== undefined && !isEqual(value, [])) {
        onChange?.([]);
      }
      setTreeSelectValue([]);
    }
  }, [value, treeData, onChange]);
  const onTitleClick = (e: React.MouseEvent<HTMLDivElement>, children: T[], current: T) => {
    e.stopPropagation();
    e.preventDefault();
    if (isArray(children) && !isEmpty(children)) {
      const flatChildrenValue = generateList(children, []);
      const { children: child, ...curentRest } = current;
      flatChildrenValue.push(curentRest);
      const diff = differenceBy(flatChildrenValue, value, 'value');
      if (!isEmpty(diff)) {
        const newValue = [...(value ?? []), ...diff];
        onChange?.(newValue ?? []);
      } else {
        const newValue = value?.filter((item: { value?: string }) => {
          return !flatChildrenValue.find((val) => val.value === item.value);
        });
        onChange?.(newValue ?? []);
      }
    }
    return;
  };
  const nodeData = useMemo(() => {
    const loop = (data: T[]): T[] => {
      if (!isArray(data) || isEmpty(data)) return [];
      if (!multiple) return treeData;
      return data.map((item) => {
        const label = item.label;
        const title = <div onClick={(e) => onTitleClick(e, item.children, item)}>{label}</div>;
        return {
          ...item,
          title,
          children: item.children ? loop(item.children) : null,
        };
      });
    };
    return loop(treeData);
  }, [treeData, multiple, onTitleClick]);
  return (
    <TreeSelect
      value={multiple ? treeSelectValue : treeSelectValue?.[0]}
      onChange={onTreeSelectChange}
      treeCheckStrictly={treeCheckStrictly}
      treeData={nodeData}
      multiple={multiple}
      treeCheckable={multiple}
      dropdownStyle={dropdownStyle}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      showSearch={showSearch}
      allowClear={allowClear}
      treeNodeFilterProp={'label'}
      treeDefaultExpandAll={treeDefaultExpandAll}
      {...rest}
    />
  );
};
CustomTreeSelect.displayName = 'CustomTreeSelect';

export default CustomTreeSelect;

```

# 远程搜索Select

```react tsx 
import { memo, useState, useRef } from 'react';
import { useRequest, useMount, useUpdateEffect } from 'ahooks';
import { apiGetFloorContractList } from '@estate/common/services/lease-contract.service';
import { Select, Spin } from 'antd';
import uniqBy from 'lodash/uniqBy';
import { isString } from 'ahooks/es/utils';
import type { FloorLeaseContractModel } from '@estate/common/types/models/lease-contract.model';
import isEmpty from 'lodash/isEmpty';
export interface CustomFloorRentFieldProps {
  value?: string | string[];
  onChange?: (data: FloorOptionsModel | FloorOptionsModel[]) => void;
  placeholder?: string;
  transform?: (data: FloorOptionsModel[]) => FloorOptionsModel[];
}
export interface FloorOptionsModel extends Partial<FloorLeaseContractModel> {
  value: string;
  label: string;
}
/** TODO By IT701976：
 *  2023/8/1 20:05
 *  暂不支持 多选
 */
const CustomFloorRentField = memo<CustomFloorRentFieldProps>((props) => {
  const { value, onChange, transform = (_) => _, ...rest } = props;
  const [contractList, setContractList] = useState<FloorOptionsModel[]>();
  const isTriggerChange = useRef<boolean>(false);
  const { run, loading, params } = useRequest(apiGetFloorContractList, {
    manual: true,
    debounceWait: 1000,
    onSuccess: (res) => {
      const list = res?.body || [];
      const options = list.map((item) => {
        const { contractName, contractId } = item;
        return {
          label: `${contractName}/${contractId}`,
          value: contractId,
          ...item,
        };
      });
      const newList = transform(uniqBy(options, 'contractId'));
      if (isTriggerChange.current) {
        const currentItem = newList.find((item) => item.contractId === params?.[0]);
        onChange?.(currentItem);
      }
      setContractList(newList);
    },
  });
  /**
   * 执行搜索方法
   * @param newValue  keywords
   * @param trigger   是否触发onChange
   */
  const handleSearch = (newValue = '', trigger = false) => {
    isTriggerChange.current = trigger;
    run(newValue);
  };

  /**
   * 处理value 等于string的 情况；
   * 切换的情况value 是不可能 为 string 类型的
   */
  useUpdateEffect(() => {
    if (isString(value)) {
      handleSearch(value as string, true);
    }
  }, [value]);
  const onInit = () => {
    handleSearch('', false);
  };
  /**
   * 处理initValues 的情况
   */
  useMount(() => {
    if (value) {
      handleSearch(value as string, true);
    } else {
      // 没有value 就初始化
      onInit();
    }
  });
  const onOriginChange = (
    _: string | string[],
    option: FloorOptionsModel | FloorOptionsModel[],
  ) => {
    onChange?.(option);
  };
  return (
    <Select<string | string[], FloorOptionsModel>
      value={isEmpty(contractList) ? undefined : value}
      options={contractList}
      notFoundContent={loading ? <Spin size="small" /> : null}
      filterOption={false}
      showSearch
      loading={loading}
      onSearch={(keyword) => handleSearch(keyword, false)}
      onChange={onOriginChange}
      allowClear={true}
      onClear={onInit}
      onFocus={onInit}
      {...rest}
    />
  );
});
CustomFloorRentField.displayName = 'CustomFloorRentField';

export default CustomFloorRentField;

```

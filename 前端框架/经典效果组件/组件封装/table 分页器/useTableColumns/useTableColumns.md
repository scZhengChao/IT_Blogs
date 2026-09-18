# useTableColumns

```javascript 
import type { ProColumnType } from '@LT59.20/ebee-pro-table';
import merge from 'lodash/merge';
/**
 * 避免columns 太长 导致页面太长；
 * 便于抽离columns
 */
const useTableColumns = <T,>(
  tableColumns: Array<ProColumnType<T>>,
  dynamicOptions?: Record<string, ProColumnType<T>>,
) => {
  const composeColumns = () => {
    return tableColumns.map((column) => {
      const key = column.dataIndex as string;
      return merge({}, column, dynamicOptions[key]);
    });
  };
  const columns = dynamicOptions ? composeColumns() : tableColumns;
  return {
    columns,
  };
};
export default useTableColumns;
```

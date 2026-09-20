# table

## 目录

- [antd-table](#antd-table)
  - [tsx](#tsx)
  - [less](#less)

# antd-table

## tsx

```typescript 
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import type { ForwardedRef } from 'react';
import { Table, Pagination, ConfigProvider } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import classnames from 'classnames/bind';
import styles from './index.less';
const cx = classnames.bind(styles);
import noop from 'lodash/noop';
import { SortFieldEnum, SortOrderEnum } from '@exhibition/common/types/enums/sort.enums';
import type { IListOrder } from '@exhibition/common/types/models/info-manage.model';
import isEmpty from 'lodash/isEmpty';
import NoData from '@/components/NoData';
import type { INoDataProps } from '@/components/NoData';
import { useEventListener, useMount, useDebounceFn, useUnmount } from 'ahooks';
interface TablePageProps<T> {
  columns: ColumnsType<T>;
  sourceData: T[];
  onRefresh: (current: number, size: number, orders: IListOrder[]) => void;
  total: number;
  loading?: boolean;
  pageSizeOptions?: number[];
  onDataOps?: INoDataProps;
  initPage?: number;
  initPageSize?: number;
  rowKey?: string;
  tableClass?: string;
  pageClass?: string;
  wraperClass?: string;
  tableWrapperClass?: string;
}
interface TableInfoProps {
  currentPage: number;
  pageSize: number;
  orderParams?: IListOrder[];
}

export interface RefProps {
  reSetPage?: <T>(extra?: T) => void;
  getPageInfo?: () => TableInfoProps;
  refreshCurrentPage?: <T>(extra?: T) => void;
}

function TablePage<T extends object>(props: TablePageProps<T>, ref: ForwardedRef<RefProps>) {
  const {
    columns,
    sourceData,
    onRefresh = noop,
    total = 0,
    loading,
    pageSizeOptions = [10, 20, 30, 40, 50, 100],
    onDataOps,
    initPage = 1,
    initPageSize = 10,
    rowKey = 'id',
    tableClass = '',
    pageClass = '',
    wraperClass = '',
    tableWrapperClass = '',
  } = props;
  const [currentPage, setCurrentPage] = useState<number>(initPage);
  const [pageSize, setPageSize] = useState<number>(initPageSize);
  const [orderParams, setOrders] = useState<IListOrder[]>();
  const [scrollHeight, setScrollHeight] = useState(500);
  const handleTableChange: TableProps<T>['onChange'] = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => {
    const order = (sorter as SorterResult<T>).order;
    const orders = order
      ? [
          {
            asc: order === SortOrderEnum.升序,
            name: SortFieldEnum.预约信息开始时间,
          },
        ]
      : [];
    setOrders(orders);
    onRefresh(currentPage, pageSize, orders);
  };
  useImperativeHandle(ref, () => ({
    reSetPage: <K,>(extra?: K) => {
      setCurrentPage(1);
      onRefresh(1, pageSize, orderParams, extra);
    },
    getPageInfo: () => {
      return { currentPage, pageSize, orderParams };
    },
    refreshCurrentPage: <J,>(extra?: J) => {
      onRefresh(currentPage, pageSize, orderParams, extra);
    },
  }));
  const tableRef = useRef<HTMLDivElement>(null);
  const countScrollHeight = () => {
    const { height } = tableRef?.current?.getBoundingClientRect() || {};
    setScrollHeight(height);
  };
  const { run, cancel } = useDebounceFn(countScrollHeight);
  useMount(() => {
    setTimeout(() => {
      run();
    }, 0);
  });

  useUnmount(cancel);

  useEventListener(
    'resize',
    () => {
      run();
    },
    { target: window },
  );
  return (
    <div className={`${cx('table-page')} ${wraperClass}`} ref={tableRef}>
      <div className={`${cx('table')} ${tableWrapperClass}`}>
        <ConfigProvider
          renderEmpty={isEmpty(sourceData) ? () => <NoData {...onDataOps} /> : undefined}
        >
          <Table
            className={tableClass}
            loading={loading}
            columns={columns}
            dataSource={sourceData}
            rowKey={rowKey}
            scroll={{ y: scrollHeight - 40 - 44 - 10 }}
            rowClassName={() => 'table-page-row'}
            size={'small'}
            onChange={handleTableChange}
            pagination={false}
          />
        </ConfigProvider>
      </div>
      {!isEmpty(sourceData) && (
        <Pagination
          className={pageClass}
          size={'small'}
          current={currentPage}
          onChange={(page: number, size: number) => {
            setCurrentPage(page);
            onRefresh(page, size, orderParams);
          }}
          pageSize={pageSize}
          total={total}
          showQuickJumper
          showSizeChanger
          pageSizeOptions={pageSizeOptions}
          showTotal={(all: number) => `共${all}条`}
          onShowSizeChange={(current: number, size: number) => {
            setPageSize(size);
          }}
        />
      )}
    </div>
  );
}
export default forwardRef(TablePage) as <T>(
  props: TablePageProps<T> & { ref?: React.ForwardedRef<RefProps> },
) => ReturnType<typeof TablePage>;

```


## less

```typescript 
.table-page {
  margin: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .table {
    //flex: 1;
    overflow: hidden;
  }
  .page {
    margin: 20px 0 10px;
    height: 40px;
  }
  :global {
    .ant-table-thead {
      height: 44px !important;
      .ant-table-cell {
        padding: 0 8px !important;
        #textMixins.textTitle(@size:14px);
        &::before {
          width: 0 !important;
          height: 0 !important;
        }
      }
    }
    .table-page-row {
      height: 44px !important;
      .ant-table-cell {
        padding: 0 8px !important;
        #textMixins.textLabel();
      }
    }
    .ant-pagination {
      display: flex;
      justify-content: end;
      margin-top: 16px;
    }
  }
}

```

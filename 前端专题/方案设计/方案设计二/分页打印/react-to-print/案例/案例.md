# 案例

## 目录

- [CustomPrint ](#CustomPrint-)
  - [index.tsx](#indextsx)
  - [index.less](#indexless)
- [ReportPinterForm](#ReportPinterForm)
  - [index.tsx](#indextsx)
  - [index.less](#indexless)
- [使用](#使用)

A4纸张横向打印

# CustomPrint&#x20;

### index.tsx

```react jsx 
import type { RefObject } from 'react';
import React, { PureComponent, createRef } from 'react';
import ReactToPrint from 'react-to-print';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);
import moment from 'moment';
import { PRINT_FILE_TIME } from '@mealCard/common/constants/date.constant';
import ReportPinterForm from '@/components/ReportPinterForm';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

interface CustomPrintProps {
  documentTitle: string;
  params: any;
  printColumns: any[];
  maxWidth?: string;
}
interface CustomPrintState {
  listData: any[];
  printTime: string;
  originList: any[];
  pageSize: number;
  originLength: number;
  startPrint: boolean;
}
export interface PageInfo {
  current: number;
  total: number;
}
class CustomPrint extends PureComponent<CustomPrintProps, CustomPrintState> {
  private printRef: RefObject<ReactToPrint>;
  private componentRef: RefObject<HTMLDivElement>;
  private templateRef: RefObject<HTMLDivElement>;
  constructor(props: CustomPrintProps) {
    super(props);
    this.printRef = createRef();
    this.componentRef = createRef();
    this.templateRef = createRef();
    this.state = {
      listData: [],
      printTime: '',
      originList: [],
      pageSize: 30,
      originLength: 0,
      startPrint: false,
    };
  }
  showPrint = (list: any[]) => {
    if (isEmpty(list) || isNil(list)) return;
    this.setState({
      startPrint: false,
      pageSize: 30,
      originList: list,
      originLength: list.length,
      printTime: moment().format(PRINT_FILE_TIME),
    });
  };
  componentDidUpdate(
    prevProps: Readonly<CustomPrintProps>,
    prevState: Readonly<CustomPrintState>,
    snapshot?: any,
  ) {
    const { height } = this.templateRef.current?.getBoundingClientRect() || {};
    if (height > 780 && this.state.pageSize > 1 && !this.state.startPrint) {
      try {
        this.setState((state) => {
          return {
            pageSize: state.pageSize - 1,
          };
        });
      } catch (e) {
        this.setState((state) => {
          return {
            pageSize: state.pageSize,
          };
        });
      }
    }
    if (height < 780 && this.state.originList.length !== 0 && !this.state.startPrint) {
      try {
        this.setState((state) => {
          return {
            listData: [...state.listData, state.originList.slice(0, state.pageSize)],
            originList: state.originList.slice(state.pageSize),
            pageSize: 30,
          };
        });
      } catch (e) {
        this.setState((state) => {
          return {
            listData: [...state.listData, state.originList.slice(0, state.pageSize)],
            originList: state.originList.slice(state.pageSize),
            pageSize: 30,
          };
        });
      }
    }

    if (this.state.originList.length === 0 && this.state.originLength !== 0) {
      const listLength = this.state.listData?.reduce((num, value) => {
        const n = num + value.length;
        return n;
      }, 0);
      if (this.state.originLength === listLength && !this.state.startPrint) {
        try {
          this.setState(
            {
              startPrint: true,
              pageSize: 30,
            },
            () => {
              this.printRef.current?.handleClick();
            },
          );
        } catch (e) {
          this.setState(
            {
              startPrint: true,
              pageSize: 30,
            },
            () => {
              this.printRef.current?.handleClick();
            },
          );
        }
      }
    }
  }

  render() {
    const { params, printColumns, documentTitle, maxWidth } = this.props;
    const { listData, printTime, originList, pageSize, startPrint } = this.state;
    const data = originList.slice(0, pageSize);
    return (
      <div style={{ height: 0, overflow: 'hidden' }}>
        <ReactToPrint
          content={() => this.componentRef.current}
          removeAfterPrint={true}
          ref={this.printRef}
          copyStyles={true}
          documentTitle={documentTitle + '_' + printTime}
          onAfterPrint={() => {
            this.setState({
              listData: [],
              printTime: '',
              originList: [],
              pageSize: 30,
              originLength: 0,
              startPrint: false,
            });
          }}
        />
        <div ref={this.componentRef} className={cx('container')}>
          {startPrint ? (
            listData.map((item, index) => {
              const pageInfo: PageInfo = {
                current: index + 1,
                total: listData.length,
              };
              return (
                <div key={index} className={cx('page-wrapper')}>
                  <ReportPinterForm
                    maxWidth={maxWidth}
                    data={item}
                    pageInfo={pageInfo}
                    params={params}
                    printColumns={printColumns}
                    title={documentTitle}
                  />
                </div>
              );
            })
          ) : (
            <div className={cx('page-wrapper')}>
              <ReportPinterForm
                divRef={this.templateRef}
                data={data}
                params={params}
                printColumns={printColumns}
                title={documentTitle}
                maxWidth={maxWidth}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default CustomPrint;


```


### index.less

```sass (sass)  
.container {
  width: 297mm;
  height: 200mm;
  .page-wrapper {
    width: 297mm;
    height: 200mm;
    page-break-after: always;
    page-break-inside: avoid;
  }
}

```


# ReportPinterForm

### index.tsx

```react jsx 
import type { RefObject } from 'react';
import React, { memo } from 'react';
import WhenRender from '@/components/WhenRender';
import classNames from 'classnames/bind';
import styles from './index.less';
import moment from 'moment';
import { DATE_Y_M_D_HMS } from '@mealCard/common/constants/date.constant';
import { useModel } from '@umijs/max';
import type { PageInfo } from '@/components/CustomPrint';

const cx = classNames.bind(styles);
interface ReportPinterFormProps {
  data: any[];
  pageInfo?: PageInfo;
  params: any;
  title: string;
  printColumns: { title: string; dataIndex: string }[];
  divRef?: RefObject<HTMLDivElement>;
  maxWidth: string;
}
// 即8.264×11.688英寸    595pt x 841pt  默认边距 650px978px = 487pt x 733pt   733-65-20=648
const ReportPinterForm = (props: ReportPinterFormProps) => {
  const { data, pageInfo, params, title, printColumns, divRef, maxWidth } = props;

  const { userToken } = useModel('useAuthModel', (model) => ({
    userToken: model.userToken,
  }));
  return (
    <div
      className={cx('print-wrapper')}
      ref={divRef}
      style={{ '--maxWidth': maxWidth } as React.CSSProperties}
    >
      <div className={cx('print-header')}>
        <div className={cx('header-title')}>{title}</div>
        <WhenRender when={!!params?.startTime}>
          <div className={cx('header-time')}>
            起止日期： <span>{params?.startTime}</span>
            <span className={cx('header-time-middle')}>至</span>
            <span>{params?.endTime}</span>
          </div>
        </WhenRender>
        <div className={cx('header-page')}>
          <div>zsyh</div>
          <div>
            第{pageInfo?.current}页/共{pageInfo?.total}页
          </div>
        </div>
      </div>
      <table className={cx('nature-table')} border={1}>
        <thead>
          <tr>
            {printColumns.map((value, i) => {
              return <th key={i}>{value.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                {printColumns.map((value, index) => {
                  return <td key={index}>{item[value.dataIndex]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={cx('print-footer')}>
        <div>打印日期： {moment(new Date()).format(DATE_Y_M_D_HMS)}</div>
        <div>
          操作员： {userToken?.userName}/{userToken?.employeeId}
        </div>
      </div>
    </div>
  );
};
ReportPinterForm.displayName = 'ReportPinterForm';

export default memo(ReportPinterForm);


```


### index.less

```sass (sass)  
.print-wrapper {
  width: 100%;
  padding: 1cm 4pt;
  overflow: hidden;
  .print-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    justify-content: space-around;
    .header-title {
      font-size: 10pt;
      height: 16pt;
    }
    .header-time {
      font-size: 1pt;
      height: 16pt;
      .header-time-middle {
        margin: 0 6pt;
      }
    }
    .header-page {
      height: 16pt;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 10pt;
      font-size: 1pt;
    }
  }
  .print-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10pt;
    overflow: hidden;
    font-size: 1pt;
    height: 16pt;
  }
  .nature-table {
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 10pt;
    width: calc(297mm - 28pt);
    empty-cells: hide;
    td,
    th {
      word-break: break-all;
      max-width: var(--maxWidth);
      text-align: center;
      font-size: 1pt;
      padding: 0;
      line-height: 16pt;
    }
  }
}

@media print {
  @page {
    size: a4 landscape;
  }
  .nature-table {
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 10pt;
    width: calc(297mm - 28pt);
    empty-cells: hide;
    td,
    th {
      word-break: break-all;
      max-width: var(--maxWidth);
      text-align: center;
      font-size: 1pt;
      padding: 0;
      line-height: 16pt;
    }
  }
}

```


# 使用

```react jsx 
<CustomPrint
  ref={printRef}
  documentTitle={'消费明细表'}
  params={params[0] ?? {}}
  printColumns={printColumns}
/>
```

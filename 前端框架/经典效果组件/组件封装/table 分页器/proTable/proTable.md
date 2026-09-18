# proTable

## 目录

- [index.tsx](#indextsx)
- [index.less](#indexless)
- [demo.tsx](#demotsx)

# index.tsx

```react tsx 
import type {
    EditableFormInstance,
    ProTableProps,
    ActionType,
} from '@ant-design/pro-components';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import style from './index.less';
import classnames from 'classnames/bind';
import type { TableProps } from 'antd';
import { Form } from 'antd';
import type { MutableRefObject, ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState,useLayoutEffect } from 'react';
import { CheckTypeEnum } from '@/types/enums/common.enum';
import type {
    PageModal,
    PageQueryParameter,
} from '@/types/models/response.model';
import type { TablePaginationConfig } from 'antd/lib/table/interface';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import {  isString } from 'ahooks/es/utils';
import trim from 'lodash/trim';
import type { CheckboxProps } from 'antd';
import type { SelectionSelectFn } from 'antd/es/table/interface';
import type { AxiosResponse } from 'axios';
import { useEventListener  } from 'ahooks'

const cx = classnames.bind(style);

export interface CustomProTableProps<T, U, ValueType = 'text'>
    extends Omit<ProTableProps<T, U, ValueType>, 'onChange'> {
    headerTitle?: ReactNode;
    selectOptions?: {
        /** 单选或多选 */
        selectType?: CheckTypeEnum;
        onSelectChange?: (keys?: React.Key[], rows?: T[]) => void;
        onSelect?: SelectionSelectFn<T>;
        onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
        selectedRowKeys?: React.Key[];
        selectedRows?: T[];
        columnWidth?: number;
        hideSelectAll?: boolean;
        getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    };
    /** table 所有的 form，带了一些表格特有的操作 */
    editorFormRef?: MutableRefObject<EditableFormInstance<T>>;
    /** 可编辑表格的 form 实例，使用 Form.useForm 生成后使用 */
    editableFormRef?: FormInstance;
    /** 格式化入参 */
    formatParams?: (params: Record<string, unknown>) => U;
    api?: (data?: PageQueryParameter & U) => Promise<AxiosResponse<PageModal<T>>>;
    defaultSorts?: { name: string; asc: boolean }[];
    onChange?: (value: readonly T[]) => void;
    /** 查询表单ref */
    // formRef?: MutableRefObject<ProFormInstance>;
    actionRef?: MutableRefObject<ActionType>;
    preserveSelectedRowKeys?: boolean;
    className?: string;
    scroll?: TableProps<T>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    value?: T[];
    /** 格式化返回结果 */
    formatDatas?: (data: T[]) => T[];
}

const CustomProTable = <T, U>(props: CustomProTableProps<T, U>) => {
    const [form] = Form.useForm();
    const defaultEditorFormRef = useRef<EditableFormInstance<T>>();
    const defaultActionRef = useRef<ActionType>();
    const {
        selectOptions,
        pagination,
        rowKey = 'id',
        actionRef = defaultActionRef,
        className = '',
        params,
        editable,
        api,
        formatParams,
        formatDatas,
        defaultSorts = [],
        columns,
        onChange,
        editableFormRef = form,
        editorFormRef = defaultEditorFormRef,
        scroll = {},
        search = {
            labelWidth: 'auto',
            searchText: '搜索',
            defaultCollapsed: true,
        },
        preserveSelectedRowKeys = true,
        onReset,
        ...rest
    } = props;
    const selectedRowKeys = useRef<React.Key[]>([]);
    const selectedRows = useRef<T[]>([]);
    const rowSelection = useMemo<TableProps<T>['rowSelection']>(() => {
        if (selectOptions) {
            const { hideSelectAll = false, getCheckboxProps, onSelect, onSelectAll } = selectOptions;
            if (selectOptions.selectedRowKeys) {
                selectedRowKeys.current = selectOptions.selectedRowKeys;
                selectedRows.current = selectOptions.selectedRows || [];
            }
            return {
                getCheckboxProps,
                selectedRowKeys: selectedRowKeys.current || [],
                hideSelectAll,
                type: selectOptions.selectType || CheckTypeEnum.多选,
                columnWidth: selectOptions.columnWidth || 30,
                preserveSelectedRowKeys,
                onSelect,
                onSelectAll,
                onChange(keys: React.Key[], rows: T[]) {
                    selectedRowKeys.current = keys;
                    selectedRows.current = rows;
                    if (selectOptions.onSelectChange) {
                        selectOptions.onSelectChange(keys, rows);
                    }
                },
            };
        }
    }, [preserveSelectedRowKeys, selectOptions]);
    const defaultFormatParams = (data: Record<string, unknown>) => {
        const newParams = { ...data };
        Object.entries(data).forEach(([key, value]) => {
            if (isString(value)) {
                newParams[key] = trim(value);
            }
        });
        return newParams;
    };
    const query = async (
        data: { current?: number; pageSize?: number; keyword?: string } & U,
    ) => {
        const { current: pageNumber, pageSize, ...others } = data;
        const currentParams = formatParams
            ? formatParams(others)
            : (defaultFormatParams(others) as unknown as U);
        const requestParams: PageQueryParameter & U = {
            ...currentParams,
            pageNumber,
            pageSize,
        };

        return new Promise((resolve) => {
            api(requestParams)
                .then((res) => {
                    const list =
                        formatDatas && res.data?.content
                            ? formatDatas(res.data?.content)
                            : res.data?.content;
                    resolve({
                        total: res.data?.totalElements || 0,
                        data: list || [],
                        success: true,
                    });
                })
                .catch((e) => {
                    console.error(e);
                    resolve({ total: 0, data: [], success: false });
                });
        });
    };

    const [scrollY, setScrollY] = useState<number>(0);
    const [scrollX, setScrollX] = useState<number>(0);

    const paginationOptions: TablePaginationConfig | false = pagination !== false && {
        size: 'default',
        defaultPageSize: 20,
        showTotal: (total: number) => `总共 ${total} 条数据`,
        showQuickJumper: true,
        showSizeChanger: true,
        ...(pagination || {}),
    };

    const resetHeight = useCallback(() => {
        // 不能通过body算高度，因为body是可以滚动的。这里head是不能滚动，位置固定，通过head的top+head的高度计算出body的top位置
        const { top, height,width } =
        document.querySelector('.height-table .ant-table-thead')?.getBoundingClientRect() || {};
        const tableBodyTop = (top ?? 0) + (height ?? 0);
        const bodyHeight = document.body.clientHeight;
        // 底部分页器高度 32 padding上下16
        const paginationHeight = pagination === false ? 0 : 64;
        // 减去底部分页器高度，外框padding
        setScrollY(bodyHeight - tableBodyTop - paginationHeight - 16 * 2 - 4);
        setScrollX(width)
    }, [pagination]);
    const onCollapse = useCallback(
        (collapse: boolean) => {
            if (search) {
                search?.onCollapse?.(collapse);
            }
            resetHeight();
        },
        [resetHeight, search],
    );

    useEffect(() => {
        if (!scroll?.y) {
            resetHeight();
        }
    }, [resetHeight, scroll?.y]);
    useLayoutEffect(() => {
        setTimeout(() => {
            resetHeight();
        }, 0);
    });
    useEventListener('resize',resetHeight)
    const onCustomReset = () => {
        actionRef?.current?.clearSelected?.();
        onReset?.();
    };
    const tableColumns = useMemo<ProColumns<T>[]>(()=>{
       return  columns?.map?.(value=>{
            return {
                ellipsis: true,
                ...value,
            }
        })
    },[columns])
    const scrollWidth = !scrollX ? 'max-content':scrollX-16
    return (
        <>
            <EditableProTable<T, U>
                className={`${cx('custom-table')} height-table ${className}`}
                scroll={{ x: scrollWidth, y: scrollY ,...scroll}}
                rowKey={rowKey}
                editableFormRef={editorFormRef}
                bordered
                pagination={paginationOptions}
                columns={tableColumns}
                rowSelection={rowSelection}
                recordCreatorProps={false}
                request={api ? query : undefined}
                params={params}
                onChange={onChange}
                actionRef={actionRef}
                dateFormatter="string"
                tableAlertRender={false}
                form={{
                    ignoreRules: false,
                }}
                onReset={onCustomReset}
                search={search ? {labelWidth:'auto', ...search,onCollapse } : search}
                editable={
                    editable
                        ? {
                            type: 'multiple',
                            saveText: '保存',
                            cancelText: '取消',
                            form: editableFormRef,
                            ...editable,
                        }
                        : undefined
                }
                toolbar={null}
                {...rest}
            />
        </>
    );
};
export default CustomProTable;


```


# index.less

```css 
.custom-table {
  background-color:var(--color-white1) ;
  :global{
    .ant-pro-table-search {
      margin-bottom: 0;
      padding: 0;
    }
    .ant-table-body{
      background-color: var(--color-white2);
    }
    .ant-card-body {
      padding: 0;
    }
    .ant-pro-table-list-toolbar-container {
      padding-top: 0;
    }
    .ant-table-cell{
      background-color:var(--color-white1) ;
    }
    .ant-table-thead > tr > th.ant-table-cell {
      background-color: var(--color-white2);
    }
    .ant-table-cell-scrollbar:not([rowspan]) {
      box-shadow: none;
    }
  }
}

```


# demo.tsx

```react tsx 
import React, { useRef, useState } from 'react';
import CustomProTable from './index';
import type {
  ProColumns,
  ActionType,
  EditableFormInstance,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Button, Input, Space, Tag, Badge, message } from 'antd';
import type { InputRef } from 'antd';
import { ProFormText } from '@ant-design/pro-components';
import type { IResponse, PageModal } from '@mealCard/common/types/models/response.model';
import { CheckTypeEnum } from '@mealCard/common/types/enums/commom.enums';

const TagList: React.FC<{
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[],
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<InputRef>();
  const [newTags, setNewTags] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
  labels?: {
    key: string;
    label: string;
  }[];
};

const UseTableDemo: React.FC = () => {
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
          label: '自定义label',
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '15%',
    },
    {
      title: '标签',
      dataIndex: 'labels',
      renderFormItem: () => <TagList />,
      render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
    },
    {
      title: '活动名称二',
      dataIndex: 'readonly',
      search: false,
      tooltip: '只读，使用form.getFieldValue可以获取到值',
      readonly: true,
      width: '15%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      fieldProps: {
        options:mealLevelOptions,
        fieldNames: { label: 'name', value: 'code' },
      }，
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      ellipsis: true,
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'decs']) === '这个活动真好玩1' || rowIndex >= 3) {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
      search: {
        transform: (value: string) => {
          return { a: `transform结果:${value}` };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 300,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSourceType>>();
  const api = (params: unknown): Promise<IResponse<PageModal<DataSourceType>>> => {
    console.log(params, '----api--params---');
    const list = new Array(200).fill(1).map((_, index) => {
      return {
        id: index.toString(),
        title: `活动名称${index}`,
        readonly: '活动名称一',
        decs: `这个活动真好玩${index}`,
        state: 'open',
        created_at: '1590486176000',
        labels: [{ key: 'woman', label: '川妹子' }],
        update_at: '1590486176000',
      };
    });
    return new Promise((resolve) => {
      resolve({
        returnCode: '000000',
        errorMsg: 'success',
        body: {
          totalElements: list.length,
          content: list,
        },
      });
    });
  };
  const formRef = useRef<ProFormInstance>();
  const renderBadge = (count: number, active = false) => {
    return (
      <Badge
        count={count}
        style={{
          marginBlockStart: -2,
          marginInlineStart: 4,
          color: active ? '#1890FF' : '#999',
          backgroundColor: active ? '#E6F7FF' : '#eee',
        }}
      />
    );
  };
  const [activeKey, setActiveKey] = useState<React.Key>('tab1');
  const searchFormRef = useRef<ProFormInstance>();
  const onFill = () => {
    searchFormRef?.current?.setFieldsValue({
      name: '张三',
      company: '蚂蚁金服',
    });
  };

  const getCompanyName = () => {
    message.info(`公司名称为 "${searchFormRef?.current?.getFieldValue('company')}"`);
  };

  const getFormatValues = () => {
    console.log('格式化后的所有数据：', searchFormRef.current?.getFieldsFormatValue?.());
  };

  const validateAndGetFormatValue = () => {
    searchFormRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      console.log('校验表单并返回格式化后的所有数据：', values);
    });
  };
  const formNode = (
    <>
      <ProFormText
        width="md"
        name="name"
        label="自定义"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
        transform={(value) => ({ name: '转化后的值' })}
      />
      <ProFormText width="md" name="company" label="自定义" placeholder="请输入名称" />
      <ProFormText name={['contract', 'name']} width="md" label="自定义" placeholder="请输入名称" />
    </>
  );
  return (
    <CustomProTable<DataSourceType>
      // CustomProFormConfig={{  // 插槽形式 传入表单： 例 formNode ; 不用插槽 就不传这个配置
      //   searchFormRef,  // 表单的ref
      //   submitter: {   // 表单的按钮 action 配置
      //     submitterConfig: {
      //       // 配置按钮文本
      //       searchConfig: {
      //         resetText: '重置1',
      //         submitText: '提交1',
      //       },
      //       // 配置按钮的属性
      //       resetButtonProps: {
      //         // style: {
      //         //   // 隐藏重置按钮
      //         //   display: 'none',
      //         // },
      //         // 禁用按钮
      //         disabled: true,
      //       },
      //     },
      //     extraAction: () => {  // 自定义按钮； 自带提交充值；可以补充自定义按钮
      //       return [
      //         <Button htmlType="button" onClick={onFill} key="edit">
      //           一键填写
      //         </Button>,
      //         <Button htmlType="button" onClick={getCompanyName} key="read">
      //           读取公司
      //         </Button>,
      //         <Button.Group key="refs" style={{ display: 'block' }}>
      //           <Button htmlType="button" onClick={getFormatValues} key="format">
      //             获取格式化后的所有数据
      //           </Button>
      //           <Button htmlType="button" onClick={validateAndGetFormatValue} key="format2">
      //             校验表单并返回格式化后的所有数据
      //           </Button>
      //         </Button.Group>,
      //       ];
      //     },
      //   },
      //   content: formNode, //  插槽项； 使用proForm 可以不用加form.item 非常方便
      // }}
      columns={columns}
      editorFormRef={editorFormRef} // table 所有的 form，带了一些表格特有的操作;获取数据等..
      headerTitle="动态自定义搜索栏" // title;也可以传按钮数组；jsx 等
      api={api}
      // toolbar={{  // 工具栏；就是表格上面的哪一行；一般用不到；和 headerTitle 二选一
      //   filter: (
      //     <LightFilter>
      //       <ProFormDatePicker name="startdate" label="响应日期" />
      //     </LightFilter>
      //   ),
      //   menu: {
      //     type: 'tab',
      //     activeKey: activeKey,
      //     items: [
      //       {
      //         key: 'tab1',
      //         label: <span>应用{renderBadge(99, activeKey === 'tab1')}</span>,
      //       },
      //       {
      //         key: 'tab2',
      //         label: <span>项目{renderBadge(30, activeKey === 'tab2')}</span>,
      //       },
      //       {
      //         key: 'tab3',
      //         label: <span>文章{renderBadge(30, activeKey === 'tab3')}</span>,
      //       },
      //     ],
      //     onChange: (key) => {
      //       setActiveKey(key as string);
      //     },
      //   },
      //   actions: [
      //     <Button key="primary" type="primary">
      //       新建应用
      //     </Button>,
      //   ],
      // }}
      form={{
        ignoreRules: false, // 内置的search表单；使from 的rules 生效；不加这个rule是不生效的
      }}
      rowSelection={{
        // 多选还是单选；搜集勾选的项；等；
        type: CheckTypeEnum.多选,
      }}
      // tableAlertRender和tableAlertOptionRender 一般不传；默认false； 他是表单上面的一行；只有当有勾选项的时候才会动态出现；
      // tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
      //   <Space size={24}>
      //     <span>
      //       已选 {selectedRowKeys.length} 项
      //       <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
      //         取消选择
      //       </a>
      //     </span>
      //     <span>{`容器数量: ${selectedRows.reduce((pre, item) => pre + 1, 0)} 个`}</span>
      //     <span>{`调用量: ${selectedRows.reduce((pre, item) => pre + 1, 0)} 次`}</span>
      //   </Space>
      // )}
      // tableAlertOptionRender={() => {
      //   return (
      //     <Space size={16}>
      //       <a>批量删除</a>
      //       <a>导出数据</a>
      //     </Space>
      //   );
      // }}
      toolBarRender={() => [
        // 自定义toolbar 右边；一般是和headerTitle 配合使用
        <Button
          key="set"
          onClick={() => {
            if (formRef.current) {
              formRef.current.setFieldsValue({
                title: 'test-xxx',
              });
            }
          }}
        >
          赋值
        </Button>,
        <Button
          key="submit"
          onClick={() => {
            if (formRef.current) {
              formRef.current.submit();
            }
          }}
        >
          提交
        </Button>,
      ]}
      actionRef={actionRef} // 表格的ref
      formRef={formRef}
      search={{
        // 默认有search 配置的；不需要search 传false
        // 处理查询重置两个按钮；可以动态的添加自定义按钮
        optionRender: (searchConfig, formProps, dom) => {
          return [
            ...dom.reverse(),
            <Button
              key="out"
              onClick={() => {
                const values = searchConfig?.form?.getFieldsValue();
                console.log(values);
              }}
            >
              导出
            </Button>,
          ];
        },
      }}
      // 编辑表格的配置；组件里有默认配置；这里展示的是如何自定义操作按钮
      editable={{
        // 完全受控；配合onChange；可以改变 ； 配合columns 配置；可以方便的控制可编辑cell
        editableKeys: ['1', '2'],
        actionRender: (row, config, defaultDom) => {
          return [
            defaultDom.save, // 保存 ； 它默认还带一个删除；这里不用； 也可不传save ；不保存；
            defaultDom.cancel, // 取消
            <Button
              type={'link'}
              onClick={() => {
                // js 设置可编辑表格
                editorFormRef.current?.setRowData?.(config.index!, {
                  decs: '动态设置的title',
                });
                // js 获取 有所表格里面可编辑数据；还可已获取单行的；更多看文档
                const tableData = editorFormRef.current?.getRowsData();
                console.log(tableData, '---tableData-----');
                // defaultDom.save.ref?.current?.save?.()
              }}
              key={'save'}
            >
              自定义保存/获取/设置/数据
            </Button>,
          ];
        },
      }}
    />
  );
};
export default UseTableDemo;


```

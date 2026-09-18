# form

## 目录

- [自定义schema 配置表单](#自定义schema-配置表单)
  - [schema](#schema)
  - [入口](#入口)
  - [CustomFieldsItem](#CustomFieldsItem)
  - [FieldsContent](#FieldsContent)
  - [typeEnum](#typeEnum)
- [自定义表单校验](#自定义表单校验)
- [自定义表单组件](#自定义表单组件)
  - [CustomAddDrawing](#CustomAddDrawing)
  - [CustomUpload](#CustomUpload)

# 自定义schema 配置表单

## schema

```react tsx 
import { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
import Wrapper from '@/components/CustomNewlyHouse/components/Wrapper';
import type { ItemProps } from '@/components/CustomFieldsItem';
import { isNumber } from 'ahooks/es/utils';
import type { FormRule } from 'antd';
import { DateDrawingProps } from '@/components/CustomAddDrawing';
import isEmpty from 'lodash/isEmpty'
const BuildAreaNumCheck = {
  validator: async (rule:FormRule, value:string) => {
    if(!/^[0-9]+([.]{1}[0-9]{1,2}){0,1}$/ig.test(value)){
      return Promise.reject('请输入最多保留两位小数的数字')
    }
    if(isNumber(Number(value)) && Number(value)<9999999){
      return Promise.resolve()
    }else{
      return Promise.reject('最大不超过9999999')
    }
  }
}
const BuildFloorNumCheck = {
  validator: async (rule:FormRule, value:string) => {
    if(!/^[1-9][0-9]*$/ig.test(value)){
      return Promise.reject('请输入正整数')
    }
    if(isNumber(Number(value)) && Number(value)<9999999){
      return Promise.resolve()
    }else{
      return Promise.reject('最大不超过10000')
    }
  }
}

export const BASIC_SCHEMA_LIST: ItemProps[] = [
  {
    key: 'xxx',
    label: '房产简称',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请输入',
    rules:[{required:true,type:'string',max:50}]
  },
  {
    key: 'xxXxX',
    label: '房产编号',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请输入',
    rules:[{required:true,type:'string',max:50,pattern:/^[0-9a-zA-Z]+$/ig,message:'请输入50之内的数字或字符'}]
  },
  {
    key: 'xxXxZX',
    label: '性质',
    fieldKey: FieldsContentTypeEnums.Select,
    placeholder: '请选择',
    rules:[{required:true,type:'string'}],
    options: [
      {
        value: 'jack',
        label: 'Jack',
      },
    ],
  },
  {
    key: 'qw',
    label: '车位数',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请选择',
    WrapperEl: Wrapper,
    rules:[
      {required:false },
      BuildFloorNumCheck
    ],
  },
  {
    key: 'xxXxZzzsxXxx',
    label: '地下建筑面积',
    suffix: 'm²',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请选择',
    rules:[
      {required:false },
      BuildAreaNumCheck
    ],
  },
  {
    key: 'qwsss',
    label: '图纸附件',
    fieldKey: FieldsContentTypeEnums.UploadDrawing,
    placeholder: '请选择',
    span: 24,
    labelCol: { span: 3 },
    wrapperCol: { span: 17 },
    rules:[
      {required:true},
      {
        validator: async (rule:FormRule, value:DateDrawingProps[]) => {
          if(isEmpty(value)){
            return Promise.reject('请完善图纸信息')
          }
          for(let i = 0 ; i < value.length;i++){
            const item = value[i]
            if(item.date === ''){
              return Promise.reject('请完善时间信息')
            }
            if(isEmpty(item.files)){
              return Promise.reject('请完善附件信息')
            }
          }
        }
      }
    ]
  },
];

```


## 入口

```react tsx 
import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import CustomHeaderName from '@/components/CustomHeaderName';
const cx = classNames.bind(styles);
import { Row } from 'antd';
import CustomFieldsItem from '@/components/CustomFieldsItem/index';
import type { FieldsContentOps } from '@/components/CustomFieldsItem/index';
import { BASIC_SCHEMA_LIST } from '@/constants/newly-house.constant';
import { FieldsContentProps } from '@/components/CustomeFieldsContent';
const BasicInfo: React.FC = () => {
  return (
    <div>
      <CustomHeaderName title={'基础信息'} />
      <Row className={cx('field-row')}>
        {BASIC_SCHEMA_LIST.map((item) => {
          const { key, label, span,rules, labelCol, WrapperEl, wrapperCol, ...rest } = item;
          const type = item.fieldKey;
          const itemProps = {
            key,
            label,
            span,
            labelCol,
            wrapperCol,
            WrapperEl,
            rules
          };
          const contentProps = { ...rest };
          return (
            <CustomFieldsItem<FieldsContentOps[typeof type]>
              key={key}
              itemProps={itemProps}
              contentProps={contentProps as FieldsContentProps & FieldsContentOps[typeof type]}
            />
          );
        })}
      </Row>
    </div>
  );
};
export default BasicInfo;

```


## CustomFieldsItem

```react tsx 
import React, { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import { Col, Form } from 'antd';
const cx = classNames.bind(styles);
import type { FormItemProps } from 'antd/lib/form';
import FieldsContent, { FieldsContentProps } from '@/components/CustomeFieldsContent';
import { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
import { InputProps } from 'antd/lib/input/Input';
import { DefaultOptionType, SelectProps } from 'antd/lib/select';
import { DatePickerProps } from 'antd/lib/date-picker';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import { AddDrawingProps } from '@/components/CustomAddDrawing';

// @ts-ignore fix ' cannot simultaneously extend types 'xxxx' and 'xxxx'.
export interface ItemProps
  extends FormItemProps,
    TextAreaProps,
    SelectProps,
    InputProps,
    // @ts-ignore fix '
    DatePickerProps,
    TextAreaProps,
    AddDrawingProps {
  key: string;
  span?: number;
  label?: string;
  fieldKey?: FieldsContentTypeEnums;
  placeholder?: string;
  suffix?: string | React.ReactNode;
  options?: DefaultOptionType[];
  WrapperEl?: FunctionComponent<PropsWithChildren<any>>;
  hasPlaceholder?: boolean;
}
interface CustomFieldsItemProps<T> {
  itemProps: ItemProps;
  contentProps: T & FieldsContentProps;
}
export interface FieldsContentOps {
  [FieldsContentTypeEnums.Input]: InputProps;
  [FieldsContentTypeEnums.Select]: SelectProps;
  [FieldsContentTypeEnums.Date]: DatePickerProps;
  [FieldsContentTypeEnums.TextArea]: TextAreaProps;
  [FieldsContentTypeEnums.UploadDrawing]: AddDrawingProps;
}
function CustomFieldsItem<T>(props: CustomFieldsItemProps<T>) {
  const { itemProps, contentProps } = props;
  const {
    span = 8,
    key,
    rules,
    label,
    labelCol = { span: 9 },
    wrapperCol = { span: 12 },
    WrapperEl,
  } = itemProps;

  if (WrapperEl) {
    return (
      <WrapperEl itemProps={itemProps} contentProps={contentProps}>
        <Col span={span} key={key} className={cx('field-col')}>
          <Form.Item
            label={label}
            name={key}
            rules={rules}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <FieldsContent<T> {...contentProps} />
          </Form.Item>
        </Col>
      </WrapperEl>
    );
  }
  return (
    <Col span={span} key={key} className={cx('field-col')}>
      <Form.Item label={label} name={key} rules={rules} labelCol={labelCol} wrapperCol={wrapperCol}>
        <FieldsContent<T> {...contentProps} />
      </Form.Item>
    </Col>
  );
}
export default CustomFieldsItem;

```


## FieldsContent

```react tsx 
import { DatePicker, Input, Select } from 'antd';
import React, { useMemo } from 'react';
// import style from './index.less';
// import classnames from 'classnames/bind';
// const cx = classnames.bind(style);
import { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
import CustomAddDrawing from '@/components/CustomAddDrawing/';

const { TextArea } = Input;
export interface FieldsContentProps {
  fieldKey: FieldsContentTypeEnums;
  hasPlaceholder?: boolean;
  placeholder?: string;
}

function FieldsContent<T>(props: FieldsContentProps & T) {
  const { fieldKey, placeholder, hasPlaceholder, ...rest } = props;

  const _placeholder = useMemo(
    () => (!hasPlaceholder ? placeholder : ''),
    [hasPlaceholder, placeholder],
  );
  switch (fieldKey) {
    case FieldsContentTypeEnums.Input:
      return <Input placeholder={_placeholder} size={'small'} {...rest} />;
    case FieldsContentTypeEnums.Select:
      return <Select placeholder={_placeholder} size={'small'} {...rest} />;
    case FieldsContentTypeEnums.TextArea:
      return <TextArea {...rest} />;
    case FieldsContentTypeEnums.Date:
      return (
        // @ts-ignore  fix 'DatePicker’ cannot be used as a JSX component.
        <DatePicker {...rest} />
      );
    case FieldsContentTypeEnums.UploadDrawing:
      return <CustomAddDrawing {...rest} />;
    default:
      return null;
  }
}
export default FieldsContent;

```


## typeEnum

```react tsx 
export enum FieldsContentTypeEnums {
  Select = 'select',
  Input = 'input',
  Date = 'date',
  TextArea = 'TextArea',
  UploadDrawing = 'UploadDrawing',
  // UploadImg ='uploadImg',
}

```


# 自定义表单校验

```react tsx 
  const { status } = Form.Item.useStatus();
  console.log(status,'--CustomUpload---')
```


# 自定义表单组件

## CustomAddDrawing

```react tsx 
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { DatePicker, Form } from 'antd';
import moment from 'moment'
import styles from './index.less';
import CustomUpload from '@/components/CustomUpload';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DRAWING_TYPE, IMAGE_TYPE } from '@estate/common/constants/file-type.constant';
import { generateIdUtil } from '@/utils/generateId.util';
import { UploadFile } from '@estate/common-lib/types/models/file.model';
import isEmpty from 'lodash/isEmpty';
const cx = classNames.bind(styles);

export interface AddDrawingProps {
  maxLength?: number;
  value?: DateDrawingProps[];
  onChange?: (data: DateDrawingProps[]) => void;
}
export interface DateDrawingProps {
  date: string;
  files: UploadFile[];
  id: string;
}

const CustomAddDrawing: React.FC<AddDrawingProps> = (props) => {
  const { maxLength = 5, onChange ,value} = props;
  const emptyTemplate = (): DateDrawingProps[] => {
    return ([{
      date: '',
      files: [],
      id: generateIdUtil(8),
    }])
  };
  const [dateDrawing, setDateDrawing] = useState<DateDrawingProps[]>(emptyTemplate());
  const onAdd = () => {
    setDateDrawing((list) => {
      const newData = [...list, ...emptyTemplate()];
      onChange?.(newData);
      return newData;
    });
  };
  const onDateChange = (id: string, dateString: string) => {
    setDateDrawing((list) => {
      const newData = list.map((item) => {
        if (item.id === id) {
          item.date = dateString;
        }
        return item;
      });
      onChange?.(newData);
      return newData;
    });
  };
  const onFileChange = (id:string,files:UploadFile[])=>{
    const newData = dateDrawing.map((item) => {
      if (item.id === id) {
        item.files = files;
      }
      return item;
    });
    setDateDrawing(newData);
    onChange?.(newData);
  }
  useEffect(()=>{
    setDateDrawing(value || emptyTemplate())
  },[value])
  const onDel = (id: string) => {
    setDateDrawing(dateDrawing.filter((item) => item.id !== id));
  };
  const { status } = Form.Item.useStatus();
  const isError = status === 'error'
  const renderTemplate = (item: DateDrawingProps) => {
    const isFileError = isError && isEmpty(item.files)
    const isDateError = isError && !item.date
    return (
      <div className={cx('file-item')} key={item.id}>
        <CustomUpload
          btnText={'上传附件'}
          value={item.files}
          validateStatus={isFileError}
          uploadType={DRAWING_TYPE.concat(IMAGE_TYPE)}
          className={cx('file-upload')}
          onChange={(files:UploadFile[])=>onFileChange(item.id,files)}
        />
        {/* @ts-ignore*/}
        <DatePicker
          allowClear={false}
          autoFocus={false}
          className={cx({
            'validate-error':isDateError,
            'validate-normal':!isDateError
          })}
          value={item.date?moment(item.date):undefined}
          onChange={(_, dateString: string) => onDateChange(item.id, dateString)}
        />
        <div className={cx('line-icon')}>
          {maxLength > dateDrawing.length ? <PlusCircleOutlined onClick={onAdd} /> : null}
          {dateDrawing.length === 1 ? null : (
            <MinusCircleOutlined onClick={() => onDel(item.id)} />
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      {dateDrawing.map((item) => {
        return renderTemplate(item);
      })}
    </div>
  );
};
export default CustomAddDrawing;

```


index.less

```sass (sass)  
.file-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
  .file-upload {
    max-width: 180px;
  }
  .line-icon {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    span {
      cursor: pointer;
    }
  }

  :global{
    .validate-normal{
      border-color: #d9d9d9!important;
      box-shadow:initial;
    }
    .validate-error{
      border-color:@validate-error-red
    }

  }
}

```


## CustomUpload

```react tsx 
import React, { useState, useEffect } from 'react';
import { Button, message, Upload,Form } from 'antd';
import style from './index.less';
import classnames from 'classnames/bind';
import { PlusOutlined, PaperClipOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import type { RcFile } from 'antd/lib/upload/interface';
import { apiUploadFile } from '@estate/common/services/file.service';
import isEmpty from 'lodash/isEmpty'
import { UploadFile } from '@estate/common-lib/types/models/file.model';
import { IResponse } from '@estate/common-lib/types/models/response.model';
import { generateIdUtil } from '@/utils/generateId.util';
const cx = classnames.bind(style);
interface CustomUploadProps {
  btnText: string; // 上传按钮文字
  disabled?: boolean; // 禁用
  limit?: number; // 上传文件限制大小。单位为M
  uploadType: string[]; // 上传文件的后缀类型
  value?: UploadFile[];
  onChange?: (file: UploadFile[]) => void;
  maxCount?: number; // 上传数量
  uploadIcon?: React.ReactNode;
  beforeUpload?: () => boolean;
  className?: string;
  validateStatus?:boolean
}
const CustomUpload: React.FC<CustomUploadProps> = (props) => {
  const {
    btnText = '新增',
    disabled,
    limit = 200,
    uploadType = [],
    maxCount = 20,
    uploadIcon = <PlusOutlined />,
    value,
    onChange,
    className,
    validateStatus,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { loading, run } = useRequest(apiUploadFile, {
    manual: true,
    onSuccess: (res: IResponse<UploadFile>) => {
      const data = res.body
      if(!isEmpty(data)){
        const finalFileList:UploadFile[] = [...fileList, { ...data }];
        setFileList(finalFileList);
        onChange?.(finalFileList);
      }else{
        // mock
        const finalFileList:UploadFile[] = [...fileList, {
          fileId:generateIdUtil(8),
          downloadUrl:'ssssssss',
          fileName: 'xxxxxxxxxsss',
          ecsFileName:'sssssss',
          fileSize:'ssssssss',
        }];
        setFileList(finalFileList);
        onChange?.(finalFileList);
      }
    },
  });

  // 适配表单
  useEffect(() => {
    if (Array.isArray(value)) {
      if (value.length > maxCount) {
        const maxList = value.slice(0, maxCount);
        setFileList(maxList);
        onChange?.(maxList);
      } else {
        setFileList(value);
      }
    }else{
      setFileList([]);
      onChange?.([]);
    }
  }, [value, maxCount]);
  const uploadAction = (file: RcFile) => {
    // const { name, size, type } = file;
    const params = new FormData();
    params.append('file',file)
    // params.append('name', name);
    // params.append('size', String(size));
    // params.append('type', type);
    run(params);
  };
  const beforeUpload = (file: RcFile) => {
    const pointIndex = file.name?.lastIndexOf?.('.');
    const fileSuffix = file.name?.substring(pointIndex)?.toLowerCase();

    if (uploadType.indexOf(fileSuffix) === -1) {
      message.error(`格式错误：请上传${uploadType.join('、')}格式的文件`);
      return false;
    }
    const isLtM = file?.size <= limit * 1024 * 1024;

    if (!isLtM) {
      message.error(`文件超限：文件大小不能超过${limit}MB`);
      return false;
    }
    if (props.beforeUpload?.() === false) {
      return false;
    }
    uploadAction(file);
    return false;
  };

  const onDelete = (file: UploadFile, index: number) => {
    const cloneList = [...fileList];
    cloneList.splice(index, 1);
    setFileList(cloneList);
    onChange?.(cloneList);
  };

  const isDisabledStatus = disabled || fileList.length === maxCount || loading;
  return (
    <div className={`${cx('upload-wrapper')} ${className}`}>
      <Upload
        beforeUpload={beforeUpload}
        showUploadList={false}
        accept={uploadType.join(',')}
        disabled={isDisabledStatus}
        maxCount={maxCount}
        className={cx({
          'validate-error':validateStatus
        })}
      >
        <Button
          icon={uploadIcon}
          block
          className={cx('upload-btn', { disabled: isDisabledStatus })}
        >
          {btnText}
        </Button>
      </Upload>
      <div className={cx('uploaded-list')}>
        {fileList.map((item, index) => {
          return (
            <div key={item.fileId} className={cx('upload-list-item')}>
              <PaperClipOutlined />
              <span className={`ellipsis ${cx('upload-item-name')}`} title={item.fileName}>
                {item.fileName}
              </span>
              <DeleteOutlined onClick={() => onDelete(item, index)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomUpload;

```


index.less

```sass (sass)  
.upload-wrapper {
  overflow: hidden;
  .upload-btn {
    color: @text-deep-gray-color;
    &.disabled {
      cursor: not-allowed;
    }
  }
  .uploaded-list {
    width: 100%;
    .upload-list-item {
      display: flex;
      align-items: center;
      padding: 2px 0;
      cursor: pointer;
      &:hover {
        color: @hover-blue;
      }
      .upload-item-name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .validate-error{
    :global{
      .ant-btn{
        border-color:@validate-error-red
      }
    }
  }
}

```

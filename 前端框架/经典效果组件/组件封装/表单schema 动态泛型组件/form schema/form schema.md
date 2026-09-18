# form schema

## 目录

- [CustomFieldsItem](#CustomFieldsItem)
- [FieldsContentTypeEnums](#FieldsContentTypeEnums)
- [FieldsContent](#FieldsContent)
- [使用](#使用)
  - [basicFields](#basicFields)
  - [page use](#page-use)
  - [form config schema](#form-config-schema)
  - [validatorRule](#validatorRule)
- [重点](#重点)
  - [枚举转类型 typeof](#枚举转类型-typeof)

# CustomFieldsItem

```react tsx 
import React from 'react';
import classNames from 'classnames/bind';
import type { DicTypesEnum } from '@estate/common/types/enums/dict-type.enum';
import styles from './index.less';
import { Col, Form } from 'antd';
const cx = classNames.bind(styles);
import type { FormItemProps } from 'antd/lib/form';
import type { FieldsContentProps } from '@/components/CustomFieldsContent';
import FieldsContent from '@/components/CustomFieldsContent';
import type { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
import type { InputProps } from 'antd/lib/input/Input';
import type { DefaultOptionType, SelectProps } from 'antd/lib/select';
import type { DatePickerProps } from 'antd/lib/date-picker';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import type { AddDrawingProps } from '@/components/CustomAddDrawing';
import type { UploadPropTypes } from '@/components/CustomUploadImage';
import type { StaticShowProps } from '@/components/BuildingFormTemplate/StaticShow';
import type { CascaderProps } from 'antd/lib/cascader';
import type { CustomUploadProps } from '@/components/CustomUpload';
import type { CustomAddressProps } from '@/components/CustomAddress';
import type { YstOrgBookProps } from '../YstOrgSelector/YstOrgBookInput';
import type { YstUserBookProps } from '../YstUserSelector/YstUserBookInput';
import type { ManagementCascaderProps } from '@/components/ManagementCascader';
import type { InputNumberProps } from 'antd/lib/input-number';
import type { RadioProps, RadioGroupProps } from 'antd/lib/radio/interface';
import type { DicTypeOption } from '@estate/common/types/models/dict-type.model';
import type { OptionItem } from '@estate/common/types/models/common.model';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd/lib/form/FormList';
export type DefaultComponentsProps = FormItemProps &
  ManagementCascaderProps &
  Omit<InputNumberProps, 'onChange'> &
  UploadPropTypes &
  CustomUploadProps &
  StaticShowProps &
  CustomAddressProps &
  TextAreaProps &
  Omit<SelectProps, 'options' | 'filterOption' | 'mode'> &
  InputProps &
  Omit<DatePickerProps, 'mode'> &
  Omit<CascaderProps<DefaultOptionType>, 'options'> &
  AddDrawingProps &
  Omit<RadioGroupProps, 'options'> &
  RadioProps;
export type ItemProps = Omit<DefaultComponentsProps, 'onChange'> & {
  mode?: SelectProps['mode'] | DatePickerProps['mode'];
  filterOption?: boolean | ((input: string, option?: OptionItem) => boolean);
  key?: string;
  span?: number;
  label?: string;
  fieldKey?: FieldsContentTypeEnums;
  placeholder?: string;
  suffix?: string | React.ReactNode;
  options?: OptionItem[] | DicTypeOption[] | Pick<RadioGroupProps, 'options'>;
  WrapperEl?: <T>(data:CustomFieldsItemProps<T>)=>React.ReactElement | JSX.Element;
  hasPlaceholder?: boolean;
  dictType?: DicTypesEnum;
  hidden?: boolean;
  // 兼容多种数据格式 包括fileList  兼容setState
  onChange?: (data?: any) => void | React.Dispatch<React.SetStateAction<any>>;
  value?: any;
  dynamicConfig?: boolean;
};
interface CustomFieldsItemProps<T> {
  itemProps?: ItemProps;
  contentProps: T & FieldsContentProps;
  children?:React.ReactNode
}
export interface FieldsContentOps {
  [FieldsContentTypeEnums.Input]: InputProps;
  [FieldsContentTypeEnums.Select]: SelectProps;
  [FieldsContentTypeEnums.Date]: DatePickerProps;
  [FieldsContentTypeEnums.TextArea]: TextAreaProps;
  [FieldsContentTypeEnums.UploadDrawing]: AddDrawingProps;
  [FieldsContentTypeEnums.UploadImg]: UploadPropTypes;
  [FieldsContentTypeEnums.StaticShow]: StaticShowProps;
  [FieldsContentTypeEnums.Cascader]: CascaderProps<DefaultOptionType>;
  [FieldsContentTypeEnums.Uplaod]: CustomUploadProps;
  [FieldsContentTypeEnums.Address]: CustomAddressProps;
  [FieldsContentTypeEnums.YstOrgSelectorInput]: YstOrgBookProps;
  [FieldsContentTypeEnums.YstUserSelectorInput]: YstUserBookProps;
  [FieldsContentTypeEnums.UseManagementCascader]: ManagementCascaderProps;
  [FieldsContentTypeEnums.InputNumber]: InputNumberProps;
  [FieldsContentTypeEnums.Radio]: RadioProps;
}

/**
 * 注意：动态表单 初始值为空；必须手动给一个[value] 值；即使value 为空；否则不渲染
 * @param props
 * @constructor
 */
interface DynamicItemProps<K> extends CustomFieldsItemProps<K> {
  fields: FormListFieldData[];
  field: FormListFieldData;
  index: number;
  remove: (name: number) => void;
  add: Function;
}
function DynamicItem<k>(props: DynamicItemProps<k>) {
  const { fields, index, remove, add, field, contentProps, ...rest } = props;
  return (
    <div className={cx('dynamic-wrap')}>
      <FieldsContent<k> {...contentProps} {...rest} />
      {fields.length > 1 ? (
        <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
      ) : null}
      <PlusCircleOutlined onClick={() => add()} />
    </div>
  );
}
function CustomFieldsItem<T>(props: CustomFieldsItemProps<T>) {
  const { itemProps, contentProps } = props;
  const {
    span = 12,
    key,
    rules,
    label,
    labelCol = { span: 8 },
    wrapperCol = { span: 12 },
    WrapperEl,
    hidden = false,
    extra,
    help,
    tooltip,
    dynamicConfig = false,
  } = itemProps;
  const formItemLayout = {
    labelCol,
    wrapperCol,
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      span: wrapperCol.span,
      offset: labelCol.span,
    },
  };
  if (dynamicConfig) {
    return (
      <Col span={span} key={key} className={cx('field-col')}>
        <Form.List name={key}>
          {(fields, { add, remove }) => {
            return fields.map((field, index) => {
              return (
                <Form.Item
                  label={index === 0 ? label : ''}
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  hidden={hidden}
                  extra={extra}
                  help={help}
                  tooltip={tooltip}
                  {...field}
                >
                  <DynamicItem<T>
                    fields={fields}
                    index={index}
                    remove={remove}
                    add={add}
                    field={field}
                    contentProps={contentProps}
                  />
                </Form.Item>
              );
            });
          }}
        </Form.List>
      </Col>
    );
  }
  if (WrapperEl) {
    const childrenEl = (<Col span={span} key={key} className={cx('field-col')}>
      <Form.Item
        label={label}
        name={key}
        rules={rules}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        hidden={hidden}
        extra={extra}
        help={help}
        tooltip={tooltip}
      >
        <FieldsContent<T> {...contentProps} />
      </Form.Item>
    </Col>)
    if(typeof WrapperEl === 'function'){
        return  WrapperEl<T>({
          itemProps,
          contentProps,
          children:childrenEl
        })
    }
    const Comp  = WrapperEl as React.ElementType
    return (
      <Comp itemProps={itemProps} contentProps={contentProps} key={key}>
        {childrenEl}
      </Comp>
    );
  }
  return (
    <Col span={span} key={key} className={cx('field-col')}>
      <Form.Item
        label={label}
        name={key}
        rules={rules}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        hidden={hidden}
        extra={extra}
        help={help}
        tooltip={tooltip}
      >
        <FieldsContent<T> {...contentProps} />
      </Form.Item>
    </Col>
  );
}
export default CustomFieldsItem;

```


# FieldsContentTypeEnums

```react tsx 
export enum FieldsContentTypeEnums {
  Select = 'select',
  Input = 'input',
  Date = 'date',
  TextArea = 'textArea',
  UploadDrawing = 'uploadDrawing',
  UploadImg = 'uploadImg',
  StaticShow = 'staticShow',
  Cascader = 'cascader',
  Uplaod = 'upload',
  Address = 'Address',
  YstOrgSelectorInput = 'YstOrgSelectorInput',
  YstUserSelectorInput = 'YstUserSelectorInput',
  UseManagementCascader = 'UseManagementCascader',
  InputNumber = 'InputNumber',
  Radio = 'radio',
}


```


# FieldsContent

```react tsx 
import { Cascader, DatePicker, Input, Select, InputNumber, Radio } from 'antd';
import React, { useMemo } from 'react';
import style from './index.less';
import classnames from 'classnames/bind';
import { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
import CustomAddDrawing from '@/components/CustomAddDrawing/';
import CustomUploadImage from '../CustomUploadImage';
import StaticShow from '@/components/BuildingFormTemplate/StaticShow';
import type { DicTypesEnum } from '@estate/common/types/enums/dict-type.enum';
import { YstOrgSelector, YstUserSelector } from '@/components';
import CustomUpload from '../CustomUpload';
import CustomAddress from '../CustomAddress';
import ManagementCascader from '@/components/ManagementCascader';
const cx = classnames.bind(style);

const { YstOrgBookInput } = YstOrgSelector;
const { YstUserBookInput } = YstUserSelector;

const { TextArea } = Input;
export interface FieldsContentProps {
  fieldKey?: FieldsContentTypeEnums;
  hasPlaceholder?: boolean;
  placeholder?: string;
  dictType?: DicTypesEnum;
}
export const containerProps = {
  getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement,
};
function FieldsContent<T>(props: FieldsContentProps & T) {
  const { fieldKey, placeholder, hasPlaceholder = true, dictType, ...rest } = props;
  const _placeholder = useMemo(
    () => (hasPlaceholder ? placeholder : ''),
    [hasPlaceholder, placeholder],
  );
  switch (fieldKey) {
    case FieldsContentTypeEnums.Input:
      return <Input placeholder={_placeholder} {...rest} />;
    case FieldsContentTypeEnums.Select:
      return <Select placeholder={_placeholder} {...rest} {...containerProps} />;
    case FieldsContentTypeEnums.TextArea:
      return <TextArea placeholder={_placeholder} {...rest} />;
    case FieldsContentTypeEnums.Date:
      return (
        <DatePicker
          placeholder={_placeholder}
          {...rest}
          className={cx('date-picker-fields')}
          {...containerProps}
        />
      );
    case FieldsContentTypeEnums.UploadDrawing:
      return <CustomAddDrawing {...rest} />;
    case FieldsContentTypeEnums.UploadImg:
      return <CustomUploadImage {...rest} />;
    case FieldsContentTypeEnums.StaticShow:
      return <StaticShow {...rest} />;
    case FieldsContentTypeEnums.Cascader:
      return <Cascader placeholder={_placeholder} {...rest} {...containerProps} />;
    case FieldsContentTypeEnums.Uplaod:
      return <CustomUpload {...rest} />;
    case FieldsContentTypeEnums.Address:
      return <CustomAddress {...rest} />;
    case FieldsContentTypeEnums.YstOrgSelectorInput:
      return <YstOrgBookInput placeholder={_placeholder} {...rest} />;
    case FieldsContentTypeEnums.YstUserSelectorInput:
      return <YstUserBookInput placeholder={_placeholder} {...rest} />;
    case FieldsContentTypeEnums.UseManagementCascader:
      return <ManagementCascader placeholder={_placeholder} {...rest} />;
    case FieldsContentTypeEnums.InputNumber:
      return <InputNumber {...rest} placeholder={_placeholder} className={cx('input-number')} />;
    case FieldsContentTypeEnums.Radio:
      return <Radio.Group {...rest} />;
    default:
      return null;
  }
}
export default FieldsContent;



```


# 使用

### basicFields

```react tsx 
import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import CustomHeaderName from '@/components/CustomHeaderName';
const cx = classNames.bind(styles);
import { Row } from 'antd';
import CustomFieldsItem from '@/components/CustomFieldsItem/index';
import type { ItemProps } from '@/components/CustomFieldsItem/index';
import type { FieldsContentOps } from '@/components/CustomFieldsItem/index';
import type { FieldsContentProps } from '@/components/CustomFieldsContent';
import type { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
interface BasicFieldsProps {
  source: ItemProps[];
  title?: string;
  coverItemMethod?: (data: ItemProps) => ItemProps;
  coverContentMethod?: (data: ItemProps) => ItemProps;
}
const BasicFields: React.FC<BasicFieldsProps> = (props) => {
  const { source = [], coverItemMethod, coverContentMethod, title } = props;
  return (
    <div>
      {title && <CustomHeaderName title={title} />}
      <Row className={cx('field-row')}>
        {source.map((item) => {
          const {
            key,
            label,
            span,
            rules,
            labelCol,
            WrapperEl,
            dictType,
            wrapperCol,
            hidden,
            extra,
            tooltip,
            dynamicConfig,
            ...rest
          } = item;
          const type: FieldsContentTypeEnums = item.fieldKey;
          const coverItem = coverItemMethod ? coverItemMethod(item) : {};
          const coverContent = coverContentMethod ? coverContentMethod(item) : {};
          const itemProps = {
            key,
            label,
            span,
            labelCol,
            wrapperCol,
            WrapperEl,
            rules,
            dictType,
            hidden,
            extra,
            tooltip,
            dynamicConfig,
            ...coverItem,
          };
          const contentProps = { ...rest, ...coverContent };
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
export default BasicFields;

```


### page use

```react tsx 
import React, { useMemo, useState, useEffect } from 'react';
import { Form, Button, Spin } from 'antd';
import { CustomTabs } from '@/components';
import BasicFields from '@/components/BuildingFormTemplate/BasicFields';
import { BASIC_SCHEMA_LIST, MANAGE_SCHEMA_LIST } from '@/constants/newly-building.constant';
import style from './index.less';
import classnames from 'classnames/bind';
import type { ItemProps } from '@/components/CustomFieldsItem';
import { useModel } from '@@/plugin-model/useModel';
import { useParams, useLocation } from 'umi';
import type { IPageLocation, PageParams } from '@estate/common/types/models/common.model';
import type { IItems } from '@/components/CustomTabs';
import { PageTypeEnum } from '@estate/common/types/enums/common.enum';
import { goNotFound } from '@/utils/navigator.util';
import {
  apiAddBuilding,
  apiChangeBuildingInfo,
  apiGetBuildingDetail,
} from '@estate/common/services/building.service';
import { useRequest, useUpdateEffect } from 'ahooks';
import { history } from 'umi';
import type { IResponse } from '@estate/common/types/models/response.model';
import type { BuildingDetailModel } from '@estate/common/types/models/building.model';
import type { NewlyBuildingFormOps } from '@estate/common/types/models/building.model';
import {
  getCompanyValue,
  registerBuildingFormToQuery,
  registerBuildingQueryToForm,
} from '@/utils/formQueryTransform.util';
import { CustomMessage } from '@/components/CustomNotice';
import useMatchOrganHook from '@/hooks/useMatchOrganHook';

const cx = classnames.bind(style);
interface QueryOps {
  estateId: string;
}
const CustomNewlyBuilding: React.FC = () => {
  const [form] = Form.useForm();
  const { dictMap, organOptions, organList } = useModel('useInitDataModel', (model) => ({
    dictMap: model.dictMap,
    organOptions: model.organOptions,
    organList: model.organList,
  }));
  const [detailRes, setDetailRes] = useState<Partial<BuildingDetailModel>>({});
  const { refreshTreeData } = useModel('useBuildingTree');
  const { type } = useParams<PageParams>();
  const { query = {} } = useLocation<IPageLocation<QueryOps>>();
  const isEdit = type === PageTypeEnum.edit;

  const estateId = query?.estateId;
  const { run: runChange } = useRequest(apiChangeBuildingInfo, {
    manual: true,
    debounceWait: 1000,
    debounceLeading: true,
    debounceTrailing: false,
    onSuccess: () => {
      CustomMessage('编辑成功');
      refreshTreeData();
      history.goBack();
    },
  });
  const { run: runCreate } = useRequest(apiAddBuilding, {
    manual: true,
    debounceWait: 1000,
    debounceLeading: true,
    debounceTrailing: false,
    onSuccess: () => {
      CustomMessage('新增成功');
      refreshTreeData();
      history.goBack();
    },
  });
  const { loading } = useRequest(apiGetBuildingDetail, {
    manual: !isEdit,
    onSuccess: (res: IResponse<BuildingDetailModel>) => {
      const { body } = res || {};
      const fields = registerBuildingQueryToForm(body);
      setDetailRes(body ?? {});
      form.setFieldsValue(fields);
    },
    defaultParams: [estateId],
  });
  const { originPathId } = useMatchOrganHook(!isEdit);
  useEffect(() => {
    if (!isEdit && originPathId) {
      form.setFieldValue('manageOrganInfo', getCompanyValue(originPathId));
    }
  }, [originPathId, isEdit]);
  useUpdateEffect(() => {
    if (!isEdit) {
      //  从编辑 到新增了
      form.resetFields();
      form.setFieldValue('manageOrganInfo', getCompanyValue(originPathId));
    }
  }, [isEdit]);
  const onFinish = (values: NewlyBuildingFormOps) => {
    const info = registerBuildingFormToQuery(values, estateId, detailRes?.useManageInfo?.id);
    if (isEdit) {
      runChange(estateId, info);
    } else {
      runCreate(info);
    }
  };
  const onSubmit = () => {
    form.submit();
  };

  const tabCard = useMemo((): IItems[] => {
    return [
      {
        key: '1',
        label: isEdit ? '编辑楼栋' : '新增楼栋',
      },
    ];
  }, [isEdit]);

  const onCoverBasicContent = (data: ItemProps): ItemProps => {
    if (data.dictType) {
      const opts = dictMap?.[data?.dictType];
      if (opts) return { options: opts };
      return { options: [] };
    }
    return {};
  };
  const onCancel = () => {
    history.goBack();
  };
  const onCoverManageContent = (data: ItemProps): ItemProps => {
    const emptyTemplate: ItemProps = {};
    if (['useOrganInfo', 'manageOrganInfo'].includes(data.key)) {
      emptyTemplate.organList = organList;
      emptyTemplate.organOptions = organOptions;
    }
    if ('manageOrganInfo' === data.key) {
      emptyTemplate.disabled = isEdit || !!originPathId;
    }
    return emptyTemplate;
  };
  if (![PageTypeEnum.edit, PageTypeEnum.create].includes(type)) {
    goNotFound();
    return null;
  }
  return (
    <div className={cx('page-wrapper')}>
      <CustomTabs card items={tabCard} />
      <div className={cx('building-form')}>
        <Spin spinning={loading}>
          <Form form={form} onFinish={onFinish}>
            <BasicFields
              source={BASIC_SCHEMA_LIST}
              title={'基础信息'}
              coverContentMethod={onCoverBasicContent}
            />
            <BasicFields
              source={MANAGE_SCHEMA_LIST}
              title={'使用管理'}
              coverContentMethod={onCoverManageContent}
            />
          </Form>
        </Spin>
      </div>
      <div className={cx('footer')}>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onSubmit} type={'primary'}>
          确定
        </Button>
      </div>
    </div>
  );
};
export default CustomNewlyBuilding;


```


### form config schema

```react tsx 
import { FieldsContentTypeEnums } from '@/types/enums/FieldsContent.enum';
import Wrapper from '@/components/BuildingFormTemplate/Wrapper';
import type { ItemProps } from '@/components/CustomFieldsItem';
import {
  formDrawingRule,
  formLocationAddressRule,
  formValidatorNumCheckRule,
} from '@/utils/formValidator.util';
import { DicTypesEnum } from '@estate/common/types/enums/dict-type.enum';
import { PUBLIC_SIZE, WHOLE_ROW_LAYOUT } from '@/constants/form-layout.constant';
export const BASIC_SCHEMA_LIST: ItemProps[] = [
  {
    key: 'imageFiles',
    label: '房产图片',
    fieldKey: FieldsContentTypeEnums.UploadImg,
    ...WHOLE_ROW_LAYOUT,
  },
  {
    key: 'buildingAbbreviation',
    label: '房产简称',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请输入',
    rules: [{ required: true, type: 'string', max: 50, message: '请输入房产简称,最多50字符' }],
    maxLength: 50,
    ...PUBLIC_SIZE,
  },
  {
    key: 'buildingName',
    label: '房产全称',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请输入',
    rules: [{ required: false, type: 'string', max: 50, message: '房产全称最多50字符' }],
    maxLength: 50,
    ...PUBLIC_SIZE,
  },
  {
    key: 'buildingNo',
    label: '房产编号',
    fieldKey: FieldsContentTypeEnums.Input,
    placeholder: '请输入',
    rules: [
      {
        required: true,
        type: 'string',
        max: 50,
        message: '房产编号最多50字符',
      },
    ],
    maxLength: 50,
    ...PUBLIC_SIZE,
  },
  {
    key: 'property',
    label: '性质',
    fieldKey: FieldsContentTypeEnums.Select,
    placeholder: '请选择',
    rules: [{ required: true, type: 'string', message: '请选择房产性质' }],
    dictType: DicTypesEnum.房产性质,
    ...PUBLIC_SIZE,
  },
  {
    key: 'buildingSource',
    label: '房产来源',
    fieldKey: FieldsContentTypeEnums.Select,
    placeholder: '请选择',
    rules: [{ required: true, type: 'string', message: '请选择房产来源' }],
    dictType: DicTypesEnum.房产来源,
    ...PUBLIC_SIZE,
  },
  {
    key: 'structureType',
    label: '建筑结构',
    fieldKey: FieldsContentTypeEnums.Select,
    dictType: DicTypesEnum.建筑结构,
    placeholder: '请选择',
    ...PUBLIC_SIZE,
  },
  {
    key: 'structureArea',
    label: '建筑面积',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    addonAfter: 'm²',
    placeholder: '请输入',
    rules: [{ required: true, ...formValidatorNumCheckRule(false, 0, 9999999) }],
  },
  {
    key: 'propertyArea',
    label: '产权面积',
    placeholder: '请输入',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    addonAfter: 'm²',
    rules: [{ required: true, ...formValidatorNumCheckRule(false, 0, 9999999) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'aboveGroundArea',
    label: '地上建筑面积',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    addonAfter: 'm²',
    placeholder: '请输入',
    rules: [{ required: false, ...formValidatorNumCheckRule(true, 0, 9999999) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'underGroundArea',
    label: '地下建筑面积',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    addonAfter: 'm²',
    placeholder: '请输入',
    rules: [{ required: false, ...formValidatorNumCheckRule(true, 0, 9999999) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'aboveGroundStoreys',
    label: '自然层数（地上）',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    placeholder: '请输入',
    rules: [{ required: false, ...formValidatorNumCheckRule(true, 0, 10000, false) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'underGroundStoreys',
    label: '地下层数',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    placeholder: '请输入',
    rules: [{ required: false, ...formValidatorNumCheckRule(true, 0, 10000, false) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'useYear',
    label: '使用年限（年）',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    placeholder: '请输入',
    rules: [{ required: true, ...formValidatorNumCheckRule(false, 1, 10000, false) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'startUseDate',
    label: '开始使用时间',
    fieldKey: FieldsContentTypeEnums.Date,
    placeholder: '请选择',
    rules: [{ required: true, message: '请选择开始使用时间' }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'buildingStructureForm',
    label: '房产建筑形态',
    fieldKey: FieldsContentTypeEnums.Select,
    placeholder: '请选择',
    dictType: DicTypesEnum.房产建筑形态,
    ...PUBLIC_SIZE,
  },
  {
    key: 'parkingSpaceQuantity',
    label: '车位数',
    placeholder: '请输入',
    fieldKey: FieldsContentTypeEnums.InputNumber,
    WrapperEl: Wrapper,
    rules: [{ required: false, ...formValidatorNumCheckRule(true, 0, 10000, false) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'locationAddress',
    label: '坐落地址',
    fieldKey: FieldsContentTypeEnums.Address,
    placeholder: '请选择',
    ...WHOLE_ROW_LAYOUT,
    rules: [{ required: true, ...formLocationAddressRule() }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'drawingInformation',
    label: '图纸附件',
    fieldKey: FieldsContentTypeEnums.UploadDrawing,
    placeholder: '请选择',
    ...WHOLE_ROW_LAYOUT,
    rules: [{ required: true, ...formDrawingRule(false) }],
    ...PUBLIC_SIZE,
  },
  {
    key: 'surroundingsExplain',
    label: '环境说明',
    fieldKey: FieldsContentTypeEnums.TextArea,
    placeholder: '请输入土地环境、交通环境、经营环境及瑕疵原因等说明内容',
    ...WHOLE_ROW_LAYOUT,
    autoSize: { minRows: 3, maxRows: 5 },
    ...PUBLIC_SIZE,
    maxLength: 1000,
    showCount: true,
    rules: [{ required: false, type: 'string', max: 1000, message: '环境说明最多1000字符' }],
  },
];

export const MANAGE_SCHEMA_LIST: ItemProps[] = [
  {
    key: 'manageOrganInfo',
    label: '管理单位',
    fieldKey: FieldsContentTypeEnums.UseManagementCascader,
    placeholder: '请选择',
    ...PUBLIC_SIZE,
    rules: [{ required: true, message: '请选择管理单位' }],
  },
  {
    key: 'useOrganInfo',
    label: '使用单位',
    fieldKey: FieldsContentTypeEnums.UseManagementCascader,
    placeholder: '请选择',
    ...PUBLIC_SIZE,
    rules: [{ required: true, message: '请选择使用单位' }],
  },
];

```


### validatorRule

```react tsx 
import type { FormRule } from 'antd';
import { isNumber } from 'ahooks/es/utils';
import type { DateDrawingProps } from '@estate/common/types/models/file.model';
import isEmpty from 'lodash/isEmpty';
import type { AddressVal } from '@/components/CustomAddress';
import { isCellularPhone, isFixedPhone } from '@estate/common/utils/daily-regexp.util';

/***
 * form 表单针对 小数和 整数 的一个校验
 */
export const formValidatorNumCheckRule = (
  canEmpty: boolean,
  min: number,
  max: number,
  isFloat: boolean = true,
  floatLength: string = '2',
) => {
  const regTemplate: string = isFloat ? `^[0-9]+([.]{1}[0-9]{1,${floatLength}}){0,1}$` : '^[0-9]*$';
  const tip: string = isFloat ? `请输入最多保留${floatLength}位小数的数字` : '请输入正整数';
  const reg: RegExp = new RegExp(regTemplate);
  return {
    validator: (rule: FormRule, value: string) => {
      if (canEmpty && [undefined, '', null].includes(value)) {
        return Promise.resolve();
      }
      if (reg.test(value)) {
        if (isNumber(Number(value)) && Number(value) <= max && Number(value) >= min) {
          return Promise.resolve();
        } else {
          return Promise.reject(`请输入${min}-${max}之间的数值`);
        }
      } else {
        return Promise.reject(tip);
      }
    },
  };
};

/***
 * 带时间的图纸信息上传 校验配置
 */
export const formDrawingRule = (canEmpty: boolean = false) => {
  return {
    validator: async (rule: FormRule, value: DateDrawingProps[]) => {
      if (isEmpty(value)) {
        if (canEmpty) return Promise.resolve();
        return Promise.reject('请完善图纸信息');
      }
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (item.drawingDate === '' || isEmpty(item.files)) {
          return Promise.reject('请完善图纸信息');
        }
      }
      return Promise.resolve();
    },
  };
};
/**
 * 坐落地址
 * 省、市、区、详细地址
 */
export const formLocationAddressRule = () => {
  return {
    validator: async (rule: FormRule, value: AddressVal) => {
      const { city, district, province, detailedAddress } = value || {};
      if (!city || !district || !province || !detailedAddress) {
        return Promise.reject('请完善地址信息');
      }
      return Promise.resolve();
    },
  };
};

/**
 * 电话的校验
 * 移动  和  座机
 */
export const formPhoneNoRule = (data?: {
  isCellular?: boolean;
  isFixed?: boolean;
  canEmpty?: boolean;
}) => {
  return {
    validator: async (rule: FormRule, value: string) => {
      const { isCellular = true, isFixed = true, canEmpty = false } = data || {};
      if (canEmpty && value === undefined) {
        return Promise.resolve();
      }
      if (isCellular && !isFixed && !isCellularPhone(value)) {
        return Promise.reject('请输入有效的移动电话号码');
      }
      if (isFixed && !isCellular && !isFixedPhone(value)) {
        return Promise.reject('请输入有效的的固定电话号码');
      }
      if (isFixed && isCellular && !(isCellularPhone(value) || isFixedPhone(value))) {
        return Promise.reject('请输入有效的的电话号码');
      }
      return Promise.resolve();
    },
  };
};

```


# 重点

### 枚举转类型 typeof

```react tsx 
<CustomFieldsItem<FieldsContentOps[typeof type]></CustomFieldsItem>
```

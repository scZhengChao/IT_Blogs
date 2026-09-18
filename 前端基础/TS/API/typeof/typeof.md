# typeof

## 目录

- [推出类型](#推出类型)
  - [案例](#案例)

# 推出**类型**

除了做类型保护，还可以从**实现推出类型**。

> 注意：此时的 typeof 是一个类型关键词，只可以用在类型语法中（ts中）。

有点像把js 转出对应的ts类型

```typescript 
function fn(x: string) {
  return x.length
}
​
const obj = {
  x: 1,
  y: '2'
}
​
type T0 = typeof fn // (x: string) => number
type T1 = typeof obj // {x: number; y: string }


```


## 案例

```react tsx 
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
 const type: FieldsContentTypeEnums = item.fieldKey;
<CustomFieldsItem<FieldsContentOps[typeof type]></CustomFieldsItem>
```

# ProFormList

```react tsx 
import type { FormRule } from 'antd';
import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import {
  ProFormList,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
} from '@ant-design/pro-components';
import { Button, Col, Row, message } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import type { UserBrief } from '@LT59.05/yst-open-web';
import useSaasUserSelectorHook from '@/hooks/useSaasUserSelectorHook';
import type {  FormListActionType } from '@ant-design/pro-components';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';
import { useModel } from '@umijs/max';
import { DictionaryTypesEnum } from '@mealCard/common/types/enums/dictionary.enum';
import { isCellularPhone,isFixedPhone } from '@mealCard/common/utils/daily-regexp.util';
const cx = classNames.bind(styles);
interface BindMealCardProps {
  isActive: boolean;
}
const BindMealCard: React.FC<BindMealCardProps> = (props) => {
  const { clear, openSaasUserSelector } = useSaasUserSelectorHook();
  const { getSingleDictionary } = useModel('useInitDataModel', (model) => ({
    getSingleDictionary: model.getSingleDictionary,
  }));
  const identityCodeOptions = getSingleDictionary(DictionaryTypesEnum.身份类型);
  const companyOptions = getSingleDictionary(DictionaryTypesEnum.所属公司);
  const actionRef = useRef<FormListActionType>();
  const onResetRow = (edit: Function) => {
    edit({
      userName: undefined,
      openId: undefined,
    });
  };
  const onChooseUser = (edit?: Function) => {
    const isAdd = isUndefined(edit);
    clear();
    openSaasUserSelector({
      onOk: async (val: UserBrief[]) => {
        const user = val[0];
        if (!user) return;
        const list = actionRef.current?.getList();
        const { userName, openId } = user;
        const isRepeat = list.find((item) => item?.openId === openId);
        if (isRepeat) return message.warn('请勿重复添加');
        if (isAdd) {
          actionRef.current.add({
            userName,
            openId,
            isSelect: true,
          });
        } else {
          edit({
            userName,
            openId,
            isSelect: true,
          });
        }
      },
    });
  };
  return (
    <div className={cx('first-main')}>
      <div className={cx('first-header')}>
        <Button type="primary" onClick={() => onChooseUser()}>
          添加人员信息
        </Button>
        <label className={cx('btn-label')}>
          注：行员新员工首次开卡，请优先【选择】人员，当无人员数据时再手动录入；
        </label>
      </div>
      <div className={cx('first-form')}>
        <ProFormList
          name="accountInfo"
          creatorButtonProps={false}
          copyIconProps={false}
          deleteIconProps={false}
          actionRef={actionRef}
          initialValue={[{}]}
        >
          {(field, index, { add, remove, getCurrentRowData, setCurrentRowData }) => {
            const item = getCurrentRowData();
            return (
              <Row key={field.key} className={cx('form-row')}>
                <ProFormText
                  colProps={{ span: 5 }}
                  label="员工卡号"
                  name={'cardNo'}
                  placeholder={'请输入员工卡号'}
                  rules={[{ required: true, message: '请输入员工卡号' }]}
                />
                <ProFormSelect
                  colProps={{ span: 5 }}
                  label="身份类型"
                  name={'identityCode'}
                  fieldProps={{
                    fieldNames: { label: 'name', value: 'code' },
                  }}
                  rules={[{ required: true, message: '请选择身份类型' }]}
                  placeholder={'请选择身份类型'}
                  options={identityCodeOptions as unknown as string[]}
                />
                <ProFormSelect
                  colProps={{ span: 5 }}
                  label="所属公司"
                  name={'companyCode'}
                  rules={[{ required: true, message: '请选择所属公司' }]}
                  fieldProps={{
                    fieldNames: { label: 'name', value: 'code' },
                  }}
                  placeholder={'请选择所属公司'}
                  options={companyOptions as unknown as string[]}
                />
                <ProFormSelect
                  name={'userName'}
                  label="员工姓名"
                  colProps={{ span: 5 }}
                  placeholder={'请选择员工姓名'}
                  rules={[{ required: true, message: '请选择员工姓名' }]}
                  options={companyOptions as unknown as string[]}
                  fieldProps={{
                    open: false,
                    onClick: () => onChooseUser(setCurrentRowData),
                    suffixIcon: <UserAddOutlined />,
                    onClear: () => onResetRow(setCurrentRowData),
                  }}
                />

                <ProFormText
                  colProps={{ span: 5 }}
                  label="员工编号"
                  name={'openId'}
                  rules={[{ required: true, message: '请输入员工编号' }]}
                  fieldProps={{
                    maxLength: 30,
                    disabled: item.isSelect,
                  }}
                />
                <ProFormText
                  colProps={{ span: 5 }}
                  placeholder={'请输入手机号码'}
                  label="手机号码"
                  name={'phone'}
                  rules={[{
                    required: true,
                    message: '请输入手机号码',
                    validator: async (rule: FormRule, value: string) => {
                      if ( !(isCellularPhone(value) || isFixedPhone(value))) {
                        return Promise.reject('请输入有效的的电话号码');
                      }
                      return Promise.resolve();
                    },
                  }]}
                />
                <ProFormDatePicker
                  colProps={{ span: 5 }}
                  label="有效期"
                  name={'expireTime'}
                  rules={[{ required: true, message: '请选择有效期' }]}
                  placeholder={'请选择有效期'}
                  fieldProps={{
                    disabledDate: (date) => {
                      return date && date < moment().endOf('day');
                    },
                  }}
                />
                <Col className={cx('action-col')} span={4}>
                  {index >= 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={()=>remove(index)}
                    />
                  ) : null}
                  <PlusCircleOutlined onClick={() => add()} />
                </Col>
              </Row>
            );
          }}
        </ProFormList>
      </div>
    </div>
  );
};
export default BindMealCard;

```

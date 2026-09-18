# 面包屑

## 目录

- [umi](#umi)

# umi

```react tsx 
import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);
import { Breadcrumb } from 'antd'
// @ts-ignore
import routes from '/config/routes'
import {useRouteMatch } from 'umi'
import { getPathByKey } from '@/utils/common.util';
import isEmpty from 'lodash/isEmpty'
interface PageBreadProps {

}
const PageBread: React.FC<PageBreadProps> = (props)=> {
  const path = useRouteMatch().path
  const floor = useMemo(()=>{
    return getPathByKey(path,routes)
  },[path])
  if(path === '/' || isEmpty(floor) ) return null
  console.log(floor)
  return <Breadcrumb separator=">" className={cx('bread-container')}>
    {/*<Breadcrumb.Item href={'/'} className={cx('bread-item')}>展厅首页</Breadcrumb.Item>*/}
    {
      floor.map(value=>{
        console.log(value.path)
        return  <Breadcrumb.Item href={value.path} key={value.path} className={cx('bread-item',{active:path===value.path})}>{value.breadName}</Breadcrumb.Item>
      })
    }
  </Breadcrumb>
}
export default PageBread;

```

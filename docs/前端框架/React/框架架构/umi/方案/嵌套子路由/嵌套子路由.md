# 嵌套子路由

## 目录

- [config/routes.ts](#configroutests)
- [页面内使用](#页面内使用)

嗯；**不需要自己写Route，Switch 等**

# config/routes.ts

```typescript 
 {
    path: '/',
     component : '@/layouts/AdminLayout',
    wrappers: ['@/wrappers/Login'],
    routes: [
      { path: '/', redirect: 'property' },
      {
        path: 'property', // 房产管理
        routes: [
          {
            path: '/property',
            redirect: 'register',
          },
          {
            path: 'register',
            component: '@/pages/Property/Register',
            routes: [
              {
                path: 'building/detail',
                component: '@/pages/Property/Register/BuildingDetail',
              },
              {
                path: 'building/:type',
                component: '@/pages/Property/Register/CustomNewlyBuilding',
              },
              {
                path: 'floor/detail',
                component: '@/pages/Property/Register/FloorDetail',
              },
              {
                path: 'floor/:type',
                component: '@/pages/Property/Register/CustomNewlyFloor',
              },
              {
                path: 'house/:type',
                component: '@/pages/Property/Planning',
              },
            ],
          },
          {
            path: 'plan',
            component: '@/pages/Property/Planning',
          },
          {
            path: 'use',
            component: '@/pages/Property/Using',
          },
          {
            path: 'licence',
            component: '@/pages/Property/Licence',
          },
        ],
      },
    ],
  },
```


# 页面内使用

```react tsx 
import type { PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

export default function Index(props:  PropsWithChildren<Record<string, unknown>> ) {
  

  return (
    <div className="flex h-full">
      <CustomSiderBar
        onSelectNode={(id, Type) => selectNode(id, Type)}
        topNode={
          <Button
            className={cx('add-btn')}
            type="link"
            icon={<PlusOutlined />}
            onClick={onAddBuilding}
          >
            新增楼栋
          </Button>
        }
        onAddFloor={onAddFloor}
      />
      <div className={cx('detail')}> {props.children} </div>
    </div>
  );
}
```

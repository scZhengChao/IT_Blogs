import React from 'react';
import { Link, usePageData } from '@rspress/core/runtime';

export default function GlobalBreadcrumb() {
  const { page } = usePageData();

  const routePath = page.routePath || '/';

  // 首页不显示
  if (routePath === '/') {
    return null;
  }

  const cleanPath = routePath
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');

  if (!cleanPath) {
    return null;
  }

  const parts = cleanPath
    .split('/')
    .filter(Boolean);

  const items = parts.map((part, index) => {
    const link =
      '/' +
      parts.slice(0, index + 1).join('/') +
      '/';

    return {
      name: decodeURIComponent(part),
      link,
    };
  });

  // 当前页面的父级
  const parentPath =
    parts.length > 1
      ? '/' +
        parts
          .slice(0, -1)
          .join('/') +
        '/'
      : '/';

  const parentName =
    parts.length > 1
      ? decodeURIComponent(parts[parts.length - 2])
      : '首页';

  return (
    <div className="global-breadcrumb">
      <div className="global-breadcrumb__inner">
        <Link
          href={parentPath}
          className="global-breadcrumb__back"
        >
          <span>←</span>
          <span>{parentName}</span>
        </Link>

        <span className="global-breadcrumb__separator">
          /
        </span>

        <div className="global-breadcrumb__path">
          {items.map((item, index) => (
            <React.Fragment key={item.link}>
              {index > 0 && (
                <span className="global-breadcrumb__separator">
                  /
                </span>
              )}

              {index === items.length - 1 ? (
                <span className="global-breadcrumb__current">
                  {item.name}
                </span>
              ) : (
                <Link href={item.link}>
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
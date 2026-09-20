import { Layout as BaseLayout } from '@rspress/core/theme-original';

import GlobalBreadcrumb from '../components/GlobalBreadcrumb';

/**
 * Places route navigation inside the document column. This avoids the global
 * sticky bar covering the main navigation and keeps the content width aligned
 * with every article.
 */
export function Layout() {
  return (
    <BaseLayout
      beforeDocContent={<GlobalBreadcrumb />}
    />
  );
}

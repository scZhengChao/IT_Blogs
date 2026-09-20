import { Layout as BaseLayout } from '@rspress/core/theme-original';

import GlobalBreadcrumb from '../components/GlobalBreadcrumb';
import { PageContextRail } from '../components/PageContextRail';

/**
 * Uses a CSS scroll-driven animation for reading progress, avoiding per-scroll
 * React updates on long documents.
 */
function ReadingProgress() {
  return (
    <div
      className="reading-progress"
      aria-hidden="true"
    />
  );
}

/**
 * Places route navigation inside the document column. This avoids the global
 * sticky bar covering the main navigation and keeps the content width aligned
 * with every article.
 */
export function Layout() {
  return (
    <BaseLayout
      beforeDocContent={(
        <>
          <ReadingProgress />
          <GlobalBreadcrumb />
        </>
      )}
      beforeOutline={<PageContextRail />}
    />
  );
}

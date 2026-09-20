import { Layout as BaseLayout } from '@rspress/core/theme-original';

import GlobalBreadcrumb from '../components/GlobalBreadcrumb';
import { PageContextRail } from '../components/PageContextRail';

/**
 * Animates reading progress with CSS, avoiding per-scroll React updates.
 * The navbar slot keeps the bar in the same sticky container as the header so
 * browser overscroll moves both together instead of opening a visible gap.
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
 * Anchors reading progress inside the navbar and keeps breadcrumbs aligned
 * with the document column. The title slot sits inside the sticky header,
 * unlike beforeNav/afterNav, which would leave the bar outside that container.
 */
export function Layout() {
  return (
    <BaseLayout
      afterNavTitle={<ReadingProgress />}
      beforeDocContent={<GlobalBreadcrumb />}
      beforeOutline={<PageContextRail />}
    />
  );
}

import {
  usePageData,
  useSidebar,
} from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme-original';

interface NavigationItem {
  text?: string;
  link?: string;
  items?: NavigationItem[];
}

function normalizeRoutePath(routePath: string) {
  return routePath
    .replace(/\/index\.html$/, '')
    .replace(/\/+$/, '');
}

/**
 * Flattens the active sidebar into a compact list for the right-hand context
 * rail. The result is intentionally capped so navigation remains scannable.
 */
function collectRelatedPages(
  items: NavigationItem[],
  currentRoute: string,
) {
  const pages: Array<{
    text: string;
    link: string;
  }> = [];

  function walk(item: NavigationItem) {
    if (
      item.link &&
      item.text &&
      normalizeRoutePath(item.link) !==
        normalizeRoutePath(currentRoute)
    ) {
      pages.push({
        text: item.text,
        link: item.link,
      });
    }

    item.items?.forEach(walk);
  }

  items.forEach(walk);
  return pages.slice(0, 6);
}

/**
 * Uses sibling pages from the active sidebar to fill otherwise-empty outline
 * space on short documents without reading or changing Markdown metadata.
 */
export function PageContextRail() {
  const sidebar = useSidebar() as NavigationItem[];
  const { page } = usePageData();
  const relatedPages = collectRelatedPages(
    sidebar,
    page.routePath || '/',
  );

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <section className="page-context">
      <h2>In this section</h2>

      <div className="page-context__links">
        {relatedPages.map(pageItem => (
          <Link key={pageItem.link} href={pageItem.link}>
            <span>{pageItem.text}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { usePageData } from '@rspress/core/runtime';
import {
  IconLink,
  IconSuccess,
  Link,
  SvgWrapper,
} from '@rspress/core/theme-original';

interface LibrarySection {
  title: string;
  label: string;
  description: string;
  link: string;
  tone: 'green' | 'blue' | 'amber' | 'rose';
}

const LIBRARY_SECTIONS: LibrarySection[] = [
  {
    title: 'Frontend Basics',
    label: 'FE',
    description: 'HTML, CSS, JavaScript and TypeScript',
    link: '/前端基础/',
    tone: 'green',
  },
  {
    title: 'Frameworks',
    label: 'UI',
    description: 'React, Vue and cross-platform development',
    link: '/前端框架/',
    tone: 'blue',
  },
  {
    title: 'Engineering',
    label: 'DX',
    description: 'Build systems, tooling and architecture',
    link: '/前端工程/',
    tone: 'amber',
  },
  {
    title: 'Platforms',
    label: 'PF',
    description: 'Node.js, desktop and mobile platforms',
    link: '/前端平台/',
    tone: 'rose',
  },
  {
    title: 'Special Topics',
    label: 'SP',
    description: 'Performance, media, graphics and patterns',
    link: '/前端专题/',
    tone: 'green',
  },
  {
    title: 'Backend',
    label: 'BE',
    description: 'Server-side development and services',
    link: '/服务端/',
    tone: 'blue',
  },
  {
    title: 'Docker',
    label: 'DO',
    description: 'Containers, images and deployment',
    link: '/docker学习/',
    tone: 'amber',
  },
  {
    title: 'Networking',
    label: 'NW',
    description: 'Protocols, CDN and service discovery',
    link: '/网络服务运维/',
    tone: 'rose',
  },
  {
    title: 'Go',
    label: 'GO',
    description: 'Language fundamentals and server patterns',
    link: '/go语言学习/',
    tone: 'green',
  },
  {
    title: 'Java',
    label: 'JV',
    description: 'Core Java, frameworks and applications',
    link: '/java学习/',
    tone: 'blue',
  },
  {
    title: 'Python',
    label: 'PY',
    description: 'Language notes and practical examples',
    link: '/python学习/',
    tone: 'amber',
  },
  {
    title: 'Rust',
    label: 'RS',
    description: 'Ownership, tooling and systems programming',
    link: '/rust学习/',
    tone: 'rose',
  },
  {
    title: 'Linux',
    label: 'LX',
    description: 'Shell, administration and system tooling',
    link: '/liunx学习/',
    tone: 'green',
  },
  {
    title: 'Field Notes',
    label: 'FN',
    description: 'Browsers, tools and engineering notes',
    link: '/技术杂谈/',
    tone: 'blue',
  },
];

/**
 * Decodes route segments for display while preserving malformed historical
 * paths instead of letting a decoding error break the navigation UI.
 */
function decodeRouteSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/**
 * Renders the landing directory from configuration rather than Markdown so
 * thousands of legacy documents remain untouched.
 */
function LibraryHome() {
  return (
    <section className="library-home" aria-labelledby="library-title">
      <header className="library-home__header">
        <p className="library-home__eyebrow">ENGINEERING KNOWLEDGE BASE</p>
        <h1 id="library-title">IT Notes</h1>
        <p className="library-home__summary">
          Practical references across frontend, backend, languages, and systems.
        </p>
      </header>

      <div className="library-home__grid">
        {LIBRARY_SECTIONS.map(section => (
          <Link
            key={section.link}
            href={section.link}
            className="library-card"
          >
            <span
              className={`library-card__mark library-card__mark--${section.tone}`}
              aria-hidden="true"
            >
              {section.label}
            </span>

            <span className="library-card__body">
              <strong>{section.title}</strong>
              <span>{section.description}</span>
            </span>

            <span className="library-card__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Provides route-aware navigation for every document page. The current route
 * is read from Rspress page data, so the component does not inspect or mutate
 * Markdown content.
 */
export default function GlobalBreadcrumb() {
  const { page } = usePageData();
  // Tracks clipboard feedback locally without changing route or page data.
  const [hasCopied, setHasCopied] = useState(false);
  const routePath = page.routePath || '/';

  if (routePath === '/' || routePath === '/index.html') {
    return <LibraryHome />;
  }

  const cleanPath = routePath
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\/index\.html$/, '');
  const parts = cleanPath
    .split('/')
    .filter(Boolean);

  if (parts.length === 0) {
    return <LibraryHome />;
  }

  /**
   * Each breadcrumb keeps its cumulative route so navigation works for deeply
   * nested historical paths without requiring metadata in the Markdown file.
   */
  const items = parts.map((part, index) => ({
    name: decodeRouteSegment(part),
    link: `/${parts.slice(0, index + 1).join('/')}/`,
  }));
  const parentParts = parts.slice(0, -1);
  const parentPath = parentParts.length
    ? `/${parentParts.join('/')}/`
    : '/';
  const parentName = parentParts.length
    ? decodeRouteSegment(parentParts[parentParts.length - 1])
    : 'Library';

  /**
   * Copies the canonical browser URL for sharing. Clipboard access only runs
   * after a user gesture, so server rendering remains deterministic.
   */
  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 1600);
  }

  return (
    <nav className="global-breadcrumb" aria-label="Breadcrumb">
      <Link
        href={parentPath}
        className="global-breadcrumb__back"
        title={`Back to ${parentName}`}
        aria-label={`Back to ${parentName}`}
      >
        <span aria-hidden="true">←</span>
      </Link>

      <div className="global-breadcrumb__path">
        <Link href="/" className="global-breadcrumb__home">
          Library
        </Link>

        {items.map((item, index) => (
          <React.Fragment key={item.link}>
            <span
              className="global-breadcrumb__separator"
              aria-hidden="true"
            >
              /
            </span>

            {index === items.length - 1 ? (
              <span
                className="global-breadcrumb__current"
                aria-current="page"
              >
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

      <button
        type="button"
        className="global-breadcrumb__copy"
        onClick={handleCopyLink}
        title={hasCopied ? 'Copied' : 'Copy link'}
        aria-label={hasCopied ? 'Link copied' : 'Copy page link'}
      >
        <SvgWrapper
          icon={hasCopied ? IconSuccess : IconLink}
        />
      </button>
    </nav>
  );
}

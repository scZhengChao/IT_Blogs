import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { SearchButton } from '@rspress/core/theme-original';

/*
 * Keep the search implementation outside the initial theme chunk. Rspress'
 * stock panel fetches the complete local index when it first mounts, so the
 * panel itself must remain unmounted until the user expresses search intent.
 */
const SearchPanel = lazy(async () => {
  const theme = await import('@rspress/core/theme-original');

  return {
    default: theme.SearchPanel,
  };
});

/**
 * Preserves the stock search UI and keyboard shortcut while deferring both the
 * panel code and multi-megabyte local index until search is actually opened.
 */
export function Search() {
  // Controls whether the expensive search implementation exists in the tree.
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused) {
      return undefined;
    }

    /**
     * The stock panel owns keyboard handling while open. This listener only
     * handles the closed state, avoiding duplicate shortcut reactions.
     */
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.code === 'KeyK' &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        setFocused(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focused]);

  return (
    <>
      <SearchButton setFocused={setFocused} />

      {focused ? (
        <Suspense fallback={null}>
          <SearchPanel
            focused={focused}
            setFocused={setFocused}
          />
        </Suspense>
      ) : null}
    </>
  );
}

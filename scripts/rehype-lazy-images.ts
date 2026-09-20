interface HastNode {
  type?: string;
  tagName?: string;
  name?: string;
  properties?: Record<string, unknown>;
  attributes?: Array<{
    type: string;
    name: string;
    value: string;
  }>;
  data?: {
    hProperties?: Record<string, unknown>;
  };
  children?: HastNode[];
}

/**
 * Handles local Markdown images before Rspress converts them into imported MDX
 * elements. External images remain standard Markdown nodes and receive the
 * same HTML properties through `hProperties`.
 */
export function remarkLazyImages() {
  return (tree: HastNode) => {
    function visit(node: HastNode) {
      if (node.type === 'image') {
        node.data = {
          ...node.data,
          hProperties: {
            ...node.data?.hProperties,
            loading: 'lazy',
            decoding: 'async',
          },
        };
      }

      if (
        (node.type === 'mdxJsxFlowElement' ||
          node.type === 'mdxJsxTextElement') &&
        node.name === 'img'
      ) {
        const attributes = node.attributes || [];

        if (!attributes.some(attribute => attribute.name === 'loading')) {
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'loading',
            value: 'lazy',
          });
        }

        if (!attributes.some(attribute => attribute.name === 'decoding')) {
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'decoding',
            value: 'async',
          });
        }

        node.attributes = attributes;
      }

      node.children?.forEach(visit);
    }

    visit(tree);
  };
}

/**
 * Adds browser-native image loading hints while Markdown is compiled. Writing
 * these attributes into raw HTML images covers nodes that pass through the
 * rehype pipeline rather than Rspress' Markdown image transform.
 */
export function rehypeLazyImages() {
  return (tree: HastNode) => {
    function visit(node: HastNode) {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = {
          ...node.properties,
          loading: node.properties?.loading || 'lazy',
          decoding: node.properties?.decoding || 'async',
        };
      }

      node.children?.forEach(visit);
    }

    visit(tree);
  };
}

# demo

![](./assets/image/image_xJvpTz7aRV.png)

```typescript 

declare module 'rc-field-form/lib/interface' {
  export interface RuleObject {
    required:boolean
  }
}

declare module 'query-string' {
  export function parse<T>(query: string, options?: ParseOptions): T;
}

interface EventTarget {
  dataset?:Record<string, any>
}

```

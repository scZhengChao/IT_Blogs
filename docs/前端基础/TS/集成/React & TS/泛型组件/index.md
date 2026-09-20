# 泛型组件

## 目录

- [函数式组件](#函数式组件)
  - [或者](#或者)
- [forwardRef 的情况下](#forwardRef-的情况下)
  - [Type assertion](#Type-assertion)
  - [Create a custom ref / The Wrapper Component](#Create-a-custom-ref--The-Wrapper-Component)
  - [Augment forwardRef](#Augment-forwardRef)

## 函数式组件

```react 
interface AppointTableProps<T> {
  columns: ColumnsType<T>;
  sourceData: AppointListItem[];
  onRefresh: (current: number, size: number) => void;
  total: number;
  loading: boolean;
}
function AppointTable<T extends object>(props: AppointTableProps<T>){


< AppointTable<AppointListCondition>
             columns={columns}
            sourceData={records}
            onRefresh={fetchTable}
            total={total}
            loading={loading}
            reSetPage={condition}
       />

```


### 或者

```react tsx 
const CustomTabs = <T,>(props: IProps<T>) => {

}
```


## forwardRef 的情况下

解决方案：

[ TypeScript + React: Typing Generic forwardRefs If you are creating component libraries and design systems in React, you might already have fowarded Refs to the DOM elements inside your components. https://fettblog.eu/typescript-react-generic-forward-refs/](https://fettblog.eu/typescript-react-generic-forward-refs/ " TypeScript + React: Typing Generic forwardRefs If you are creating component libraries and design systems in React, you might already have fowarded Refs to the DOM elements inside your components. https://fettblog.eu/typescript-react-generic-forward-refs/")

#### Type assertion

```typescript 
const ClickableList = React.forwardRef(ClickableListInner) as <T>(
  props: ClickableListProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> }
) => ReturnType<typeof ClickableListInner>;

function TablePage<T extends object>(props: TablePageProps<T>, ref: Ref<RefProps>) {}
function TablePage<T extends object>(props: TablePageProps<T>, ref: ForwardedRef<RefProps>) {}

export default forwardRef(TablePage) as <T>(
  props: TablePageProps<T> & { ref?: React.ForwardedRef<RefProps> },
) => ReturnType<typeof TablePage>;

```


#### Create a custom ref / The Wrapper Component

```typescript 
type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function ClickableList<T>(
  props: ClickableListProps<T>
) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}
```


#### Augment forwardRef

```typescript 
// Redecalare forwardRef
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}


// Just write your components like you're used to!

type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
};
function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = React.forwardRef(ClickableListInner);
```


[table 分页器](<../../../../../前端框架/经典效果组件/组件封装/table 分页器/index.md> "table 分页器")

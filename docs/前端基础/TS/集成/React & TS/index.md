# React & TS

## 目录

- [合并props](#合并props)
- [声明class组件](#声明class组件)
  - [第一种](#第一种)
  - [第二种](#第二种)
  - [第三种](#第三种)
- [hooks声明](#hooks声明)
  - [useReducer ](#useReducer-)
- [require  import ](#require-import-)
- [element 的类型](#element-的类型)
  - [常见的类型：](#常见的类型)
- [泛型：](#泛型)
  - [一、泛型类](#一泛型类)
- [antd](#antd)
- [forwardRef](#forwardRef)
- [ForwardRefRenderFunction](#ForwardRefRenderFunction)
- [ref](#ref)

[TypeScript 开发 React 最近，项目组准备用 TypeScript (以下简称 TS) 开发 ReactNative (以下简称 RN) 组件库 参考微软的 TS 项目 TypeScript-React-Native-Starter，实践了一把。 1. 初始化... https://www.dazhuanlan.com/2019/10/16/5da5f99b169cd/](https://www.dazhuanlan.com/2019/10/16/5da5f99b169cd/ "TypeScript 开发 React 最近，项目组准备用 TypeScript (以下简称 TS) 开发 ReactNative (以下简称 RN) 组件库 参考微软的 TS 项目 TypeScript-React-Native-Starter，实践了一把。 1. 初始化... https://www.dazhuanlan.com/2019/10/16/5da5f99b169cd/")

[React + TypeScript 实践 ❗️ 准备知识熟悉 React熟悉 TypeScript (参考书籍：2ality\x26#39;s guide\[1\], https://mp.weixin.qq.com/s/PRs9IsNeqS7JYILuOEEXIw](https://mp.weixin.qq.com/s/PRs9IsNeqS7JYILuOEEXIw "React + TypeScript 实践 ❗️ 准备知识熟悉 React熟悉 TypeScript (参考书籍：2ality\x26#39;s guide\[1], https://mp.weixin.qq.com/s/PRs9IsNeqS7JYILuOEEXIw")

# 合并props

例如我有一个组件，组件的类型自定义为BaseProps，但是我想这个组件**也拥有a标签的属性和方**法，这样子自定义的组件就可以拥有元素原生的属性跟方法了，例如onclick事件。TS中有&这个将两个类型合并为一个，**然后react中有React.AnchorHTMLAttributes 这个方法来获取a标签所有的属性和方法。**

```typescript 
type AnchorProps = BaseProps &  React.AnchorHTMLAttributes<HTMLElement]]>
```


# 声明class组件

## 第一种

```javascript 
type StateType = {
  name: string;
  number: number;
};

type propType = {
    name: string;
    number: number;
};

interface Test1 {
  state: StateType;
  props:propType
}

class Test1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: 2
    };
}
```


## 第二种

```javascript 
class Test1 extends React.Component<propType,StateType>

React.PureComponent<P,S,SS> 
上面PureComponent中还有个SS，这个SS是getSnapshotBeforeUpdate的返回值

```


## 第三种

```javascript 
class SoundsPlay extends Component{
    constructor(props:PropType){
        super(props)
        this.state = {

        }
    }
    props:PropType
    state:State
}
```


**推荐第二种,第一种**

# hooks声明

useState可以使用泛型传参或者自动推断&#x20;

```typescript 
 const [state, setState] = useState(''); // state的类型为string，自动推断
const [state, setState] = useState<string>(); // state的类型为 string | undefined
// 给初值
const [state, setState] = useState<string | null>(null); // state的类型为 string | null
```


useRef同样也会自动推断&#x20;

```typescript 
 const ref = useRef(""); // ref.current的类型为 string
// 泛型
type Value = { value: string };
const ref = useRef<Value>({ value: "" });
// ref为html元素
const ref = useRef<HTMLDivElement>(null);
return <div ref={ref} />;
//需要注意的是如果ref为元素，那么初始值得写个null才不会报错
```


### useReducer&#x20;

useReducer相对来说要写的更多一点，可以自动推断，所以不需要手动写泛型类型（其实我也不知道手动写怎么写Orz）&#x20;

```typescript 
 // state类型
interface ReducerState {
  value: string;
}
// action类型
interface AnyAction {
  type: string;
  [key: string]: any;
}
// reducer函数
const reducer: React.Reducer<ReducerState, AnyAction> = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// 初始值
const initialState: ReducerState = { value: "" };
 
const [state, dispatch] = useReducer(reducer, initialState);
// state 的类型为 ReducerState
// dispatch 的类型为 React.Dispatch<AnyAction>

```


# require  import&#x20;

typescript无法识别非代码资源，所以图片无法识别。&#x20;

需要新建一个ts声明文件：images.d.ts&#x20;

```javascript 
 declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
```


然后将images.d.ts配置到tsconfig.json中：&#x20;

```javascript 
 
"include": [
    "./typings/images.d.ts" //文件路径
  ],
```


页面引入import logo from './logo.svg';即可

# element 的类型

```typescript 
 let childs: React.ReactElement<any> = null  as  any 
public menus?: ({ cancel, saveToLocal }: any) => React.ReactElement<any>
```


## 常见的类型：

# 泛型：

### 一、泛型类

泛型可以用于类和构造器，例如：

```typescript 
class Person<T>{
    private _value: T;
    constructor(val: T) {
        this._value = val;
    }
}
let p = new Person<number>(12)
```


- JSX元素类型'...'没有任何构造或调用签名

  any 类型或者
- changing the ‘lib‘ compiler option to include ‘dom‘

```typescript 
"lib": [
    "dom"
]
```


- **【React报错之Property 'value' does not exist on type EventTarget】** 截图显示，当我们将鼠标悬停在内联事件处理器的`e`变量上时，我们便得到了事件的正确类型。

```typescript 
YARN yarn add @types/react @types/react-dom --dev

```


# antd

**这里记住不完；可以用到时；到node\_modules 里面去看**

```react tsx 
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
```


# forwardRef

```react tsx 
React.ForwardRefRenderFunction<ForwardedRef<RefProps>,AppointTableProps>

// 或者

interface TablePageProps<T> {
  columns: ColumnsType<T>;
  sourceData: T[];
  onRefresh: (current: number, size: number, orders: IListOrder[]) => void;
  total: number;
  loading?: boolean;
  pageSizeOptions?: number[];
  onDataOps?: INoDataProps;
  initPage?: number;
  initPageSize?: number;
  rowKey?: string;
  tableClass?: string;
  pageClass?: string;
  wraperClass?: string;
  tableWrapperClass?: string;
}
interface TableInfoProps {
  currentPage: number;
  pageSize: number;
  orderParams?: IListOrder[];
}

export interface RefProps {
  reSetPage?: <T>(extra?: T) => void;
  getPageInfo?: () => TableInfoProps;
  refreshCurrentPage?: <T>(extra?: T) => void;
}

function TablePage<T extends object>(props: TablePageProps<T>, ref: ForwardedRef<RefProps>) {
   useImperativeHandle(ref, () => ({
      reSetPage: <K,>(extra?: K) => {
        setCurrentPage(1);
        onRefresh(1, pageSize, orderParams, extra);
      },
      getPageInfo: () => {
        return { currentPage, pageSize, orderParams };
      },
      refreshCurrentPage: <J,>(extra?: J) => {
        onRefresh(currentPage, pageSize, orderParams, extra);
      },
    }));
}
export default forwardRef(TablePage) as <T>(
  props: TablePageProps<T> & { ref?: React.ForwardedRef<RefProps> },
) => ReturnType<typeof TablePage>;

```


# ForwardRefRenderFunction

```typescript 
import {useState,useImperativeHandle,forwardRef} from 'react';
import type {  ForwardRefRenderFunction  } from 'react'
import {Modal } from "antd";
import type { ModalProps } from 'antd';
export interface ConfigOptions extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  content?: React.ReactNode;
  onOk?:() => Promise<any>
}

export interface HookModalProps {
  afterClose: () => void;
  config: ConfigOptions;
}

export interface HookModalRef {
  destroy: () => void;
  update: (config: ConfigOptions) => void;
}

const HookModal:  ForwardRefRenderFunction<HookModalRef, HookModalProps>  = (
  { afterClose, config },
  ref,
) => {
  const [open, setOpen] = useState<boolean>(true);
  const [innerConfig, setInnerConfig] = useState<ConfigOptions>(config);

  const close =  () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ConfigOptions) => {
      setInnerConfig(originConfig => ({
        ...originConfig,
        ...newConfig,
      }));
    },
  }));
  const {
    content,
    okText,
    cancelText,
    onOk,
    ...rest
  } =  innerConfig
  const onHandleOk = async ()=>{
    try{
      await onOk?.()
      close()
    }catch (e){
      console.error(e)
    }
  }

  return (
    <Modal
      visible={open}
      afterClose={afterClose}
      okText={okText}
      cancelText={cancelText}
      onCancel={close}
      onOk={onHandleOk}
      {...rest}
    >
      {content}
    </Modal>
  )
};

export default  forwardRef(HookModal); 



```


# ref

```typescript 
import type {  ForwardedRef } from 'react';

ForwardedRef<RefProps>
```


[泛型组件](./泛型组件/index.md "泛型组件")

[组件类型](./组件类型/index.md "组件类型")

[常见问题](IT/前端基础/TS/集成/React%20&%20TS/常见问题/常见问题.md "常见问题")

[其他类型](./其他类型/index.md "其他类型")

# Jest + React 单元测试最佳实践&#x20;

## 目录

- [前言](#前言)
- [测试目的](#测试目的)
  - [1、排除故障](#1排除故障)
  - [2、保证团队成员的逻辑统一](#2保证团队成员的逻辑统一)
  - [3、可以提高质量代码](#3可以提高质量代码)
  - [4、起到很好的说明文档作用](#4起到很好的说明文档作用)
- [规范](#规范)
  - [工具](#工具)
  - [基础语法](#基础语法)
  - [注意事项](#注意事项)
    - [1、函数命名](#1函数命名)
    - [2、业务代码](#2业务代码)
    - [3、代码重构](#3代码重构)
    - [4、覆盖率](#4覆盖率)
    - [5、修复问题](#5修复问题)
    - [6、toBe or toEqual](#6toBe-or-toEqual)
- [我们需要测试什么](#我们需要测试什么)
- [单元测试场景](#单元测试场景)
  - [1、快照测试](#1快照测试)
  - [2、dom 结构测试](#2dom-结构测试)
  - [3、事件测试](#3事件测试)
  - [4、function测试](#4function测试)
  - [5、异步测试](#5异步测试)
  - [6、模拟属性和方法的返回结果](#6模拟属性和方法的返回结果)
  - [7、Drag](#7Drag)
  - [8、test.only](#8testonly)

## 前言

单元测试是一种用于测试“单元”的软件测试方法，其中“单元”的意思是指软件中各个独立的组件或模块。开发者需要为他们的代码编写测试用例以确保这些代码可以正常使用。

在我们的业务开发中，通常应用的是敏捷开发的模型。在此类模型中，单元测试在大部分情况下是为了确保代码的正常运行以及防止在未来迭代的过程中出现问题。

## 测试目的

### 1、排除故障

每个应用的开发中，多少会出现一些意料之外的 bug。通过测试应用程序，可以帮助我们大大减少此类问题，并且增强应用程序的逻辑性。

### 2、保证团队成员的逻辑统一

如果您是团队的新成员，并且对应用程序还不熟悉，那么一组测试就好像是有经验的开发人员监视你编写代码，确保您处于代码应该执行的正确路线之内。通过这些测试，您可以确信在添加新功能或更改现有代码时不会破坏任何东西。

### 3、可以提高质量代码

当您在编写 React 组件时 **，由于考虑到测试，最好的方案将是创建独立的、更可重用的组件。如果您开始为您的组件编写测试，并且您注意到这些组件不容易测试，那么您可能会重构您的组件，最终起到改进它们的效果。**

### 4、起到很好的说明文档作用

测试的另一个作用是，它可以为您的开发团队生成良好的文档。当某人对代码库还不熟悉时，他们可以查看测试以获得指导，这可以提供关于组件应该如何工作的意图的洞察，并为可能要测试的边缘部分提供线索。

## 规范

### 工具

在袋鼠云数栈团队，我们建议使用[jest](https://github.com/facebook/jest "jest")+[@testing-library/react](https://github.com/testing-library/react-testing-library "@testing-library/react")来书写测试用例。后者是为`DOM`和`UI`组件测试的软件工具。

### 基础语法

- `describe`：一个将多个相关的测试组合在一起的块
- `test`：将运行测试的方法，别名是`it`
- `expect`：断言，判断一个值是否满足条件，你会使用到`expect`函数。 但你很少会单独调用`expect`函数， 因为你通常会结合`expect`和匹配器函数来断言某个值
- `skip`：跳过指定的`describe`以及`test`，用法`describe.skip`/`test.skip`
- `cleanup`：在每一个测试用例结束之后，确保所有的状态能回归到最初状态，比如在 UI 组件测试中，我们建议在`afterEach`中调用`cleanup`函数

```typescript 
import { cleanup } from '@testing-library/react';

describe('For test', () => {
  afterEach(cleanup);
  test('...', () => {})
})

```


### 注意事项

#### 1、函数命名

关于是使用`test`还是使用`it`的争论，我们不做限制。但是建议一个项目里，尽量保持风格一致，如果其余测试用例中均为`test`，则建议保持统一。

#### 2、业务代码

我们建议尽量把业务代码的函数的功能单一化，简单化。如果一个函数的功能包含了十几个功能数十个功能，那我们建议对该函数进行拆分，从而更加有利于测试的进行。

#### 3、代码重构

在重构代码之前，请确保该模块的测试用例已经补全，否则重构代码的风险会过于巨大，从而导致无法控制开发成本。

#### 4、覆盖率

我们建议尽量以覆盖率 100% 为目标。当然，在具体的开发过程中会有各种各样的情况，所以很少有能够达到 100% 的情况出现。

#### 5、修复问题

每当我们修复了一个 bug，我们应当评估是否有必要为这个 bug 添加一个测试用例。如果需要的话，则在测试用例中新增一条以确保后续的开发中不会复现该 bug。

评估的参考内容如下：

- 是否会造成白屏或其他严重的问题
- 是否会影响用户的交互行为
- 是否会影响内容的展示

以上内容，满足一条或多条，则认为应当为该 bug 新增测试用例。

#### 6、toBe or toEqual

这两者的区别在于，`toBe`是相等，即`===`，而`toEqual`是内容相同，即深度相等。我们建议基础类型用`toBe`，复杂类型用`toEqual`。

## 我们需要测试什么

包括但不限于以下几种：

- Component Data：组件静态数据
- Component Props：组件动态数据
- User Interaction：用户交互，例如单击
- LifeCycle Methods：生命周期逻辑
- Store：组件状态值
- Route Params：路由参数
- 输出的dom
- 外部调用的函数
- 对子组件的改变

## 单元测试场景

### 1、快照测试

如果是一个纯渲染的页面或者组件，我们可以通过快照记录最终效果，下一次快照结果会去对比是否正确。 &#x20;
使用场景：对于一个已知的固定的结果，我们使用快照去记录结果，每次进行测试会将最新结果和记录结果进行对比，如果一致，则代表测试通过，反之，则不然。

通常在测试 UI 组件时，我们会建议进行快照测试，以确保 UI 不会有意外的改变。这里我们建议使用`react-test-renderer`进行快照测试。

```bash 
yarn add react-test-renderer @types/react-test-renderer -D

```


安装完成后，建议在 UI 测试的首个测试用例进行快照测试。

```typescript 
import React from 'react';
import renderer from 'react-test-renderer';
import { Toolbar } from '..';

test('Match Snapshot', () => {
  const component = renderer.create(<Toolbar data={toolbarData} />);
  const toolbar = component.toJSON();
  expect(toolbar).toMatchSnapshot();
});

```


### 2、dom 结构测试

使用场景：对于当前组件接收到的参数或者数据，会对应渲染出一个固定结构，我们对结构进行解析，看是否与预期相符。比如表格的行数应该与接口返回的 list 长度一致，表格的表头应该固定是我们设定的文案，表格的对应某一格应该是接口返回的对应行和列的值。再比如组件内部根据接收的 props 的变量去判断显示 dom 结构，那我们在单测传入某一个值时，我们的预期应该是显示为什么样的。我们建议使用[@testing-library/jest-dom](https://github.com/testing-library/jest-dom "@testing-library/jest-dom")做相关的测试

```markdown 
yarn add --dev @testing-library/jest-dom

```


测试例子如下：

```javascript 
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test Breadcrumb Component', () => {
  test('Should support to render custom title', async () => {
    const { container, getByTitle } = render(
       <MyComponent
         renderTitle={() => "I'm renderTitle";}
        />
     );

    const testDom = await waitFor(() =>
      container.querySelector('[title="test1"]')
    );
    const dom = await waitFor(() =>
      container.querySelector('[title="I\'m renderTitle"]')
    );

    expect(testDom).not.toBeInTheDocument();
    expect(dom).toBeInTheDocument();
  });
});

```


除了`toBeInTheDocument`外，还有其余接口，参见官方文档。

### 3、事件测试

使用场景：当组件或者页面上有点击事件，对于点击后发生的一系列动作是我们需要检测的，首先需要用 fireEvent 去模拟事件发生，然后测试事件是否正确触发，比如我的表单操作按钮，对于操作后的动作进行一一检测对应。

```javascript 
const btns = btnBox.getElementsByClassName('ant-btn');
// 取消
fireEvent.click(btns[0]);
await waitFor(() => {
  expect(API.getProductListNew).toHaveBeenCalled();
});

```


### 4、function测试

```javascript 
function add(a, b){
  return a+b;
}
it('test add function', () => {
  expect(add(2,2)).toBe(4);
})

```


### 5、异步测试

使用场景：当你的预期需要时间等待

- `waitFor`：可能会多次运行回调，直到达到超时

```javascript 
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))

```


- `useFakeTimers`：指定 Jest 使用假的全局日期、性能、时间和定时器 API，通常需要和`runAllTicks`、`runAllTimers`配合。

```javascript 
test('should warn if not saved custom type but clicked custom button', () => {
  const { getByText, baseElement } = wrapper;

  jest.useFakeTimers();
  fireEvent.click(getByText('自定义类型'));
  fireEvent.mouseDown(getByText('自定义类型'));

  expect(getByText('名称不能为空')).toBeInTheDocument();
  jest.runAllTimers();

  const inputEle = baseElement.querySelector('.dt-input');
  fireEvent.change(inputEle, { target: { value: '1' } });
  jest.useFakeTimers();
  fireEvent.click(getByText('自定义类型'));

  expect(getByText('请先保存')).toBeInTheDocument();
  jest.runAllTimers();
});

```


### 6、模拟属性和方法的返回结果

使用场景：当访问的某些属性或者方法在当前环境不存在时。

```javascript 
// 已有属性：jest.spyOn，例子如下
jest.spyOn(document.documentElement, 'scrollWidth', 'get').mockImplementation(() => 100);

// 未知属性：Object.defineProperty，例子如下
Object.defineProperty(window, 'getComputedStyle', { value: jest.fn(() => ({ paddingLeft: '0px'})

// 方法的返回结果：jest.mock
function = jest.mock(() => {})

```


### 7、Drag

有时候，我们需要去测试拖拽功能，我们建议用以下函数来执行模拟拖拽的操作

```typescript 
import { fireEvent } from '@testing-library/react';

function dragToTargetNode(source: HTMLElement, target: HTMLElement) {
  fireEvent.dragStart(source);
  fireEvent.dragOver(target);
  fireEvent.drop(target);
  fireEvent.dragEnd(source);
}

```


### 8、test.only

在出现测试用例无法通过，但是又判断代码的**逻辑**没有问题之后，将该条测试用例设置为`only`再跑一遍测试用例，以确保不是其他测试用例导致的该测试用例的失败。这类问题经常出现自代码中欠缺深拷贝，导致多条测试用例之中修改了原数据从而使得数据不匹配。

```typescript 
// mycode.ts
function add(record: Record<string, any>){
  Object.assign(record, { flag: false});
}

// mycode.test.ts
const mockData = {};
test('',() => {
  add(mockData)
  ...
  ...
})

test.only('',() => {
  add(mockData) // the mockData is modified by add function here
  ...
  ...
})

```

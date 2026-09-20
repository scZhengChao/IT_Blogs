# JSX element type does not have any construct or call signatures

## 目录

- [总览](#总览)
- [React.ElementType](#ReactElementType)

## 总览

&#x20;      当我们试图将**元素**或`react`组件作为属性传递给另一个组件，但是属性的类型声明错误时，会产生"J`SX element type does not have any construct or call signatures`"错误。为了解决该错误，可以使用`React.ElementType`类型。

这里有个例子来展示错误是如何发生的。

```react tsx 
// App.tsx
import React from 'react';

interface Props {
  comp: JSX.Element;
}

const Wrapper: React.FunctionComponent<Props> = props => {
  const {comp: Comp} = props;
  // ⛔️ JSX element type 'Comp' does not have any construct or call signatures.ts(2604)
  return (
    <div>
      <Comp name="James" />
    </div>
  );
};

const App: React.FunctionComponent = () => {
  const heading = ({name}: {name: string}) => <h2>Hello {name}</h2>;

  return (
    <div>
      <Wrapper comp={heading} />
    </div>
  );
};

export default App;

```


我们尝试将一个React组件作为属性传递给`Wrapper`组件，但我们将该React组件的类型声明为`JSX.Element`。

## React.ElementType

为了解决该错误，将属性的类型声明为`React.ElementType`。

```react tsx 
// App.tsx
import React from 'react';

interface Props {
  comp: React.ElementType; // 👈️ type it as React.ElementType
}

const Wrapper: React.FunctionComponent<Props> = props => {
  // 👇️ component names must start with capital letter
  const {comp: Comp} = props;
  return (
    <div>
      <Comp name="James" />
    </div>
  );
};

const App: React.FunctionComponent = () => {
  // 👇️ takes a name prop
  const heading = ({name}: {name: string}) => <h2>Hello {name}</h2>;

  return (
    <div>
      <Wrapper comp={heading} />
    </div>
  );
};

export default App;

```


> 请注意，`React.ElementType`可以为**元素期望的属性类型传递一个泛型**。

在这个例子中，我们必须传递给它一个具有字符串类型的`name`属性的对象，因为那是`heading`组件接收的属性。

```react tsx 
// App.tsx
import React from 'react';

interface Props {
  // ✅ explicitly type props comp takes
  comp: React.ElementType<{name: string}>;
}

const Wrapper: React.FunctionComponent<Props> = props => {
  // 👇️ component names must start with capital letter
  const {comp: Comp} = props;
  return (
    <div>
      <Comp name="James" />
    </div>
  );
};

const App: React.FunctionComponent = () => {
  const heading = ({name}: {name: string}) => <h2>Hello {name}</h2>;

  return (
    <div>
      <Wrapper comp={heading} />
    </div>
  );
};

export default App;

```


现在我们显式地声明了元素在使用时所接受的`comp`属性的类型。这有助于我们在向组件传递属性时利用IDE的自动完成功能。

我们也可以使用`React.ComponentType`，但这样我们就需要对**属性声明**类型。

```react tsx 
// App.tsx
import React from 'react';

interface Props {
  // 👇️ now using React.ComponentType 👇️
  comp: React.ComponentType<{name: string}>;
}

const Wrapper: React.FunctionComponent<Props> = props => {
  // 👇️ component names must start with capital letter
  const {comp: Comp} = props;
  return (
    <div>
      <Comp name="James" />
    </div>
  );
};

const App: React.FunctionComponent = () => {
  const heading = ({name}: {name: string}) => <h2>Hello {name}</h2>;

  return (
    <div>
      <Wrapper comp={heading} />
    </div>
  );
};

export default App;

```

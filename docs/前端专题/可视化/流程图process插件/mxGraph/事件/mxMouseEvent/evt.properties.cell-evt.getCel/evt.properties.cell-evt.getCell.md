# `evt.properties.cell/evt.getCell`

## 目录

- [功能概述](#功能概述)
  - [evt.properties.cell](#evtpropertiescell)
  - [evt.getCell()](#evtgetCell)
- [使用场景](#使用场景)
  - [evt.properties.cell](#evtpropertiescell)
  - [evt.getCell()](#evtgetCell)
- [区别](#区别)
  - [来源和实现方式](#来源和实现方式)
  - [可靠性和通用性](#可靠性和通用性)

在`mxGraph`中，`evt.properties.cell`和`evt.getCell()`有相似之处，但并不完全一样，下面从它们的功能、使用场景、区别等方面进行详细分析：

### 功能概述

#### `evt.properties.cell`

`evt.properties`是事件对象`evt`里存储额外属性的一个对象，`evt.properties.cell`指向的是与该事件相关联的单元格（`mxCell`）。在事件处理过程中，某些情况下会将相关的单元格信息存放在`evt.properties`这个属性集合里，开发者可以通过访问`evt.properties.cell`来获取该单元格。

#### `evt.getCell()`

`evt.getCell()`是事件对象`evt`提供的一个方法，其主要功能是直接获取触发该事件的单元格。这个方法封装了获取单元格的逻辑，会根据事件的具体情况从合适的地方提取出对应的单元格对象。

### 使用场景

#### `evt.properties.cell`

- 当事件处理机制自定义了一些额外的属性，并且将单元格信息存放在`evt.properties`中时，就需要使用`evt.properties.cell`来获取单元格。例如，在自定义的事件处理流程中，为了方便后续处理，将某个相关单元格存放在`evt.properties`里。
- 某些特定的插件或扩展可能会将单元格信息添加到`evt.properties`中，开发者在使用这些插件时，可能需要通过`evt.properties.cell`来获取单元格。

#### `evt.getCell()`

- 这是一种标准的、通用的获取触发事件单元格的方式。在大多数常规的事件处理场景中，如鼠标点击、拖动等事件，使用`evt.getCell()`可以方便快捷地获取到触发事件的单元格。
- 当开发者只关注事件直接关联的单元格，而不需要考虑自定义的额外属性时，`evt.getCell()`是首选方法。

### 区别

#### 来源和实现方式

- `evt.properties.cell`依赖于事件对象的`properties`属性，单元格信息是通过某种自定义的逻辑存放在这个属性集合中的。这意味着只有在特定的代码逻辑中手动将单元格添加到`evt.properties`里，才能通过`evt.properties.cell`获取到。
- `evt.getCell()`是`mxGraph`事件对象自带的方法，其内部实现了一套标准的逻辑来查找和返回触发事件的单元格。无论在何种标准的事件处理场景下，只要有对应的单元格与事件相关联，都可以使用这个方法获取。

#### 可靠性和通用性

- `evt.properties.cell`的可靠性取决于自定义逻辑的实现。如果没有正确地将单元格信息添加到`evt.properties`中，或者在后续处理中修改了`evt.properties`的内容，可能会导致无法获取到正确的单元格。而且这种方式的通用性较差，不同的自定义逻辑可能会有不同的处理方式。
- `evt.getCell()`是`mxGraph`提供的标准方法，具有较高的可靠性和通用性。在各种标准的事件处理场景中，都可以稳定地获取到触发事件的单元格。

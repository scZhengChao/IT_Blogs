# Storybook 是什么？

## 目录

- [问题](#问题)
- [解决方案](#解决方案)
  - [在隔离环境中构建 UI](#在隔离环境中构建-UI)
  - [将 UI 变体捕获为“Stories”](#将-UI-变体捕获为Stories)
  - [Storybook 记录每个 Story](#Storybook-记录每个-Story)
- [优点](#优点)

## [问题](https://storybook.org.cn/docs/get-started/why-storybook#the-problem "问题")

网络的普适性正将更多复杂性推向前端。这始于响应式网页设计，它将每个用户界面从一个变成了 10 个、100 个、1000 个不同的用户界面。随着时间的推移，设备、浏览器、可访问性、性能和异步状态等额外的要求也接踵而至。

像 React、Vue 3 和 Angular 这样的组件驱动工具帮助将复杂的 UI 分解成简单的组件，但它们并非万能药。随着前端的发展，组件的数量不断膨胀。成熟的项目可能包含数百个组件，产生数千种不同的变体。

更复杂的是，这些 UI 难以调试，因为它们与业务逻辑、交互状态和应用上下文交织在一起。

现代前端的广度压垮了现有的工作流程。**开发者必须考虑无数的 UI 变体，但却没有能力开发或组织所有这些变体。最终导致 UI 更难构建、工作体验更差，而且容易出问题。**

![](https://storybook.org.cn/docs-assets/9.0/get-started/multiverse.png)

## [解决方案](https://storybook.org.cn/docs/get-started/why-storybook#the-solution "解决方案")

### [在隔离环境中构建 UI](https://storybook.org.cn/docs/get-started/why-storybook#build-uis-in-isolation "在隔离环境中构建 UI")

现在，**UI 的每个部分都是一个**[**组件**](https://www.componentdriven.org/ "组件")**。组件的超能力在于你不需要启动整个应用就能看到它们如何渲染**。你可以通过**传入 props、模拟数据或模拟事件，在隔离环境中渲染特定变体。**

**Storybook 被打包成一个小型、仅用于开发的**[**工作坊**](https://bradfrost.com/blog/post/a-frontend-workshop-environment/ "工作坊")**，与你的应用并行存在**。它提供了**一个隔离的 iframe 来渲染组件，不受应用业务逻辑和上下文的干扰。这有助于你专注于开发组件的每个变体，甚至是那些难以触及的边界情况。**

### [将 UI 变体捕获为“Stories”](https://storybook.org.cn/docs/get-started/why-storybook#capture-ui-variations-as-stories "将 UI 变体捕获为“Stories”")

在隔离环境中开发组件变体时，**将其保存为一个 story。**[**Stories**](https://github.com/ComponentDriven/csf "Stories")**是一种声明式语法，用于提供 props 和模拟数据来模拟组件变体**。每个组件可以有多个 stories。每个 story 都允许你展示该组件的一个特定变体，以验证外观和行为。

你为精细的 UI 组件变体编写 stories，然后在开发、测试和文档中利用这些 stories。

```typescript title="Histogram.stories.ts|tsx"
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';
 
import { Histogram } from './Histogram';
 
const meta = {
  component: Histogram,
} satisfies Meta<typeof Histogram>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Default: Story = {
  args: {
    dataType: 'latency',
    showHistogramLabels: true,
    histogramAccentColor: '#1EA7FD',
    label: 'Latency distribution',
  },
};

```


### [Storybook 记录每个 Story](https://storybook.org.cn/docs/get-started/why-storybook#storybook-keeps-track-of-every-story "Storybook 记录每个 Story")

Storybook 是一个包含你的 UI 组件及其 stories 的交互式目录。过去，你必须启动应用，导航到某个页面，然后将 UI 调整到正确状态。这**极大地浪费时间**并阻碍了前端开发。有了 Storybook，你可以跳过所有这些步骤，直接在特定状态下处理 UI 组件。

![](image_WrWHg2MPny.png)

## [优点](https://storybook.org.cn/docs/get-started/why-storybook#benefits "优点")

为组件编写 stories 时，你会免费获得许多额外的优点。

**📝 开发更健壮的 UI**

**隔离组件和页面**，并将其用例作为[stories](https://storybook.org.cn/docs/writing-stories "stories")进行跟踪。**验证 UI 中难以触及的边界情况。使用插件模拟组件所需的一切——上下文**、API 请求、设备特性等。

**✅ 以更少的精力测试 UI，且无不稳定性**

Stories 是一种实用、可重现的方式来跟踪 UI 状态。在开发期间使用它们进行抽样测试 UI。Storybook 提供了内置的工作流程，用于自动化的[交互](https://storybook.org.cn/docs/writing-tests/interaction-testing "交互")、[可访问性](https://storybook.org.cn/docs/writing-tests/accessibility-testing "可访问性")和[视觉](https://storybook.org.cn/docs/writing-tests/visual-testing "视觉")测试。或者通过[将 stories 导入到其他 JavaScript 测试工具中](https://storybook.org.cn/docs/writing-tests/integrations/stories-in-unit-tests "将 stories 导入到其他 JavaScript 测试工具中")，将它们用作测试用例。

**📚 为你的团队记录 UI 以便重用**

Storybook 是你 UI 的唯一真实来源。Stories 索引了你所有的组件及其各种状态，让你的团队能够轻松找到和重用现有 UI 模式。Storybook 还会从这些 stories 自动生成[文档](https://storybook.org.cn/docs/writing-docs "文档")。

**📤 分享 UI 的实际工作方式**

Stories 展示了 UI 的实际工作方式，而不仅仅是预期工作方式的图片。这使得每个人都能就当前生产环境中的内容保持一致。[发布 Storybook](https://storybook.org.cn/docs/sharing/publish-storybook "发布 Storybook")以获得团队成员的批准。或者将其[嵌入](https://storybook.org.cn/docs/sharing/embed "嵌入")到 Wiki、Markdown 和 Figma 中，以简化协作。

**🚦 自动化 UI 工作流程**

Storybook 与你的持续集成工作流程兼容。将其添加为 CI 步骤，以自动化用户界面测试，与团队成员一起审查实现，并获得利益相关者的批准。

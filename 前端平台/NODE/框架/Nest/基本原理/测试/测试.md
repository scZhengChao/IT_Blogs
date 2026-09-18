# 测试

## 目录

- [安装#](#安装)
- [单元测试#](#单元测试)

自动化测试被认为是任何认真的软件开发工作的重要组成部分。自动化使得在开发过程中快速轻松地重复单个测试或测试套件变得容易。这有助于确保发布符合质量和性能目标。自动化有助于提高覆盖率并为开发者提供更快的反馈循环。自动化既可以提高单个开发者的工作效率，又可以确保测试在关键的开发生命周期节点运行，例如源代码控制签入、功能集成和版本发布。

此类测试通常跨越多种类型，包括单元测试、端到端 (e2e) 测试、集成测试等。虽然好处是毋庸置疑的，但设置它们可能很乏味。Nest 致力于推广开发最佳实践，包括有效的测试，因此它包括以下功能，以帮助开发者和团队构建和自动化测试。Nest：

- 自动搭建组件的默认单元测试和应用的端到端测试
- 提供默认工具（例如构建隔离模块/应用加载器的测试运行器）
- 开箱即用地提供与 [Jest](https://github.com/facebook/jest "Jest") 和 [Supertest](https://github.com/visionmedia/supertest "Supertest") 的集成，同时保持对测试工具的无关性
- 使 Nest 依赖注入系统在测试环境中可用，以便轻松模拟组件

如前所述，你可以使用你喜欢的任何测试框架，因为 Nest 不强制使用任何特定工具。只需替换所需的元素（例如测试运行器），你仍然可以享受 Nest 现成测试工具的好处。

#### 安装[#](https://nest.nodejs.cn/fundamentals/testing#安装 "#")

要开始，首先安装所需的包：

```bash 
npm i --save-dev @nestjs/testing
```


#### 单元测试[#](https://nest.nodejs.cn/fundamentals/testing#单元测试 "#")

在下面的例子中，我们测试了两个类：`CatsController` 和 `CatsService`。如前所述，[Jest](https://github.com/facebook/jest "Jest") 是作为默认测试框架提供的。它充当测试运行器，还提供断言函数和测试替身实用程序，以帮助模拟、间谍等。在下面的基本测试中，我们手动实例化这些类，并确保控制器和服务履行其 API 合同。

```typescript 
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
```


> **提示**将你的测试文件放置在它们测试的类附近。测试文件应具有 `.spec` 或 `.test` 后缀。

因为上面的示例很简单，所以我们并没有真正测试任何特定于 Nest 的东西。事实上，我们甚至没有使用依赖注入（注意我们将 `CatsService` 的一个实例传递给我们的 `catsController`）。这种形式的测试 - 我们手动实例化正在测试的类 - 通常称为隔离测试，因为它独立于框架。让我们介绍一些更高级的功能，帮助你测试更广泛使用 Nest 功能的应用。

更多内容见：

[ NestJS 中文网 Nest 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。 它使用渐进式 JavaScript，使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。 https://nest.nodejs.cn/fundamentals/testing](https://nest.nodejs.cn/fundamentals/testing " NestJS 中文网 Nest 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。 它使用渐进式 JavaScript，使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。 https://nest.nodejs.cn/fundamentals/testing")

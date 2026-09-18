# 配置

## 目录

- [安装](#安装)
- [入门](#入门)
- [自定义环境文件路径](#自定义环境文件路径)
- [禁用环境变量加载](#禁用环境变量加载)
- [全局使用模块](#全局使用模块)
- [自定义配置文件](#自定义配置文件)
- [使用 ConfigService](#使用-ConfigService)
- [配置命名空间](#配置命名空间)
- [缓存环境变量](#缓存环境变量)
- [部分注册](#部分注册)
- [架构验证#](#架构验证)
- [自定义验证函数#](#自定义验证函数)
- [自定义吸气函数](#自定义吸气函数)
- [环境变量加载钩子](#环境变量加载钩子)
- [条件模块配置](#条件模块配置)
- [可扩展变量#](#可扩展变量)
- [在 main.ts 中使用#](#在-maints-中使用)

应用通常运行在不同的环境中。**根据环境，应使用不同的配置设置**。例如，通常本地环境依赖于特定的数据库凭证，仅对本地数据库实例有效。生产环境将使用一组单独的数据库凭据。由于配置变量发生变化，最佳做法是在环境中使用 [**存储配置变量**](https://12factor.net/config "存储配置变量")**。**

**外部定义的环境变量**通过 `process.env` 全局变量在 Node.js 内部是可见的。我们可以尝试通过在**每个环境中单独设置环境变量**来解决多个环境的问题。这很快就会变得笨拙，尤其是在需要轻松模拟和/或更改这些值的开发和测试环境中。

在 Node.js 应用中，通常使用 `.env` 文件，保存键值对，其中每个键代表一个特定值，以表示每个环境。**在不同的环境中运行应用只是交换正确的 ****`.env`**** 文件的问题。**

在 Nest 中使用此技术的一个好方法是创建一个 `ConfigModule`，它公开一个 `ConfigService`，**它加载适当**的 `.env` 文件。虽然你可以选择自己编写这样的模块，但为了方便起见，Nest 提供了开箱即用的 `@nestjs/config` 包。我们将在本章介绍这个包。

#### 安装

要开始使用它，我们首先安装所需的依赖。

```typescript 
npm i --save @nestjs/config

```


> **提示**`@nestjs/config` 包内部使用 [dotenv](https://github.com/motdotla/dotenv "dotenv")。

> **注意**`@nestjs/config` 需要 TypeScript 4.1 或更高版本。

#### 入门

安装过程完成后，我们可以导入 `ConfigModule`。通常，我们会将其导入根 `AppModule` 并使用 `.forRoot()` 静态方法控制其行为。在此步骤中，环境变量键/值对被解析和解析。稍后，我们将在其他功能模块中看到几个用于访问 `ConfigModule` 的 `ConfigService` 类的选项。

```typescript 
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}

```


上面的代码将从**默认位置（项目根目录）加载和解析** `.env` 文件，将 `.env` 文件中的键/值对与分配给 `process.env` 的环境变量合并，并将结果存储在私有结构中，你可以通过 `ConfigService.forRoot()` 方法注册了 `ConfigService` 提供程序，它**提供了**一个 `get()` 方法来**读取这些解析/合并的配置变量**。由于 `@nestjs/config` 依赖于 [dotenv](https://github.com/motdotla/dotenv "dotenv")，因此它使用该包的规则来解决环境变量名称中的冲突。当密钥既作为环境变量存在于运行时环境中（例如，通过像 `export DATABASE_USER=test` 这样的 OS shell 导出）又存在于 `.env` 文件中时，**运行时环境变量优先。**

示例 `.env` 文件如下所示：

```typescript 
DATABASE_USER=test
DATABASE_PASSWORD=test

```


#### 自定义环境文件路径

默认情况下，程序包会在应用的根目录中查找 `.env` 文件。要为 `.env` 文件指定另一个路径，请将传递给 `forRoot()` 的（可选）选项对象的 `envFilePath` 属性设置为 `forRoot()`，如下所示：

```typescript 
ConfigModule.forRoot({
  envFilePath: '.development.env',
});

```


你还可以像这样为 `.env` 文件指定多个路径：

```typescript 
ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
});

```


如果在**多个文件中找到一个变量，则第一个优先。**

#### 禁用环境变量加载

如果你不想加载 `.env` 文件，而是想简单地**从运行时环境访问环境变量**（就像像 `export DATABASE_USER=test` 这样的 OS shell 导出），请将选项对象的 `ignoreEnvFile` 属性设置为 `true`，如下所示：

```typescript 
ConfigModule.forRoot({
  ignoreEnvFile: true,
});
```


#### 全局使用模块

当你想在其他模块中使用 `ConfigModule` 时，你需要导入它（这是任何 Nest 模块的标准）。或者，通过将选项对象的 `isGlobal` 属性设置为 `true` 来将其声明为 [全局模块](https://nest.nodejs.cn/modules#global-modules "全局模块")，如下所示。在这种情况下，一旦 `ConfigModule` 被加载到根模块（例如，`AppModule`）中，你就不需要在其他模块中导入它。

```typescript 
ConfigModule.forRoot({
  isGlobal: true,
});


```


#### 自定义配置文件

对于更复杂的项目，你可以使用自定义配置文件来**返回嵌套的配置对象**。这允许你**按功能对相关配置设置进行分组**（例如，与数据库相关的设置），并将**相关设置存储在单独的文件中**以帮助独立管理它们。

自定义配置文件导出返回配置对象的工厂函数。配置对象可以是**任意嵌套的普通 JavaScript 对象**。`process.env` 对象将包含完全解析的环境变量键/值对（`.env` 文件和外部定义的变量如 [above](https://nest.nodejs.cn/techniques/configuration#getting-started "above") 所述解析和合并）。由于你控制返回的配置对象，因此你可以添加任何所需的逻辑以将值转换为适当的类型、设置默认值等。例如：

```typescript title="config/configuration.ts"
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});

```


我们使用传递给 `ConfigModule.forRoot()` 方法的选项对象的 `load` 属性加载此文件：

```typescript title="app.module.ts"
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule {}

```


> **注意**分配给 `load` 属性的值是一个数组，允许你加载多个配置文件（例如 `load: [databaseConfig, authConfig]`）

通过自定义配置文件，我们还可以管理自定义文件，例如 YAML 文件。以下是使用 YAML 格式的配置示例：

```yaml 
http:
  host: 'localhost'
  port: 8080

db:
  postgres:
    url: 'localhost'
    port: 5432
    database: 'yaml-db'

  sqlite:
    database: 'sqlite.db'

```


要读取和解析 YAML 文件，我们可以利用 `js-yaml` 包。

```yaml 
$ npm i js-yaml
$ npm i -D @types/js-yaml

```


安装包后，我们使用 `yaml#load` 函数加载我们刚刚在上面创建的 YAML 文件。

```typescript title="config/configuration.tsJS"

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};

```


> **注意**
> 在构建过程中，Nest CLI 不会自动将 "assets"（非 TS 文件）移动到 `dist`文件夹。**为了确保你的 YAML 文件被复制，** 你必须在`nest-cli.json` 文件的 `compilerOptions#assets` 对象中指定它。例如，如果 `config` 文件夹与 `src` 文件夹处于同一级别，则添加值为 `"assets": [{"include": "../config/*.yaml", "outDir": "./dist/config"}]` 的 `compilerOptions#assets`。阅读更多 [此处](https://nest.nodejs.cn/cli/monorepo#assets "此处")。

#### 使用 `ConfigService`

要从我们的 `ConfigService` **访问配置值**，我们首先需要**注入** `ConfigService`。与任何提供程序一样，我们需要导入其包含的模块 - `ConfigModule` 号 - 到将使用它的模块中（除非你将传递给 `ConfigModule.forRoot()` 方法的选项对象中的 `isGlobal` 属性设置为 `true`）。将其导入到功能模块中，如下所示。

```typescript 
@Module({
  imports: [ConfigModule],
  // ...
})

```


然后我们可以使用标准构造函数注入来注入它：

```typescript 
constructor(private configService: ConfigService) {}

```


> **提示**`ConfigService` 是从 `@nestjs/config` 包导入的。

并在我们的课堂上使用它：

```typescript 
// get an environment variable
const dbUser = this.configService.get<string>('DATABASE_USER');

// get a custom configuration value
const dbHost = this.configService.get<string>('database.host');

```


如上所示，使用 `configService.get()` 方法通过**传递变量名获取一个简单的环境变量**。你可以通过传递类型来执行 `TypeScript` 类型提示，如上所示（例如，`get<string>(...)`）。`get()`方法还可以**遍历嵌套的自定义配置对象** **（** 通过[自定义配置文件](https://nest.nodejs.cn/techniques/configuration#custom-configuration-files "自定义配置文件") 创建），如上面的第二个示例所示。

你还可以使用接口作为类型提示来获取整个嵌套的自定义配置对象：

```typescript 
interface DatabaseConfig {
  host: string;
  port: number;
}

const dbConfig = this.configService.get<DatabaseConfig>('database');

// you can now use `dbConfig.port` and `dbConfig.host`
const port = dbConfig.port;

```


`get()` 方法还接受一个可选的第二个参数，定义一个默认值，当键不存在时将返回该值，如下所示：

```typescript 
// use "localhost" when "database.host" is not defined
const dbHost = this.configService.get<string>('database.host', 'localhost');

```


`ConfigService` 有两个可选的泛型（类型参数）。第一个是帮助防止访问不存在的配置属性。如下图所示使用它：

```typescript 
interface EnvironmentVariables {
  PORT: number;
  TIMEOUT: string;
}

// somewhere in the code
constructor(private configService: ConfigService<EnvironmentVariables>) {
  const port = this.configService.get('PORT', { infer: true });

  // TypeScript Error: this is invalid as the URL property is not defined in EnvironmentVariables
  const url = this.configService.get('URL', { infer: true });
}

```


将 `infer` 属性设置为 `true` 后，`ConfigService#get` 方法将根据**接口自动推断属性类型**，例如 `typeof port === "number"`（如果你未使用 TypeScript 中的 `strictNullChecks` 标志），因为 `PORT` 在 `EnvironmentVariables` 接口中具有 `number` 类型。

此外，使用 `infer` 功能，你可以推断嵌套的自定义配置对象的属性的类型，即使在使用点表示法时也是如此，如下所示：

```typescript 
constructor(private configService: ConfigService<{ database: { host: string } }>) {
  const dbHost = this.configService.get('database.host', { infer: true })!;
  // typeof dbHost === "string"                                          |
  //                                                                     +--> non-null assertion operator
}
```


第二个泛型依赖于第一个，充当类型断言以摆脱 `ConfigService` 的方法在 `strictNullChecks` 打开时可以返回的所有 `undefined` 类型。例如：

```typescript 
// ...
constructor(private configService: ConfigService<{ PORT: number }, true>) {
  //                                                               ^^^^
  const port = this.configService.get('PORT', { infer: true });
  //    ^^^ The type of port will be 'number' thus you don't need TS type assertions anymore
}
```


#### 配置命名空间

`ConfigModule` 允许你定义和加载多个自定义配置文件，如上面的 [自定义配置文件](https://nest.nodejs.cn/techniques/configuration#custom-configuration-files "自定义配置文件") 所示。你可以使用**嵌套的配置对象**来管理复杂的配置对象层次结构，如该部分所示。或者，你可以使用 `registerAs()` 函数返回 "`namespaced`" 配置对象，如下所示：

```typescript 
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432
}));
```


与自定义配置文件一样，在 `registerAs()` 工厂函数内部，`process.env` 对象将包含完全解析的环境变量键/值对（`.env` 文件和外部定义的变量按照 [above](https://nest.nodejs.cn/techniques/configuration#getting-started "above") 所述解析和合并）。

> **提示**`registerAs` 函数是从 `@nestjs/config` 包中导出的。

使用 `forRoot()` 方法的选项对象的 `load` 属性**加载命名空间配置**，其方式与加载自定义配置文件的方式相同：

```typescript 
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
})
export class AppModule {}
```


现在，要从 `database` 命名空间获取 `host` 值，请使用点表示法。使用 `'database'` 作为属性名称的前缀，对应于命名空间的名称（作为第一个参数传递给 `registerAs()` 函数）：

```typescript 
const dbHost = this.configService.get<string>('database.host');
```


一个合理的替代方法是直接注入 `database` 命名空间。这使我们能够从强类型中受益：

```typescript 
constructor(
  @Inject(databaseConfig.KEY)
  private dbConfig: ConfigType<typeof databaseConfig>,
) {}
```


> **提示**`ConfigType` 是从 `@nestjs/config` 包中导出的。

#### 缓存环境变量

由于访问 `process.env` 可能很慢，你可以设置传递给 `ConfigModule.forRoot()` 的选项对象的 `cache` 属性，以提高 `ConfigService#get` 方法在涉及存储在 `process.env` 中的变量时的性能。

```typescript 
ConfigModule.forRoot({
  cache: true,
});
```


#### 部分注册

到目前为止，我们已经使用 `forRoot()` 方法处理了根模块（例如 `AppModule`）中的配置文件。也许你有一个更复杂的项目结构，特定于功能的配置文件位于多个不同的目录中。`@nestjs/config` 包提供了一种称为部分注册的功能，而不是在根模块中加载所有这些文件，该功能仅引用与每个功能模块关联的配置文件。使用功能模块中的 `forFeature()` 静态方法来执行此部分注册，如下所示：

```typescript 
import databaseConfig from './config/database.config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
})
export class DatabaseModule {}
```


> **警告**:
> 在某些情况下，你可能需要使用 `onModuleInit()` 钩子访问通过部分注册加载的属性，而不是在构造函数中。这是因为 `forFeature()` 方法是在**模块初始化的时候运行的，模块初始化的顺序是不确定的。**如果你访问由另一个模块以这种方式加载的值，则在构造函数中，配置所依赖的模块可能尚未初始化。`onModuleInit()` 方法只有在它**所依赖的所有模块都被初始化后才会运行**，所以这种技术是安全的。

#### 架构验证[#](https://nest.nodejs.cn/techniques/configuration#架构验证 "#")

如果未提供所需的**环境变量或它们不符合某些验证规则，则在应用启动期间抛出异常是标准做法。**`@nestjs/config` 包支持两种不同的方式来做到这一点：

- [Joi](https://github.com/sideway/joi "Joi") 内置验证器。使用 Joi，你可以定义一个对象模式并根据它验证 JavaScript 对象。
- 将环境变量作为输入的自定义 `validate()` 函数。

要使用 Joi，我们必须安装 Joi 包：

```java 
npm install --save joi

```


现在我们可以定义一个 Joi 验证模式并通过 `forRoot()` 方法的选项对象的 `validationSchema` 属性传递它，如下所示：

```typescript 
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
    }),
  ],
})
export class AppModule {}
```


默认情况下，所有模式键都被认为是可选的。在这里，我们为 `NODE_ENV` 和 `PORT` 设置默认值，如果我们不在环境（`.env` 文件或进程环境）中提供这些变量，将使用这些值。或者，我们可以使用 `required()` 验证方法来要求必须在环境（`.env` 文件或进程环境）中定义一个值。在这种情况下，如果我们不在环境中提供变量，验证步骤将抛出异常。有关如何构建验证模式的更多信息，请参阅 [Joi 验证方法](https://joi.dev/api/?v=17.3.0#example "Joi 验证方法")。

默认情况下，未知环境变量（其键不存在于模式中的环境变量）是允许的，并且不会触发验证异常。默认情况下，报告所有验证错误。你可以通过 `forRoot()` 选项对象的 `validationOptions` 键传递一个选项对象来改变这些行为。此选项对象可以包含 [Joi 验证选项](https://joi.dev/api/?v=17.3.0#anyvalidatevalue-options "Joi 验证选项") 提供的任何标准验证选项属性。例如，要反转上面的两个设置，传递如下选项：

```typescript 
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
})
export class AppModule {}
```


`@nestjs/config` 包使用默认设置：

- `allowUnknown`：控制是否允许环境变量中的未知键。默认为 `true`
- `abortEarly`：如果为真，则在出现第一个错误时停止验证；如果为假，则返回所有错误。默认为 `false`。

请注意，一旦你决定传递 `validationOptions` 对象，**你未明确传递的任何设置都将默认**为 `Joi` 标准默认值（而不是 `@nestjs/config` 默认值）。例如，如果你在自定义 `validationOptions` 对象中未指定 `allowUnknowns`，它将具有 `Joi` 默认值 `false`。因此，在自定义对象中指定这两个设置可能是最安全的。

#### 自定义验证函数[#](https://nest.nodejs.cn/techniques/configuration#自定义验证函数 "#")

或者，你可以指定一个同步 `validate` 函数，该函数获取**包含环境变量的对象（来自 env 文件和进程**）并返回包含经过验证的环境变量的对象，以便你可以在需要时转换/改变它们。如果函数抛出错误，它将阻止应用启动。

在此示例中，我们将继续处理 `class-transformer` 和 `class-validator` 包。首先，我们必须定义：

- 具有验证约束的类，
- 使用 `plainToInstance` 和 `validateSync` 函数的验证函数。

```typescript 
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, Max, Min, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
```


有了这个，使用 `validate` 函数作为 `ConfigModule` 的配置选项，如下所示：

```typescript 
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
})
export class AppModule {}
```


#### 自定义吸气函数

`ConfigService` 定义了一个通用的 `get()` 方法来通过键检索配置值。我们还可以添加 `getter` 函数以启用更自然的编码风格：

```typescript 
@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
}
```


现在我们可以像下面这样使用 getter 函数：

```typescript 
@Injectable()
export class AppService {
  constructor(apiConfigService: ApiConfigService) {
    if (apiConfigService.isAuthEnabled) {
      // Authentication is enabled
    }
  }
}
```


#### 环境变量加载钩子

如果模块配置依赖于环境变量，并且这些变量是从 `.env` 文件加载的，则可以使用 `ConfigModule.envVariablesLoaded` 钩子确保在与 `process.env` 对象交互之前加载文件，请参见以下示例：

```java 
export async function getStorageModule() {
  await ConfigModule.envVariablesLoaded;
  return process.env.STORAGE === 'S3' ? S3StorageModule : DefaultStorageModule;
}
```


这种构造保证在 `ConfigModule.envVariablesLoaded` Promise 解析后，加载所有配置变量

#### 条件模块配置

有时你可能希望有**条件地加载模块并在环境变量中指定条件**。幸运的是，`@nestjs/config` 提供了 `ConditionalModule`，可以让你做到这一点。

```typescript 
@Module({
  imports: [ConfigModule.forRoot(), ConditionalModule.registerWhen(FooModule, 'USE_FOO')],
})
export class AppModule {}
```


如果 `.env` 文件中没有环境变量 `USE_FOO` 的 `false` 值，则上述模块只会在 `FooModule` 中加载。你还可以自己传递一个自定义条件，一个接收 `process.env` 引用的函数，该函数应返回一个布尔值供 `ConditionalModule` 处理：

```typescript 
@Module({
  imports: [ConfigModule.forRoot(), ConditionalModule.registerWhen(FooBarModule, (env: NodeJS.ProcessEnv) => !!env['foo'] && !!env['bar'])],
})
export class AppModule {}
```


重要的是要确保在使用 `ConditionalModule` 时，应用中也加载了 `ConfigModule`，以便可以正确引用和使用 `ConfigModule.envVariablesLoaded` 钩子。如果钩子在 5 秒内没有翻转为 true，或者用户在 `registerWhen` 方法的第三个选项参数中设置的超时（以毫秒为单位），则 `ConditionalModule` 将抛出错误，Nest 将中止启动应用。

#### 可扩展变量[#](https://nest.nodejs.cn/techniques/configuration#可扩展变量 "#")

`@nestjs/config` 包支持环境变量扩展。使用这种技术，你可以创建嵌套的环境变量，其中一个变量在另一个变量的定义中被引用。例如：

```java 
APP_URL=mywebsite.com
SUPPORT_EMAIL=support@${APP_URL}
```


通过这种构造，变量 `SUPPORT_EMAIL` 解析为 `'support@mywebsite.com'`。请注意使用 `${...}` 语法来触发解析 `SUPPORT_EMAIL` 定义中的变量 `APP_URL` 的值。

> **提示**: 对于此功能，`@nestjs/config` 包内部使用 [dotenv-expand](https://github.com/motdotla/dotenv-expand "dotenv-expand")。

使用传递给 `ConfigModule` 的 `forRoot()` 方法的选项对象中的 `expandVariables` 属性启用环境变量扩展，如下所示：

```typescript title="app.module.tsJS"
@Module({
  imports: [
    ConfigModule.forRoot({
      // ...
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
```


#### 在 `main.ts` 中使用[#](https://nest.nodejs.cn/techniques/configuration#在-maints-中使用 "#")

虽然我们的配置存储在服务中，但它仍然可以在 `main.ts` 文件中使用。这样，你可以使用它来存储变量，例如应用端口或 CORS 主机。

要访问它，你必须使用 `app.get()` 方法，然后是服务引用：

```typescript 
const configService = app.get(ConfigService);
```


然后，你可以像往常一样使用它，方法是使用配置键调用 `get` 方法：

```typescript 
const port = configService.get('PORT');
```

# 为什么选择Nestjs作为服务端框架，而不是Express

## 目录

- [AOP](#AOP)
- [NestJs 中的 AOP](#NestJs-中的-AOP)
- [中间件](#中间件)
- [守卫 Guards](#守卫-Guards)
- [拦截器](#拦截器)
- [管道](#管道)
  - [Nest 自带九个开箱即用的管道](#Nest-自带九个开箱即用的管道)
    - [1. ValidationPipe](#1-ValidationPipe)
    - [2. ParseIntPipe](#2-ParseIntPipe)
    - [3. ParseFloatPipe](#3-ParseFloatPipe)
    - [4. ParseBoolPipe](#4-ParseBoolPipe)
    - [5. ParseArrayPipe](#5-ParseArrayPipe)
    - [6. ParseUUIDPipe](#6-ParseUUIDPipe)
    - [7. DefaultValuePipe](#7-DefaultValuePipe)
    - [8. ParseEnumPipe](#8-ParseEnumPipe)
    - [9. ParseDatePipe](#9-ParseDatePipe)
- [过滤器（filter）](#过滤器filter)
  - [NestJS 的内置请求异常过滤器](#NestJS-的内置请求异常过滤器)
    - [1. BadRequestException (400)](#1-BadRequestException-400)
    - [2. UnauthorizedException (401)](#2-UnauthorizedException-401)
    - [3. NotFoundException (404)](#3-NotFoundException-404)
    - [4. ForbiddenException (403)](#4-ForbiddenException-403)
    - [5. NotAcceptableException (406)](#5-NotAcceptableException-406)
    - [6. RequestTimeoutException (408)](#6-RequestTimeoutException-408)
    - [7. ConflictException (409)](#7-ConflictException-409)
    - [8. GoneException (410)](#8-GoneException-410)
    - [9. PayloadTooLargeException (413)](#9-PayloadTooLargeException-413)
    - [10. UnsupportedMediaTypeException (415)](#10-UnsupportedMediaTypeException-415)
    - [11. UnprocessableException (422)](#11-UnprocessableException-422)
    - [12. InternalServerErrorException (500)](#12-InternalServerErrorException-500)
    - [13. NotImplementedException (501)](#13-NotImplementedException-501)
    - [14. BadGatewayException (502)](#14-BadGatewayException-502)
    - [15. ServiceUnavailableException (503)](#15-ServiceUnavailableException-503)
    - [16. GatewayTimeoutException (504)](#16-GatewayTimeoutException-504)
    - [使用场景](#使用场景)
- [总结](#总结)

`NestJS` 采用了 `AOP` 的概念，尤其是通过其提供的拦截器（`Interceptors`）、守卫（`Guards`）、管道（`Pipes`）和自定义装饰器来实现。这些功能在 `NestJS` 中用于处理各种横切关注点，实现业务逻辑与非业务逻辑的解耦。

# AOP

AOP 的中文全称为 `Aspect Oriented Programming`，翻译成人话就是 **面向切面编程,那么什么是切面呢?**

你可以理解为一个汉堡，它的本质就是一个面包，在这里我们把它理解为我们的应用程序，我们要在扩展这个应用程序的时候，需要在里面添加更多的代码，而这个过程就是向这个面包加馅的过程。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2jlqHX6CFJiaujTRpv6UxHGOQIo9nQ6iamdoyJ9fxeJjr3mAYdibnljHsK5bta9DT7YicDqhLyS5bMNeF7Qibribicgkg/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

汉堡模型中的 AOP，首先我们的汉堡包是应用程序的基础，而添加的馅料是横切关注点。

将馅料加入汉堡的过程类似于 AOP 的“织入”过程。在编程中，织入是指将横切关注点的代码（馅料）插入到应用程序的核心逻辑（面包）中的特定点。这种织入可以在编译时、加载时或运行时完成，具体取决于使用的 AOP 框架和技术。

切点定义了馅料应当被加入的具体位置（即在哪些方法或函数的哪些具体点）。通知则定义了加馅的具体行为，即当执行到切点时应当执行什么操作。通知的类型包括：前置通知（在主逻辑之前加馅）、后置通知（在主逻辑之后加馅）、环绕通知（在主逻辑前后都加馅）、抛出异常后的通知（在主逻辑抛出异常时加馅）等。

通过加馅，我们可以增加汉堡包的味道，同样地使用 AOP 可以增强应用程序的功能性和灵活性。它能够帮助开发者将关注点分离，提高代码的可维护性和可重用性，同时减少代码冗余。

# NestJs 中的 AOP

NestJS 采用了 AOP 的概念，尤其是通过其提供的**拦截器（Interceptors）、守卫（Guards）、管道（Pipes）和自定义装饰器来**实现。这些功能在 NestJS 中用于处理各种横切关注点，实现业务逻辑与非业务逻辑的解耦。

我们先从一个大的概念来开始讲起，我们在前端发起一个 HTTP 网络请求，它首先会经过 Controller（控制器）、Services（服务）、Repository（数据接入） 的逻辑，它的主要流程如下图所示：

![](image_181bpASKjD.png)

当获取到数据库中的数据之后，我们又通过了 Services 返回数据到 Controller 并最终返回到前端。在这里如果你想在这个调用链路里加入一些通用逻辑，我们可以在这个执行流程中加入不同的逻辑，这个就是 AOP 给我们带来的好处。

如下图所示，在 Nest 中，我们在前端发送一个网络请求到 NestJs，它可以通过这些组件：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2jlqHX6CFJiaujTRpv6UxHGOQIo9nQ6iamR6hQNFLepjicnvNFOhdZCu4EwcF6H89o1uj2Sf7xQebiayHHMC8y7TEQ/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

每个阶段都有不同的逻辑，例如 Interceptors(拦截器)，它分为前置拦截器和后置拦截器，前置拦截器又有这么三个逻辑，它们分别是全局拦截器、控制器拦截器、路由拦截器三个。

接下来我们将来详细了解一下这些组件都适合用来做什么事情。

# 中间件

在 NestJS 中，中间件是一种基于函数的组件，主要用于**处理请求和响应之间的操作**。它们在路由处理程序执行之前运行，可以执行多种任务，如**修改请求和响应对象、结束请求-响应周期**、**调用下一个中间件函数等。**

首先我们编写一个类式中间件，如下代码所示：

```typescript 
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`[Logger] ${req.ip} - ${req.method} - ${req.url}`);
    next();
  }
}

```


中间件的注册可以在模块的 configure 方法中进行，你可以选择全局注册或特定路由注册。在这里我们选择全局注册：

```typescript 
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // 应用于所有路由
  }
}

```


当我们发起一个网络请求的时候，通过 debugger，是可以查看到 Request 中是有这些数据的：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2jlqHX6CFJiaujTRpv6UxHGOQIo9nQ6iamODo1xwfb3TiadylHyBic3XEnh4KWpG90haV4CKSBibJRqPqxjvgrC6TVg/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

正因为中间件能接收到这些数据并且可以根据这些数据来判断**是否可以执行后面的流程，那么我们可以来实现以下功能：**

1. 日志记录：捕获到每个进入应用的请求的详细信息，包括请求方法、URL、IP 地址、请求头、响应状态码等
2. 身份验证和授权：检查用户的认证状态并进行授权。例如，它可以解析并验证 JWT (JSON Web Tokens)，设置用户会话，或者检查用户是否有权限访问特定的路由。
3. 请求增强：中间件可以用来增强请求对象，例如通过解析请求体中的数据、添加自定义属性或方法到请求对象，或者配置请求上下文等。
4. 率限制（Rate Limiting）：中间件是实现请求速率限制的一个很好的方式。这可以帮助保护应用免受恶意用户或爬虫的影响。
5. CORS（跨源资源共享）设置：设置 CORS 策略以允许或限制跨域请求。这通常在全局范围内配置，但可以通过中间件在更细粒度上进行控制。

通过这些示例可以看出，中间件在 NestJS 中的作用非常关键和多样，它们提供了一个灵活的方式来介入请求处理流程，执行各种跨多个路由和控制器的通用任务。

# 守卫 Guards

守卫（Guards）是一个**用于实现认证和授权逻辑的功能强大的组**件。它们是基于角色的访问控制（`RBAC`）的理想选择，可以在请求继续处理前进行必要的检查。守卫主要用来决定**是否允许某个请求执行后续的操作**，例如进入某个路由处理器。`NestJS` 支持不同级别的守卫应用：**全局守卫、控制器级守卫和路由级守卫。**

全局守卫应用于应用程序的每一个入口，对所有控制器和路由都有效。这是最广泛的守卫应用方式，通常用于全局的认证机制，如检查每个请求是否携带有效的 `JWT`。

**全局守卫通常在应用的主模块中设置，通过 APP\_GUARD 提供器来提供：**

```typescript 
// app.module.ts
import { Module } from"@nestjs/common";
import { APP_GUARD } from"@nestjs/core";
import { AuthGuard } from"./auth.guard";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
exportclass AppModule {}

```


**控制器守卫只对特定控制器内的路由生效。** 这种方式适用于某个控制器下所有路由请求都必须通过某些特定逻辑（例如权限验证）的情况。

控制器守卫通过在控制器类上使用 @UseGuards() 装饰器设置。

```typescript 
// users.controller.ts
import { Controller, UseGuards } from "@nestjs/common";
import { RolesGuard } from "./roles.guard";

@UseGuards(RolesGuard)
@Controller("users")
export class UsersController {
  // Controller methods
}

```


路由守卫仅在特定的路由处理器上生效。这是最细粒度的守卫应用方式，适合只有部分路由需要特定安全检查的情况。

```typescript 
// users.controller.ts
import { Get, Controller, UseGuards } from"@nestjs/common";
import { RolesGuard } from"./roles.guard";

@Controller("users")
exportclass UsersController {
@UseGuards(RolesGuard)
@Get()
  findAll() {}

@Get("profile")
  findProfile() {}
}

```


当一个请求被发送到 NestJS 应用时 **，守卫会在管道和拦截器之前运行。守卫会查看请求的上下文，并决定是否允许请求继续执行**。如果守卫返回 true 或一个 true 解析的 Promise，请求就会继续执行；如果返回 false 或一个 false 解析的 Promise，请求则会被拒绝，并且可以抛出异常（例如 UnauthorizedException）来提供拒绝的原因。

通过这样的机制，NestJS 的守卫提供了一个强大而灵活的方法来控制请求的访问权限，它们可以根据应用的需要灵活地被应用在不同的级别上，从全局到特定的单一路由。

# 拦截器

拦截器（`Interceptors`）提供了**一种强大的方法来拦截和扩展函数行为**。拦截器可以调用在方法执行之前和之后，它们适用于添加额外的逻辑到函数的入口和出口，如日志记录、异常处理、响应映射、调用链中的数据转换等。NestJS 允许在不同的层级设置拦截器 **：全局拦截器、控制器层拦截器和路由拦截器。**

**全局拦截器对应用中的所有控制器和路由有效。** 这种类型的拦截器常用于需要全局应用的逻辑，例如全局错误处理、日志记录或应用范围内的响应结构标准化。

全局守卫通常在应用的主模块中设置，通过 APP\_GUARD 提供器来提供：

```typescript 
import { Module } from"@nestjs/common";
import { APP_INTERCEPTOR } from"@nestjs/core";
import { TransformInterceptor } from"./auth.interceptor";

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
exportclass AppModule {}

```


路由和控制器这些就不讲了，查文档都能查得到。

```typescript 
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from"@nestjs/common";
import { Observable } from"rxjs";
import { tap } from"rxjs/operators";

@Injectable()
exportclass ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        const processTime = Date.now() - now;
        data.responseTime = `${processTime}ms`;
      })
    );
  }
}

```


通过调试，我们是可以接收到数据的控制器返回的数据的，如下图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2jlqHX6CFJiaujTRpv6UxHGOQIo9nQ6iamspo1FcFISJHhJNyBiaLXI0FvyOGTQlyBTickUCnLiajBFzRWgtXjv2GzA/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

根据这个特性，我们可以实现以下功能：

1. **响应转换**：在数据发送给客户端之前对其进行转换或包装，这适用于创建一致的响应格式。例如，你可能想要将所有的响应数据封装在一个标准的响应体结构中，包括成功标志、消息和数据本身。
2. **执行时间监控：** 通过在拦截器中记录处理请求的起始和结束时间，可以用来监控处理请求的时间，这对于性能分析和优化非常有用。
3. **缓存：** 拦截器可以用于实现缓存策略，从而减少对下游系统或数据库的请求。通过在拦截器中缓存数据，并在后续请求中返回缓存的数据，可以显著提高应用性能。

# 管道

管道（`Pipes`）是用来**处理输入数据的工具，主要用于数据转换和数据验证**。**管道的作用是在数据最终被控制器处理器处理之前，对这些数据进行一些必要的操作。这些操作包括但不限于类型转换、数据格式化、数据校验等**

管道的主要职责：

1. 数据转换：将输入数据转换成所需的形式。例如，将字符串类型的日期转换为 JavaScript 的 Date 对象，或者将字符串 "true" 或 "false" 转换为布尔值。
2. 数据验证：检查输入数据的有效性，并在数据不合法时抛出异常。这通常涉及一套验证规则，如果数据不符合这些规则，则阻止数据进一步处理。

接下来我们编写一个管道，来对某个接口中的参数进行类型转换，转换完成之后并对该数字进行加一操作：

```typescript 
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from"@nestjs/common";

@Injectable()
exportclass ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    debugger;
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      thrownew BadRequestException("Validation failed");
    }

    return val + 1;
  }
}

```


这个时候我们要在控制器上或者录音上面添加 UsePipes 装饰器：

```typescript 
import { Controller, Get, Query, UsePipes } from"@nestjs/common";
import { AppService } from"./app.service";

import { ParseIntPipe } from"./core/pipe";

@Controller()
exportclass AppController {
constructor(private readonly appService: AppService) {}

@UsePipes()
@Get()
async getNumber(@Query("id", ParseIntPipe) id: number) {
    return { id };
  }
}

```


这里接收到了我们传入的 query 参数，它的字段是 id，值是字符串的 1：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2jlqHX6CFJiaujTRpv6UxHGOQIo9nQ6iamA1WibBtniaicb57AKtSSfDWjEGDCfb4pQW12Rj6eCbsyBYuLgXiagJ7KIA/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

## Nest 自带九个开箱即用的管道

在 NestJS 中，管道是用于处理请求数据的验证和转换的重要组件。NestJS 提供了一些内置的管道，这些管道开箱即用，可以直接在应用中使用**来处理常见的数据验证和转换任务。** 截至最新版本，NestJS 提供了以下几种内置管道：

### 1. ValidationPipe

这是最常用的管道之一，用于基于类和装饰器进行复杂的验证。它通常与`class-validator`和`class-transformer`库一起使用，**可以自动验证 DTO（数据传输对象）并抛出异常。**

```typescript 
import { ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe())

```


### 2. ParseIntPipe

将字符串转换成整数。如果转换失败，则自动抛出异常。

```typescript 
import { ParseIntPipe } from '@nestjs/common';

@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.service.findOne(id);
}

```


### 3. ParseFloatPipe

将字符串转换成浮点数。如果转换失败，也会自动抛出异常。

```typescript 
import { ParseFloatPipe } from '@nestjs/common';

@Get(':value')
findOne(@Param('value', ParseFloatPipe) value: number) {
  return this.service.calculate(value);
}

```


### 4. ParseBoolPipe

**解析传入的字符串或其他值为布尔值**，如果值为`'true'`或`'1'`，则返回`true`，否则返回`false`。如果提供的值无法转换为布尔值，它将抛出异常。

```typescript 
import { ParseBoolPipe } from '@nestjs/common';

@Get('isActive')
checkIsActive(@Query('isActive', ParseBoolPipe) isActive: boolean) {
  return this.service.isActive(isActive);
}

```


### 5. ParseArrayPipe

解析并验证传入的数组。这个管道可以确保您接收的参数确实是数组类型，并支持进一步的数组项验证。

```typescript 
import { ParseArrayPipe } from '@nestjs/common';

@Post()
async create(@Body(new ParseArrayPipe({ items: CreateCatDto })) cats: CreateCatDto[]) {
  this.catsService.createAll(cats);
}

```


### 6. ParseUUIDPipe

解析并验证传入的字符串是否为有效的 UUID。如果不是，会自动抛出异常。

```typescript 
import { ParseUUIDPipe } from '@nestjs/common';

@Get(':uuid')
findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.service.findById(uuid);
}

```


### 7. DefaultValuePipe

设置参数的默认值，如果请求中未包含该参数，或参数值为`undefined`，则使用指定的默认值。

```typescript title="import { DefaultValuePipe } from '@nestjs/common';@Get()findAll(@Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean) {  return this.service.findAll({ activeOnly });}"
import { DefaultValuePipe } from '@nestjs/common';

@Get()
findAll(@Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean) {
  return this.service.findAll({ activeOnly });
}

```


### 8. ParseEnumPipe

解析并验证传入的字符串是否属于特定枚举的有效值。

```typescript 
import { ParseEnumPipe } from '@nestjs/common';

enum Role {
  Admin,
  User,
  Guest,
}

@Post()
setRole(@Body('role', new ParseEnumPipe(Role)) role: Role) {
  return this.service.setRole(role);
}

```


### 9. ParseDatePipe

解析并验证传入的字符串是否可以转换为有效的日期对象。

```typescript 
import { ParseDatePipe } from '@nestjs/common';

@Get(':date')
findOne(@Param('date', ParseDatePipe) date: Date) {
  return this.service.findByDate(date);
}

```


这些内置管道极大简化了数据处理逻辑，使得开发者可以更加专注于业务逻辑的实现，同时保持代码的清晰和安全性。使用这些管道可以有效地避免常见的数据处理错误，如类型错误和格式错误，并确保应用程序的数据输入更加健壮和可靠。

# 过滤器（filter）

异常过滤器（Exception Filters）是用于**处理整个应用程序中抛出的异常的组件**。异常过滤器提供**了一种捕获和处理应用程序抛出的异常的方法**，允许开发者**控制异常的响应格式以及执行一些清理或日志记录操作**。

**异常过滤器的核心用途是改变抛出异常时的处理行为。在 NestJS 中，异常过滤器可以：**

1. 转换异常响应：将技术性的错误信息转换为更友好或更标准化的响应格式。
2. 日志记录：在异常发生时进行日志记录，帮助开发者进行错误追踪和监控。
3. 错误堆栈清理：清理错误堆栈信息，以防止敏感信息泄露给客户端。
4. 条件响应：基于不同类型的异常返回不同的响应，例如根据不同的错误类型设置不同的 HTTP 状态码。

异常过滤器可以通过实现 `ExceptionFilter` 接口创建。下面是一个简单的异常过滤器示例，它捕获所有异常并自定义响应格式：

```typescript 
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from"@nestjs/common";
import { InjectMetric } from"@willsoto/nestjs-prometheus";
import { FastifyReply, FastifyRequest } from"fastify";
import { Counter } from"prom-client";
import { LoggerService } from"src/common/logs/logs.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
      @InjectMetric("http_exception_total")
      private readonly prometheusCounter: Counter<string>,
      private readonly logger: LoggerService
    ) {}
  
    async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const { url, method } = ctx.getRequest<FastifyRequest>();
        const status = exception.getStatus();
    
        // 监控异常
        this.prometheusCounter.labels(method, url, status.toString()).inc();
    
        // 记录错误日志
        this.logger.error(
          {
            message: exception.message,
            timestamp: newDate().toISOString(),
            path: url,
            status,
          },
          "http错误"
        );
    
        // 发送异常响应
        response.status(status).send({
          retcode: status,
          message: exception.message,
          timestamp: newDate().toISOString(),
          path: url,
          data: exception.getResponse(),
        });
     }
}

```


在全局模块中全局注册：

```typescript 
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  ValidationPipe,
} from"@nestjs/common";
import { APP_FILTER } from"@nestjs/core";
import { HttpExceptionFilter } from"./all-exceptions.filter";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
exportclass AppModule {}

```


## NestJS 的内置请求异常过滤器

在 NestJS 中，处理 HTTP 异常时通常会使用一系列预定义的异常类，这些类继承自`HttpException`并为常见的 `HTTP` 状态**代码提供快捷方式**。下面是您提到的每种异常的详细说明，以及它们通常何时使用：

### 1. BadRequestException (400)

表示客户端请求错误，服务器无法理解。

```typescript 
throw new BadRequestException("Invalid request parameters");

```


### 2. UnauthorizedException (401)

表示请求需要用户认证信息，如果没有提供或者提供的认证信息不正确，则会抛出此异常。

```typescript 
throw new UnauthorizedException(
  "Authentication credentials were missing or incorrect"
);

```


### 3. NotFoundException (404)

表示请求的资源未找到，即无法根据客户端的请求找到相应的资源。

```javascript 
throw new NotFoundException("The resource was not found");

```


### 4. ForbiddenException (403)

表示服务器理解请求但拒绝执行。这通常是由于客户端没有足够的权限。

```typescript 
throw new ForbiddenException(
  "You do not have permission to perform this action"
);

```


### 5. NotAcceptableException (406)

表示服务器无法提供符合 Accept-Header 指定的条件的响应。

```typescript 
throw new NotAcceptableException(
  "Cannot generate a response that is acceptable to the user"
);

```


### 6. RequestTimeoutException (408)

表示服务器希望断开空闲连接之前，客户端没有在服务器预备等待的时间内产生请求。

```typescript 
throw new RequestTimeoutException("Request timeout");

```


### 7. ConflictException (409)

表示请求冲突，如请求信息与服务器当前状态冲突。

```typescript 
throw new ConflictException(
  "The request could not be completed due to a conflict with the current state of the resource"
);

```


### 8. GoneException (410)

表示资源在服务器上不再可用，并且没有任何已知的转发地址。

```typescript 
throw new GoneException(
  "The resource requested is no longer available and will not be available again"
);

```


### 9. PayloadTooLargeException (413)

表示请求实体过大。

```typescript 
throw new PayloadTooLargeException("Payload too large");

```


### 10. UnsupportedMediaTypeException (415)

表示请求格式正确，但是服务器不支持请求的媒体类型。

```java 
throw new UnsupportedMediaTypeException("Unsupported media type");

```


### 11. UnprocessableException (422)

表示虽然请求内容类型正确，且生成的请求实体也符合数据结构要求，但其中含有语义错误。

```typescript 

throw new UnprocessableException("Semantic errors in request");

```


### 12. InternalServerErrorException (500)

表示服务器遇到了一个错误，无法完成请求。

```typescript 
throw new InternalServerErrorException("An unexpected error occurred");

```


### 13. NotImplementedException (501)

表示服务器不支持当前请求所需要的功能。

```javascript title="throw new NotImplementedException(  %22The server does not support the functionality required to fulfill the request%22);"
throw new NotImplementedException(
  "The server does not support the functionality required to fulfill the request"
);

```


### 14. BadGatewayException (502)

表示作为网关或代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。

```typescript 
throw new BadGatewayException("Invalid response from an upstream server");

```


### 15. ServiceUnavailableException (503)

表示服务器目前无法使用（由于超载或停机维护）。

```typescript 
throw new ServiceUnavailableException(
  "The server is currently unable to handle the request due to a temporary overloading or maintenance"
);

```


### 16. GatewayTimeoutException (504)

表示作为网关或代理的服务器未能及时从上游服务器或外部辅助服务器接收请求。

```typescript 
throw new GatewayTimeoutException("The gateway timed out");

```


### 使用场景

这些异常可以在您的控制器或服务中直接抛出。NestJS 会捕获这些异常并自动转换为相应的 HTTP 响应，返回给客户端。这种机制使得异常处理在整个应用中既统一又简便。

# 总结

`NestJS` 是构建在 `Express`.js 之上的一个框架，但它也提供了与其他底层 HTTP 框架（如 `Fastify`）的兼容性。这种设计让 `NestJS` 不只是单纯的封装，而是提供了**一种更加灵活和强大的应用架构方式。**

1. **IOC：自己实现了模块机制，可以导入导出 provider，实现自动依赖注入，简化了对象的创建**
2. `AOP`：抽象了 `Guard`、`Interceptor`、`Pipe`、`Exception Filter` 这 4 种切面，可以**通过切面抽离一些通用逻辑，然后动态添加到某个流程中**
3. 任意切换底层平台：nest 基于 ts 的 interface 实现了不和任何底层平台耦合，http 可以切换 `express` 和 `fastify`，`websocket` 可以切换 [socket.io](http://socket.io "socket.io") 和 `ws`。而且 4 种切面也实现了可以跨 `http`、`websocket`、`微服务来`复用。

这种灵活性和强大的抽象层使得 NestJS 不仅仅是对 Express 的封装，而是**一个功能全面的、可适用于多种场景的现代 Node.js 框架。通过这种方式，NestJS 使得开发者能够构建出结构清晰、易于维护且高效的应用。**

# 小技巧

## 目录

- [1. API接口需要一个全局的前缀](#1-API接口需要一个全局的前缀)
- [2.模块化](#2模块化)
- [3. 使用DTO](#3-使用DTO)
- [4.始终使用Data Mapper/Repository模式，不使用Active Record](#4始终使用Data-MapperRepository模式不使用Active-Record)
- [5. 使用相对路径而不是绝对路径](#5-使用相对路径而不是绝对路径)
- [6. 使用Exclude()来隐藏数据](#6-使用Exclude来隐藏数据)
- [7.使用实体getter](#7使用实体getter)
- [8.使用集中式命名导出](#8使用集中式命名导出)
- [9. 使用自定义装饰器来简化您的逻辑](#9-使用自定义装饰器来简化您的逻辑)

## 1. API接口需要一个全局的前缀

设定一个全局的前缀是比较好的实践。我经常在我的端点加上前缀`/api/v1`。

我们为什么需要前缀？[Jeremy Glassenbery](https://link.juejin.cn/?target=https://www.quora.com/Why-do-developers-use-the-API-V1-prefix-while-developing-a-server-side-API "Jeremy Glassenbery")的解释：

```markdown 
“好的API在设计时考虑到了向后兼容性。当增强/添加到API时，API管理器应确保已经连接到该API的应用程序不受影响。”

```


简单来说，API前缀是为了**向后兼容和清晰。**

```typescript 
import { NestFactory } from '@nest js/core'
import { AppModule } from ' . /app. module'
async function bootstrap() {
  const app = await NestFactory. create(AppModule)
  app.setGlobalPrefix('/api/v1')
  await app.listen(3000)
}
bootstrap()

```


## 2.模块化

Nest.js在制作时考虑到了模块化结构。你的应用程序应该被**分解成块，分解成模块**。

**按功能、按主题而不是按类型将应用**程序拆分到文件夹中是很常见的。

这是一个按类型分解的例子：

![](./image/image_rB85qnX8u5.png)

这是一个按主题分解的例子

![](./image/image_6TGDcNEVm9.png)

在 Nest.js中， 一个模块有一个`.module.ts`文件包含`@Module({})`装饰器。但是这不是必须的！不是每一个文件夹都需要一个`.module.ts`文件。您可以创建一个文件夹`utils`来存放您的帮助函数和JSON文件。

通过合理的**组织您的文件进入主题文件夹**，您将会获得**更清晰的业务和规避很多的bug**。甚至，**如果你不遵守这个原则，Nest.js可能会在构建过程中崩溃。**

## 3. 使用DTO

**DTO=Data Transfer Object**。Dto和接口有些类似，但是它的主要目的是为**了转换和验证数据**。他们基本上在路由控制中被使用。

您可以他们简化您的`API`内容（`body`）和请求验证逻辑。例如，`AuthDto` 自动的整合用户的`email`和`password`进一个`dto`对象进行强制验证。

![](./image/image_aWdRhKjWXd.png)

如果您期待`password`必须要大于5位，您可以使用`class-validator`包来自动的抛出一个异常。

还有很多技巧可以使Dto做一些神奇事情，但是这里先不介绍了。

## 4.始终使用Data Mapper/Repository模式，不使用Active Record

如果您用关系型数据库类似`PostgreSql`或者`MySQL`来工作，等于您进入了天堂。`Nest.js`附带了\*\*`TypeOrm`\*\*，这是`Typescript`**最强大的ORM之一。**

`TypeOrm`可以使用两种模式，一种是由`ruby on rails`推广的活动记录（`Active Record`）模式，另一种是使用存储库的数据映射器（`Data Mapper/Repository`）模式。

> 使用活动记录方法，可以在模型本身内部定义所有查询方法，并使用模型方法保存、删除和加载对象。

这有一个活动记录模拟如下

```typescript 
const user = new UserEntity()  
user.name = "Vladimir"  
user.job = "programmer"  
await user.save()

```


> 使用数据映射器方法，您可以在称为“**存储库**”的单独类中定义所有查询方法，并使用存储库保存、删除和加载对象。

这有一个数据映射模拟如下

```typescript 
const user = this.userRepository.create()  
user.name = "Vladimir"  
user.job = "programmer"  
await this.userRepository.save(user)

```


虽然乍一看，活动记录似乎更好，但它违背了Nest.js提供的模块化，因为活动记录与`全局实体`一起工作，而数据映射器需要在使用它们之前将实体注入每个模块。

**数据映射器可能看起来有点冗长，但对于中大型项目来说**，它是一个更好的解决方案。它也非常适合测试，**因为它可以与依赖项注入一起工作！**

## 5. 使用相对路径而不是绝对路径

您可以使用绝对路径或者相对路径来导入一个es6模块。在开发阶段他们会工作的很顺利，但是当尝试去构建它的时候这会崩溃。当您使用Nest.js的时候请**始终使用相对路径**。你稍后会感谢我的。（npm运行build时，预计会出现绝对路径错误）

```typescript 
// 相对
import { SecurityService } from '../security/security.service';
import { CommentService } from '../comment/comment.service';
// 绝对
import { SecurityService } from 'src/security/security.service';
import { CommentService } from 'src/comment/comment.service';

```


## 6. 使用Exclude()来隐藏数据

当您从数据库取得数据时，通常要通过`transformers`**来筛选数据**。主要的目的是为了**删除或格式化从数据库过来的数据**。这会产生很多垃圾逻辑。

为了避免这种情况您可以使用`@Exclude()`装饰器

```typescript 
import { Exclude } from 'class-transformer';  
  
export class UserEntity {  
  id: number;  
  firstName: string;  
  lastName: string;  
  
  @Exclude()
  password: string;  
  
  constructor(partial: Partial<UserEntity>) {  
    Object.assign(this, partial);  
  }  
}

```


## 7.使用实体getter

有些逻辑会直接访问您的实体属性。最常见的用例与密码哈希和获取全名有关。但是要注意不要用大量的逻辑来重载实体。为此使用**自**[**定义存储库**](https://link.juejin.cn/?target=https://docs.nestjs.com/techniques/database#custom-repository "定义存储库")

```typescript 
import { Exclude } from 'class-transformer';  
  
export class UserEntity {  
  id: number;  
  firstName: string;  
  lastName: string;  
  
  get fullName() {  
    return this.firstName + " " + this.lastName;  
  }  
}

```


## 8.使用集中式命名导出

与其从不同的文件夹中导入您的类，不如从同一个文件夹来导入他们。

![](./image/image_-F_BvaRgq1.png)

```typescript 
// index.ts内部
export * from './createPost.dto';
export * from './editPost.dto';
export * from './editPostCategory.dto';
export * from './editPostStatus.dto';

// 从一个文件夹导入
import { CreatePostDto, EditPostDto } from './dto'

// 代替多个文件夹导入
import { CreatePostDto } from './dto/createPost.dto'
import { EditPostDto } from './dto/editPost.dto'

```


## 9. 使用自定义装饰器来简化您的逻辑

如果您使用装饰器，您的逻辑会被明显的简化。

在这个例子中，**GetUserIdFromJwt**将把用户“sub”字段与请求对象隔离开来，我们之前已经用jwt策略验证了这一点。

![](./image/image_ioJjWBB8Hw.png)

您也可以直接在路由上使用这段逻辑

![](./image/image_B1i682jV1T.png)

您可以使用自定义装饰器来做这些类似的事情。装饰器的另一个非常方便的用例是分页。

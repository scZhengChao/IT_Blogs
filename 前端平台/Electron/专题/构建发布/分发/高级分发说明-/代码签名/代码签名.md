# 代码签名

## 目录

- [签名 & 认证 macOS 版本](#签名--认证-macOS-版本)
  - [使用 Electron Forge](#使用-Electron-Forge)
  - [使用 Electron Packager](#使用-Electron-Packager)
  - [对 Mac 应用商店应用程序进行签名](#对-Mac-应用商店应用程序进行签名)
- [签署windows应用程序](#签署windows应用程序)
  - [使用 Electron Forge](#使用-Electron-Forge)
  - [使用 Electron Packager](#使用-Electron-Packager)
  - [使用 electron-winstaller (Squirrel.Windows)](#使用-electron-winstaller-SquirrelWindows)
  - [使用 electron-wix-msi (WiX MSI)](#使用-electron-wix-msi-WiX-MSI)
  - [使用 Electron Builder](#使用-Electron-Builder)
  - [对 Windows 应用商店应用程序进行签名](#对-Windows-应用商店应用程序进行签名)

代码签名是一种安全技术，用于**证明应用程序是由您创建的**。您应该对应用程序进行签名，这样它就不会**触发任何操作系统安全警告。**

> macOS Sonoma Gatekeeper警告：应用程序已损坏

Windows和macOS都**禁止用户运行未签名的应用程序**。可以在**不进行代码签名的情况下**分发应用程序，但为了运行它们，**用户需要经过多个高级和手动步骤才能运行它们。**

如果你正在开发一款Electron应用，并打算将其打包发布，那你就应该为其添加代码签名

Electron**生态系统工具**使应用程序的代码签名变得简单明了——本文档解释了如何在Windows和macOS上对应用程序进行签名。

## 签名 & 认证 macOS 版本

准备`macOS`应用程序以供发布需要两个步骤：首先，**应用程序需要进行代码签名。**

然后，需要将该**应用程序上传**到`Apple`以进行称为 **公证 **的过程，其中自动化系统将进一步验**证 您的应用程序是否未采取任何危害其用户的行为。**

若要开始，请确保**你满足签名要求并认证你的应用：**

1. 加入\*\* **[**Apple Developer Program**](https://developer.apple.com/programs/ "Apple Developer Program")**(需要缴纳年费)\*\*
2. Download and install\*\* **[**Xcode**](https://developer.apple.com/xcode "Xcode")** \*\*- this requires a computer running macOS(下载并安装Xcode-这需要运行macOS的计算机)
3. Generate, download, and install [**signing certificates**](https://developer.apple.com/support/certificates/ "signing certificates")(生成、下载和安装签名证书)

`Electron` 的生态系统有利于配置和自由，所以有多种方法让您的应用程序签名和公证。

### 使用 Electron Forge

如果你正在使用 `Electron` 最受欢迎的构建工具，创建你的应用程序签名 并经过公证仅需要对配置进行一些添加即可。\*\* **[**Forge**](https://electronforge.io/ "Forge")** \*\*是官方的 `Electron` 工具的 集合，在`hood`下使用 [@electron/packager](https://github.com/electron/packager "@electron/packager") [@electron/osx-sign](https://github.com/electron/osx-sign "@electron/osx-sign") [@electron/notarize](https://github.com/electron/notarize "@electron/notarize") 。

请参见\*\* Electron Forge **文档中的** \*\*[**签署 macOS 应用程序**](https://www.electronforge.io/guides/code-signing/code-signing-macos "签署 macOS 应用程序") 指南了解如何配置应用程序详细说明。

### 使用 Electron Packager

如果你没有使用像 Forge 这样的集成构建流，你可能会使用 [@electron/packager](https://github.com/electron/packager "@electron/packager")，其中包括 [@electron/osx-sign](https://github.com/electron/osx-sign "@electron/osx-sign") 和 [@electron/notarize](https://github.com/electron/notarize "@electron/notarize")。

如果您使用的是`Packager`的API，那么您可以传入对**应用程序进行签名和公证的配置**。如果下面的例子不能满足您的需求，请参阅@electron/osx sign和@electron/notrize了解许多可能的配置选项。

```javascript 
const packager = require('@electron/packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {},
  osxNotarize: {
    appleId: 'felix@felix.fun',
    appleIdPassword: 'my-apple-id-password'
  }
})
```


### 对 Mac 应用商店应用程序进行签名

See the [**Mac App Store Guide**](https://www.electronjs.org/zh/docs/latest/tutorial/mac-app-store-submission-guide "Mac App Store Guide")**.**

## 签署windows应用程序

在对应用程序进行代码签名之前，您需要**获得代码签名证书**。与苹果不同，微软允许开发者在**公开市场上购买这些证书**。它们通常由同样提供HTTPS证书的公司销售。价格各不相同，所以货比三家可能是值得的。常见经销商包括：

- [Certum EV code signing certificate](https://shop.certum.eu/data-safety/code-signing-certificates/certum-ev-code-sigining.html "Certum EV code signing certificate")
- [DigiCert EV code signing certificate](https://www.digicert.com/signing/code-signing-certificates "DigiCert EV code signing certificate")
- [Entrust EV code signing certificate](https://www.entrustdatacard.com/products/digital-signing-certificates/code-signing-certificates "Entrust EV code signing certificate")
- [GlobalSign EV code signing certificate](https://www.globalsign.com/en/code-signing-certificate/ev-code-signing-certificates "GlobalSign EV code signing certificate")
- [IdenTrust EV code signing certificate](https://www.identrust.com/digital-certificates/trustid-ev-code-signing "IdenTrust EV code signing certificate")
- [Sectigo (formerly Comodo) EV code signing certificate](https://sectigo.com/ssl-certificates-tls/code-signing "Sectigo (formerly Comodo) EV code signing certificate")
- [SSL.com EV code signing certificate](https://www.ssl.com/certificates/ev-code-signing/ "SSL.com EV code signing certificate")

需要指出的是，自2023年6月以来，微软要求软件必须使用“**扩展验证**”证书进行签名，也称为“**EV代码签名证书**”。在过去，开发人员可以使用一种更简单、更便宜的证书对软件进行签名，称为“authenticode代码签名证书”或“基于软件的OV证书”。这些更简单的证书不再提供好处：Windows将把你的应用程序视为完全未签名，并显示等效的警告对话框。

新的EV证书需要存储在符合FIPS 140 Level 2、Common Criteria EAL 4+或同等标准**的硬件存储模块上**。换句话说，证书不能简单地下载到CI基础结构上。在实践中，这些存储模块看起来像是花哨的USB拇指驱动器。

许多证书提供商现在提供“基于云的签名”——**整个签名硬件都在他们的数据中心**，您可以使用它来远程签名代码。这种方法在`Electron`维护人员中很受欢迎，因为它使在**CI中签署**应用程序（如GitHub Actions、CircleCI等）相对容易。

在撰写本文时，`Electron`自己的应用程序使用DigiCert KeyLocker，但**任何提供用于签署文件的命令行工具**的提供商都将与Electron的工**具兼容。**

Electron生态系统中的所有工具都使用@Electron/windows符号，通常通过windowsSign属性公开配置选项。您可以使用它直接对文件进行签名，也可以在Electron Forge、@Electron/packager、electronic-winstaler和electronic-wix-msi中使用相同的windowsSign配置。

### 使用 Electron Forge

Electron Forge是为您的**应用程序和松鼠签名的推荐方式**。Windows和WiX MSI安装程序。有关如何配置应用程序的详细说明，请参阅[**Electron Forge代码签名教程。**](https://www.electronforge.io/guides/code-signing/code-signing-windows "Electron Forge代码签名教程。")

### 使用 Electron Packager

如果你没有使用像Forge这样的集成构建管道，你可能会使用@electronic/packager，其中包括@electronix/windows符号。
如果您使用的是[**Packager**](https://github.com/electron/packager "Packager")的API，那么您可以传[**入对应用程序进行签名的配**](https://electron.github.io/packager/main/modules.html "入对应用程序进行签名的配")[置](https://electron.github.io/packager/main/modules.html "置")。如果下面的示例不符合您的需求，请参阅[**@electronic/windowssign了解**](https://github.com/electron/windows-sign "@electronic/windowssign了解")许多可能的配置选项。

```javascript 
const packager = require('@electron/packager')

packager({
  dir: '/path/to/my/app',
  windowsSign: {
    signWithParams: '--my=custom --parameters',
    // If signtool.exe does not work for you, customize!
    signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
  }
})
```


### 使用 electron-winstaller (Squirrel.Windows)

[electron-winstaller](https://github.com/electron/windows-installer "electron-winstaller") is a package that can generate Squirrel.Windows installers for your Electron app. This is the tool used under the hood by Electron Forge's [Squirrel.Windows Maker](https://www.electronforge.io/config/makers/squirrel.windows "Squirrel.Windows Maker"). Just like `@electron/packager`, it uses [@electron/windows-sign](https://github.com/electron/windows-sign "@electron/windows-sign") under the hood and supports the same `windowsSign` options.

[electron-winstaller](https://github.com/electron/windows-installer "electron-winstaller") 是一个可以生成松鼠的软件包。Electron应用程序的Windows安装程序。这是Electron Forge的松鼠在引擎盖下使用的工具。Windows Maker。就像@electron/packager一样，它在引擎盖下使用@electron/windows标志，并支持相同的windowsSign选项。

```javascript 
const electronInstaller = require('electron-winstaller')
// NB: Use this syntax within an async function, Node does not have support for
//     top-level await as of Node 12.
try {
  await electronInstaller.createWindowsInstaller({
    appDirectory: '/tmp/build/my-app-64',
    outputDirectory: '/tmp/build/installer64',
    authors: 'My App Inc.',
    exe: 'myapp.exe',
    windowsSign: {
      signWithParams: '--my=custom --parameters',
      // If signtool.exe does not work for you, customize!
      signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
    }
  })
  console.log('It worked!')
} catch (e) {
  console.log(`No dice: ${e.message}`)
}
```


For full configuration options, check out the [electron-winstaller](https://github.com/electron/windows-installer "electron-winstaller") repository!

(有关完整的配置选项，请查看electronic winstaller存储库！)

### 使用 electron-wix-msi (WiX MSI)

[electron-wix-msi](https://github.com/electron-userland/electron-wix-msi "electron-wix-msi") is a package that can generate MSI installers for your Electron app. This is the tool used under the hood by Electron Forge's [MSI Maker](https://www.electronforge.io/config/makers/wix-msi "MSI Maker"). Just like `@electron/packager`, it uses [@electron/windows-sign](https://github.com/electron/windows-sign "@electron/windows-sign") under the hood and supports the same `windowsSign` options.

`electronic-wix-msi`是一个可以为您的`electron`应用程序生成msi安装程序的包。这是Electron Forge的MSI Maker在引擎盖下使用的工具。就像@electron/packager一样，它在引擎盖下使用@electron/windows标志，并支持相同的windowsSign选项。

```javascript 
import { MSICreator } from 'electron-wix-msi'

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: '/path/to/built/app',
  description: 'My amazing Kitten simulator',
  exe: 'kittens',
  name: 'Kittens',
  manufacturer: 'Kitten Technologies',
  version: '1.1.2',
  outputDirectory: '/path/to/output/folder',
  windowsSign: {
    signWithParams: '--my=custom --parameters',
    // If signtool.exe does not work for you, customize!
    signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
  }
})

// Step 2: Create a .wxs template file
const supportBinaries = await msiCreator.create()

// 🆕 Step 2a: optionally sign support binaries if you
// sign you binaries as part of of your packaging script
for (const binary of supportBinaries) {
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
  await signFile(binary)
}

// Step 3: Compile the template to a .msi file
await msiCreator.compile()
```


For full configuration options, check out the [electron-wix-msi](https://github.com/electron-userland/electron-wix-msi "electron-wix-msi") repository!

(有关完整的配置选项，请查看electronic-wix-msi存储库！)

### 使用 Electron Builder

Electron Builder 附带一个自定义解决方案，用于签署应用程序。 你可以在这里找到 [它的文档](https://www.electron.build/code-signing "它的文档")

### 对 Windows 应用商店应用程序进行签名

See the [Windows Store Guide](https://www.electronjs.org/zh/docs/latest/tutorial/windows-store-guide "Windows Store Guide").

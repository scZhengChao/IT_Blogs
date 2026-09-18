# 辅助功能

## 目录

- [手动启用辅助功能](#手动启用辅助功能)
  - [使用 Electron 的 API](#使用-Electron-的-API)
  - [在第三方软件内](#在第三方软件内)
    - [macOS](#macOS)

Electron 应用中有关辅助功能的**开发和网站是相似的**，因为两者最终**使用的都是HTML**

# 手动启用辅助功能

当辅助技术存在时，Electron 应用程序将自动启用辅助功能（例如 Windows 上的 [JAWS](https://www.freedomscientific.com/products/software/jaws/ "JAWS") 或 macOS 上的 [VoiceOver](https://help.apple.com/voiceover/mac/10.15/ "VoiceOver")）。 有关详细信息, 请参阅 Chrome 的 [**辅助功能文档**](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology "辅助功能文档")\*\* 。\*\* ​

还可以在 Electron 应用程序或在第三方本地软件中设置标志来手动切换这些功能。

### 使用 Electron 的 API

通过使用 [app.setAccessibilitySupportEnabled(enabled)](https://www.electronjs.org/zh/docs/latest/api/app#appsetaccessibilitysupportenabledenabled-macos-windows "app.setAccessibilitySupportEnabled(enabled)") API，您可以在应用**程序首选项中的手动向用户暴露**`Chrome`的访问树。 请注意，**用户的系统辅助工具优先于此设置并将覆盖它。**

### 在第三方软件内

#### macOS

在 macOS 的 Electron 应用中，可以通过 `AXManualAccessibility` 来切换第三方的辅助功能：

使用 Objective-C：

```javascript 
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```


使用 Swift：

```javascript 
import Cocoa
let name = CommandLine.arguments.count >= 2 ? CommandLine.arguments[1] : "Electron"
let pid = NSWorkspace.shared.runningApplications.first(where: {$0.localizedName == name})!.processIdentifier
let axApp = AXUIElementCreateApplication(pid)
let result = AXUIElementSetAttributeValue(axApp, "AXManualAccessibility" as CFString, true as CFTypeRef)
print("Setting 'AXManualAccessibility' \(error.rawValue == 0 ? "succeeded" : "failed")")
```

# 点击出现禁止出现默认窗口，仅保留 Hotkey Window

如果希望 iTerm2 启动时不显示默认窗口，仅通过热键激活 Hotkey Window：

1. **保存空白窗口排列**
   - 关闭所有 iTerm2 窗口。
   - 按`⌘ + ⇧ + S`保存当前窗口排列（此时无窗口，保存为空状态）。
   - 在提示框输入名称（如`Empty`）。
2. **设置默认启动排列**
   - 进入**iTerm2 > Settings > Arrangements**。
   - 选择刚刚保存的排列（如`Empty`），点击**Set as Default**。
3. **配置启动行为**
   - 进入**General > Startup**。
   - 勾选**Open default window arrangement**。
4. **登录项配置**
   - 打开系统设置**System Settings > General > Login Items**。
   - 添加 iTerm2 到登录项，取消勾选**Hide**（否则热键可能失效）。
5. **验证效果**
   - 重启 iTerm2，此时不会显示任何窗口。
   - 按下设置的快捷键（如`⌘ +`）即可调出 Hotkey Window。

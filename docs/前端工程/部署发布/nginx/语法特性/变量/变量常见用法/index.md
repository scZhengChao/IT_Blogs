# 变量常见用法

## 目录

- [\$is\_args\&args](#is_argsargs)
- [匹配查询参数](#匹配查询参数)
  - [注意事项](#注意事项)
- [匹配查询头](#匹配查询头)
  - [说明](#说明)

# \$is\_args\&args

在nginx配置中，`$is_args$args`是一个常用的变量组合，用于处理URL参数。

**分解解释：**

- **`$args`**：包含URL中所有的查询参数（问号后面的部分）
  - 例如：对于URL `/page?name=john&age=20`，`$args`= `name=john&age=20`
- **`$is_args`**：自动判断是否需要添加问号 `?`
  - 如果 `$args`不为空，`$is_args`= `?`
  - 如果 `$args`为空，`$is_args`= 空字符串

**组合使用示例：**

```markdown 
location / {
    return 302 /newpage$is_args$args;
}
```


**实际效果：**

- 原始请求：`/old?name=john&age=20`
- 重定向到：`/newpage?name=john&age=20`（自动添加了 `?`）
- 原始请求：`/old`（无参数）
- 重定向到：`/newpage`（不会添加多余的 `?`）

**常见应用场景：**

1. **URL重写时保留参数**
2. **重定向时保持参数不变**
3. **反向代理时传递原始参数**

这样设计的好处是：nginx会自动处理问号的有无，避免出现 `/newpage?`（后面没有参数）这种不规范的URL格式。

# 匹配查询参数

在 Nginx 配置中，您可以使用 `if`指令结合 `$arg_`变量来检查 URL 查询参数。以下是对您提供的条件的解释和示例：

```nginx 
location / {
    if ($arg_previewMode = "on") {
        # 如果查询参数 previewMode 的值为 "on"，则执行以下操作
        # 例如：重写 URL、设置头信息、返回特定响应等
        return 403; # 示例：禁止访问
    }
    # 其他配置...
}
```


- `$arg_previewMode`用于获取名为 `previewMode`的查询参数值。
- 如果 URL 为 `http://example.com/page?previewMode=on`，则条件成立。
- 在 `if`块内，您可以添加其他指令（如 `rewrite`、`proxy_pass`等）。

### 注意事项

- Nginx 的 `if`指令在某些上下文中可能有局限性，建议谨慎使用。
- 如果条件复杂，可结合 `map`指令或 Lua 模块处理。

# 匹配查询头

这是一个检查 HTTP 请求头 `X-Fe-Env`的 Nginx 配置示例：

```nginx 
location / {
    if ($http_x_fe_env = "xxx") {
        set $preview_header "xxx";
    }
    
    # 后续可以根据 $preview_header 变量进行条件判断
    if ($preview_header = "xxx") {
        # 执行相应的逻辑
        # 例如：代理到测试环境、启用调试模式等
        proxy_pass http://test_backend;
    }
    
    # 其他配置...
}
```


### 说明

- `$http_x_fe_xxx`用于获取名为 `X-Fe-xxx`的 HTTP 请求头值
- 当请求头 `X-Fe-Env: `xxx时，条件成立
- 使用 `set`指令将值赋给自定义变量 `$preview_header`

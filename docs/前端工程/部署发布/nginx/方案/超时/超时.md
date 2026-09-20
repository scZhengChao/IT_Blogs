# 超时

## 目录

- [具体介绍可以参考如下](#具体介绍可以参考如下)
- [client\_body\_timeout](#client_body_timeout)
- [client\_header\_timeout](#client_header_timeout)
- [send\_timeout](#send_timeout)
- [keepalive\_timeout](#keepalive_timeout)
- [proxy\_connect\_timeout](#proxy_connect_timeout)
- [proxy\_read\_timeout](#proxy_read_timeout)
- [proxy\_send\_timeout](#proxy_send_timeout)

nginx中有些超时设置，本文汇总了nginx中几个超时设置

Nginx 中的超时设置包括：

“client\_body\_timeout”：设置客户端向服务器发送请求体的超时时间，单位为秒。

“client\_header\_timeout”：设置客户端向服务器发送请求头的超时时间，单位为秒。

“send\_timeout”：设置服务器向客户端发送响应的超时时间，单位为秒。

“keepalive\_timeout”：设置服务器与客户端之间保持连接的超时时间，单位为秒。

“proxy\_connect\_timeout”：设置代理服务器与后端服务器建立连接的超时时间，单位为秒。

“proxy\_read\_timeout”：设置代理服务器从后端服务器读取数据的超时时间，单位为秒。

“proxy\_send\_timeout”：设置代理服务器向后端服务器发送数据的超时时间，单位为秒。

## 具体介绍可以参考如下

## client\_body\_timeout

用于**设置客户端在发送请求体时的超时时间**，如果超过了设置的时间客户端还没有发送完请求体，则 Nginx 会返回 “408 Request Time-out” 错误。

默认值为 60s，可以在 “http” 或 “server” 块内使用 “client\_body\_timeout” 指令进行设置。

例如，要将 “client\_body\_timeout” 设置为 30 秒，可以在 “http” 或 “server” 块中加入以下指令：

client\_body\_timeout 30s;

此时，如果客户端在发送请求体时超过了 30 秒，则 Nginx 会返回 “408 Request Time-out” 错误。

## client\_header\_timeout

用于设**置客户端在发送请求头时的超时时间**，如果超过了设置的时间客户端还没有发送完请求头，则 Nginx 会返回 “408 Request Time-out” 错误。

默认值为 60s，可以在 “http” 或 “server” 块内使用 “client\_header\_timeout” 指令进行设置。

例如，要将 “client\_header\_timeout” 设置为 30 秒，可以在 “http” 或 “server” 块中加入以下指令：

client\_header\_timeout 30s;

此时，如果客户端在发送请求头时超过了 30 秒，则 Nginx 会返回 “408 Request Time-out” 错误。

## send\_timeout

用于设置 Nginx 在**响应请求时的超时时间**。如果在设置的时间内 Nginx 还没有将响应完全发送出去，则会返回 “408 Request Time-out” 错误。

默认值为 60s，可以在 “http” 或 “server” 块内使用 “send\_timeout” 指令进行设置。

例如，要将 “send\_timeout” 设置为 30 秒，可以在 “http” 或 “server” 块中加入以下指令：

send\_timeout 30s;

此时，如果 Nginx 在响应请求时超过了 30 秒还没有将响应完全发送出去，则会返回 “408 Request Time-out” 错误。

## keepalive\_timeout

用于设置 Nginx **保持连接的超时时间**。当浏览器发送请求时，如果它已经与 Nginx 建立了连接，则可以直接使用该连接发送请求，而不需要再次建立连接。这样就可以减少建立连接的开销，提高性能。

默认值为 75s，可以在 “http” 或 “server” 块内使用 “keepalive\_timeout” 指令进行设置。

例如，要将 “keepalive\_timeout” 设置为 60 秒，可以在 “http” 或 “server” 块中加入以下指令：

keepalive\_timeout 60s;

此时，如果浏览器与 Nginx 建立了连接，则在 60 秒内浏览器可以直接使用该连接发送请求。超过 60 秒后，如果浏览器还没有发送请求，则 Nginx 会断开连接。

## proxy\_connect\_timeout

用于设置**连接上游服务器的超时时间**，单位为秒。当 Nginx 从客户端请求后，如果在规定时间内没有连接上游服务器，则会返回超时错误。这个超时时间也包含了建立连接的时间。这个参数通常用于配置反向代理，也可以用于配置负载均衡。

## proxy\_read\_timeout

用于设置**从上游服务器读取响应的超时时间**，单位为秒。当 Nginx 连接上游服务器后，如果在规定时间内没有收到响应，则会返回超时错误。这个超时时间也**包含了接收响应数据的时间。** 这个参数通常用于配置反向代理，也可以用于配置负载均衡。

## proxy\_send\_timeout

用于设置向**上游服务器发送请求的超时时间**，单位为秒。当 Nginx 向上游服务器发送请求后，如果在规定时间内没有收到响应，则会返回超时错误。这个超时时间也**包含了发送请求数据的时间**。这个参数通常用于配置反向代理，也可以用于配置负载均衡。

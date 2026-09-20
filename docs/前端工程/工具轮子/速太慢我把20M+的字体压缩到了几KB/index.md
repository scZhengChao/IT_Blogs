# 速太慢我把20M+的字体压缩到了几KB

## 目录

- [字体文件为什么那么大？](#字体文件为什么那么大)
- [TTF有办法优化吗？](#TTF有办法优化吗)
  - [回归问题本身](#回归问题本身)
  - [确定解决方向](#确定解决方向)

## 字体文件为什么那么大？

🙋 DeepSeek同学来回答下大家：

这里所说的大体积的字体资源多数是指中文主要原因下边两点

- **中文字符数量庞大**，英文仅**26**个字母 + 符号，中文（全字符集）包含**70,000+** 字符
- **字形结构复杂**，字体文件需为每个字符存储独立的矢量轮廓数据，而汉字笔画复杂，每个字符需存储数百个控制点坐标（例如「龍」字的轮廓点数量可能是「A」的 10 倍以上）

总结下来就是咱们不光汉字多，书法也是五花八门，它是真小不了。如果你硬要压缩，我们只能从第一点入手，将字符数量进行缩减，比如保留**1000**个常用汉字。

web网站中常见字体格式

![](./image/image_XmrShBrva-.png)

由于我司物料部门提供的为TTF格式，所以这里通过思源黑体给一个直观的对比：

- TTF 文件：16.9 MB
- WOFF2 文件：7.4 MB（压缩率约 60%）

两者为什么会差这么多，其实WOFF2 只是在 TTF/OTF 基础上添加了压缩和 Web 专用元数据，且WOFF2支持增量解码，也就是边下载边解析，文本可更快显示（即使字体未完全加载，不过有待考证）。

## TTF有办法优化吗？

### 回归问题本身

首先来简单回顾下我们自定义的字体是如何在浏览器中完成渲染的

一般情况下我们对字体文件的引用方式**为下边三种**

- 通过**绝对路径来引用，这种就是将字体文件打包在工程内，所以带来的结果就是工程打包文件体积太大**

```css 
@font-face {
  font-family: 'xxx';
  src: url('../../assets/fonts.woff2')
}
```


- 第二种就是 CDN 中存放的字体文件，一般是通过这种方式来减少工程的编译后体积

```css 
@font-face {
  font-family: 'xxx';
  src: url('https://xxx.woff2')
}

```


- 通过`FontFace`构造一个字体对象

前两种一般是在浏览器构建 CSSOM 时，当遇到`**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(243, 243, 243);">url()</font>**`引用时会发起资源请求。第三种则是通过 js 来控制字体的加载流程，所以归根结底就是字体文件太大，导致网络资源下载速度慢，我们只能从优化字体大小的方向入手

### 确定解决方向

下面汇总下查到的具体几个优化方案，诸如提高网络传输效率，增加缓存之类的就不讲了，能够立竿见影的主要下边这两个方案

| 方案    | 方法/原理                                                                               | 适用场景                     |
| ----- | ----------------------------------------------------------------------------------- | ------------------------ |
| 字体子集化 | 通过工具将字体文件进行提取（\*\*支持动态\*\*），返回指定的字符集的字体文件，其根本就是\*\*减少单次资源请求的体积\*\*，\*\*需要服务端支持\*\*  | 这个方案是所有优化场景的基础           |
| 按需加载  | 通过设置\`unicode-range\`属性，浏览器在进行css样式计算时候，会根据\*\*页面中的字符与设置的字符范围进行比对，匹配上会加载对应的字体文件\*\* | 前提是资源已经被子集化，比较适用多语言切换的场景 |

简单来说，**字体子集化**可单独食用，**按需加载**则必须要将字体前置子集化。才能完美实现按需加载。就我的这个项目而言，动态子集化方案不要太完美，毕竟一张海报本身就没几个字儿！所以我们这次**将抛弃 CDN，通过动态的将服务本地中的字体资源子集化**来实现字体的压缩效果。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/TpB2QHJbiaicGBMq0oBcpRACKiaOnDuxQAMQgeffe476D5Bhicsj7zVxic9KZmlYMMxWvkaickdDLNHruhj443QDoPbQ/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

这里我们使用\*\*`python`**中的一个字体工具库`fontTools`来实现一个动态子集化，类似于 Google Fonts 的实现。核心思路就是将字符传给服务端，通过**工具将传入的字符在本地字体文件中提取并返回给客户端 \*\*，通过**fontTools**还可以将TTF格式转化为和Web更搭的**WOFF2**格式。实现细节如下述代码所示

```python 
@app.route('/font/<font_name>', methods=['GET'])
defget_font_subset(font_name):
    # 获取本地字体文件路径
    font_path = os.path.join(FONTS_DIR, f"{font_name}.ttf")
    # 获取子集字符
    chars = request.args.get('text', '')
    # 字体文件格式
    format = request.args.get('format', 'woff2').lower()

    # 处理字符，去重
    unique_chars = ''.join(sorted(set(chars)))
    try:
        # 配置子集化选项
        options = Options()
        options.flavor = formatifformatin {'woff', 'woff2'} elseNone
        options.desubroutinize = True# 增强兼容性
        subsetter = Subsetter(options=options)
        
        # 加载字体并生成子集
        font = TTFont(font_path)
        subsetter.populate(text=unique_chars)
        subsetter.subset(font)

        # 保存为指定格式
        buffer = io.BytesIO()
        font.save(buffer)
        buffer.seek(0)

        # 确定MIME类型
        mime_type = {
            'woff2': 'font/woff2',
            'woff': 'font/woff',
        }[format]

        # 创建响应并设置
        response = Response(buffer.read(), mimetype=mime_type)
        # 其他设置...
        return response

    except Exception as e:
        # 子集化失败...

```


前端代码中增加了一些字符提取的工作，我本身就是通过`FontFace Api`来请求字体资源的，所以我仅需将资源链接替换为**子集化字体的接口**就可以了，下面代码来描述字体的加载过程

```javascript 
// ...其他逻辑
Toast.loading('字体加载中')
// 遍历海报中的字体对象
[...new Set(fontFamilies)].forEach((fontName) => {
  // 在字体库中找到对应字体详细信息
  const obj = fontLibrary.find((el) => el?.value === fontName) ?? {};
  
  if (obj.value && obj.src) {
      // 处理海报中提取的文案集合
      const text = textMap[obj.value].join('');
      // 构建字体对象
      const font = new FontFace(
        obj.value,
        `url(http://127.0.0.1:5000/font/${obj.value}?text=${text}&format=woff2)`
      );
      // 加载字体
      font.load();
      // 添加到文档字体集中
      document.fonts.add(font);
    }
});
// 文档所有字体加载完毕后返回成功的 Promise
return document.fonts.ready.finally(() =>Toast.destory());

```


好了，刷新下浏览器，来看看最终的效果：

这这 真立竿见影（主要是基数大😁😁），最终得到的结果就是，**实际22.4M的字体文件，子集化后缩减到3.6KB。实际效果图生成的时间由20s+缩减到毫秒级（300ms以内）**。这下就无惧网速了吧！

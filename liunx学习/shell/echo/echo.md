# echo

## 目录

- [输出到文件](#输出到文件)

**直接输出文本**：

```bash 
echo "Hello, World!"
```


**输出变量**：

```bash 
name="Alice"
echo "My name is $name"
```


​**​`-n`​**​：不换行输出（默认情况下`echo`会自动换行）。

**`-e`**：启用转义字符解析（如`\n`换行、`\t`制表符等）。

```bash 
echo -e "Line 1\nLine 2"
```


#### **输出到文件**

```bash 
echo "This is a log" > logfile.txt    # 覆盖写入
echo "Another log" >> logfile.txt     # 追加写入
```

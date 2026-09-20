# 出现问号

## 目录

- [解决方案：](#解决方案)
- [问题解决](#问题解决)

> 如果这个没有解决；就安装colorsls 哪个 nerd font 字体

如图所示，出现问号。 &#x20;

![](https://i-blog.csdnimg.cn/blog_migrate/d624d6b6e7ac6647ded851255dae43d7.png#pic_center)

## 解决方案：

是因为配置中有非ascii字符编码，这两个问号本来是好看的箭头，但是箭头在当前字体中是不会被显示的……所以解决方法是重新下载一个支持非ascii编码的字体。
[github](https://so.csdn.net/so/search?q=github\&spm=1001.2101.3001.7020 "github")上有一个字体：yizhen20133868/fonts

```markdown 
# git。clone
git clone https://github.com/powerline/fonts.git

# install
cd fonts

./install.sh
 执行成功后可以删除 

rm -rf fonts
```


然后按照下面的设置 &#x20;
iterm2 ➡️ preferences ➡️ profiles ➡️ text ➡️ font

![](./assets/image/image_rd56RhDvHI.png)

## 问题解决

![](https://i-blog.csdnimg.cn/blog_migrate/edcfc35a6b9568e551564e8a2537ebf7.png#pic_center)

# 字体

建议使用px

在作者的观点中，是建议描述性的字体使用px，如果有slogan之类大于48px的，可以使用rem，

不希望文本在Retina屏幕下变小，另外，我们希望在大屏手机上看到更多文本，以及，现在绝大多数的字体文件都自带一些点阵尺寸，通常是16px和24px，所以我们不希望出现13px和15px这样的奇葩尺寸。

如此一来，就决定了在制作H5的页面中，rem并不适合用到段落文本上。所，考虑文本还是使用px作为单位。只不过使用

**这个地方要注意理解：不设置viewport 的情况下；即使用设备的实际分辨率（物理分辨率）；或者说设备的真实width,不使用dpi进行缩放。**

**如果设置了viewport，则不行了；px就是逻辑像素；而不是物理设备的真实像素**

\[data-dpr]属性来区分不同dpr下的文本字号大小。

```css 
div {
    width: 1rem;
    height: 0.4rem;
    font-size: 12px; // 默认写上dpr为1的fontSize
}
[data-dpr="2"] div {
    font-size: 24px;
}
[data-dpr="3"] div {
    font-size: 36px;
}
```


为了能更好的利于开发，在实际开发中，我**们可以定制一个**[**font-dpr()**](https://github.com/W3cplus/Sass-Resources/blob/master/mixins/_font-dpr.scss "font-dpr()")**这样的Sass混合宏**：

```sass (scss)  
@mixin font-dpr($font-size){
    font-size: $font-size;
    [data-dpr="2"] & {
        font-size: $font-size * 2;
    }
    [data-dpr="3"] & {
        font-size: $font-size * 3;
    }
}
```


有了这样的混合宏之后，在开发中可以直接这样使用：@include font-dpr(16px);

当然这只是针对于描述性的文本，比如说段落文本。但有的时候文本的字号也需要分场景的，比如在项目中有一个slogan,业务方希望这个slogan能根据不同的终端适配。针对这样的场景，完全可以使用rem给slogan做计量单位。

\*\*注意：这个地方有个问题；当调节手机系统字体的时候；会调节dpi，这个时候1px对应的实际大小有变化，正常情况下1px === 1pt；而这个时候1px 可能就不是1pt了；就会产生ui上的一些bug；也不算bug，大多数app；H5都有这个问题；但是用rem或者vw，vh等比分的则不会出现这种情况；因为他总是把屏幕等比分成100份均分的 \*\*​

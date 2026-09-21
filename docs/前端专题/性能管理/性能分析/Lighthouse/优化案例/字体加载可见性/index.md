# Ensure text remains visible during webfont load确保文本在Webfont加载期间保持可见

![](<../assets/Ensure text remains visible du/image/image_NnT7GUCyJV.webp>)

- FOIT是浏览器在加载字体的时候的默认表现形式，也就是在字体加载过程中，页面是看不到文本内容的。在现代浏览器中，FOIT会导致这种现象出现至多3秒。FOIT会导致很差的用户体验，这是我们需要尽量去避免的.
- FOUT意思是在字体加载过程中使用默认的系统字体，字体加载完后显示加载的字体，如果超过了FOIT(3s)字体还没加载，则继续使用默认的系统字体。
- swap告诉浏览器使用字体的文本应立即使用系统字体显示。自定义字体准备好后，它将替换系统字体。可以避免在大多数现代浏览器中使用FOIT(并非所有主流浏览器都支持font-display: swap)

![](<../assets/Ensure text remains visible du/image/image_bGV0Qvub-0.webp>)

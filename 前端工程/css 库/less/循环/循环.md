# 循环

```sass (sass)  
@themes: green, yellow, blue, red, pink, purple, orange, grey, ming, blue2, black, mid_autumn, naruto, happy_new_year;

each(@themes, {
  #root.@{value} {
    color: ~'@{color-@{value}-theme_2-font}';
    background-color: ~'@{color-@{value}-theme}';
    background-image: ~'@{color-@{value}-theme-bgimg}';
    background-size: ~'@{color-@{value}-theme-bgsize}';
    background-position: ~'@{color-@{value}-theme-bgposition}';
    #right {
      background-color: ~'@{color-@{value}-theme}';
    }
  }
})
```

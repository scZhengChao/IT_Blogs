# 监听系统主题色变化

## 目录

- [使用](#使用)

```typescript 
import { useEffect, useState } from "react";
export const useTheme = () => {
  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  const [value, setValue] = useState<string | null>(themeMedia.matches ? 'light' : 'dark');
  useEffect(() => {
    
    themeMedia.addEventListener('change', e => 
      setValue(e.matches ? 'light' : 'dark')
    );
    return () => themeMedia.removeEventListener("change", e => 
      setValue(e.matches ? 'light' : 'dark')
    );
  }, []);
  return value;
};

```


#### 使用

```typescript 
const theme = useTheme()
return (
  <ConfigProvider
    theme={{
      algorithm: theme === 'light'
        ? theme.defaultAlgorithm
        : theme.darkAlgorithm,
    }}
  >
    <App />
  </ConfigProvider>
)

```

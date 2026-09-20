# import报错解决

```typescript title="config/vite-import"
import resolve from 'vite-plugin-resolve';
export const ConfigResolvePlugin = () => {
  return resolve({
    'agora-electron-sdk': `
      const { createAgoraRtcEngine } = require("agora-electron-sdk")
      export {
        createAgoraRtcEngine
      }
    `,
  })
}

```


```javascript title="electron.vite.config.mjs"
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import {ConfigResolvePlugin} from "./config/vite-import";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    plugins: [ConfigResolvePlugin(),react()],
    root:'.',
    build: {
      rollupOptions: {
        input: {
          excalidraw: resolve(__dirname, 'src/renderer/excalidraw/index.html'),
          main: resolve(__dirname, 'src/renderer/main/index.html')
        }
      }
    }

  }
})

```

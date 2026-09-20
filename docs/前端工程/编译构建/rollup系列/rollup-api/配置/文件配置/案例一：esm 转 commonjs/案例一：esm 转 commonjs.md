# 案例一：esm 转 commonjs

```typescript title="rollup.config.mjs"
import {defineConfig} from 'rollup'
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  input: {
    preload: "src/preload.ts",
    starter: "src/starter.ts"
  },
  external: [
    '@lr31.08/agora-electron-sdk',
    '@lr35.02/dcf-ipc-utils/dist/node'
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: isDev,
          declaration: isDev,
        }
      }
    }),
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', {modules: false, loose: true}]],
      plugins: [['@babel/plugin-proposal-class-properties', {loose: true}]],
      exclude: ["node_models/**", "dist/**", "out/**"],
    }),
    resolve(),
    commonjs(),
    terser(),
    copy({
      targets: [
        {
          src: 'app.json',
          dest: 'dist',
          transform: (contents) => contents.toString().replace('http://localhost:3000/', 'index.html')
        }
      ]
    })
  ],
  watch: {
    include: "src/**",
    clearScreen: true,
    exclude: "dist/**"
  },
  output: {
    entryFileNames: '[name].min.js',
    format: 'cjs',
    dir: 'dist',
    sourcemap: isDev
  }
})
```


```typescript title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "typeRoots": ["./types", "./node_modules/@types"],
    "declaration": true,
    "noUnusedLocals": false,
    "noImplicitAny": false,
    "strictPropertyInitialization": false
  },
  "exclude": ["./node_modules/**", "./dist/**", "./out/**"]
}
```


```json title="package.json"
"js:dev": "cross-env NODE_ENV='development' rimraf dist && rollup -c rollup.config.mjs -w",
"js:build": "cross-env NODE_ENV='production' rimraf dist && rollup -c rollup.config.mjs"
```

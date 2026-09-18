# Jest 常用配置和技巧详解

## 目录

- [一、常用配置详解](#一常用配置详解)
  - [1. 基本配置 (package.json 或 jest.config.js)](#1-基本配置-packagejson-或-jestconfigjs)
  - [2. TypeScript 支持配置](#2-TypeScript-支持配置)
- [二、实用技巧](#二实用技巧)
  - [1. 测试异步代码](#1-测试异步代码)
  - [2. Mock 高级用法](#2-Mock-高级用法)
  - [3. 定时器 Mock](#3-定时器-Mock)
  - [4. 快照测试技巧](#4-快照测试技巧)
  - [5. 测试覆盖率技巧](#5-测试覆盖率技巧)
- [三、高级配置技巧](#三高级配置技巧)
  - [1. 多项目配置 (Monorepo 支持)](#1-多项目配置-Monorepo-支持)
  - [2. 自定义环境](#2-自定义环境)
  - [3. 全局设置和清理](#3-全局设置和清理)
  - [4. 并行测试优化](#4-并行测试优化)
- [四、调试技巧](#四调试技巧)
- [五、性能优化](#五性能优化)

Jest 是一个功能强大的 JavaScript 测试框架，下面我将详细介绍 Jest 的常用配置和各种实用技巧。

## 一、常用配置详解

### 1. 基本配置 (package.json 或 jest.config.js)

```javascript 
module.exports = {
  // 测试环境
  testEnvironment: 'node', // 或 'jsdom' 用于浏览器环境
  
  // 测试文件匹配规则
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  
  // 模块文件扩展名
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  
  // 转换配置
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  
  // 忽略的路径
  testPathIgnorePatterns: ['/node_modules/'],
  
  // 覆盖率配置
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 模块别名（需与webpack等配置一致）
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // 在每个测试文件前运行的代码
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 是否显示测试覆盖率信息
  verbose: true
};
```


### 2. TypeScript 支持配置

安装 ts-jest：

```bash 
npm install --save-dev ts-jest @types/jest
```


配置示例：

```json 
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
};
```


## 二、实用技巧

### 1. 测试异步代码

```javascript 
// Promise
test('resolves to lemon', () => {
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});

// Async/Await
test('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

// 回调
test('calls the callback', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  
  fetchDataWithCallback(callback);
});
```


### 2. Mock 高级用法

```typescript 
// 手动创建 mock
jest.mock('../moduleName', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    namedExport: jest.fn(() => 43),
  };
});

// 部分 mock
jest.mock('../moduleName', () => {
  const originalModule = jest.requireActual('../moduleName');
  
  return {
    __esModule: true,
    ...originalModule,
    namedExport: jest.fn(),
  };
});

// Mock 实现
const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar);
mockFn(0); // 42
mockFn(1); // 43

// Mock 返回值
const mockFn = jest.fn();
mockFn.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
```


### 3. 定时器 Mock

```javascript 
// 快进定时器
jest.useFakeTimers();

test('waits 1 second', () => {
  const timerGame = require('../timerGame');
  timerGame();
  
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

// 快进所有定时器
jest.runAllTimers();

// 快进当前等待的定时器
jest.runOnlyPendingTimers();

// 按时间快进
jest.advanceTimersByTime(1000);
```


### 4. 快照测试技巧

```javascript 
// 基本快照
test('renders correctly', () => {
  const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();
  expect(tree).toMatchSnapshot();
});

// 内联快照
test('renders correctly', () => {
  const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <a
      className="normal"
      href="http://www.facebook.com"
      onMouseEnter={[Function]}
      onMouseLeave={[Function]}
    >
      Facebook
    </a>
  `);
});

// 属性匹配器
test('renders correctly', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };
  
  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});
```


### 5. 测试覆盖率技巧

```javascript 
// 忽略某些代码
/* istanbul ignore next */
function ignoredFunction() {
  // 这个函数不会被计入覆盖率
}

// 只收集特定文件的覆盖率
jest --collectCoverageFrom='src/**/*.{js,jsx}'

// 检查未覆盖的行
jest --coverage --changedSince=main
```


## 三、高级配置技巧

### 1. 多项目配置 (Monorepo 支持)

```javascript 
// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/**/*.test.js'],
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/**/*.test.jsx'],
    },
  ],
};
```


### 2. 自定义环境

```javascript 
// custom-environment.js
const NodeEnvironment = require('jest-environment-node');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    this.global.someGlobalObject = createGlobalObject();
  }
  
  async teardown() {
    this.global.someGlobalObject = null;
    await super.teardown();
  }
  
  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
```


### 3. 全局设置和清理

```javascript 
// jest.setup.js
beforeAll(() => {
  // 全局测试前设置
});

afterAll(() => {
  // 全局测试后清理
});

beforeEach(() => {
  // 每个测试前设置
  jest.resetAllMocks();
});

afterEach(() => {
  // 每个测试后清理
});
```


### 4. 并行测试优化

```javascript 
// 使用 --runInBand 禁用并行
jest --runInBand

// 使用 --maxWorkers 控制工作线程数
jest --maxWorkers=50%
```


## 四、调试技巧

1. **使用 Chrome 调试**：

```javascript 
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand
```


然后在 Chrome 中打开`chrome://inspect`

1. **使用 VSCode 调试**： &#x20;

   在`.vscode/launch.json`中添加：

```json 
{
  "type": "node",
  "request": "launch",
  "name": "Jest Current File",
  "program": "${workspaceFolder}/node_modules/jest/bin/jest",
  "args": ["${relativeFile}"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "disableOptimisticBPs": true
}
```


​**​3. 打印调试信息​**​：

```javascript 
test('debug test', () => {
  console.log('Debug info');
  // 使用 jest --verbose 查看输出
});
```


## 五、性能优化

1. **使用缓存**：

```javascript 
jest --cache
```


​**​2. 只运行修改的测试​**​：

```javascript 
jest --onlyChanged
```


​**​3. 使用隔离的工作线程​**​：

```typescript 
jest --isolated
```


1. ​**​禁用 watchman​**​：

```bash 
jest --no-watchman
```


1. **使用更快的测试运行器​**​：

```javascript 
// jest.config.js
module.exports = {
  runner: 'jest-light-runner',
};
```

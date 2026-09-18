# cmb-track

## 目录

- [index.ts](#indexts)
- [constants.ts](#constantsts)
- [utils](#utils)
  - [index.ts](#indexts)
  - [resolveProjectDep.ts](#resolveProjectDepts)
  - [withTmpPath.ts](#withTmpPathts)
- [templates](#templates)
  - [log.tpl](#logtpl)

埋点

# index.ts

```react tsx 
import type { IApi } from 'umi';
import { RUNTIME_TYPE_FILE_NAME } from 'umi';
import { Mustache } from 'umi/plugin-utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PLUGIN_JW_VERSION, TEMPLATES_DIR } from './constants';
import { withTmpPath } from './utils/withTmpPath';
import { redLog } from './utils';
import { resolveProjectDep } from './utils/resolveProjectDep';

export default (api: IApi) => {
  const { cmbTrack } = api.userConfig;
  api.onStart(() => {
    redLog('见微插件已启动');
  });
  api.describe({
    key: 'cmbTrack',
    config: {
      schema(joi) {
        return joi.object({
          serviceUnitId: joi.string(),
          errorCodeKey: joi.string(),
          defaultErrorCode: joi.string(),
          requestTrackAll: joi.boolean(),
          apiInvoke: joi.boolean(),
          apiHost: joi.string(),
          apiTrackHost: joi.string(),
          uploadID: joi.string(),
          jwVersion: joi.string(),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });
  let pkgPath: string | undefined = '';
  let trackVersion = '';
  try {
    pkgPath = resolveProjectDep({
      pkg: api.pkg,
      cwd: api.cwd,
      dep: '@lf12.32/front-web-lib',
    });
    trackVersion = require(`${pkgPath}/package.json`).version;
  } catch (e) {}

  if (cmbTrack.jwVersion) {
    if (cmbTrack.jwVersion !== PLUGIN_JW_VERSION) {
      redLog(
        `请注意插件见微版本是：${PLUGIN_JW_VERSION}和配置jwVersion不一致，使用jwVersion${cmbTrack.jwVersion}版本;请注意兼容`,
      );
    }
    redLog(`安装见微；版本：${cmbTrack.jwVersion}`);
    api.addOnDemandDeps(() => [
      {
        name: '@lf12.32/front-web-lib',
        version: cmbTrack.jwVersion,
        dev: false,
        reason: '@lf12.32/front-web-lib is must',
      },
    ]);
  } else {
    if (trackVersion) {
      if (trackVersion !== PLUGIN_JW_VERSION) {
        redLog(
          `请注意：已存在见微版本:${trackVersion} 和 插件见微版本：${PLUGIN_JW_VERSION}不一致,请注意兼容`,
        );
      }
    } else {
      redLog(`安装见微；版本：${PLUGIN_JW_VERSION}`);
      api.addOnDemandDeps(() => [
        {
          name: '@lf12.32/front-web-lib',
          version: PLUGIN_JW_VERSION,
          dev: false,
          reason: '@lf12.32/front-web-lib is must',
        },
      ]);
    }
  }

  const logTpl = readFileSync(join(TEMPLATES_DIR, 'log.tpl'), 'utf-8');
  api.onGenerateFiles(async () => {
    // 全靠时机
    const hasRuntimePlugin = api.appData.appJS?.exports.includes('setCmbTrack');
    const defaultOptions = {
      serviceUnitId: '',
      errorCodeKey: 'returnCode',
      defaultErrorCode: 'ADH0000',
      requestTrackAll: true,
      apiInvoke: true,
      apiHost: '',
      apiTrackHost: '',
      uploadID: '',
      jwVersion: '',
    };
    api.writeTmpFile({
      path: 'runtime.ts',
      content: Mustache.render(logTpl, { ...defaultOptions, ...cmbTrack, hasRuntimePlugin }),
    });
    // index.ts
    api.writeTmpFile({
      path: 'index.ts',
      content: `
export { logNotifyError,logTrack,logLoginUser,logInit } from './runtime';
export type { EventId } from './runtime';
`,
    });
    api.writeTmpFile({
      path: RUNTIME_TYPE_FILE_NAME,
      content: `
export interface IRuntimeConfig {
  setCmbTrack?: () => Promise<Record<string, any>>
}
      `,
    });
  });
  // Runtime Plugin
  api.addRuntimePluginKey(() => ['setCmbTrack']);
  api.addRuntimePluginKey(() => ['cmbTrack']);
  api.addRuntimePluginKey(() => [
    'logNotifyError',
    'logTrack',
    'EventId',
    'logLoginUser',
    'logInit',
  ]);

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.ts' })];
  });
  api.addEntryImports(() => {
    return [
      {
        source: '@@/plugin-cmbTrack',
        specifier: '{ logInit }',
      },
    ];
  });
  api.addEntryCode(() => {
    return `logInit()`;
  });
};

```


# constants.ts

```react tsx 
import { join } from 'path';

export const TEMPLATES_DIR = join(__dirname, './templates');
export const PLUGIN_JW_VERSION = '2.1.7';

```


# utils

## index.ts

```react tsx 
export function redLog(str: string) {
  console.log('\x1B[31m%s\x1B[0m', str);
}

```


## resolveProjectDep.ts

```react tsx 
import { dirname } from 'path';
import { resolve } from 'umi/plugin-utils';

export function resolveProjectDep(opts: { pkg: any; cwd: string; dep: string }) {
  if (opts.pkg.dependencies?.[opts.dep] || opts.pkg.devDependencies?.[opts.dep]) {
    return dirname(
      resolve.sync(`${opts.dep}/package.json`, {
        basedir: opts.cwd,
      }),
    );
  }
}

```


## withTmpPath.ts

```react tsx 
import { join } from 'path';
import { IApi } from 'umi';
import { winPath } from 'umi/plugin-utils';

export function withTmpPath(opts: { api: IApi; path: string; noPluginDir?: boolean }) {
  return winPath(
    join(
      opts.api.paths.absTmpPath,
      opts.api.plugin.key && !opts.noPluginDir ? `plugin-${opts.api.plugin.key}` : '',
      opts.path,
    ),
  );
}

```


# templates

## log.tpl

```react tsx 
import cmbTrack from '@lf12.32/front-web-lib';
{{#hasRuntimePlugin}}
import {setCmbTrack } from '@/app';
{{/hasRuntimePlugin}}

const trackConfig = {
    {{#serviceUnitId}}
      serviceUnitId: '{{serviceUnitId}}',
    {{/serviceUnitId}}
    {{#errorCodeKey}}
      errorCodeKey: '{{errorCodeKey}}',
    {{/errorCodeKey}}
    {{#defaultErrorCode}}
      defaultErrorCode: '{{defaultErrorCode}}',
    {{/defaultErrorCode}}
    {{#requestTrackAll}}
      requestTrackAll: {{requestTrackAll}},
    {{/requestTrackAll}}
    {{#apiInvoke}}
      apiInvoke: {{apiInvoke}},
    {{/apiInvoke}}
    {{#apiHost}}
      apiHost: '{{apiHost}}',
    {{/apiHost}}
    {{#apiTrackHost}}
      apiTrackHost: '{{apiTrackHost}}',
    {{/apiTrackHost}}
    {{#uploadID}}
      uploadID: '{{uploadID}}',
    {{/uploadID}}
}

export const logInit = (): void => {
  let config = {...trackConfig}
  {{#hasRuntimePlugin}}
    config =  {...trackConfig,...setCmbTrack()}
  {{/hasRuntimePlugin}}
  console.log('见微已初始化:',config)
  if(!config.uploadID || !config.apiHost){
    throw new Error("见微参数不合法")
  }
  cmbTrack.init({
    ...config,
    // 全链路日志动态修改服务单元功能暂不支持, 见微正在开发, 待新版本上线后可删除此处代码.
    beforeUploadCb: (data) => {
      if (data.common) {
        data.common.serviceUnitId = config.serviceUnitId;
      }
      cmbTrack.trackAllSelf(data, null, !!data.common);
    },
  });
}

export const logLoginUser = (employeeId: string): void =>  {
  cmbTrack.aliasID(employeeId);
}

// 启动日志（系统日志）: ClientStart
// 闪退日志（系统日志）: ClientCrash
// WebPage错误日志（系统日志): PageError
// WebPage性能日志（系统日志): PagePerformance
// API调用日志: ApiInvoke
// 页面加载日志: PageLoad
// 页面离开日志: PageExit
// 控件点击日志: ClickUnload
export type EventId =
  | 'ClientStart'
  | 'ClientCrash'
  | 'PageError'
  | 'PagePerformance'
  | 'ApiInvoke'
  | 'PageLoad'
  | 'PageExit'
  | 'ClickUpload';

export function logTrack(data: any, eventId?: EventId): void {
  if (eventId) {
    cmbTrack.track(eventId, data);
  } else {
    cmbTrack.trackSelf(data);
  }
}

export function logNotifyError(error: any): void {
  cmbTrack.NgNotify_Error(error);
}
```

# 创建硬连接

```typescript 
const spawn = require('cross-spawn');
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');
function resolvePath(targetPath) {
  return path.resolve(__dirname, targetPath);
}
const winHandlerOriginPath = resolvePath('../../common/types/rtc/win-handler.model.ts');
const rtcAdapterOriginPath = resolvePath('../../common/types/rtc/rtc-adapter.model.ts');
const openApiOriginPath = resolvePath('../../common/types/rtc/open-api.model.ts');
const fieldDescOriginPath = resolvePath('../../common/types/rtc/field-desc.model.ts');

const winHandlerTargetPath = resolvePath('../../../ElectronMount/src/types/win-handler.model.ts');
const rtcAdapterTargetPath = resolvePath('../../../ElectronMount/src/types/rtc-adapter.model.ts');
const openApiTargetPath = resolvePath('../../../ElectronMount/src/types/open-api.model.ts');
const fieldDescTargetPath = resolvePath('../../../ElectronMount/src/types/field-desc.model.ts');

const fileList = [
  [winHandlerOriginPath, winHandlerTargetPath],
  [rtcAdapterOriginPath, rtcAdapterTargetPath],
  [openApiOriginPath, openApiTargetPath],
  [fieldDescOriginPath, fieldDescTargetPath],
];
function likeUnixCreate(origin, target) {
  const childProcess = spawn('ln', [origin, target], {
    stdio: 'inherit',
  });
  childProcess.on('data', () => {
    console.log(target, 'create success');
  });
  childProcess.on('error', (err) => {
    console.log(target, 'create failed');
  });
}
function windowCreate(origin, target) {
  const str = `mklink /H ${target} ${origin}`;
  exec(str, (err, stdout, stderr) => {
    if (err || stderr) {
      console.log(target, 'create failed', err, stderr);
    } else {
      console.log(target, 'create success');
    }
  });
}
function createLink(origin, target) {
  if (os.platform() === 'win32') {
    if (process.env.SHELL) {
      likeUnixCreate(origin, target);
    } else {
      windowCreate(origin, target);
    }
  } else {
    likeUnixCreate(origin, target);
  }
}
function begin() {
  for (let i = 0; i < fileList.length; i++) {
    const [origin, target] = fileList[i];
    if (fs.existsSync(target)) {
      fs.unlinkSync(target);
    }
    createLink(origin, target);
  }
}
begin();
```

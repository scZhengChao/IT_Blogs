# react + antd

## 目录

- [tsx](#tsx)
- [less](#less)
- [usage](#usage)

# tsx

```typescript 

import { Image, Modal } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
import style from './index.less';
import classnames from 'classnames/bind';
import { MultimediaTypeEnum } from '../../types/enums/file.enums';

const cx = classnames.bind(style);

export interface PreviewProps {
  type: MultimediaTypeEnum;
  src: string;
}

export interface Config extends PreviewProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  afterClose?: () => void;
  onVisibleChange?: (visible: boolean) => void;
}

export default function multimediaPreview(props: PreviewProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { ...props, onCancel, onOk, onVisibleChange, visible: true } as Config;

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render(config: Config) {
    setTimeout(() => {
      ReactDOM.render(
        config.type !== MultimediaTypeEnum.图片 ? (
          <Modal
            {...config}
            centered={true}
            title={null}
            footer={null}
            width={850}
            className={cx('video-preview-modal')}
            bodyStyle={{ padding: 0 }}
            closable={false}
          >
            {config.type === MultimediaTypeEnum.视频 ? (
              <video src={config.src} className={cx('video-control')} autoPlay loop controls />
            ) : (
              <audio src={config.src} className={cx('audio-control')} autoPlay loop controls />
            )}
          </Modal>
        ) : (
          <Image
            className={cx('image-wrapper')}
            preview={{
              visible: config.visible,
              scaleStep: 0.5,
              src: config.src,
              onVisibleChange: (visible) => {
                config.onVisibleChange(visible);
                config?.afterClose?.();
                destroy();
              },
            }}
          />
        ),
        div,
      );
    });
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        destroy();
      },
    };
    render(currentConfig);
  }

  function onCancel() {
    close();
  }

  function onOk() {
    close();
  }

  function onVisibleChange(visible: boolean) {
    currentConfig = {
      ...currentConfig,
      visible: visible,
      afterClose: () => {
        destroy();
      },
    };
    render(currentConfig);
  }

  render(currentConfig);
}


```


# less

```typescript 
.image-wrapper {
  display: none;
}

.audio-control {
  width: 100%;
  display: block;
}

.video-control {
  width: 850px;
  height: 478px;
  display: block;
}

```


# usage

```typescript 

export enum MultimediaTypeEnum {
  图片 = 1,
  视频 = 2,
  音频 = 3,
  文件 = 4,
}



multimediaPreview({
  type: fileType,
  src: url,
});
multimediaPreview({
  type: MultimediaTypeEnum.视频,
  src: videoUrl,
});

```


![](./assets/image/image_Vo78YE4VWu.png)
